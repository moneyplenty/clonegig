"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, MapPin, Clock, Search } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const events = [
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
    status: "Available",
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
    status: "Limited",
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
    status: "Available",
  },
  {
    id: 4,
    title: "Ice Legion Fan Convention",
    description: "Annual fan convention with panels, merchandise, and special performances.",
    date: "2024-03-15",
    time: "10:00 AM",
    location: "Los Angeles Convention Center",
    image: "/placeholder.svg?height=200&width=300",
    price: "$35",
    isPremium: false,
    category: "Convention",
    status: "Available",
  },
  {
    id: 5,
    title: "Private Studio Session",
    description: "Watch Kelvin record new music in an exclusive private studio session.",
    date: "2024-03-25",
    time: "3:00 PM",
    location: "Abbey Road Studios, London",
    image: "/placeholder.svg?height=200&width=300",
    price: "$200",
    isPremium: true,
    category: "Studio",
    status: "Sold Out",
  },
  {
    id: 6,
    title: "Summer Festival Headliner",
    description: "Kelvin headlines the biggest music festival of the summer.",
    date: "2024-06-20",
    time: "9:00 PM",
    location: "Coachella Valley, CA",
    image: "/placeholder.svg?height=200&width=300",
    price: "$125",
    isPremium: false,
    category: "Festival",
    status: "Available",
  },
]

export default function EventsPage() {
  return (
    <div className="container px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Upcoming Events</h1>
        <p className="text-xl text-muted-foreground">
          Don't miss out on exclusive live performances, meet & greets, and special events.
        </p>
      </div>

      {/* Filters */}
      <div className="mb-8 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search events..." className="pl-10" />
        </div>
        <Select>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="concert">Concert</SelectItem>
            <SelectItem value="meet-greet">Meet & Greet</SelectItem>
            <SelectItem value="acoustic">Acoustic</SelectItem>
            <SelectItem value="convention">Convention</SelectItem>
            <SelectItem value="studio">Studio</SelectItem>
            <SelectItem value="festival">Festival</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Date" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Dates</SelectItem>
            <SelectItem value="this-week">This Week</SelectItem>
            <SelectItem value="this-month">This Month</SelectItem>
            <SelectItem value="next-month">Next Month</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Events Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
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
              <div className="absolute bottom-2 right-2">
                <Badge
                  variant={
                    event.status === "Sold Out" ? "destructive" : event.status === "Limited" ? "default" : "secondary"
                  }
                >
                  {event.status}
                </Badge>
              </div>
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
              <Button asChild className="w-full" disabled={event.status === "Sold Out"}>
                <Link href={`/events/${event.id}`}>{event.status === "Sold Out" ? "Sold Out" : "Book Now"}</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
