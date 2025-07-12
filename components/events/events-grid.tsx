"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Calendar, MapPin, Users, Clock, Star, Crown, Zap, Ticket } from "lucide-react"

interface Event {
  id: string
  title: string
  description: string
  date: string
  time: string
  location: string
  type: "concert" | "meetgreet" | "virtual" | "vip"
  tierRequired: "public" | "frost" | "blizzard" | "avalanche"
  price: number
  memberPrice: number
  capacity: number
  registered: number
  image: string
  featured: boolean
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
  },
]

export function EventsGrid() {
  const [events] = useState<Event[]>(mockEvents)

  const getEventTypeIcon = (type: string) => {
    switch (type) {
      case "concert":
        return <Calendar className="h-4 w-4" />
      case "meetgreet":
        return <Users className="h-4 w-4" />
      case "virtual":
        return <MapPin className="h-4 w-4" />
      case "vip":
        return <Star className="h-4 w-4" />
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
        return <Star className="h-3 w-3" />
      case "blizzard":
        return <Zap className="h-3 w-3" />
      case "avalanche":
        return <Crown className="h-3 w-3" />
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
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    })
  }

  // Sort events: featured first, then by date
  const sortedEvents = [...events].sort((a, b) => {
    if (a.featured && !b.featured) return -1
    if (!a.featured && b.featured) return 1
    return new Date(a.date).getTime() - new Date(b.date).getTime()
  })

  return (
    <div className="space-y-8">
      {/* Featured Events */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-electric-400">Featured Events</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {sortedEvents
            .filter((event) => event.featured)
            .map((event) => (
              <Card
                key={event.id}
                className="overflow-hidden border-electric-700/30 bg-background/50 backdrop-blur-lg hover:border-electric-500/50 transition-all group"
              >
                <div className="relative">
                  <Image
                    src={event.image || "/placeholder.svg"}
                    alt={event.title}
                    width={800}
                    height={400}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <Badge className="bg-fire-500/90 dark:bg-electric-500/90 text-white">Featured</Badge>
                    {getTierBadge(event.tierRequired)}
                  </div>
                  <div className="absolute top-4 right-4">
                    <Badge variant="outline" className="bg-black/50 text-white border-white/20">
                      {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                    </Badge>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="text-xl">{event.title}</span>
                    <div className="flex items-center gap-1 text-electric-400">
                      {getTierIcon(event.tierRequired)}
                      {getEventTypeIcon(event.type)}
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">{event.description}</p>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-electric-400" />
                      <span>{formatDate(event.date)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-electric-400" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2 col-span-2">
                      <MapPin className="h-4 w-4 text-electric-400" />
                      <span>{event.location}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Availability</span>
                      <span className={getAvailabilityColor(event.registered, event.capacity)}>
                        {event.capacity - event.registered} spots left
                      </span>
                    </div>
                    <Progress value={(event.registered / event.capacity) * 100} className="h-2" />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="text-lg font-bold text-electric-400">${event.memberPrice}</div>
                      {event.price !== event.memberPrice && (
                        <div className="text-sm text-muted-foreground line-through">${event.price}</div>
                      )}
                    </div>
                    <Button asChild className="bg-gradient-electric hover:animate-electric-pulse">
                      <Link href={`/events/${event.id}`}>
                        <Ticket className="h-4 w-4 mr-2" />
                        Book Now
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>
      </div>

      {/* All Events */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-electric-400">All Events</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedEvents.map((event) => (
            <Card
              key={event.id}
              className="overflow-hidden border-electric-700/30 bg-background/50 backdrop-blur-lg hover:border-electric-500/50 transition-all group"
            >
              <div className="relative">
                <Image
                  src={event.image || "/placeholder.svg"}
                  alt={event.title}
                  width={400}
                  height={250}
                  className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2 left-2 flex gap-1">
                  {event.featured && (
                    <Badge className="bg-fire-500/90 dark:bg-electric-500/90 text-white text-xs">Featured</Badge>
                  )}
                  {getTierBadge(event.tierRequired)}
                </div>
              </div>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg leading-tight">{event.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-3 w-3 text-electric-400" />
                    <span>
                      {formatDate(event.date)} at {event.time}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-3 w-3 text-electric-400" />
                    <span className="truncate">{event.location}</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span>Availability</span>
                    <span className={getAvailabilityColor(event.registered, event.capacity)}>
                      {event.capacity - event.registered} left
                    </span>
                  </div>
                  <Progress value={(event.registered / event.capacity) * 100} className="h-1" />
                </div>

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
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
