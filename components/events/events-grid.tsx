import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { format } from "date-fns"

interface Event {
  id: string
  name: string
  description: string
  date: string
  location: string
  ticket_price: number
  image_url: string
}

interface EventsGridProps {
  events: Event[]
}

export function EventsGrid({ events }: EventsGridProps) {
  if (events.length === 0) {
    return <div className="text-center text-muted-foreground py-10">No events found matching your criteria.</div>
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map((event) => (
        <Card key={event.id} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="relative w-full h-48">
            <Image
              src={event.image_url || "/placeholder.svg"}
              alt={event.name}
              layout="fill"
              objectFit="cover"
              className="rounded-t-lg"
            />
          </div>
          <CardHeader>
            <CardTitle className="text-xl font-semibold">{event.name}</CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400">
              {format(new Date(event.date), "PPP")} at {event.location}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <p className="text-gray-700 dark:text-gray-300 line-clamp-3">{event.description}</p>
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-primary">
                {event.ticket_price > 0 ? `$${event.ticket_price.toFixed(2)}` : "Free"}
              </span>
              <Link href={`/events/${event.id}`}>
                <Button variant="outline">View Details</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
