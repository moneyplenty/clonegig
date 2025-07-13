"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { format } from "date-fns"

interface Session {
  id: string
  date: string
  time: string
  topic: string
  attendees: number
  maxAttendees: number
}

const mockSessions: Session[] = [
  {
    id: "1",
    date: "2024-08-15",
    time: "10:00 AM PST",
    topic: "Q&A: New Album 'Electric Dreams'",
    attendees: 15,
    maxAttendees: 20,
  },
  {
    id: "2",
    date: "2024-08-22",
    time: "02:00 PM PST",
    topic: "Guitar Workshop: Riff Mastery",
    attendees: 8,
    maxAttendees: 10,
  },
  {
    id: "3",
    date: "2024-09-01",
    time: "06:00 PM PST",
    topic: "Fan Art Review & Chat",
    attendees: 18,
    maxAttendees: 20,
  },
  {
    id: "4",
    date: "2024-09-10",
    time: "11:00 AM PST",
    topic: "Songwriting Process Deep Dive",
    attendees: 12,
    maxAttendees: 15,
  },
]

export function UpcomingSessions() {
  return (
    <div className="space-y-6">
      {mockSessions.length === 0 ? (
        <p className="text-muted-foreground">No upcoming sessions at the moment. Check back soon!</p>
      ) : (
        mockSessions.map((session) => (
          <Card key={session.id} className="bg-card/50 backdrop-blur-sm border-kelvin-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">{session.topic}</CardTitle>
              <CardDescription className="text-kelvin-foreground/70">
                {format(new Date(session.date), "PPP")} at {session.time}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-kelvin-foreground/80">
                Spots Left: {session.maxAttendees - session.attendees} / {session.maxAttendees}
              </p>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  )
}
