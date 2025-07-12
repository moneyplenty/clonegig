"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import DailyIframe from "@daily-co/daily-js"
import type { DailyCall } from "@daily-co/daily-js"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, Mic, MicOff, Video, VideoOff, PhoneOff } from "lucide-react"
import { toast } from "@/hooks/use-toast"

interface DailyVideoCallProps {
  roomName: string
  userName: string
}

export function DailyVideoCall({ roomName, userName }: DailyVideoCallProps) {
  const callRef = useRef<DailyCall | null>(null)
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [loading, setLoading] = useState(true)
  const [callState, setCallState] = useState<string>("loading")
  const [micOn, setMicOn] = useState(true)
  const [cameraOn, setCameraOn] = useState(true)

  const DAILY_DOMAIN = process.env.NEXT_PUBLIC_DAILY_DOMAIN

  const createAndJoinRoom = useCallback(async () => {
    if (!DAILY_DOMAIN) {
      toast({
        title: "Configuration Error",
        description: "NEXT_PUBLIC_DAILY_DOMAIN is not set. Please configure your environment variables.",
        variant: "destructive",
      })
      setCallState("error")
      setLoading(false)
      return
    }

    setLoading(true)
    setCallState("connecting")

    try {
      // In a real application, you'd create a room server-side and get a room URL
      // For this example, we'll construct a simple room URL
      const roomUrl = `https://${DAILY_DOMAIN}.daily.co/${roomName}`

      const call = DailyIframe.createFrame(iframeRef.current!, {
        url: roomUrl,
        showLeaveButton: true,
        iframeStyle: {
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          border: "0",
        },
      })

      callRef.current = call

      call.join({ userName })

      call.on("joined-meeting", () => {
        setCallState("joined")
        setLoading(false)
        toast({
          title: "Joined Call",
          description: `Welcome to the meet & greet, ${userName}!`,
          variant: "success",
        })
      })

      call.on("left-meeting", () => {
        setCallState("left")
        toast({
          title: "Left Call",
          description: "You have left the meet & greet.",
          variant: "info",
        })
        call.destroy()
        callRef.current = null
      })

      call.on("error", (e) => {
        console.error("Daily.co error:", e)
        toast({
          title: "Call Error",
          description: "An error occurred during the call.",
          variant: "destructive",
        })
        setCallState("error")
        setLoading(false)
      })

      call.on("camera-error", (e) => {
        console.error("Camera error:", e)
        toast({
          title: "Camera Error",
          description: "Could not access camera. Please check permissions.",
          variant: "destructive",
        })
      })

      call.on("microphone-error", (e) => {
        console.error("Microphone error:", e)
        toast({
          title: "Microphone Error",
          description: "Could not access microphone. Please check permissions.",
          variant: "destructive",
        })
      })
    } catch (error) {
      console.error("Failed to create or join Daily.co room:", error)
      toast({
        title: "Call Setup Failed",
        description: "Could not set up the video call. Please try again.",
        variant: "destructive",
      })
      setCallState("error")
      setLoading(false)
    }
  }, [DAILY_DOMAIN, roomName, userName])

  useEffect(() => {
    createAndJoinRoom()

    return () => {
      if (callRef.current) {
        callRef.current.leave()
        callRef.current.destroy()
        callRef.current = null
      }
    }
  }, [createAndJoinRoom])

  const toggleMic = () => {
    if (callRef.current) {
      callRef.current.setLocalAudio(!micOn)
      setMicOn(!micOn)
    }
  }

  const toggleCamera = () => {
    if (callRef.current) {
      callRef.current.setLocalVideo(!cameraOn)
      setCameraOn(!cameraOn)
    }
  }

  const leaveCall = () => {
    if (callRef.current) {
      callRef.current.leave()
    }
  }

  return (
    <Card className="w-full max-w-4xl mx-auto h-[70vh] flex flex-col bg-background/50 backdrop-blur-lg border-electric-700/30">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-electric-200">
          {callState === "loading" && "Loading Call..."}
          {callState === "connecting" && "Connecting to Meet & Greet..."}
          {callState === "joined" && `Live with Kelvin Creekman`}
          {callState === "left" && "Call Ended"}
          {callState === "error" && "Call Error"}
        </CardTitle>
        {callState === "joined" && (
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={toggleMic}
              className="bg-electric-900/30 border-electric-700 text-electric-200 hover:bg-electric-800/50"
            >
              {micOn ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5 text-red-400" />}
              <span className="sr-only">{micOn ? "Mute Mic" : "Unmute Mic"}</span>
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={toggleCamera}
              className="bg-electric-900/30 border-electric-700 text-electric-200 hover:bg-electric-800/50"
            >
              {cameraOn ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5 text-red-400" />}
              <span className="sr-only">{cameraOn ? "Turn Off Camera" : "Turn On Camera"}</span>
            </Button>
            <Button variant="destructive" size="icon" onClick={leaveCall}>
              <PhoneOff className="h-5 w-5" />
              <span className="sr-only">Leave Call</span>
            </Button>
          </div>
        )}
      </CardHeader>
      <CardContent className="flex-1 relative p-0">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/80 z-10">
            <Loader2 className="h-10 w-10 animate-spin text-electric-400" />
          </div>
        )}
        {callState === "error" && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/80 z-10 text-red-500 font-semibold">
            Failed to load video call. Please try again later.
          </div>
        )}
        <iframe
          ref={iframeRef}
          allow="microphone; camera; autoplay; display-capture"
          className="w-full h-full rounded-b-lg"
        />
      </CardContent>
    </Card>
  )
}
