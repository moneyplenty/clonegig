"use client"

import { useEffect, useRef, useState } from "react"
import DailyIframe from "@daily-co/daily-js"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "@/hooks/use-toast"
import { Loader2 } from "lucide-react"

interface DailyVideoCallProps {
  roomName: string
}

export function DailyVideoCall({ roomName }: DailyVideoCallProps) {
  const callFrame = useRef<DailyIframe.DailyCall | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isJoining, setIsJoining] = useState(false)
  const [roomUrl, setRoomUrl] = useState<string | null>(null)

  const DAILY_DOMAIN = process.env.NEXT_PUBLIC_DAILY_DOMAIN

  useEffect(() => {
    const createRoom = async () => {
      setIsLoading(true)
      try {
        const response = await fetch("/api/create-daily-room", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ roomName }),
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.message || "Failed to create Daily.co room")
        }

        const data = await response.json()
        setRoomUrl(data.url)
      } catch (error: any) {
        toast({
          title: "Video Call Error",
          description: error.message,
          variant: "destructive",
        })
        setRoomUrl(null)
      } finally {
        setIsLoading(false)
      }
    }

    if (!roomUrl) {
      createRoom()
    }
  }, [roomName, roomUrl])

  const joinCall = () => {
    if (!roomUrl) {
      toast({
        title: "Error",
        description: "Room URL not available. Please try again.",
        variant: "destructive",
      })
      return
    }

    setIsJoining(true)
    if (!callFrame.current) {
      callFrame.current = DailyIframe.createFrame({
        url: roomUrl,
        showLeaveButton: true,
        iframeStyle: {
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          border: "0",
          zIndex: 9999,
        },
      })

      callFrame.current.join()

      callFrame.current.on("left-meeting", () => {
        callFrame.current?.destroy()
        callFrame.current = null
        setIsJoining(false)
        toast({
          title: "Call Ended",
          description: "You have left the meet & greet session.",
          variant: "default",
        })
      })
    }
  }

  if (isLoading) {
    return (
      <Card className="w-full max-w-md mx-auto text-center bg-card/50 backdrop-blur-sm border-kelvin-border">
        <CardHeader>
          <CardTitle>Setting up your call...</CardTitle>
          <CardDescription>Please wait while we prepare the video session.</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center items-center h-32">
          <Loader2 className="h-8 w-8 animate-spin text-kelvin-primary" />
        </CardContent>
      </Card>
    )
  }

  if (!roomUrl) {
    return (
      <Card className="w-full max-w-md mx-auto text-center bg-card/50 backdrop-blur-sm border-kelvin-border">
        <CardHeader>
          <CardTitle>Video Call Unavailable</CardTitle>
          <CardDescription>Could not create a video room. Please try again later.</CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={() => setRoomUrl(null)}>Retry</Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-2xl mx-auto bg-card/50 backdrop-blur-sm border-kelvin-border">
      <CardHeader>
        <CardTitle>Join Your Meet & Greet</CardTitle>
        <CardDescription>Click the button below to join the live video call with Kelvin Creekman.</CardDescription>
      </CardHeader>
      <CardContent className="relative h-[400px] flex items-center justify-center">
        {!isJoining && (
          <Button onClick={joinCall} disabled={isJoining} className="text-lg px-8 py-4">
            Join Call Now
          </Button>
        )}
        {/* The Daily.co iframe will be injected here */}
        <div id="daily-iframe-container" className="absolute inset-0" />
      </CardContent>
    </Card>
  )
}
