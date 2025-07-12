import { CardFooter } from "@/components/ui/card"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CalendarDays, MapPin } from "lucide-react"
import { format } from "date-fns"

interface Event {
  id: string
  title: string
  date: string
  time: string
  location: string
  description: string
  imageUrl: string
  price: number
  ticketsAvailable: number
}

interface RelatedEventsProps {
  events: Event[]
}

export function RelatedEvents({ events }: RelatedEventsProps) {
  return (
    <div className="mt-12">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
        <span className="bg-gradient-to-r from-frost-400 to-electric-400 bg-clip-text text-transparent">
          More Events
        </span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {events.map((event) => (
          <Card
            key={event.id}
            className="group bg-background/50 backdrop-blur-lg border-electric-700/30 hover:border-electric-500/50 transition-all duration-300 hover:scale-105 overflow-hidden"
          >
            <div className="relative aspect-video overflow-hidden">
              <Image
                src={event.imageUrl || "/placeholder.svg"}
                alt={event.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg leading-tight text-electric-100">{event.title}</CardTitle>
              <CardDescription className="line-clamp-2 text-muted-foreground">{event.description}</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex items-center gap-2 text-sm text-electric-200 mb-2">
                <CalendarDays className="h-4 w-4 text-frost-400" />
                {format(new Date(event.date), "MMM dd, yyyy")}
              </div>
              <div className="flex items-center gap-2 text-sm text-electric-200">
                <MapPin className="h-4 w-4 text-frost-400" />
                {event.location}
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full bg-gradient-electric hover:animate-electric-pulse">
                <Link href={`/events/${event.id}`}>View Details</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
