import Image from "next/image"
import Link from "next/link"
import { CalendarDays, MapPin, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const events = [
  {
    id: 1,
    title: "Album Release Party",
    description: "Be the first to hear the new album live with a special Q&A session",
    image: "/placeholder.svg?height=400&width=600",
    date: "June 15, 2025",
    time: "8:00 PM",
    location: "The Diamond Club, New York",
    memberOnly: true,
  },
  {
    id: 2,
    title: "Virtual Acoustic Session",
    description: "An intimate online performance with acoustic versions of fan favorites",
    image: "/placeholder.svg?height=400&width=600",
    date: "July 3, 2025",
    time: "7:00 PM",
    location: "Online Livestream",
    memberOnly: false,
  },
  {
    id: 3,
    title: "Summer Tour VIP Experience",
    description: "Exclusive pre-show meetup and premium seating for the summer tour",
    image: "/placeholder.svg?height=400&width=600",
    date: "August 10-30, 2025",
    time: "Various",
    location: "Multiple Cities",
    memberOnly: true,
  },
]

export function UpcomingEvents() {
  return (
    <div className="grid gap-6 pt-8 md:grid-cols-2 lg:grid-cols-3">
      {events.map((event) => (
        <Card key={event.id} className="overflow-hidden group">
          <div className="relative aspect-video">
            <Image
              src={event.image || "/placeholder.svg"}
              alt={event.title}
              fill
              className="object-cover transition-all group-hover:scale-105"
            />
            {event.memberOnly && <Badge className="absolute top-2 right-2 bg-primary">Members Only</Badge>}
          </div>
          <CardHeader className="p-4">
            <CardTitle className="text-lg line-clamp-1">{event.title}</CardTitle>
            <CardDescription className="line-clamp-2">{event.description}</CardDescription>
          </CardHeader>
          <CardContent className="p-4 pt-0 space-y-2">
            <div className="flex items-center text-sm">
              <CalendarDays className="mr-2 h-4 w-4 text-muted-foreground" />
              <span>{event.date}</span>
            </div>
            <div className="flex items-center text-sm">
              <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
              <span>{event.time}</span>
            </div>
            <div className="flex items-center text-sm">
              <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
              <span>{event.location}</span>
            </div>
          </CardContent>
          <CardFooter className="p-4 pt-0">
            <Button asChild size="sm" className="w-full rounded-full">
              <Link href={`/events/${event.id}`}>{event.memberOnly ? "Member RSVP" : "Get Tickets"}</Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
