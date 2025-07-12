"use client"

import Image from "next/image"
import { Calendar, MapPin, Clock, DollarSign, Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"

interface Event {
  id: string
  title: string
  description: string
  longDescription: string
  image: string
  date: string
  time: string
  endTime: string
  location: string
  venue: {
    name: string
    address: string
    capacity: number
  }
  price: number
  memberPrice: number
  category: string
  tierRequired: string
  maxAttendees: number
  currentAttendees: number
  status: string
  features: string[]
}

interface EventDetailsProps {
  event: Event
}

export function EventDetails({ event }: EventDetailsProps) {
  const attendancePercentage = (event.currentAttendees / event.maxAttendees) * 100
  const spotsLeft = event.maxAttendees - event.currentAttendees

  return (
    <Card className="border-electric-700/30 bg-background/50 backdrop-blur-lg overflow-hidden">
      <div className="relative aspect-video md:aspect-[21/9]">
        <Image src={event.image || "/placeholder.svg"} alt={event.title} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute bottom-6 left-6 right-6">
          <div className="flex items-center gap-2 mb-2">
            <Badge className="bg-electric-500/90 text-white">
              {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
            </Badge>
            <Badge className="bg-gold-500/90 text-white">
              {event.tierRequired.charAt(0).toUpperCase() + event.tierRequired.slice(1)} Tier
            </Badge>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{event.title}</h1>
          <p className="text-lg text-gray-200 max-w-2xl">{event.description}</p>
        </div>
      </div>

      <CardContent className="p-8">
        {/* Event Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-electric-500/20">
              <Calendar className="h-5 w-5 text-electric-400" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Date</p>
              <p className="font-semibold">{event.date}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-frost-500/20">
              <Clock className="h-5 w-5 text-frost-400" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Time</p>
              <p className="font-semibold">
                {event.time} - {event.endTime}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-electric-500/20">
              <MapPin className="h-5 w-5 text-electric-400" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Location</p>
              <p className="font-semibold">{event.venue.name}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gold-500/20">
              <DollarSign className="h-5 w-5 text-gold-400" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Member Price</p>
              <p className="font-semibold">${event.memberPrice}</p>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Availability */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-electric-400">Event Availability</h3>
            <Badge variant={spotsLeft > 10 ? "default" : spotsLeft > 0 ? "secondary" : "destructive"}>
              {spotsLeft > 0 ? `${spotsLeft} spots left` : "Sold Out"}
            </Badge>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">
                {event.currentAttendees} of {event.maxAttendees} attendees
              </span>
              <span className="font-medium">{Math.round(attendancePercentage)}% full</span>
            </div>
            <Progress value={attendancePercentage} className="h-3" />
          </div>
        </div>

        <Separator className="my-8" />

        {/* Description */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4 text-electric-400">About This Event</h3>
          <div className="prose prose-gray dark:prose-invert max-w-none">
            {event.longDescription.split("\n").map((paragraph, index) => (
              <p key={index} className="mb-4 text-muted-foreground leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        <Separator className="my-8" />

        {/* Features */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4 text-electric-400">What's Included</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {event.features.map((feature, index) => (
              <div key={index} className="flex items-center gap-2">
                <Star className="h-4 w-4 text-gold-400" />
                <span className="text-muted-foreground">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        <Separator className="my-8" />

        {/* Venue Info */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-electric-400">Venue Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-2">{event.venue.name}</h4>
              <p className="text-muted-foreground mb-2">{event.venue.address}</p>
              <p className="text-sm text-muted-foreground">Capacity: {event.venue.capacity} people</p>
            </div>
            <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
              <MapPin className="h-8 w-8 text-muted-foreground" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
