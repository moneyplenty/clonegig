"use client"

import { useEffect, useRef, useState } from "react"
import DailyIframe from "@daily-co/daily-js"
import type { DailyCall } from "@daily-co/daily-js"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2 } from "lucide-react"
import { toast } from "@/hooks/use-toast"

interface DailyVideoCallProps {
  roomUrl: string
  onCallEnded: () => void
}

export function DailyVideoCall({ roomUrl, onCallEnded }: DailyVideoCallProps) {
  const callFrameRef = useRef<HTMLDivElement>(null)
  const dailyCallRef = useRef<DailyCall | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isJoining, setIsJoining] = useState(false)
  const [isJoined, setIsJoined] = useState(false)
  const { toast: showToast } = toast

  useEffect(() => {
    if (!callFrameRef.current) return

    const callFrame = DailyIframe.createFrame(callFrameRef.current, {
      url: roomUrl,
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

    dailyCallRef.current = callFrame

    const handleLoaded = () => {
      setIsLoading(false)
      showToast({
        title: "Call Ready",
        description: "The video call is ready to join.",
      })
    }

    const handleJoinedMeeting = () => {
      setIsJoined(true)
      setIsJoining(false)
      showToast({
        title: "Joined Call",
        description: "You have successfully joined the session.",
      })
    }

    const handleLeftMeeting = () => {
      setIsJoined(false)
      onCallEnded()
      showToast({
        title: "Call Ended",
        description: "You have left the video call.",
      })
    }

    callFrame.on("loaded", handleLoaded)
    callFrame.on("joined-meeting", handleJoinedMeeting)
    callFrame.on("left-meeting", handleLeftMeeting)

    return () => {
      callFrame.off("loaded", handleLoaded)
      callFrame.off("joined-meeting", handleJoinedMeeting)
      callFrame.off("left-meeting", handleLeftMeeting)
      callFrame.destroy().then(() => (dailyCallRef.current = null))
    }
  }, [roomUrl, onCallEnded, showToast])

  const handleJoinCall = async () => {
    if (dailyCallRef.current && !isJoined) {
      setIsJoining(true)
      try {
        await dailyCallRef.current.join()
      } catch (error) {
        console.error("Error joining Daily call:", error)
        showToast({
          title: "Join Error",
          description: "Failed to join the call. Please try again.",
          variant: "destructive",
        })
        setIsJoining(false)
      }
    }
  }

  const handleLeaveCall = async () => {
    if (dailyCallRef.current && isJoined) {
      await dailyCallRef.current.leave()
    }
  }

  return (
    <Card className="h-[600px] flex flex-col">
      <CardHeader>
        <CardTitle>Live Meet & Greet Session</CardTitle>
        <CardDescription>Connect with Gigkelvincreek live!</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 relative">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/80 z-10">
            <Loader2 className="h-8 w-8 animate-spin" />
            <p className="ml-2">Loading call...</p>
          </div>
        )}
        <div ref={callFrameRef} className="h-full w-full rounded-md overflow-hidden relative"></div>
        <div className="mt-4 flex justify-center space-x-2">
          {!isJoined && (
            <Button onClick={handleJoinCall} disabled={isLoading || isJoining}>
              {isJoining ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Joining...
                </>
              ) : (
                "Join Call"
              )}
            </Button>
          )}
          {isJoined && (
            <Button variant="destructive" onClick={handleLeaveCall}>
              Leave Call
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
