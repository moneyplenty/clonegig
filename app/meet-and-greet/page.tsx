import { UpcomingSessions } from "@/components/meet-and-greet/upcoming-sessions"
import { MeetAndGreetBooking } from "@/components/meet-and-greet/meet-and-greet-booking"
import { DailyVideoCall } from "@/components/meet-and-greet/daily-video-call"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function MeetAndGreetPage() {
  const mockSessions = [
    {
      id: "1",
      date: "2025-08-15T18:00:00Z",
      topic: "Q&A with Kelvin Creekman",
      attendees: 25,
      maxAttendees: 50,
      status: "upcoming",
    },
    {
      id: "2",
      date: "2025-09-01T19:30:00Z",
      topic: "Songwriting Session",
      attendees: 10,
      maxAttendees: 20,
      status: "upcoming",
    },
    {
      id: "3",
      date: "2025-07-20T14:00:00Z",
      topic: "Album Listening Party",
      attendees: 45,
      maxAttendees: 45,
      status: "past",
    },
  ]

  return (
    <main className="container mx-auto px-4 py-12 md:py-24">
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-12">
        <span className="bg-gradient-to-r from-electric-400 to-frost-400 bg-clip-text text-transparent">
          Meet & Greet
        </span>
      </h1>

      <section className="mb-16">
        <Card className="bg-background/50 backdrop-blur-lg border-electric-700/30">
          <CardHeader>
            <CardTitle className="text-electric-200">Join Live Session</CardTitle>
          </CardHeader>
          <CardContent>
            <DailyVideoCall roomName="kelvin-creekman-meet-greet" userName="Fan" />
          </CardContent>
        </Card>
      </section>

      <section className="mb-16">
        <UpcomingSessions sessions={mockSessions} />
      </section>

      <section>
        <MeetAndGreetBooking />
      </section>
    </main>
  )
}
