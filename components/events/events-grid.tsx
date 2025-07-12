import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface Event {
  id: number
  title: string
  date: string
  location: string
  image: string
  isPremium: boolean
}

interface EventsGridProps {
  events: Event[]
}

export function EventsGrid({ events }: EventsGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 flex-1">
      {events.map((event) => (
        <Card key={event.id} className="flex flex-col">
          <CardHeader className="p-0">
            <div className="relative w-full h-48">
              <Image
                src={event.image || "/placeholder.svg"}
                alt={event.title}
                layout="fill"
                objectFit="cover"
                className="rounded-t-lg"
              />
              {event.isPremium && (
                <Badge className="absolute top-2 left-2 bg-primary text-primary-foreground">Premium</Badge>
              )}
            </div>
          </CardHeader>
          <CardContent className="flex-grow p-4">
            <CardTitle className="text-lg font-semibold mb-2">{event.title}</CardTitle>
            <p className="text-muted-foreground text-sm flex items-center gap-1">
              <Calendar className="h-4 w-4" /> {event.date}
            </p>
            <p className="text-muted-foreground text-sm flex items-center gap-1 mt-1">
              <MapPin className="h-4 w-4" /> {event.location}
            </p>
          </CardContent>
          <CardFooter className="p-4 pt-0">
            <Button className="w-full" asChild>
              <Link href={`/events/${event.id}`}>View Details</Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
