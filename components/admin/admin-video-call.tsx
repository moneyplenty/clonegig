"use client"

import { useEffect, useRef } from "react"
import DailyIframe from "@daily-co/daily-js"
import type { DailyCall } from "@daily-co/daily-js"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"

interface AdminVideoCallProps {
  roomUrl: string
  onLeave: () => void
}

export function AdminVideoCall({ roomUrl, onLeave }: AdminVideoCallProps) {
  const callFrame = useRef<DailyCall | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!roomUrl || !containerRef.current) return

    // Create Daily call frame
    callFrame.current = DailyIframe.createFrame(containerRef.current, {
      url: roomUrl,
      showLeaveButton: false,
      showFullscreenButton: true,
      showLocalVideo: true,
      showParticipantsBar: true,
      iframeStyle: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        border: "0",
        borderRadius: "8px",
      },
    })

    // Join the call as admin
    callFrame.current.join({
      userName: "Kelvin (Admin)",
      userData: { role: "admin" },
    })

    // Handle call events
    callFrame.current.on("left-meeting", () => {
      onLeave()
    })

    callFrame.current.on("error", (error) => {
      console.error("Daily call error:", error)
    })

    return () => {
      if (callFrame.current) {
        callFrame.current.destroy()
        callFrame.current = null
      }
    }
  }, [roomUrl, onLeave])

  const handleLeave = () => {
    if (callFrame.current) {
      callFrame.current.leave()
    }
    onLeave()
  }

  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-white flex items-center gap-2">
              <Icons.video className="h-5 w-5" />
              Admin Video Call
            </CardTitle>
            <CardDescription className="text-slate-300">Connected to meet & greet session</CardDescription>
          </div>
          <Button onClick={handleLeave} variant="destructive" size="sm">
            <Icons.phoneOff className="h-4 w-4 mr-2" />
            Leave Call
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        <div ref={containerRef} className="relative w-full aspect-video bg-slate-900 rounded-lg overflow-hidden">
          {/* Daily iframe will be mounted here */}
        </div>
      </CardContent>
    </Card>
  )
}
