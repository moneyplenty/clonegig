"use client"

import { DailyProvider, useDaily, useDailyEvent, useParticipant } from "@daily-co/daily-react-hooks"
import type { DailyCall } from "@daily-co/daily-js"
import { useEffect, useRef, useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Mic, MicOff, Video, VideoOff, PhoneOff, Loader2 } from "lucide-react"

interface SignalVideoCallProps {
  roomUrl: string
  userName?: string
  onLeave?: () => void
}

export function SignalVideoCall({ roomUrl, userName, onLeave }: SignalVideoCallProps) {
  const callRef = useRef<DailyCall | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!roomUrl) {
      setError("No Daily.co room URL provided.")
      setIsLoading(false)
      return
    }

    const createCallObject = async () => {
      try {
        const Daily = await import("@daily-co/daily-js")
        const call = Daily.createCallObject()
        callRef.current = call
        await call.join({ url: roomUrl, userName })
        setIsLoading(false)
      } catch (e: any) {
        console.error("Failed to create or join Daily.co call:", e)
        setError(`Failed to start video call: ${e.message || "Unknown error"}`)
        setIsLoading(false)
      }
    }

    createCallObject()

    return () => {
      if (callRef.current) {
        callRef.current.leave()
        callRef.current.destroy()
        callRef.current = null
      }
    }
  }, [roomUrl, userName])

  if (isLoading) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardContent className="flex flex-col items-center justify-center p-6 min-h-[400px]">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
          <p className="mt-4 text-lg text-muted-foreground">Loading video call...</p>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardContent className="flex flex-col items-center justify-center p-6 min-h-[400px] text-red-500">
          <p className="text-lg font-semibold">Error:</p>
          <p className="text-center">{error}</p>
          <Button onClick={onLeave} className="mt-4">
            Go Back
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <DailyProvider callObject={callRef.current}>
      <VideoCallUI onLeave={onLeave} />
    </DailyProvider>
  )
}

function VideoCallUI({ onLeave }: { onLeave?: () => void }) {
  const daily = useDaily()
  const localParticipant = useParticipant("local")
  const remoteParticipants = Object.values(daily?.participants() || {}).filter(
    (p) => p.session_id !== localParticipant?.session_id,
  )

  const [isMicOn, setIsMicOn] = useState(true)
  const [isCameraOn, setIsCameraOn] = useState(true)

  useEffect(() => {
    if (localParticipant) {
      setIsMicOn(localParticipant.audio)
      setIsCameraOn(localParticipant.video)
    }
  }, [localParticipant])

  const toggleMic = useCallback(() => {
    if (daily) {
      daily.setLocalAudio(!isMicOn)
      setIsMicOn(!isMicOn)
    }
  }, [daily, isMicOn])

  const toggleCamera = useCallback(() => {
    if (daily) {
      daily.setLocalVideo(!isCameraOn)
      setIsCameraOn(!isCameraOn)
    }
  }, [daily, isCameraOn])

  const leaveCall = useCallback(() => {
    if (daily) {
      daily.leave()
      onLeave?.()
    }
  }, [daily, onLeave])

  useDailyEvent("left-meeting", () => {
    onLeave?.()
  })

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-center">Video Call</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center p-6">
        <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden mb-4">
          {localParticipant?.videoTrack && (
            <video
              autoPlay
              muted
              playsInline
              ref={(video) => {
                if (video) video.srcObject = new MediaStream([localParticipant.videoTrack])
              }}
              className="absolute bottom-2 right-2 w-1/4 h-auto rounded-md border-2 border-white z-10"
            />
          )}
          {remoteParticipants.length > 0 ? (
            remoteParticipants.map((p) => (
              <video
                key={p.session_id}
                autoPlay
                playsInline
                ref={(video) => {
                  if (video && p.videoTrack) video.srcObject = new MediaStream([p.videoTrack])
                }}
                className="w-full h-full object-cover"
              />
            ))
          ) : (
            <div className="flex items-center justify-center w-full h-full text-white text-lg">
              Waiting for other participant...
            </div>
          )}
        </div>
        <div className="flex gap-4">
          <Button variant="outline" size="icon" onClick={toggleMic}>
            {isMicOn ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5 text-red-500" />}
            <span className="sr-only">{isMicOn ? "Mute Mic" : "Unmute Mic"}</span>
          </Button>
          <Button variant="outline" size="icon" onClick={toggleCamera}>
            {isCameraOn ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5 text-red-500" />}
            <span className="sr-only">{isCameraOn ? "Turn Off Camera" : "Turn On Camera"}</span>
          </Button>
          <Button variant="destructive" size="icon" onClick={leaveCall}>
            <PhoneOff className="h-5 w-5" />
            <span className="sr-only">Leave Call</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
