"use client"

import { useEffect, useRef, useState } from "react"
import DailyIframe from "@daily-co/daily-js"
import type { DailyCall } from "@daily-co/daily-react-hooks"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Icons } from "@/components/icons"
import { toast } from "sonner"

interface DailyVideoCallProps {
  roomUrl: string
}

export function DailyVideoCall({ roomUrl }: DailyVideoCallProps) {
  const callFrame = useRef<DailyCall | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!roomUrl) {
      setError("No Daily.co room URL provided.")
      setIsLoading(false)
      return
    }

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
        },
      })

      callFrame.current.join()

      callFrame.current.on("loaded", () => {
        setIsLoading(false)
      })

      callFrame.current.on("error", (e) => {
        console.error("Daily.co error:", e)
        setError("Failed to load video call. Please try again.")
        setIsLoading(false)
        toast.error("Video call error: " + e.errorMsg)
      })

      callFrame.current.on("left-meeting", () => {
        toast.info("You have left the meeting.")
        // Optionally redirect or show a post-meeting message
      })
    }

    return () => {
      if (callFrame.current) {
        callFrame.current.destroy()
        callFrame.current = null
      }
    }
  }, [roomUrl])

  if (error) {
    return (
      <Card className="bg-kelvin-card text-kelvin-card-foreground border-kelvin-border shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-destructive-foreground">
            <Icons.alertTriangle className="inline-block h-6 w-6 mr-2" />
            Video Call Error
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-kelvin-card-foreground/80">{error}</p>
          <Button
            onClick={() => window.location.reload()}
            className="mt-4 bg-electric-500 hover:bg-electric-600 text-white"
          >
            Retry
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-kelvin-card text-kelvin-card-foreground border-kelvin-border shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          <Icons.video className="inline-block h-6 w-6 mr-2" />
          Live Meet & Greet
        </CardTitle>
        <CardDescription className="text-kelvin-card-foreground/80">
          {isLoading ? "Loading video call..." : "You are now connected to the session."}
        </CardDescription>
      </CardHeader>
      <CardContent className="relative h-[600px] w-full">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-kelvin-background/80 z-10">
            <p className="text-kelvin-foreground text-lg">Loading video call...</p>
          </div>
        )}
        <div id="daily-iframe-container" className="w-full h-full">
          {/* Daily.co iframe will be mounted here */}
        </div>
      </CardContent>
    </Card>
  )
}
