"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "@/hooks/use-toast"
import { Loader2, Video, VideoOff, Mic, MicOff, Phone } from "lucide-react"

interface SignalVideoCallProps {
  roomId: string
  userName: string
  onCallEnd?: () => void
}

export function SignalVideoCall({ roomId, userName, onCallEnd }: SignalVideoCallProps) {
  const [isConnecting, setIsConnecting] = useState(false)
  const [isConnected, setIsConnected] = useState(false)
  const [isVideoEnabled, setIsVideoEnabled] = useState(true)
  const [isAudioEnabled, setIsAudioEnabled] = useState(true)
  const localVideoRef = useRef<HTMLVideoElement>(null)
  const remoteVideoRef = useRef<HTMLVideoElement>(null)
  const peerConnectionRef = useRef<RTCPeerConnection | null>(null)
  const localStreamRef = useRef<MediaStream | null>(null)
  const socketRef = useRef<WebSocket | null>(null)

  useEffect(() => {
    return () => {
      // Cleanup on unmount
      endCall()
    }
  }, [])

  const initializeWebRTC = async () => {
    try {
      // Get user media
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      })

      localStreamRef.current = stream
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream
      }

      // Create peer connection
      const peerConnection = new RTCPeerConnection({
        iceServers: [{ urls: "stun:stun.l.google.com:19302" }, { urls: "stun:stun1.l.google.com:19302" }],
      })

      peerConnectionRef.current = peerConnection

      // Add local stream to peer connection
      stream.getTracks().forEach((track) => {
        peerConnection.addTrack(track, stream)
      })

      // Handle remote stream
      peerConnection.ontrack = (event) => {
        const [remoteStream] = event.streams
        if (remoteVideoRef.current) {
          remoteVideoRef.current.srcObject = remoteStream
        }
      }

      // Handle ICE candidates
      peerConnection.onicecandidate = (event) => {
        if (event.candidate && socketRef.current) {
          socketRef.current.send(
            JSON.stringify({
              type: "ice-candidate",
              candidate: event.candidate,
              roomId,
            }),
          )
        }
      }

      // Connect to signaling server
      connectToSignalingServer()
    } catch (error) {
      console.error("Error initializing WebRTC:", error)
      toast({
        title: "Camera/Microphone Error",
        description: "Could not access camera or microphone. Please check permissions.",
        variant: "destructive",
      })
    }
  }

  const connectToSignalingServer = () => {
    // In a real implementation, you would connect to your WebSocket signaling server
    // For this demo, we'll simulate the connection
    const ws = new WebSocket(`wss://your-signaling-server.com/room/${roomId}`)
    socketRef.current = ws

    ws.onopen = () => {
      setIsConnected(true)
      setIsConnecting(false)
      ws.send(
        JSON.stringify({
          type: "join-room",
          roomId,
          userName,
        }),
      )
    }

    ws.onmessage = async (event) => {
      const message = JSON.parse(event.data)
      const peerConnection = peerConnectionRef.current

      if (!peerConnection) return

      switch (message.type) {
        case "offer":
          await peerConnection.setRemoteDescription(new RTCSessionDescription(message.offer))
          const answer = await peerConnection.createAnswer()
          await peerConnection.setLocalDescription(answer)
          ws.send(
            JSON.stringify({
              type: "answer",
              answer,
              roomId,
            }),
          )
          break

        case "answer":
          await peerConnection.setRemoteDescription(new RTCSessionDescription(message.answer))
          break

        case "ice-candidate":
          await peerConnection.addIceCandidate(new RTCIceCandidate(message.candidate))
          break

        case "user-joined":
          // Create offer for new user
          const offer = await peerConnection.createOffer()
          await peerConnection.setLocalDescription(offer)
          ws.send(
            JSON.stringify({
              type: "offer",
              offer,
              roomId,
            }),
          )
          break
      }
    }

    ws.onclose = () => {
      setIsConnected(false)
      toast({
        title: "Connection Lost",
        description: "The video call connection was lost.",
        variant: "destructive",
      })
    }

    ws.onerror = (error) => {
      console.error("WebSocket error:", error)
      setIsConnecting(false)
      toast({
        title: "Connection Error",
        description: "Failed to connect to the video call.",
        variant: "destructive",
      })
    }
  }

  const startCall = async () => {
    setIsConnecting(true)
    await initializeWebRTC()
  }

  const endCall = () => {
    // Stop local stream
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach((track) => track.stop())
    }

    // Close peer connection
    if (peerConnectionRef.current) {
      peerConnectionRef.current.close()
    }

    // Close WebSocket
    if (socketRef.current) {
      socketRef.current.close()
    }

    setIsConnected(false)
    setIsConnecting(false)
    onCallEnd?.()
  }

  const toggleVideo = () => {
    if (localStreamRef.current) {
      const videoTrack = localStreamRef.current.getVideoTracks()[0]
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled
        setIsVideoEnabled(videoTrack.enabled)
      }
    }
  }

  const toggleAudio = () => {
    if (localStreamRef.current) {
      const audioTrack = localStreamRef.current.getAudioTracks()[0]
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled
        setIsAudioEnabled(audioTrack.enabled)
      }
    }
  }

  if (!isConnected && !isConnecting) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Join Video Call</CardTitle>
          <CardDescription>Click the button below to start your meet & greet session</CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <Button onClick={startCall} size="lg" className="bg-green-600 hover:bg-green-700">
            <Video className="mr-2 h-5 w-5" />
            Start Video Call
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Video Call - {userName}</CardTitle>
        <CardDescription>{isConnecting ? "Connecting..." : isConnected ? "Connected" : "Disconnected"}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {/* Local Video */}
          <div className="relative">
            <video
              ref={localVideoRef}
              autoPlay
              muted
              playsInline
              className="w-full h-64 bg-gray-900 rounded-lg object-cover"
            />
            <div className="absolute bottom-2 left-2 bg-black/50 text-white px-2 py-1 rounded text-sm">You</div>
          </div>

          {/* Remote Video */}
          <div className="relative">
            <video
              ref={remoteVideoRef}
              autoPlay
              playsInline
              className="w-full h-64 bg-gray-900 rounded-lg object-cover"
            />
            <div className="absolute bottom-2 left-2 bg-black/50 text-white px-2 py-1 rounded text-sm">
              Kelvin Creekman
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex justify-center space-x-4">
          <Button
            variant={isVideoEnabled ? "default" : "destructive"}
            size="icon"
            onClick={toggleVideo}
            disabled={isConnecting}
          >
            {isVideoEnabled ? <Video className="h-4 w-4" /> : <VideoOff className="h-4 w-4" />}
          </Button>

          <Button
            variant={isAudioEnabled ? "default" : "destructive"}
            size="icon"
            onClick={toggleAudio}
            disabled={isConnecting}
          >
            {isAudioEnabled ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
          </Button>

          <Button variant="destructive" size="icon" onClick={endCall} disabled={isConnecting}>
            <Phone className="h-4 w-4" />
          </Button>
        </div>

        {isConnecting && (
          <div className="flex items-center justify-center mt-4">
            <Loader2 className="h-6 w-6 animate-spin mr-2" />
            <span>Connecting to video call...</span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
