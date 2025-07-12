"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Mic, MicOff, Video, VideoOff, PhoneOff, Users, Settings, Crown, MessageSquare, Share } from "lucide-react"
import { useAuth } from "@/components/auth/auth-provider"
import { useToast } from "@/hooks/use-toast"

interface Participant {
  id: string
  name: string
  avatar?: string
  isHost: boolean
  isMuted: boolean
  isVideoOn: boolean
  isAdmin: boolean
}

interface DailyVideoCallProps {
  sessionId: string
  roomUrl?: string
  onLeave?: () => void
}

export function DailyVideoCall({ sessionId, roomUrl, onLeave }: DailyVideoCallProps) {
  const [isConnected, setIsConnected] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [isVideoOn, setIsVideoOn] = useState(true)
  const [participants, setParticipants] = useState<Participant[]>([])
  const [showChat, setShowChat] = useState(false)
  const [chatMessages, setChatMessages] = useState<
    Array<{ id: string; user: string; message: string; timestamp: Date }>
  >([])
  const [newMessage, setNewMessage] = useState("")

  const { user } = useAuth()
  const { toast } = useToast()
  const videoRef = useRef<HTMLVideoElement>(null)

  const isAdmin = user?.user_metadata?.role === "admin"
  const isHost = isAdmin // Admin is always the host

  useEffect(() => {
    // Mock participants data
    const mockParticipants: Participant[] = [
      {
        id: "host",
        name: "Kelvin Creekman",
        avatar: "/kelvin-logo.png",
        isHost: true,
        isMuted: false,
        isVideoOn: true,
        isAdmin: true,
      },
      {
        id: "user1",
        name: "Sarah M.",
        isHost: false,
        isMuted: true,
        isVideoOn: true,
        isAdmin: false,
      },
      {
        id: "user2",
        name: "Mike R.",
        isHost: false,
        isMuted: false,
        isVideoOn: false,
        isAdmin: false,
      },
    ]

    // Add current user if not already in the list
    if (user && !mockParticipants.find((p) => p.id === user.id)) {
      mockParticipants.push({
        id: user.id,
        name: user.email?.split("@")[0] || "You",
        isHost: isAdmin,
        isMuted,
        isVideoOn,
        isAdmin,
      })
    }

    setParticipants(mockParticipants)

    // Mock chat messages
    setChatMessages([
      {
        id: "1",
        user: "Kelvin Creekman",
        message: "Welcome everyone! Great to see you all here! 🎸",
        timestamp: new Date(Date.now() - 5 * 60 * 1000),
      },
      {
        id: "2",
        user: "Sarah M.",
        message: "So excited to be here! Love your new album!",
        timestamp: new Date(Date.now() - 3 * 60 * 1000),
      },
      {
        id: "3",
        user: "Mike R.",
        message: "Can't wait to hear about the upcoming tour!",
        timestamp: new Date(Date.now() - 1 * 60 * 1000),
      },
    ])
  }, [user, isAdmin, isMuted, isVideoOn])

  const handleJoinCall = async () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to join the video call.",
        variant: "destructive",
      })
      return
    }

    setIsConnecting(true)

    try {
      // Simulate Daily.co connection
      await new Promise((resolve) => setTimeout(resolve, 2000))

      setIsConnected(true)
      toast({
        title: "Connected! 🎸",
        description: "You've joined the meet & greet session.",
      })

      // Simulate getting user media
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
          if (videoRef.current) {
            videoRef.current.srcObject = stream
          }
        } catch (error) {
          console.error("Error accessing media devices:", error)
        }
      }
    } catch (error) {
      toast({
        title: "Connection Failed",
        description: "Unable to join the video call. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsConnecting(false)
    }
  }

  const handleLeaveCall = () => {
    setIsConnected(false)
    toast({
      title: "Left Session",
      description: "You've left the meet & greet session.",
    })
    onLeave?.()
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
    toast({
      title: isMuted ? "Unmuted" : "Muted",
      description: `Your microphone is now ${isMuted ? "on" : "off"}.`,
    })
  }

  const toggleVideo = () => {
    setIsVideoOn(!isVideoOn)
    toast({
      title: isVideoOn ? "Video Off" : "Video On",
      description: `Your camera is now ${isVideoOn ? "off" : "on"}.`,
    })
  }

  const sendMessage = () => {
    if (!newMessage.trim()) return

    const message = {
      id: Date.now().toString(),
      user: user?.email?.split("@")[0] || "You",
      message: newMessage,
      timestamp: new Date(),
    }

    setChatMessages((prev) => [...prev, message])
    setNewMessage("")
  }

  if (!isConnected) {
    return (
      <Card className="border-electric-700/30 bg-background/50 backdrop-blur-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-electric-400">
            <Video className="h-5 w-5" />
            Meet & Greet Video Call
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center py-12">
          <div className="mb-6">
            <Video className="h-16 w-16 mx-auto mb-4 text-electric-400 opacity-50" />
            <h3 className="text-xl font-semibold mb-2">Ready to join?</h3>
            <p className="text-muted-foreground mb-6">
              Connect with Kelvin Creekman and other fans in this exclusive video session.
            </p>
          </div>

          <div className="flex items-center justify-center gap-4 mb-6">
            <Button
              variant="outline"
              size="sm"
              onClick={toggleMute}
              className={isMuted ? "bg-red-500/20 border-red-500/50" : ""}
            >
              {isMuted ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={toggleVideo}
              className={!isVideoOn ? "bg-red-500/20 border-red-500/50" : ""}
            >
              {isVideoOn ? <Video className="h-4 w-4" /> : <VideoOff className="h-4 w-4" />}
            </Button>
          </div>

          <Button
            onClick={handleJoinCall}
            disabled={isConnecting || !user}
            className="bg-gradient-electric hover:animate-electric-pulse"
            size="lg"
          >
            {isConnecting ? "Connecting..." : user ? "Join Video Call" : "Sign In to Join"}
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[600px]">
      {/* Main Video Area */}
      <div className="lg:col-span-3">
        <Card className="border-electric-700/30 bg-background/50 backdrop-blur-lg h-full">
          <CardContent className="p-0 h-full relative">
            <div className="grid grid-cols-2 gap-2 p-4 h-full">
              {/* Host Video (Larger) */}
              <div className="col-span-2 relative bg-gray-900 rounded-lg overflow-hidden">
                <video
                  ref={videoRef}
                  autoPlay
                  muted
                  className="w-full h-full object-cover"
                  style={{ transform: "scaleX(-1)" }}
                />
                <div className="absolute bottom-4 left-4 flex items-center gap-2">
                  <Avatar className="h-8 w-8 border-2 border-electric-500/50">
                    <AvatarImage src="/kelvin-logo.png" alt="Kelvin Creekman" />
                    <AvatarFallback className="bg-electric-500/20 text-electric-400">KC</AvatarFallback>
                  </Avatar>
                  <div className="flex items-center gap-2">
                    <Crown className="h-4 w-4 text-gold-400" />
                    <span className="text-white font-semibold">Kelvin Creekman (Host)</span>
                  </div>
                </div>
              </div>

              {/* Participant Videos */}
              {participants.slice(1, 5).map((participant) => (
                <div key={participant.id} className="relative bg-gray-800 rounded-lg overflow-hidden aspect-video">
                  <div className="w-full h-full flex items-center justify-center">
                    {participant.isVideoOn ? (
                      <div className="w-full h-full bg-gradient-to-br from-electric-500/20 to-frost-500/20 flex items-center justify-center">
                        <Avatar className="h-16 w-16 border-2 border-electric-500/50">
                          <AvatarImage src={participant.avatar || "/placeholder.svg"} alt={participant.name} />
                          <AvatarFallback className="bg-electric-500/20 text-electric-400">
                            {participant.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                      </div>
                    ) : (
                      <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                        <VideoOff className="h-8 w-8 text-gray-400" />
                      </div>
                    )}
                  </div>
                  <div className="absolute bottom-2 left-2 flex items-center gap-1">
                    <span className="text-white text-xs font-medium">{participant.name}</span>
                    {participant.isMuted && <MicOff className="h-3 w-3 text-red-400" />}
                    {participant.isAdmin && <Crown className="h-3 w-3 text-gold-400" />}
                  </div>
                </div>
              ))}
            </div>

            {/* Controls */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-2 bg-black/50 backdrop-blur-lg rounded-full px-4 py-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleMute}
                className={`rounded-full ${isMuted ? "bg-red-500 hover:bg-red-600" : "hover:bg-white/20"}`}
              >
                {isMuted ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleVideo}
                className={`rounded-full ${!isVideoOn ? "bg-red-500 hover:bg-red-600" : "hover:bg-white/20"}`}
              >
                {isVideoOn ? <Video className="h-4 w-4" /> : <VideoOff className="h-4 w-4" />}
              </Button>
              {isHost && (
                <>
                  <Button variant="ghost" size="sm" className="rounded-full hover:bg-white/20">
                    <Share className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="rounded-full hover:bg-white/20">
                    <Settings className="h-4 w-4" />
                  </Button>
                </>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLeaveCall}
                className="rounded-full bg-red-500 hover:bg-red-600"
              >
                <PhoneOff className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sidebar */}
      <div className="space-y-4">
        {/* Participants */}
        <Card className="border-electric-700/30 bg-background/50 backdrop-blur-lg">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm text-electric-400">
              <Users className="h-4 w-4" />
              Participants ({participants.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {participants.map((participant) => (
              <div key={participant.id} className="flex items-center gap-2 p-2 rounded-lg hover:bg-electric-500/10">
                <Avatar className="h-6 w-6 border border-electric-500/50">
                  <AvatarImage src={participant.avatar || "/placeholder.svg"} alt={participant.name} />
                  <AvatarFallback className="bg-electric-500/20 text-electric-400 text-xs">
                    {participant.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm flex-1">{participant.name}</span>
                <div className="flex items-center gap-1">
                  {participant.isAdmin && <Crown className="h-3 w-3 text-gold-400" />}
                  {participant.isHost && <Badge className="text-xs bg-electric-500/20 text-electric-400">Host</Badge>}
                  {participant.isMuted && <MicOff className="h-3 w-3 text-red-400" />}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Chat */}
        <Card className="border-electric-700/30 bg-background/50 backdrop-blur-lg flex-1">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm text-electric-400">
              <MessageSquare className="h-4 w-4" />
              Chat
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {chatMessages.map((message) => (
                <div key={message.id} className="text-sm">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-electric-400">{message.user}</span>
                    <span className="text-xs text-muted-foreground">
                      {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </span>
                  </div>
                  <p className="text-muted-foreground">{message.message}</p>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Type a message..."
                className="flex-1 px-3 py-2 text-sm bg-background/50 border border-electric-700/30 rounded-lg focus:outline-none focus:border-electric-500/50"
              />
              <Button onClick={sendMessage} size="sm" className="bg-gradient-electric">
                Send
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
