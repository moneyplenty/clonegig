
"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Video, VideoOff, Mic, MicOff, Phone, ExternalLink } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface SignalVideoCallProps {
  sessionId: string
  onEndCall: () => void
}

export function SignalVideoCall({ sessionId, onEndCall }: SignalVideoCallProps) {
  const [isVideoOn, setIsVideoOn] = useState(true)
  const [isAudioOn, setIsAudioOn] = useState(true)
  const [signalLink, setSignalLink] = useState<string>("")
  const { toast } = useToast()

  useEffect(() => {
    // In a real implementation, you would fetch the Signal video call link from your database
    // For now, we'll simulate it
    const simulatedSignalLink = `https://signal.org/call/session-${sessionId}`
    setSignalLink(simulatedSignalLink)
    
    console.log("Starting Signal video call with session:", sessionId)
    
    toast({
      title: "Signal Call Ready",
      description: "Click 'Open Signal' to join the video call",
    })
  }, [sessionId, toast])

  const openSignalCall = () => {
    if (signalLink) {
      window.open(signalLink, '_blank')
      toast({
        title: "Signal Opened",
        description: "The Signal video call has been opened in a new tab",
      })
    }
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Signal Video Call with Kelvin Creekman</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="aspect-video bg-gradient-to-br from-blue-900 to-purple-900 rounded-lg flex flex-col items-center justify-center text-white p-8">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto">
              <Video className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold">Signal Video Call</h3>
            <p className="text-white/80">
              This session uses Signal for secure, encrypted video calling
            </p>
            <Button 
              onClick={openSignalCall}
              className="bg-white text-black hover:bg-gray-100"
              size="lg"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Open Signal
            </Button>
          </div>
        </div>

        <div className="bg-muted/50 p-4 rounded-lg">
          <h4 className="font-semibold mb-2">How to join:</h4>
          <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
            <li>Click "Open Signal" button above</li>
            <li>If Signal is not installed, you'll be prompted to download it</li>
            <li>Join the video call using the provided link</li>
            <li>Make sure your camera and microphone permissions are enabled</li>
          </ol>
        </div>

        <div className="flex justify-center space-x-4">
          <Button
            variant={isVideoOn ? "default" : "destructive"}
            size="icon"
            onClick={() => setIsVideoOn(!isVideoOn)}
            title="These controls are for reference - use Signal's built-in controls"
          >
            {isVideoOn ? <Video className="h-4 w-4" /> : <VideoOff className="h-4 w-4" />}
          </Button>

          <Button
            variant={isAudioOn ? "default" : "destructive"}
            size="icon"
            onClick={() => setIsAudioOn(!isAudioOn)}
            title="These controls are for reference - use Signal's built-in controls"
          >
            {isAudioOn ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
          </Button>

          <Button variant="destructive" size="icon" onClick={onEndCall}>
            <Phone className="h-4 w-4" />
          </Button>
        </div>

        <p className="text-sm text-muted-foreground text-center">
          Note: Video and audio controls shown above are for reference. 
          Use Signal's built-in controls during the actual call.
        </p>
      </CardContent>
    </Card>
  )
}
