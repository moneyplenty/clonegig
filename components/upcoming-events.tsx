"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Calendar, MapPin } from "lucide-react"
import { format } from "date-fns"

interface Event {
  id: string
  title: string
  description?: string
  date: string
  time?: string
  location: string
  type?: "concert" | "meetgreet" | "virtual" | "vip"
  tierRequired?: "public" | "frost" | "blizzard" | "avalanche"
  price?: number
  memberPrice?: number
  capacity?: number
  registered?: number
  image?: string
  featured?: boolean
  imageUrl: string
  ticketPrice?: number
  isMeetGreet?: boolean
}

const mockEvents: Event[] = [
  {
    id: "1",
    title: "Electric Storm Tour - NYC",
    description: "Experience Kelvin's most electrifying performance yet in the heart of New York City",
    date: "2024-02-15",
    time: "8:00 PM",
    location: "Madison Square Garden, New York",
    type: "concert",
    tierRequired: "public",
    price: 75,
    memberPrice: 60,
    capacity: 20000,
    registered: 18500,
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop",
    featured: true,
    imageUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop",
  },
  {
    id: "2",
    title: "Intimate Meet & Greet",
    description: "Personal conversation with Kelvin in a small group setting",
    date: "2024-02-10",
    time: "3:00 PM",
    location: "Private Studio, Los Angeles",
    type: "meetgreet",
    tierRequired: "blizzard",
    price: 200,
    memberPrice: 160,
    capacity: 15,
    registered: 12,
    image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=800&h=600&fit=crop",
    featured: false,
    imageUrl: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=800&h=600&fit=crop",
  },
  {
    id: "3",
    title: "Virtual Acoustic Session",
    description: "Exclusive acoustic performance streamed live to fan club members",
    date: "2024-02-08",
    time: "7:00 PM",
    location: "Virtual Event",
    type: "virtual",
    tierRequired: "frost",
    price: 25,
    memberPrice: 20,
    capacity: 1000,
    registered: 750,
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop",
    featured: false,
    imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop",
  },
  {
    id: "4",
    title: "VIP Backstage Experience",
    description: "Ultimate fan experience with backstage access and exclusive merchandise",
    date: "2024-02-20",
    time: "6:00 PM",
    location: "The Forum, Los Angeles",
    type: "vip",
    tierRequired: "avalanche",
    price: 500,
    memberPrice: 350,
    capacity: 50,
    registered: 45,
    image: "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=800&h=600&fit=crop",
    featured: true,
    imageUrl: "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=800&h=600&fit=crop",
  },
  {
    id: "5",
    title: "Chicago Rock Festival",
    description: "Kelvin headlines the biggest rock festival in the Midwest",
    date: "2024-03-01",
    time: "9:00 PM",
    location: "Grant Park, Chicago",
    type: "concert",
    tierRequired: "public",
    price: 85,
    memberPrice: 68,
    capacity: 50000,
    registered: 42000,
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop",
    featured: false,
    imageUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop",
  },
  {
    id: "6",
    title: "Songwriting Workshop",
    description: "Learn songwriting techniques directly from Kelvin in this interactive session",
    date: "2024-02-25",
    time: "2:00 PM",
    location: "Virtual Event",
    type: "virtual",
    tierRequired: "blizzard",
    price: 100,
    memberPrice: 80,
    capacity: 100,
    registered: 85,
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop",
    featured: false,
    imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop",
  },
]

const additionalEvents = [
  {
    id: "1",
    title: "Kelvin Creekman Live in Concert",
    date: "2024-10-26T20:00:00Z",
    location: "The Electric Venue, New York, NY",
    image: "/placeholder.svg?height=200&width=300",
    ticketPrice: 75.0,
    isMeetGreet: false,
  },
  {
    id: "2",
    title: "Acoustic Set & Storytelling",
    date: "2024-11-10T18:00:00Z",
    location: "The Blue Note, Chicago, IL",
    image: "/placeholder.svg?height=200&width=300",
    ticketPrice: 50.0,
    isMeetGreet: true,
  },
  {
    id: "3",
    title: "Album Release Party",
    date: "2024-12-05T19:00:00Z",
    location: "Online Stream",
    image: "/placeholder.svg?height=200&width=300",
    ticketPrice: 20.0,
    isMeetGreet: false,
  },
]

const upcomingEvents = [
  {
    id: "4",
    title: "Electric Dreams Tour: New York",
    date: "2025-08-15T20:00:00Z",
    location: "Madison Square Garden, NYC",
    description: "Join Kelvin Creekman for an unforgettable night of rock and metal.",
    isMeetGreet: false,
  },
  {
    id: "5",
    title: "Exclusive Fan Meet & Greet",
    date: "2025-09-01T18:00:00Z",
    location: "Online (Virtual Session)",
    description: "A rare opportunity to chat live with Kelvin Creekman. Limited spots!",
    isMeetGreet: true,
  },
  {
    id: "6",
    title: "Album Launch Party: London",
    date: "2025-10-20T19:30:00Z",
    location: "O2 Arena, London",
    description: "Celebrate the launch of Kelvin's new album with a spectacular show.",
    isMeetGreet: false,
  },
]

export function UpcomingEvents() {
  const [events] = useState<Event[]>([...mockEvents, ...additionalEvents, ...upcomingEvents])

  const getEventTypeIcon = (type: string) => {
    switch (type) {
      case "concert":
        return <Calendar className="h-4 w-4" />
      case "meetgreet":
        return <MapPin className="h-4 w-4" />
      case "virtual":
        return <MapPin className="h-4 w-4" />
      case "vip":
        return <MapPin className="h-4 w-4" />
      default:
        return <Calendar className="h-4 w-4" />
    }
  }

  const getTierBadge = (tier: string) => {
    switch (tier) {
      case "public":
        return <Badge variant="outline">Public</Badge>
      case "frost":
        return <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/50">Frost+</Badge>
      case "blizzard":
        return <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/50">Blizzard+</Badge>
      case "avalanche":
        return <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/50">Avalanche</Badge>
      default:
        return <Badge variant="outline">Public</Badge>
    }
  }

  const getTierIcon = (tier: string) => {
    switch (tier) {
      case "frost":
        return <MapPin className="h-3 w-3" />
      case "blizzard":
        return <MapPin className="h-3 w-3" />
      case "avalanche":
        return <MapPin className="h-3 w-3" />
      default:
        return null
    }
  }

  const getAvailabilityColor = (registered: number, capacity: number) => {
    const percentage = (registered / capacity) * 100
    if (percentage >= 90) return "text-red-500"
    if (percentage >= 70) return "text-yellow-500"
    return "text-green-500"
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return format(date, "MMM dd, yyyy")
  }

  // Sort events: featured first, then by date
  const sortedEvents = [...events].sort((a, b) => {
    if (a.featured && !b.featured) return -1
    if (!a.featured && b.featured) return 1
    return new Date(a.date).getTime() - new Date(b.date).getTime()
  })

  const nextEvent = sortedEvents.find((event) => new Date(event.date) > new Date())

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Upcoming Events</h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Mark your calendars! Don&apos;t miss these electrifying events.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-start gap-6 py-12 lg:grid-cols-3 lg:gap-12">
          {sortedEvents.map((event) => (
            <Card key={event.id} className="flex flex-col">
              <CardHeader>
                <CardTitle className="text-xl">{event.title}</CardTitle>
                <CardDescription>{event.isMeetGreet ? "Meet & Greet" : "Concert"}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 space-y-2">
                <div className="relative w-full h-48">
                  <Image
                    src={event.image || event.imageUrl}
                    alt={event.title}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-t-lg"
                  />
                </div>
                <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                  <Calendar className="h-4 w-4" />
                  <span>{format(new Date(event.date), "PPPp")}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                  <MapPin className="h-4 w-4" />
                  <span>{event.location}</span>
                </div>
                {event.description && (
                  <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-3">{event.description}</p>
                )}
                {event.capacity && event.registered && (
                  <div className="space-y-1 mb-4">
                    <div className="flex items-center justify-between text-xs">
                      <span>Availability</span>
                      <span className={getAvailabilityColor(event.registered, event.capacity)}>
                        {event.capacity - event.registered} left
                      </span>
                    </div>
                    <Progress value={(event.registered / event.capacity) * 100} className="h-1" />
                  </div>
                )}
                {event.memberPrice && event.price && (
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="font-bold text-electric-400">${event.memberPrice}</div>
                      {event.price !== event.memberPrice && (
                        <div className="text-xs text-muted-foreground line-through">${event.price}</div>
                      )}
                    </div>
                    <Button asChild size="sm" className="bg-gradient-electric">
                      <Link href={`/events/${event.id}`}>Book</Link>
                    </Button>
                  </div>
                )}
                {event.ticketPrice && (
                  <p className="text-xl font-bold mt-2 text-kelvin-foreground">${event.ticketPrice.toFixed(2)}</p>
                )}
              </CardContent>
              <CardFooter>
                <Link href={`/events/${event.id}`} className="w-full">
                  <Button className="w-full bg-kelvin-primary text-kelvin-primary-foreground hover:bg-kelvin-primary/90">
                    View Details
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
        <div className="flex justify-center mt-8">
          <Link href="/events">
            <Button size="lg" className="bg-kelvin-primary text-kelvin-primary-foreground hover:bg-kelvin-primary/90">
              View All Events
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
