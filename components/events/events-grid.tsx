"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Calendar, MapPin, Clock, Crown, Star, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

const events = [
  {
    id: "1",
    title: "Exclusive Album Release Party",
    description: "Be the first to hear Kelvin's new album 'Fire & Ice' in an intimate setting with fellow fans.",
    image: "/placeholder.svg?height=400&width=600",
    date: "February 15, 2025",
    time: "7:00 PM",
    location: "The Diamond Club, New York",
    price: 89.99,
    memberPrice: 69.99,
    category: "concert",
    tierRequired: "frost",
    maxAttendees: 150,
    currentAttendees: 87,
    status: "upcoming",
    featured: true,
  },
  {
    id: "2",
    title: "Virtual Meet & Greet Session",
    description: "Personal video chat session with Kelvin Creekman - limited to 20 fans only.",
    image: "/placeholder.svg?height=400&width=600",
    date: "February 8, 2025",
    time: "3:00 PM",
    location: "Online Video Call",
    price: 49.99,
    memberPrice: 29.99,
    category: "meet-greet",
    tierRequired: "frost",
    maxAttendees: 20,
    currentAttendees: 12,
    status: "upcoming",
    featured: false,
  },
  {
    id: "3",
    title: "Behind the Scenes Studio Tour",
    description: "Exclusive virtual tour of Kelvin's recording studio with live Q&A session.",
    image: "/placeholder.svg?height=400&width=600",
    date: "February 22, 2025",
    time: "4:00 PM",
    location: "Virtual Studio Tour",
    price: 39.99,
    memberPrice: 24.99,
    category: "exclusive",
    tierRequired: "blizzard",
    maxAttendees: 50,
    currentAttendees: 23,
    status: "upcoming",
    featured: false,
  },
  {
    id: "4",
    title: "Acoustic Songwriting Workshop",
    description: "Learn songwriting techniques directly from Kelvin in this interactive workshop.",
    image: "/placeholder.svg?height=400&width=600",
    date: "March 1, 2025",
    time: "2:00 PM",
    location: "Music Academy, Los Angeles",
    price: 129.99,
    memberPrice: 99.99,
    category: "workshop",
    tierRequired: "avalanche",
    maxAttendees: 30,
    currentAttendees: 8,
    status: "upcoming",
    featured: true,
  },
  {
    id: "5",
    title: "Fan Art Showcase & Gallery Opening",
    description: "Celebrate fan creativity with an exhibition of fan art inspired by Kelvin's music.",
    image: "/placeholder.svg?height=400&width=600",
    date: "March 8, 2025",
    time: "6:00 PM",
    location: "Art Gallery Downtown, Chicago",
    price: 25.99,
    memberPrice: 15.99,
    category: "community",
    tierRequired: "frost",
    maxAttendees: 100,
    currentAttendees: 45,
    status: "upcoming",
    featured: false,
  },
  {
    id: "6",
    title: "VIP Dinner & Private Performance",
    description: "Intimate dinner experience with a private acoustic performance for VIP members only.",
    image: "/placeholder.svg?height=400&width=600",
    date: "March 15, 2025",
    time: "7:30 PM",
    location: "The Rooftop, Nashville",
    price: 299.99,
    memberPrice: 249.99,
    category: "exclusive",
    tierRequired: "avalanche",
    maxAttendees: 25,
    currentAttendees: 18,
    status: "upcoming",
    featured: true,
  },
]

export function EventsGrid() {
  const [filter, setFilter] = useState("all")

  const getTierBadge = (tier: string) => {
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
          <Badge className="bg-gold-500/20 text-gold-400 border-gold-500/50">
            <Crown className="h-3 w-3 mr-1" />
            Avalanche
          </Badge>
        )
      default:
        return null
    }
  }

  const getAttendancePercentage = (current: number, max: number) => {
    return (current / max) * 100
  }

  const getAvailabilityColor = (percentage: number) => {
    if (percentage >= 90) return "text-red-400"
    if (percentage >= 70) return "text-yellow-400"
    return "text-green-400"
  }

  return (
    <div className="space-y-6">
      {/* Featured Events */}
      <div>
        <h2 className="text-2xl font-bold mb-4 text-electric-400">Featured Events</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {events
            .filter((event) => event.featured)
            .map((event) => {
              const attendancePercentage = getAttendancePercentage(event.currentAttendees, event.maxAttendees)
              return (
                <Card
                  key={event.id}
                  className="overflow-hidden group border-electric-700/30 bg-background/50 backdrop-blur-lg hover:border-electric-500/50 transition-all"
                >
                  <div className="relative aspect-video">
                    <Image
                      src={event.image || "/placeholder.svg"}
                      alt={event.title}
                      fill
                      className="object-cover transition-all group-hover:scale-105"
                    />
                    <div className="absolute top-2 left-2">
                      <Badge className="bg-electric-500/90 text-white">Featured</Badge>
                    </div>
                    <div className="absolute top-2 right-2">{getTierBadge(event.tierRequired)}</div>
                  </div>

                  <CardHeader className="p-4">
                    <CardTitle className="text-lg line-clamp-1 text-electric-400">{event.title}</CardTitle>
                    <CardDescription className="line-clamp-2">{event.description}</CardDescription>
                  </CardHeader>

                  <CardContent className="p-4 pt-0 space-y-3">
                    <div className="grid grid-cols-1 gap-2 text-sm">
                      <div className="flex items-center text-muted-foreground">
                        <Calendar className="mr-2 h-4 w-4 text-electric-400" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center text-muted-foreground">
                        <Clock className="mr-2 h-4 w-4 text-frost-400" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center text-muted-foreground">
                        <MapPin className="mr-2 h-4 w-4 text-electric-400" />
                        <span className="line-clamp-1">{event.location}</span>
                      </div>
                    </div>

                    {/* Attendance Progress */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Availability</span>
                        <span className={getAvailabilityColor(attendancePercentage)}>
                          {event.maxAttendees - event.currentAttendees} spots left
                        </span>
                      </div>
                      <Progress value={attendancePercentage} className="h-2" />
                    </div>

                    {/* Pricing */}
                    <div className="flex items-center justify-between">
                      <div className="text-sm">
                        <span className="text-muted-foreground line-through">${event.price}</span>
                        <span className="ml-2 font-semibold text-electric-400">${event.memberPrice}</span>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        Member Price
                      </Badge>
                    </div>
                  </CardContent>

                  <CardFooter className="p-4 pt-0">
                    <Button asChild size="sm" className="w-full bg-gradient-electric hover:animate-electric-pulse">
                      <Link href={`/events/${event.id}`}>View Details</Link>
                    </Button>
                  </CardFooter>
                </Card>
              )
            })}
        </div>
      </div>

      {/* All Events */}
      <div>
        <h2 className="text-2xl font-bold mb-4 text-electric-400">All Events</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => {
            const attendancePercentage = getAttendancePercentage(event.currentAttendees, event.maxAttendees)
            return (
              <Card
                key={event.id}
                className="overflow-hidden group border-electric-700/30 bg-background/50 backdrop-blur-lg hover:border-electric-500/50 transition-all"
              >
                <div className="relative aspect-video">
                  <Image
                    src={event.image || "/placeholder.svg"}
                    alt={event.title}
                    fill
                    className="object-cover transition-all group-hover:scale-105"
                  />
                  <div className="absolute top-2 right-2">{getTierBadge(event.tierRequired)}</div>
                  {event.featured && (
                    <div className="absolute top-2 left-2">
                      <Badge className="bg-electric-500/90 text-white">Featured</Badge>
                    </div>
                  )}
                </div>

                <CardHeader className="p-4">
                  <CardTitle className="text-lg line-clamp-1">{event.title}</CardTitle>
                  <CardDescription className="line-clamp-2">{event.description}</CardDescription>
                </CardHeader>

                <CardContent className="p-4 pt-0 space-y-3">
                  <div className="grid grid-cols-1 gap-2 text-sm">
                    <div className="flex items-center text-muted-foreground">
                      <Calendar className="mr-2 h-4 w-4 text-electric-400" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <Clock className="mr-2 h-4 w-4 text-frost-400" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <MapPin className="mr-2 h-4 w-4 text-electric-400" />
                      <span className="line-clamp-1">{event.location}</span>
                    </div>
                  </div>

                  {/* Attendance Progress */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Availability</span>
                      <span className={getAvailabilityColor(attendancePercentage)}>
                        {event.maxAttendees - event.currentAttendees} spots left
                      </span>
                    </div>
                    <Progress value={attendancePercentage} className="h-2" />
                  </div>

                  {/* Pricing */}
                  <div className="flex items-center justify-between">
                    <div className="text-sm">
                      <span className="text-muted-foreground line-through">${event.price}</span>
                      <span className="ml-2 font-semibold text-electric-400">${event.memberPrice}</span>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      Member Price
                    </Badge>
                  </div>
                </CardContent>

                <CardFooter className="p-4 pt-0">
                  <Button asChild size="sm" className="w-full rounded-full">
                    <Link href={`/events/${event.id}`}>View Details</Link>
                  </Button>
                </CardFooter>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}
