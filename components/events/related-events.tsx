"use client"

import Image from "next/image"
import Link from "next/link"
import { Calendar, MapPin, Users } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface RelatedEventsProps {
  currentEventId: string
}

const allEvents = [
  {
    id: "1",
    title: "Exclusive Album Release Party",
    image: "/placeholder.svg?height=200&width=300",
    date: "Feb 15, 2025",
    location: "The Diamond Club, NY",
    attendees: 87,
    maxAttendees: 150,
    price: 69.99,
  },
  {
    id: "2",
    title: "Virtual Meet & Greet Session",
    image: "/placeholder.svg?height=200&width=300",
    date: "Feb 8, 2025",
    location: "Online Video Call",
    attendees: 12,
    maxAttendees: 20,
    price: 29.99,
  },
  {
    id: "3",
    title: "Behind the Scenes Studio Tour",
    image: "/placeholder.svg?height=200&width=300",
    date: "Feb 22, 2025",
    location: "Virtual Studio Tour",
    attendees: 23,
    maxAttendees: 50,
    price: 24.99,
  },
  {
    id: "4",
    title: "Acoustic Songwriting Workshop",
    image: "/placeholder.svg?height=200&width=300",
    date: "Mar 1, 2025",
    location: "Music Academy, LA",
    attendees: 8,
    maxAttendees: 30,
    price: 99.99,
  },
]

export function RelatedEvents({ currentEventId }: RelatedEventsProps) {
  const relatedEvents = allEvents.filter((event) => event.id !== currentEventId).slice(0, 3)

  return (
    <Card className="border-electric-700/30 bg-background/50 backdrop-blur-lg">
      <CardHeader>
        <CardTitle className="text-electric-400">More Events</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {relatedEvents.map((event) => (
          <div key={event.id} className="group">
            <Link href={`/events/${event.id}`}>
              <div className="flex gap-3 p-3 rounded-lg border border-electric-700/30 hover:border-electric-500/50 transition-all">
                <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src={event.image || "/placeholder.svg"}
                    alt={event.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-sm line-clamp-2 group-hover:text-electric-400 transition-colors">
                    {event.title}
                  </h4>
                  <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    <span className="line-clamp-1">{event.location}</span>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Users className="h-3 w-3" />
                      <span>
                        {event.attendees}/{event.maxAttendees}
                      </span>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      ${event.price}
                    </Badge>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}

        <Button asChild variant="outline" className="w-full mt-4 bg-transparent">
          <Link href="/events">View All Events</Link>
        </Button>
      </CardContent>
    </Card>
  )
}
