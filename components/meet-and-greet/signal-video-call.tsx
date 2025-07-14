"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Video, VideoOff, Mic, MicOff, Phone } from "lucide-react"

interface SignalVideoCallProps {
  sessionId: string
  onEndCall: () => void
}

export function SignalVideoCall({ sessionId, onEndCall }: SignalVideoCallProps) {
  const [isVideoOn, setIsVideoOn] = useState(true)
  const [isAudioOn, setIsAudioOn] = useState(true)

  useEffect(() => {
    // Signal video call integration would go here
    console.log("Starting Signal video call with session:", sessionId)
  }, [sessionId])

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Video Call with Kelvin Creekman</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center">
          <p className="text-white">Signal Video Call Interface</p>
        </div>

        <div className="flex justify-center space-x-4">
          <Button
            variant={isVideoOn ? "default" : "destructive"}
            size="icon"
            onClick={() => setIsVideoOn(!isVideoOn)}
          >
            {isVideoOn ? <Video className="h-4 w-4" /> : <VideoOff className="h-4 w-4" />}
          </Button>

          <Button
            variant={isAudioOn ? "default" : "destructive"}
            size="icon"
            onClick={() => setIsAudioOn(!isAudioOn)}
          >
            {isAudioOn ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
          </Button>

          <Button variant="destructive" size="icon" onClick={onEndCall}>
            <Phone className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}