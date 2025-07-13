"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Clock } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const upcomingEvents = [
  {
    id: 1,
    title: "Electric Dreams Live Concert",
    description: "Experience Kelvin's latest album performed live with full band and special effects.",
    date: "2024-02-15",
    time: "8:00 PM",
    location: "Madison Square Garden, NYC",
    image: "/placeholder.svg?height=200&width=300",
    price: "$75",
    isPremium: false,
    category: "Concert",
  },
  {
    id: 2,
    title: "VIP Meet & Greet Session",
    description: "Exclusive meet and greet with Kelvin, photo opportunities, and signed merchandise.",
    date: "2024-02-20",
    time: "6:00 PM",
    location: "Virtual Event",
    image: "/placeholder.svg?height=200&width=300",
    price: "$150",
    isPremium: true,
    category: "Meet & Greet",
  },
  {
    id: 3,
    title: "Acoustic Unplugged Session",
    description: "Intimate acoustic performance featuring fan favorites and unreleased tracks.",
    date: "2024-03-01",
    time: "7:30 PM",
    location: "Blue Note Jazz Club, NYC",
    image: "/placeholder.svg?height=200&width=300",
    price: "$45",
    isPremium: false,
    category: "Acoustic",
  },
]

export function UpcomingEvents() {
  return (
    <section className="py-12 md:py-24 lg:py-32 bg-muted/50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Upcoming Events</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Don't miss out on exclusive live performances, meet & greets, and special events.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-start gap-6 py-12 lg:grid-cols-3 lg:gap-12">
          {upcomingEvents.map((event) => (
            <Card key={event.id} className="flex flex-col">
              <div className="relative aspect-video overflow-hidden rounded-t-lg">
                <Image src={event.image || "/placeholder.svg"} alt={event.title} fill className="object-cover" />
                <div className="absolute top-2 left-2">
                  <Badge variant={event.isPremium ? "default" : "secondary"}>{event.category}</Badge>
                </div>
                {event.isPremium && (
                  <div className="absolute top-2 right-2">
                    <Badge variant="destructive">Premium</Badge>
                  </div>
                )}
              </div>
              <CardHeader>
                <CardTitle className="line-clamp-2">{event.title}</CardTitle>
                <CardDescription className="line-clamp-3">{event.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(event.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{event.location}</span>
                  </div>
                </div>
                <div className="text-2xl font-bold text-primary">{event.price}</div>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link href={`/events/${event.id}`}>Book Now</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        <div className="flex justify-center">
          <Button variant="outline" size="lg" asChild>
            <Link href="/events">View All Events</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
