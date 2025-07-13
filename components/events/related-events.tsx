import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import { format } from "date-fns"

interface RelatedEvent {
  id: string
  title: string
  date: string
  location: string
  image: string
}

interface RelatedEventsProps {
  events: RelatedEvent[]
}

export function RelatedEvents({ events }: RelatedEventsProps) {
  return (
    <Card className="bg-card/50 backdrop-blur-sm border-kelvin-border">
      <CardHeader>
        <CardTitle>More Events</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {events.length === 0 ? (
          <p className="text-muted-foreground">No related events found.</p>
        ) : (
          events.map((event) => (
            <Link key={event.id} href={`/events/${event.id}`} className="block hover:opacity-80 transition-opacity">
              <div className="flex items-center gap-4">
                <Image
                  src={event.image || "/placeholder.svg"}
                  alt={event.title}
                  width={80}
                  height={80}
                  className="rounded-md object-cover"
                />
                <div>
                  <h3 className="font-medium text-lg">{event.title}</h3>
                  <p className="text-muted-foreground text-sm">
                    {format(new Date(event.date), "MMM dd, yyyy")} - {event.location}
                  </p>
                </div>
              </div>
            </Link>
          ))
        )}
      </CardContent>
    </Card>
  )
}
