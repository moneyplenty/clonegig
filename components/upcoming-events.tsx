"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
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
  {
    id: "7",
    title: "Ice Storm Album Launch Party",
    date: "2025-08-15",
    time: "7:00 PM",
    location: "The Electric Venue, New York",
    imageUrl: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "8",
    title: "Acoustic Set & Q&A",
    date: "2025-09-01",
    time: "3:00 PM",
    location: "The Frosty Lounge, Los Angeles",
    imageUrl: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "9",
    title: "Winter's Embrace Tour - London",
    date: "2025-10-20",
    time: "8:00 PM",
    location: "O2 Academy, London",
    imageUrl: "/placeholder.svg?height=400&width=600",
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
  },
  {
    id: "2",
    title: "Acoustic Set & Storytelling",
    date: "2024-11-10T18:00:00Z",
    location: "The Blue Note, Chicago, IL",
    image: "/placeholder.svg?height=200&width=300",
    ticketPrice: 50.0,
  },
  {
    id: "3",
    title: "Album Release Party",
    date: "2024-12-05T19:00:00Z",
    location: "Online Stream",
    image: "/placeholder.svg?height=200&width=300",
    ticketPrice: 20.0,
  },
]

export function UpcomingEvents() {
  const [events] = useState<Event[]>([...mockEvents, ...additionalEvents])

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
    <section className="py-12 md:py-24 lg:py-32 bg-kelvin-card">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-kelvin-foreground">Upcoming Events</h2>
            <p className="max-w-[900px] text-kelvin-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Don't miss Kelvin Creekman's next electrifying performance or exclusive fan event.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-start gap-6 py-12 lg:grid-cols-3 lg:gap-12">
          {sortedEvents.map((event) => (
            <Card key={event.id} className="flex flex-col bg-card/50 backdrop-blur-sm border-kelvin-border">
              <CardHeader className="p-0">
                <div className="relative w-full h-48">
                  <Image
                    src={event.image || event.imageUrl}
                    alt={event.title}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-t-lg"
                  />
                </div>
              </CardHeader>
              <CardContent className="flex-grow p-4">
                <CardTitle className="text-lg font-semibold mb-2 text-kelvin-foreground">{event.title}</CardTitle>
                {event.description && <p className="text-muted-foreground text-sm mb-4">{event.description}</p>}
                <div className="flex items-center text-kelvin-muted-foreground text-sm mb-1">
                  <Calendar className="mr-2 h-4 w-4" />
                  <span>{format(new Date(event.date), "MMM dd, yyyy 'at' p")}</span>
                </div>
                <div className="flex items-center text-kelvin-muted-foreground text-sm">
                  <MapPin className="mr-2 h-4 w-4" />
                  <span>{event.location}</span>
                </div>
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
              <CardFooter className="p-4 pt-0">
                {event.capacity && event.registered && (
                  <Button
                    className="w-full bg-kelvin-primary text-kelvin-primary-foreground hover:bg-kelvin-primary/90"
                    asChild
                  >
                    <Link href={`/events/${event.id}`}>View Details</Link>
                  </Button>
                )}
                {!event.capacity && (
                  <Button
                    className="w-full bg-kelvin-primary text-kelvin-primary-foreground hover:bg-kelvin-primary/90"
                    asChild
                  >
                    <Link href={`/events/${event.id}`}>View Details</Link>
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
        <div className="text-center mt-8">
          <Button
            asChild
            variant="outline"
            className="bg-kelvin-background text-kelvin-foreground border-kelvin-border hover:bg-kelvin-muted"
          >
            <Link href="/events">View All Events</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
