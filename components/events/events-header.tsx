"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin, Users } from "lucide-react"

export function EventsHeader() {
  // Mock next event data
  const nextEvent = {
    id: "1",
    title: "Electric Storm Tour - Chicago",
    date: "2024-02-15",
    time: "8:00 PM",
    venue: "Chicago Theatre",
    location: "Chicago, IL",
    availableSpots: 45,
    totalSpots: 200,
    price: 85,
    memberPrice: 68,
    image: "/placeholder.svg?height=400&width=600",
  }

  const daysUntil = Math.ceil((new Date(nextEvent.date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl lg:text-6xl font-bold bg-gradient-electric bg-clip-text text-transparent">
          Upcoming Events
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Join Kelvin Creekman for exclusive concerts, meet & greets, and special events. Experience the electric energy
          live!
        </p>
      </div>

      {/* Next Event Highlight */}
      <div className="relative overflow-hidden rounded-lg border border-electric-700/30 bg-gradient-to-r from-electric-900/50 to-ice-900/50 backdrop-blur-lg">
        <div className="absolute inset-0 bg-gradient-to-r from-electric-500/10 to-ice-500/10" />

        <div className="relative p-8">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            {/* Event Image */}
            <div className="flex-shrink-0">
              <div className="relative w-64 h-40 rounded-lg overflow-hidden border border-electric-700/30">
                <img
                  src={nextEvent.image || "/placeholder.svg"}
                  alt={nextEvent.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 left-2">
                  <Badge className="bg-electric-500 text-white">Next Event</Badge>
                </div>
              </div>
            </div>

            {/* Event Details */}
            <div className="flex-1 text-center lg:text-left space-y-4">
              <div>
                <h2 className="text-2xl lg:text-3xl font-bold text-electric-400 mb-2">{nextEvent.title}</h2>
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(nextEvent.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{nextEvent.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>
                      {nextEvent.venue}, {nextEvent.location}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
                <div className="flex items-center gap-2 text-sm">
                  <Users className="h-4 w-4 text-electric-400" />
                  <span>{nextEvent.availableSpots} spots available</span>
                </div>
                <div className="text-sm">
                  <span className="text-muted-foreground">From </span>
                  <span className="text-lg font-semibold text-electric-400">${nextEvent.memberPrice}</span>
                  <span className="text-sm text-muted-foreground ml-1">(member price)</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4">
                <Button className="bg-gradient-electric hover:animate-electric-pulse px-8">Get Tickets</Button>
                <div className="text-center">
                  <div className="text-2xl font-bold text-electric-400">{daysUntil}</div>
                  <div className="text-sm text-muted-foreground">days to go</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
