import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Icons } from "@/components/icons"
import { createClient } from "@/lib/supabase/server"
import { cookies } from "next/headers"
import { MeetAndGreetBooking } from "./meet-and-greet-booking"

export async function UpcomingSessions() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const { data: events, error } = await supabase
    .from("Event")
    .select("*")
    .eq("isMeetGreet", true)
    .order("date", { ascending: true })
    .limit(3) // Fetch up to 3 upcoming meet & greet sessions

  if (error) {
    console.error("Error fetching upcoming meet & greet sessions:", error)
    return <div>Error loading sessions.</div>
  }

  if (!events || events.length === 0) {
    return (
      <div className="text-center text-kelvin-foreground/80">
        No upcoming meet & greet sessions scheduled at the moment. Check back soon!
      </div>
    )
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map((event) => (
        <Card key={event.id} className="bg-kelvin-card text-kelvin-card-foreground border-kelvin-border shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">{event.title}</CardTitle>
            <CardDescription className="text-kelvin-card-foreground/80">
              <div className="flex items-center gap-1">
                <Icons.calendar className="w-4 h-4" />
                {new Date(event.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
              <div className="flex items-center gap-1">
                <Icons.clock className="w-4 h-4" />
                {new Date(event.date).toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
              <div className="flex items-center gap-1">
                <Icons.mapPin className="w-4 h-4" />
                {event.location}
              </div>
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <p className="text-kelvin-card-foreground/90">{event.description}</p>
            <MeetAndGreetBooking eventId={event.id} eventTitle={event.title} />
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
