import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MeetAndGreetBooking } from "@/components/meet-and-greet/meet-and-greet-booking"
import { UpcomingSessions } from "@/components/meet-and-greet/upcoming-sessions"

export default function MeetAndGreetPage() {
  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">Meet & Greet with Kelvin Creekman</h1>
        <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
          Get a chance to chat live with Kelvin Creekman in exclusive video sessions. Limited spots available!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Book a Session</CardTitle>
            <CardDescription>Select an available slot to book your virtual meet & greet.</CardDescription>
          </CardHeader>
          <CardContent>
            <MeetAndGreetBooking />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Sessions</CardTitle>
            <CardDescription>See the schedule for future meet & greet opportunities.</CardDescription>
          </CardHeader>
          <CardContent>
            <UpcomingSessions />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
