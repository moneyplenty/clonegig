"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { CalendarDays, MapPin } from "lucide-react"
import { format } from "date-fns"

interface Event {
  id: string
  title: string
  description?: string
  date: string
  time: string
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

export function UpcomingEvents() {
  const [events] = useState<Event[]>(mockEvents)

  const getEventTypeIcon = (type: string) => {
    switch (type) {
      case "concert":
        return <CalendarDays className="h-4 w-4" />
      case "meetgreet":
        return <MapPin className="h-4 w-4" />
      case "virtual":
        return <MapPin className="h-4 w-4" />
      case "vip":
        return <MapPin className="h-4 w-4" />
      default:
        return <CalendarDays className="h-4 w-4" />
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
    <section className="py-24 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-electric-400 to-frost-400 bg-clip-text text-transparent">
              Upcoming Events
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Don't miss out on the next electrifying experience with Kelvin Creekman.
          </p>
        </div>

        {nextEvent && (
          <Card className="mb-16 border-electric-700/30 bg-background/50 backdrop-blur-lg hover:border-electric-500/50 transition-all group">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-electric-400 flex items-center gap-3">
                {getEventTypeIcon(nextEvent.type || "")}
                Next Event: {nextEvent.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-8">
              <div className="relative aspect-video rounded-lg overflow-hidden">
                <Image
                  src={nextEvent.image || nextEvent.imageUrl}
                  alt={nextEvent.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  {nextEvent.featured && (
                    <Badge className="bg-fire-500/90 dark:bg-electric-500/90 text-white">Featured</Badge>
                  )}
                  {nextEvent.tierRequired && getTierBadge(nextEvent.tierRequired)}
                </div>
                <div className="absolute top-4 right-4">
                  {nextEvent.type && (
                    <Badge variant="outline" className="bg-black/50 text-white border-white/20">
                      {nextEvent.type.charAt(0).toUpperCase() + nextEvent.type.slice(1)}
                    </Badge>
                  )}
                </div>
              </div>
              <div className="space-y-4">
                {nextEvent.description && <p className="text-lg text-muted-foreground">{nextEvent.description}</p>}
                <div className="grid grid-cols-2 gap-4 text-base">
                  <div className="flex items-center gap-2">
                    <CalendarDays className="h-5 w-5 text-electric-400" />
                    <span>{formatDate(nextEvent.date)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-electric-400" />
                    <span>{nextEvent.location}</span>
                  </div>
                </div>
                {nextEvent.capacity && nextEvent.registered && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-base">
                      <span>Availability</span>
                      <span className={getAvailabilityColor(nextEvent.registered, nextEvent.capacity)}>
                        {nextEvent.capacity - nextEvent.registered} spots left
                      </span>
                    </div>
                    <Progress value={(nextEvent.registered / nextEvent.capacity) * 100} className="h-3" />
                  </div>
                )}
                {nextEvent.memberPrice && nextEvent.price && (
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="text-2xl font-bold text-electric-400">${nextEvent.memberPrice}</div>
                      {nextEvent.price !== nextEvent.memberPrice && (
                        <div className="text-base text-muted-foreground line-through">${nextEvent.price}</div>
                      )}
                    </div>
                    <Button asChild className="bg-gradient-electric hover:animate-electric-pulse text-lg px-8 py-6">
                      <Link href={`/events/${nextEvent.id}`}>
                        <MapPin className="h-5 w-5 mr-2" />
                        Book Now
                      </Link>
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedEvents
            .filter((event) => !event.featured || event.id !== nextEvent?.id) // Exclude the main featured event if it's already displayed
            .map((event) => (
              <Card
                key={event.id}
                className="overflow-hidden border-electric-700/30 bg-background/50 backdrop-blur-lg hover:border-electric-500/50 transition-all group"
              >
                <div className="relative">
                  <Image
                    src={event.image || event.imageUrl}
                    alt={event.title}
                    width={400}
                    height={250}
                    className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 left-2 flex gap-1">
                    {event.featured && (
                      <Badge className="bg-fire-500/90 dark:bg-electric-500/90 text-white text-xs">Featured</Badge>
                    )}
                    {event.tierRequired && getTierBadge(event.tierRequired)}
                  </div>
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg leading-tight">{event.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <CalendarDays className="h-3 w-3 text-electric-400" />
                      <span>
                        {formatDate(event.date)} at {event.time}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-3 w-3 text-electric-400" />
                      <span className="truncate">{event.location}</span>
                    </div>
                  </div>
                  {event.capacity && event.registered && (
                    <div className="space-y-1">
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
                    <div className="flex items-center justify-between">
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
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full bg-gradient-electric hover:animate-electric-pulse">
                    <Link href={`/events/${event.id}`}>View Details</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
        </div>

        <div className="text-center mt-16">
          <Button size="lg" variant="outline" asChild>
            <Link href="/events">View All Events</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
