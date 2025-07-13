"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Loader2, Video, CalendarCheck, XCircle } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import Link from "next/link"
import { format } from "date-fns"

interface MeetAndGreetSession {
  id: string
  session_time: string
  session_type: string
  status: "pending" | "confirmed" | "cancelled" | "completed"
  room_url: string | null
  price: number
}

interface UpcomingSessionsProps {
  userId: string
}

export function UpcomingSessions({ userId }: UpcomingSessionsProps) {
  const supabase = createClient()
  const [sessions, setSessions] = useState<MeetAndGreetSession[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchSessions()
  }, [userId])

  const fetchSessions = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from("meet_and_greet_bookings")
      .select("*")
      .eq("user_id", userId)
      .order("session_time", { ascending: true })

    if (error) {
      console.error("Error fetching sessions:", error)
      toast({
        title: "Error",
        description: "Failed to load upcoming sessions.",
        variant: "destructive",
      })
    } else {
      setSessions(data || [])
    }
    setLoading(false)
  }

  const handleCancelSession = async (sessionId: string) => {
    if (!confirm("Are you sure you want to cancel this session?")) return

    setLoading(true)
    const { error } = await supabase
      .from("meet_and_greet_bookings")
      .update({ status: "cancelled", updated_at: new Date().toISOString() })
      .eq("id", sessionId)

    if (error) {
      console.error("Error cancelling session:", error)
      toast({
        title: "Error",
        description: `Failed to cancel session: ${error.message}`,
        variant: "destructive",
      })
    } else {
      toast({
        title: "Success",
        description: "Session cancelled successfully.",
      })
      fetchSessions()
    }
    setLoading(false)
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Your Upcoming Sessions</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center items-center h-32">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : sessions.length === 0 ? (
          <p className="text-center text-muted-foreground">No upcoming sessions booked.</p>
        ) : (
          <div className="space-y-4">
            {sessions.map((session) => (
              <div
                key={session.id}
                className="flex items-center justify-between border-b pb-3 last:border-b-0 last:pb-0"
              >
                <div>
                  <p className="font-semibold">{session.session_type} Session</p>
                  <p className="text-sm text-muted-foreground">{format(new Date(session.session_time), "PPP p")}</p>
                  <p className="text-sm text-muted-foreground">
                    Status:{" "}
                    <span
                      className={`font-medium ${session.status === "confirmed" ? "text-green-600" : session.status === "cancelled" ? "text-red-600" : "text-orange-500"}`}
                    >
                      {session.status.charAt(0).toUpperCase() + session.status.slice(1)}
                    </span>
                  </p>
                </div>
                <div className="flex gap-2">
                  {session.status === "confirmed" && session.room_url && (
                    <Link href={`/meet-and-greet?room=${session.room_url}`} passHref>
                      <Button size="sm" className="flex items-center gap-1">
                        <Video className="h-4 w-4" /> Join Call
                      </Button>
                    </Link>
                  )}
                  {session.status === "pending" && (
                    <Button size="sm" variant="outline" onClick={() => handleCancelSession(session.id)}>
                      <XCircle className="h-4 w-4 mr-1" /> Cancel
                    </Button>
                  )}
                  {session.status === "confirmed" && !session.room_url && (
                    <Button size="sm" variant="outline" disabled>
                      <CalendarCheck className="h-4 w-4 mr-1" /> Confirmed
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
