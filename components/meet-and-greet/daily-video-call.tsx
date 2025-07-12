"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import DailyIframe from "@daily-co/daily-js"
import type { DailyCall } from "@daily-co/daily-js"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, Mic, MicOff, Video, VideoOff, PhoneOff } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

interface DailyVideoCallProps {
  roomName: string
  userName: string
}

export function DailyVideoCall({ roomName, userName }: DailyVideoCallProps) {
  const callRef = useRef<DailyCall | null>(null)
  const iframeRef = useRef<HTMLIFrameElement | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isJoining, setIsJoining] = useState(false)
  const [isCallStarted, setIsCallStarted] = useState(false)
  const [isMicMuted, setIsMicMuted] = useState(false)
  const [isCameraOff, setIsCameraOff] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const dailyDomain = process.env.NEXT_PUBLIC_DAILY_DOMAIN

  const createRoomAndJoin = useCallback(async () => {
    if (!dailyDomain) {
      setError("Daily domain is not configured. Please set NEXT_PUBLIC_DAILY_DOMAIN environment variable.")
      setIsLoading(false)
      return
    }

    setIsJoining(true)
    setError(null)

    try {
      // In a real application, you would create a room server-side
      // and get a room URL with a token for security.
      // For this example, we'll use a simple client-side room creation/joining.
      const roomUrl = `https://${dailyDomain}.daily.co/${roomName}`

      if (!callRef.current) {
        callRef.current = DailyIframe.createFrame(iframeRef.current!, {
          showLeaveButton: true,
          showFullscreenButton: true,
          iframeStyle: {
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            border: "0",
          },
        })

        callRef.current.on("loaded", () => {
          setIsLoading(false)
        })

        callRef.current.on("joined-meeting", () => {
          setIsCallStarted(true)
          setIsJoining(false)
          toast({
            title: "Joined Call",
            description: `Welcome to the ${roomName} session!`,
            variant: "success",
          })
        })

        callRef.current.on("left-meeting", () => {
          setIsCallStarted(false)
          toast({
            title: "Left Call",
            description: "You have left the meet & greet session.",
            variant: "info",
          })
          // Clean up Daily iframe
          if (callRef.current) {
            callRef.current.destroy()
            callRef.current = null
          }
        })

        callRef.current.on("error", (e) => {
          console.error("Daily.co error:", e)
          setError(`Video call error: ${e.errorMsg || "An unknown error occurred."}`)
          setIsLoading(false)
          setIsJoining(false)
          toast({
            title: "Video Call Error",
            description: e.errorMsg || "An unknown error occurred during the call.",
            variant: "destructive",
          })
        })
      }

      await callRef.current.join({ url: roomUrl, userName: userName })
    } catch (err: any) {
      console.error("Failed to create or join Daily room:", err)
      setError(`Failed to start video call: ${err.message || "Unknown error"}`)
      setIsLoading(false)
      setIsJoining(false)
      toast({
        title: "Video Call Failed",
        description: err.message || "Could not start the video call.",
        variant: "destructive",
      })
    }
  }, [roomName, userName, dailyDomain])

  const toggleMic = useCallback(() => {
    if (callRef.current) {
      callRef.current.setLocalAudio(!isMicMuted)
      setIsMicMuted((prev) => !prev)
    }
  }, [isMicMuted])

  const toggleCamera = useCallback(() => {
    if (callRef.current) {
      callRef.current.setLocalVideo(!isCameraOff)
      setIsCameraOff((prev) => !prev)
    }
  }, [isCameraOff])

  const leaveCall = useCallback(() => {
    if (callRef.current) {
      callRef.current.leave()
    }
  }, [])

  useEffect(() => {
    // Cleanup on component unmount
    return () => {
      if (callRef.current) {
        callRef.current.destroy()
        callRef.current = null
      }
    }
  }, [])

  return (
    <Card className="w-full max-w-4xl h-[70vh] bg-background/50 backdrop-blur-lg border-electric-700/30 flex flex-col">
      <CardHeader>
        <CardTitle className="text-electric-100">
          {isCallStarted ? `Live Session: ${roomName}` : "Preparing Video Call..."}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col items-center justify-center p-0">
        {error && <div className="text-destructive text-center p-4">{error}</div>}
        {(isLoading || isJoining) && !error && (
          <div className="flex flex-col items-center justify-center h-full">
            <Loader2 className="h-12 w-12 animate-spin text-electric-500" />
            <p className="mt-4 text-electric-200">{isJoining ? "Joining call..." : "Loading video call..."}</p>
          </div>
        )}
        <div ref={iframeRef} className="w-full h-full relative rounded-b-lg overflow-hidden" />
      </CardContent>
      <div className="p-4 border-t border-electric-700 flex justify-center gap-4">
        {!isCallStarted && !isJoining && !error && (
          <Button
            onClick={createRoomAndJoin}
            disabled={isLoading || isJoining}
            className="bg-gradient-electric hover:animate-electric-pulse"
          >
            {isLoading || isJoining ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Connecting...
              </>
            ) : (
              "Start Call"
            )}
          </Button>
        )}
        {isCallStarted && (
          <>
            <Button
              variant="outline"
              size="icon"
              onClick={toggleMic}
              className="border-electric-700 text-electric-200 hover:bg-electric-900 hover:text-electric-100 bg-transparent"
            >
              {isMicMuted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
              <span className="sr-only">{isMicMuted ? "Unmute Mic" : "Mute Mic"}</span>
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={toggleCamera}
              className="border-electric-700 text-electric-200 hover:bg-electric-900 hover:text-electric-100 bg-transparent"
            >
              {isCameraOff ? <VideoOff className="h-5 w-5" /> : <Video className="h-5 w-5" />}
              <span className="sr-only">{isCameraOff ? "Turn Camera On" : "Turn Camera Off"}</span>
            </Button>
            <Button
              variant="destructive"
              size="icon"
              onClick={leaveCall}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              <PhoneOff className="h-5 w-5" />
              <span className="sr-only">Leave Call</span>
            </Button>
          </>
        )}
      </div>
    </Card>
  )
}
