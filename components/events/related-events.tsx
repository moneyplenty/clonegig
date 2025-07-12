import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface RelatedEvent {
  id: number
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
    <Card>
      <CardHeader>
        <CardTitle>Related Events</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {events.map((event) => (
            <div key={event.id} className="flex items-center gap-4">
              <Image
                src={event.image || "/placeholder.svg"}
                alt={event.title}
                width={80}
                height={80}
                className="rounded-md object-cover"
              />
              <div>
                <h3 className="font-semibold">{event.title}</h3>
                <p className="text-sm text-muted-foreground">{event.date}</p>
                <p className="text-sm text-muted-foreground">{event.location}</p>
                <Button variant="link" size="sm" asChild className="p-0 h-auto">
                  <Link href={`/events/${event.id}`}>View Details</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
