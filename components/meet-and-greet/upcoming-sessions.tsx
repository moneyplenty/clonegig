
"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { Loader2, Video } from "lucide-react"
import { supabase } from "@/lib/supabase/client"
import { SignalVideoCall } from "@/components/meet-and-greet/signal-video-call"
import type { MeetAndGreetBooking } from "@/types"

interface UpcomingSessionsProps {
  userId: string
}

export function UpcomingSessions({ userId }: UpcomingSessionsProps) {
  const [sessions, setSessions] = useState<MeetAndGreetBooking[]>([])
  const [loading, setLoading] = useState(true)
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null)
  const { toast } = useToast()

  const fetchSessions = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from("meet_and_greet_bookings")
      .select("*")
      .eq("user_id", userId)
      .gte("session_time", new Date().toISOString()) // Only future sessions
      .order("session_time", { ascending: true })

    if (error) {
      toast({
        title: "Error",
        description: `Failed to fetch sessions: ${error.message}`,
        variant: "destructive",
      })
    } else {
      setSessions(data as MeetAndGreetBooking[])
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchSessions()
  }, [userId])

  const handleJoinSession = (sessionId: string) => {
    setActiveSessionId(sessionId)
  }

  const handleCallEnded = () => {
    setActiveSessionId(null)
    fetchSessions() // Refresh sessions after a call ends
  }

  if (activeSessionId) {
    return <SignalVideoCall sessionId={activeSessionId} onEndCall={handleCallEnded} />
  }

  if (loading) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardContent className="flex items-center justify-center p-8">
          <Loader2 className="h-8 w-8 animate-spin" />
        </CardContent>
      </Card>
    )
  }

  if (sessions.length === 0) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Upcoming Sessions</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">No upcoming sessions scheduled.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Upcoming Sessions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {sessions.map((session) => (
          <div
            key={session.id}
            className="flex items-center justify-between p-4 border rounded-lg"
          >
            <div>
              <h3 className="font-semibold">{session.name}</h3>
              <p className="text-sm text-muted-foreground">
                {new Date(session.session_time).toLocaleDateString()} at{" "}
                {new Date(session.session_time).toLocaleTimeString()}
              </p>
              <p className="text-sm text-muted-foreground">
                Duration: {session.duration} minutes
              </p>
            </div>
            <Button
              onClick={() => handleJoinSession(session.id)}
              className="flex items-center gap-2"
            >
              <Video className="h-4 w-4" />
              Join Signal Call
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
