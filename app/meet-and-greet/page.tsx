"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { CalendarIcon, Clock, Video } from "lucide-react"
import { MeetAndGreetBooking } from "@/components/meet-and-greet/meet-and-greet-booking"
import { DailyVideoCall } from "@/components/meet-and-greet/daily-video-call"

interface Session {
  id: string
  date: Date
  time: string
  isBooked: boolean
  attendees: number
  maxAttendees: number
}

const mockSessions: Session[] = [
  {
    id: "1",
    date: new Date(2025, 7, 20), // August 20, 2025
    time: "10:00 AM",
    isBooked: false,
    attendees: 5,
    maxAttendees: 10,
  },
  {
    id: "2",
    date: new Date(2025, 7, 20), // August 20, 2025
    time: "02:00 PM",
    isBooked: true,
    attendees: 10,
    maxAttendees: 10,
  },
  {
    id: "3",
    date: new Date(2025, 7, 25), // August 25, 2025
    time: "04:00 PM",
    isBooked: false,
    attendees: 3,
    maxAttendees: 10,
  },
  {
    id: "4",
    date: new Date(2025, 8, 5), // September 5, 2025
    time: "11:00 AM",
    isBooked: false,
    attendees: 7,
    maxAttendees: 10,
  },
]

export default function MeetAndGreetPage() {
  const [date, setDate] = useState<Date | undefined>(new Date(2025, 7, 20))
  const [selectedSession, setSelectedSession] = useState<Session | null>(null)
  const [showVideoCall, setShowVideoCall] = useState(false)

  const availableSessions = mockSessions.filter(
    (session) => session.date.toDateString() === date?.toDateString() && !session.isBooked,
  )

  const handleBookSession = (session: Session) => {
    setSelectedSession(session)
  }

  const handleJoinCall = () => {
    setShowVideoCall(true)
  }

  if (showVideoCall) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-4">
        <DailyVideoCall roomName="kelvin-creekman-meet-greet" userName="Fan" />
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12 md:py-24">
      <section className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="bg-gradient-to-r from-electric-400 to-frost-400 bg-clip-text text-transparent">
            Meet & Greet with Kelvin Creekman
          </span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Get a chance to chat live with Kelvin Creekman in exclusive virtual meet & greet sessions. Limited spots
          available!
        </p>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Calendar and Session Selection */}
        <Card className="lg:col-span-1 bg-background/50 backdrop-blur-lg border-electric-700/30">
          <CardHeader>
            <CardTitle className="text-electric-200">Select a Date</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
              className="rounded-md border border-electric-700 shadow-lg bg-electric-950/30"
            />
          </CardContent>
        </Card>

        {/* Available Sessions */}
        <Card className="lg:col-span-2 bg-background/50 backdrop-blur-lg border-electric-700/30">
          <CardHeader>
            <CardTitle className="text-electric-200">
              Available Sessions on {date ? format(date, "PPP") : "Selected Date"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {availableSessions.length > 0 ? (
              <div className="grid gap-4">
                {availableSessions.map((session) => (
                  <div
                    key={session.id}
                    className="flex items-center justify-between rounded-md border border-electric-800 p-4 bg-electric-900/20"
                  >
                    <div className="flex items-center gap-3">
                      <Clock className="h-5 w-5 text-frost-400" />
                      <div>
                        <p className="font-semibold text-electric-100">{session.time}</p>
                        <p className="text-sm text-muted-foreground">
                          {session.attendees}/{session.maxAttendees} spots taken
                        </p>
                      </div>
                    </div>
                    <Button
                      onClick={() => handleBookSession(session)}
                      disabled={session.isBooked || session.attendees >= session.maxAttendees}
                      className="bg-gradient-electric hover:animate-electric-pulse"
                    >
                      {session.isBooked ? "Booked" : "Book Now"}
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-8">
                No available sessions for the selected date. Please choose another date.
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Booking Confirmation / Join Call */}
      {selectedSession && (
        <div className="mt-12">
          <MeetAndGreetBooking session={selectedSession} onJoinCall={handleJoinCall} />
        </div>
      )}

      <section className="mt-24 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          <span className="bg-gradient-to-r from-frost-400 to-electric-400 bg-clip-text text-transparent">
            How it Works
          </span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto text-center">
          <Card className="bg-background/50 backdrop-blur-lg border-electric-700/30 p-6">
            <CalendarIcon className="h-12 w-12 text-electric-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-electric-100">1. Select a Session</h3>
            <p className="text-muted-foreground">Choose an available date and time slot that works for you.</p>
          </Card>
          <Card className="bg-background/50 backdrop-blur-lg border-electric-700/30 p-6">
            <Video className="h-12 w-12 text-electric-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-electric-100">2. Join the Call</h3>
            <p className="text-muted-foreground">
              Receive a unique link to join the virtual meet & greet at the scheduled time.
            </p>
          </Card>
          <Card className="bg-background/50 backdrop-blur-lg border-electric-700/30 p-6">
            <Clock className="h-12 w-12 text-electric-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-electric-100">3. Chat with Kelvin</h3>
            <p className="text-muted-foreground">Enjoy a personal interaction and ask your burning questions!</p>
          </Card>
        </div>
      </section>
    </div>
  )
}
