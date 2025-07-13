import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Icons } from "@/components/icons"
import type { Event } from "@/types"

interface EventsGridProps {
  events: Event[]
}

export function EventsGrid({ events }: EventsGridProps) {
  if (events.length === 0) {
    return <div className="text-center text-kelvin-foreground/80">No events found matching your criteria.</div>
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
      {events.map((event) => (
        <Card key={event.id} className="bg-kelvin-card text-kelvin-card-foreground border-kelvin-border shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">{event.title}</CardTitle>
            <CardDescription className="text-kelvin-card-foreground/80">
              <div className="flex items-center gap-1 mt-1">
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
            <p className="text-kelvin-card-foreground/90 line-clamp-3">{event.description}</p>
            <Button asChild className="w-full bg-electric-500 hover:bg-electric-600 text-white">
              <Link href={`/events/${event.id}`}>View Details</Link>
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
