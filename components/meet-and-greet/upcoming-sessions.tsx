"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { Loader2, Video } from "lucide-react"
import { supabase } from "@/lib/supabase/client" // Using client-side singleton
import { DailyVideoCall } from "@/components/meet-and-greet/daily-video-call"
import type { MeetAndGreetBooking } from "@/types"

interface UpcomingSessionsProps {
  userId: string
}

export function UpcomingSessions({ userId }: UpcomingSessionsProps) {
  const [sessions, setSessions] = useState<MeetAndGreetBooking[]>([])
  const [loading, setLoading] = useState(true)
  const [activeRoomUrl, setActiveRoomUrl] = useState<string | null>(null)
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

  const handleJoinSession = (roomUrl: string) => {
    setActiveRoomUrl(roomUrl)
  }

  const handleCallEnded = () => {
    setActiveRoomUrl(null)
    fetchSessions() // Refresh sessions after a call ends
  }

  if (activeRoomUrl) {
    return <DailyVideoCall roomUrl={activeRoomUrl} onCallEnded={handleCallEnded} />
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Upcoming Sessions</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex items-center space-x-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Loading sessions...</span>
          </div>
        ) : sessions.length === 0 ? (
          <p className="text-muted-foreground">You have no upcoming Meet & Greet sessions.</p>
        ) : (
          <div className="space-y-4">
            {sessions.map((session) => (
              <Card key={session.id} className="flex items-center justify-between p-4">
                <div>
                  <p className="font-medium">
                    {new Date(session.session_time).toLocaleDateString()} at{" "}
                    {new Date(session.session_time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </p>
                  <p className="text-sm text-muted-foreground capitalize">
                    Type: {session.session_type.replace(/_/g, " ")}
                  </p>
                  <p className="text-sm text-muted-foreground">Status: {session.status}</p>
                </div>
                {session.room_url && (
                  <Button
                    onClick={() => handleJoinSession(session.room_url!)}
                    disabled={session.status !== "confirmed"}
                  >
                    <Video className="mr-2 h-4 w-4" /> Join Call
                  </Button>
                )}
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
