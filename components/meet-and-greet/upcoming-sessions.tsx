import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { format } from "date-fns"
import { CalendarIcon, UsersIcon } from "lucide-react"

interface Session {
  id: string
  date: string
  topic: string
  attendees: number
  maxAttendees: number
  status: "upcoming" | "past"
}

interface UpcomingSessionsProps {
  sessions: Session[]
}

export function UpcomingSessions({ sessions }: UpcomingSessionsProps) {
  const upcoming = sessions
    .filter((session) => session.status === "upcoming")
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
  const past = sessions
    .filter((session) => session.status === "past")
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return (
    <div className="grid gap-8">
      <h2 className="text-3xl font-bold text-electric-100 text-center">Upcoming Sessions</h2>
      {upcoming.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {upcoming.map((session) => (
            <Card key={session.id} className="bg-background/50 backdrop-blur-lg border-electric-700/30">
              <CardHeader>
                <CardTitle className="text-electric-200">{session.topic}</CardTitle>
                <div className="flex items-center text-muted-foreground text-sm mt-2">
                  <CalendarIcon className="w-4 h-4 mr-2 text-frost-400" />
                  <span>{format(new Date(session.date), "PPP 'at' p")}</span>
                </div>
                <div className="flex items-center text-muted-foreground text-sm">
                  <UsersIcon className="w-4 h-4 mr-2 text-frost-400" />
                  <span>
                    {session.attendees}/{session.maxAttendees} Attendees
                  </span>
                </div>
              </CardHeader>
              <CardContent className="flex justify-end">
                <Button className="bg-gradient-electric hover:animate-electric-pulse">Register Now</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-center text-muted-foreground">No upcoming sessions at the moment. Check back soon!</p>
      )}

      <h2 className="text-3xl font-bold text-electric-100 text-center mt-12">Past Sessions</h2>
      {past.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {past.map((session) => (
            <Card key={session.id} className="bg-background/30 backdrop-blur-lg border-electric-700/20 opacity-80">
              <CardHeader>
                <CardTitle className="text-electric-300">{session.topic}</CardTitle>
                <div className="flex items-center text-muted-foreground text-sm mt-2">
                  <CalendarIcon className="w-4 h-4 mr-2 text-frost-500" />
                  <span>{format(new Date(session.date), "PPP 'at' p")}</span>
                </div>
                <div className="flex items-center text-muted-foreground text-sm">
                  <UsersIcon className="w-4 h-4 mr-2 text-frost-500" />
                  <span>{session.attendees} Attendees</span>
                </div>
              </CardHeader>
              <CardContent className="flex justify-end">
                <Button variant="outline" disabled className="border-electric-700/30 text-electric-200 bg-transparent">
                  View Recap
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-center text-muted-foreground">No past sessions available.</p>
      )}
    </div>
  )
}
