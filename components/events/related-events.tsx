import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Icons } from "@/components/icons"
import { createClient } from "@/lib/supabase/server"
import { cookies } from "next/headers"
import type { Event } from "@/types"

interface RelatedEventsProps {
  currentEventId: string
}

export async function RelatedEvents({ currentEventId }: RelatedEventsProps) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const { data: events, error } = await supabase
    .from("Event")
    .select("*")
    .neq("id", currentEventId) // Exclude the current event
    .order("date", { ascending: true })
    .limit(3) // Fetch up to 3 related events

  if (error) {
    console.error("Error fetching related events:", error)
    return <div>Error loading related events.</div>
  }

  if (!events || events.length === 0) {
    return (
      <Card className="bg-kelvin-card text-kelvin-card-foreground border-kelvin-border shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Related Events</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-kelvin-card-foreground/80">No other upcoming events at the moment.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-kelvin-card text-kelvin-card-foreground border-kelvin-border shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">More Events</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {events.map((event: Event) => (
          <div key={event.id} className="border-b border-kelvin-border pb-4 last:border-b-0 last:pb-0">
            <h3 className="font-semibold text-kelvin-card-foreground">{event.title}</h3>
            <p className="text-sm text-kelvin-card-foreground/80 flex items-center gap-1">
              <Icons.calendar className="w-3 h-3" />
              {new Date(event.date).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </p>
            <p className="text-sm text-kelvin-card-foreground/80 flex items-center gap-1">
              <Icons.mapPin className="w-3 h-3" />
              {event.location}
            </p>
            <Button asChild variant="link" className="p-0 h-auto text-electric-400 hover:text-electric-500">
              <Link href={`/events/${event.id}`}>View Details</Link>
            </Button>
          </div>
        ))}
        <Button asChild className="w-full bg-frost-500 hover:bg-frost-600 text-white">
          <Link href="/events">View All Events</Link>
        </Button>
      </CardContent>
    </Card>
  )
}
