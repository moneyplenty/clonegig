"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, Users, Video } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { useAuth } from "@/components/auth/auth-provider"

interface UpcomingSession {
  id: string
  title: string
  date: string
  time: string
  type: "group" | "private"
  participants: number
  maxParticipants: number
  status: "scheduled" | "live" | "completed"
}

export function UpcomingSessions() {
  const [sessions, setSessions] = useState<UpcomingSession[]>([])
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()
  const supabase = createClient()

  useEffect(() => {
    fetchUpcomingSessions()
  }, [])

  const fetchUpcomingSessions = async () => {
    try {
      // Mock data for now - replace with actual Supabase query
      const mockSessions: UpcomingSession[] = [
        {
          id: "1",
          title: "Group Meet & Greet",
          date: "2024-01-15",
          time: "2:00 PM",
          type: "group",
          participants: 8,
          maxParticipants: 10,
          status: "scheduled",
        },
        {
          id: "2",
          title: "Private Video Session",
          date: "2024-01-16",
          time: "4:00 PM",
          type: "private",
          participants: 1,
          maxParticipants: 1,
          status: "scheduled",
        },
        {
          id: "3",
          title: "Group Q&A Session",
          date: "2024-01-18",
          time: "6:00 PM",
          type: "group",
          participants: 12,
          maxParticipants: 15,
          status: "scheduled",
        },
      ]

      setSessions(mockSessions)
    } catch (error) {
      console.error("Error fetching sessions:", error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "live":
        return "bg-green-500"
      case "scheduled":
        return "bg-blue-500"
      case "completed":
        return "bg-gray-500"
      default:
        return "bg-gray-500"
    }
  }

  const getTypeIcon = (type: string) => {
    return type === "group" ? <Users className="h-4 w-4" /> : <Video className="h-4 w-4" />
  }

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-4">
              <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-muted rounded w-1/2"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {sessions.length === 0 ? (
        <Card>
          <CardContent className="p-6 text-center">
            <Calendar className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-semibold mb-2">No Upcoming Sessions</h3>
            <p className="text-muted-foreground">Book a meet & greet session to see it here.</p>
          </CardContent>
        </Card>
      ) : (
        sessions.map((session) => (
          <Card key={session.id}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg flex items-center gap-2">
                  {getTypeIcon(session.type)}
                  {session.title}
                </CardTitle>
                <Badge className={getStatusColor(session.status)}>{session.status}</Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  {new Date(session.date).toLocaleDateString()}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  {session.time}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Users className="h-4 w-4" />
                  {session.participants}/{session.maxParticipants} participants
                </div>

                {session.status === "live" && (
                  <Button size="sm" className="bg-green-600 hover:bg-green-700">
                    <Video className="h-4 w-4 mr-2" />
                    Join Now
                  </Button>
                )}

                {session.status === "scheduled" && (
                  <Button size="sm" variant="outline">
                    View Details
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  )
}
