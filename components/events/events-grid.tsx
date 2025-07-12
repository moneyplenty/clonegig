"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Calendar, Clock, MapPin, Users, Star, Zap, Crown, Music, Video } from "lucide-react"
import Link from "next/link"

interface Event {
  id: string
  title: string
  description: string
  date: string
  time: string
  venue: string
  location: string
  category: "concert" | "meetgreet" | "exclusive"
  tierRequired: "frost" | "blizzard" | "avalanche" | null
  price: number
  memberPrice: number
  availableSpots: number
  totalSpots: number
  image: string
  featured: boolean
}

export function EventsGrid() {
  // Mock events data
  const [events] = useState<Event[]>([
    {
      id: "1",
      title: "Electric Storm Tour - Chicago",
      description: "Experience Kelvin's electrifying performance with full band and special effects.",
      date: "2024-02-15",
      time: "8:00 PM",
      venue: "Chicago Theatre",
      location: "Chicago, IL",
      category: "concert",
      tierRequired: null,
      price: 85,
      memberPrice: 68,
      availableSpots: 45,
      totalSpots: 200,
      image: "/placeholder.svg?height=300&width=400",
      featured: true,
    },
    {
      id: "2",
      title: "Intimate Acoustic Session",
      description: "A rare acoustic performance in an intimate setting with Q&A session.",
      date: "2024-02-22",
      time: "7:30 PM",
      venue: "Blue Note",
      location: "New York, NY",
      category: "exclusive",
      tierRequired: "blizzard",
      price: 150,
      memberPrice: 120,
      availableSpots: 8,
      totalSpots: 50,
      image: "/placeholder.svg?height=300&width=400",
      featured: false,
    },
    {
      id: "3",
      title: "Virtual Meet & Greet",
      description: "Personal video call session with Kelvin - ask questions and get autographs!",
      date: "2024-02-28",
      time: "6:00 PM",
      venue: "Online",
      location: "Virtual Event",
      category: "meetgreet",
      tierRequired: "frost",
      price: 45,
      memberPrice: 35,
      availableSpots: 12,
      totalSpots: 20,
      image: "/placeholder.svg?height=300&width=400",
      featured: false,
    },
    {
      id: "4",
      title: "Avalanche VIP Experience",
      description: "Exclusive backstage access, private performance, and dinner with Kelvin.",
      date: "2024-03-05",
      time: "5:00 PM",
      venue: "Private Venue",
      location: "Los Angeles, CA",
      category: "exclusive",
      tierRequired: "avalanche",
      price: 500,
      memberPrice: 350,
      availableSpots: 2,
      totalSpots: 10,
      image: "/placeholder.svg?height=300&width=400",
      featured: true,
    },
    {
      id: "5",
      title: "Ice & Fire Festival",
      description: "Kelvin headlines this epic outdoor festival with multiple artists.",
      date: "2024-03-12",
      time: "4:00 PM",
      venue: "Grant Park",
      location: "Chicago, IL",
      category: "concert",
      tierRequired: null,
      price: 95,
      memberPrice: 76,
      availableSpots: 156,
      totalSpots: 500,
      image: "/placeholder.svg?height=300&width=400",
      featured: false,
    },
    {
      id: "6",
      title: "Songwriting Workshop",
      description: "Learn Kelvin's creative process and write a song together in this interactive session.",
      date: "2024-03-18",
      time: "2:00 PM",
      venue: "Music Academy",
      location: "Nashville, TN",
      category: "exclusive",
      tierRequired: "blizzard",
      price: 200,
      memberPrice: 160,
      availableSpots: 5,
      totalSpots: 15,
      image: "/placeholder.svg?height=300&width=400",
      featured: false,
    },
  ])

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "concert":
        return <Music className="h-4 w-4" />
      case "meetgreet":
        return <Video className="h-4 w-4" />
      case "exclusive":
        return <Star className="h-4 w-4" />
      default:
        return <Calendar className="h-4 w-4" />
    }
  }

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case "concert":
        return "Concert"
      case "meetgreet":
        return "Meet & Greet"
      case "exclusive":
        return "VIP Event"
      default:
        return "Event"
    }
  }

  const getTierBadge = (tier: string | null) => {
    if (!tier) return null

    switch (tier) {
      case "frost":
        return (
          <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/50">
            <Star className="h-3 w-3 mr-1" />
            Frost Fan
          </Badge>
        )
      case "blizzard":
        return (
          <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/50">
            <Zap className="h-3 w-3 mr-1" />
            Blizzard VIP
          </Badge>
        )
      case "avalanche":
        return (
          <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/50">
            <Crown className="h-3 w-3 mr-1" />
            Avalanche Elite
          </Badge>
        )
      default:
        return null
    }
  }

  const getAvailabilityColor = (available: number, total: number) => {
    const percentage = (available / total) * 100
    if (percentage > 50) return "text-green-400"
    if (percentage > 20) return "text-yellow-400"
    return "text-red-400"
  }

  const getProgressColor = (available: number, total: number) => {
    const percentage = (available / total) * 100
    if (percentage > 50) return "bg-green-500"
    if (percentage > 20) return "bg-yellow-500"
    return "bg-red-500"
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map((event) => {
        const availabilityPercentage = (event.availableSpots / event.totalSpots) * 100
        const soldPercentage = 100 - availabilityPercentage

        return (
          <Card
            key={event.id}
            className={`border-electric-700/30 bg-background/50 backdrop-blur-lg hover:border-electric-500/50 transition-all duration-300 ${
              event.featured ? "ring-2 ring-electric-500/30" : ""
            }`}
          >
            <CardHeader className="p-0">
              <div className="relative">
                <img
                  src={event.image || "/placeholder.svg"}
                  alt={event.title}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="absolute top-3 left-3 flex gap-2">
                  <Badge className="bg-electric-500/90 text-white">
                    {getCategoryIcon(event.category)}
                    <span className="ml-1">{getCategoryLabel(event.category)}</span>
                  </Badge>
                  {event.featured && <Badge className="bg-gradient-electric text-white">Featured</Badge>}
                </div>
                <div className="absolute top-3 right-3">{getTierBadge(event.tierRequired)}</div>
              </div>
            </CardHeader>

            <CardContent className="p-6 space-y-4">
              <div>
                <h3 className="text-xl font-bold text-electric-400 mb-2">{event.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2">{event.description}</p>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(event.date).toLocaleDateString()}</span>
                  <Clock className="h-4 w-4 ml-2" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>
                    {event.venue}, {event.location}
                  </span>
                </div>
              </div>

              {/* Availability */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    <span className={getAvailabilityColor(event.availableSpots, event.totalSpots)}>
                      {event.availableSpots} spots available
                    </span>
                  </div>
                  <span className="text-muted-foreground">
                    {event.totalSpots - event.availableSpots}/{event.totalSpots} sold
                  </span>
                </div>
                <Progress value={soldPercentage} className="h-2" />
              </div>

              {/* Pricing */}
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-lg font-bold text-electric-400">${event.memberPrice}</div>
                  <div className="text-sm text-muted-foreground">
                    <span className="line-through">${event.price}</span>
                    <span className="ml-1">member price</span>
                  </div>
                </div>
                <div className="text-right text-sm text-muted-foreground">Save ${event.price - event.memberPrice}</div>
              </div>
            </CardContent>

            <CardFooter className="p-6 pt-0">
              <Link href={`/events/${event.id}`} className="w-full">
                <Button
                  className="w-full bg-gradient-electric hover:animate-electric-pulse"
                  disabled={event.availableSpots === 0}
                >
                  {event.availableSpots === 0 ? "Sold Out" : "View Details"}
                </Button>
              </Link>
            </CardFooter>
          </Card>
        )
      })}
    </div>
  )
}
