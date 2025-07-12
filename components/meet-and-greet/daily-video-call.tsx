"use client"

import { useEffect, useRef, useState } from "react"
import DailyIframe from "@daily-co/daily-js"
import { DailyProvider, useDaily, useRoom } from "@daily-co/daily-react-hooks"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"

interface DailyVideoCallProps {
  roomName?: string
  userName?: string
}

export function DailyVideoCall({ roomName: initialRoomName, userName: initialUserName }: DailyVideoCallProps) {
  const callFrameRef = useRef<HTMLDivElement>(null)
  const daily = useDaily()
  const room = useRoom()
  const [roomUrl, setRoomUrl] = useState<string | null>(null)
  const [inputRoomName, setInputRoomName] = useState(initialRoomName || "")
  const [inputUserName, setInputUserName] = useState(initialUserName || "")
  const [isJoining, setIsJoining] = useState(false)

  useEffect(() => {
    if (initialRoomName) {
      setInputRoomName(initialRoomName)
    }
    if (initialUserName) {
      setInputUserName(initialUserName)
    }
  }, [initialRoomName, initialUserName])

  const createAndJoinRoom = async () => {
    setIsJoining(true)
    try {
      const response = await fetch("/api/create-daily-room", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ roomName: inputRoomName || `kelvin-meet-greet-${Date.now()}` }),
      })

      const { roomUrl: newRoomUrl, error } = await response.json()

      if (error) {
        toast.error(`Failed to create room: ${error.message}`)
        setIsJoining(false)
        return
      }

      setRoomUrl(newRoomUrl)
      joinCall(newRoomUrl)
    } catch (error: any) {
      console.error("Error creating and joining room:", error)
      toast.error("An unexpected error occurred while creating the room.")
      setIsJoining(false)
    }
  }

  const joinCall = (url: string) => {
    if (callFrameRef.current) {
      const callFrame = DailyIframe.createFrame(callFrameRef.current, {
        url: url,
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

      callFrame.join({ userName: inputUserName || "Fan" })

      callFrame.on("left-meeting", () => {
        callFrame.destroy()
        setRoomUrl(null)
        setIsJoining(false)
        toast.info("You have left the meeting.")
      })
    }
  }

  const handleJoinExisting = () => {
    if (inputRoomName && process.env.NEXT_PUBLIC_DAILY_DOMAIN) {
      const fullRoomUrl = `https://${process.env.NEXT_PUBLIC_DAILY_DOMAIN}.daily.co/${inputRoomName}`
      setRoomUrl(fullRoomUrl)
      joinCall(fullRoomUrl)
    } else {
      toast.error("Please enter a room name and ensure Daily.co domain is configured.")
    }
  }

  const handleLeaveCall = () => {
    if (daily) {
      daily.leave()
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Live Video Call</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {!roomUrl ? (
          <>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Join an existing Meet & Greet session or create a new one.
            </p>
            <div>
              <Label htmlFor="room-name">Room Name</Label>
              <Input
                id="room-name"
                value={inputRoomName}
                onChange={(e) => setInputRoomName(e.target.value)}
                placeholder="e.g., kelvin-meet-greet-session"
                disabled={isJoining}
              />
            </div>
            <div>
              <Label htmlFor="user-name">Your Name</Label>
              <Input
                id="user-name"
                value={inputUserName}
                onChange={(e) => setInputUserName(e.target.value)}
                placeholder="Your Name"
                disabled={isJoining}
              />
            </div>
            <Button onClick={createAndJoinRoom} className="w-full" disabled={isJoining}>
              {isJoining ? "Creating & Joining..." : "Create & Join New Room"}
            </Button>
            <Button
              onClick={handleJoinExisting}
              className="w-full bg-transparent"
              variant="outline"
              disabled={isJoining}
            >
              Join Existing Room
            </Button>
          </>
        ) : (
          <div className="relative w-full aspect-video rounded-md overflow-hidden">
            <DailyProvider callObject={daily}>
              <div ref={callFrameRef} className="w-full h-full" />
            </DailyProvider>
            <Button onClick={handleLeaveCall} className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20">
              Leave Call
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
