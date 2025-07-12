"use client"

import { Calendar, Users, Clock } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function EventsHeader() {
  const nextEvent = {
    title: "Virtual Meet & Greet Session",
    date: "February 8, 2025",
    time: "3:00 PM EST",
    attendees: 12,
    maxAttendees: 20,
  }

  return (
    <div className="text-center space-y-6">
      <div>
        <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-electric-400 to-frost-400 bg-clip-text text-transparent">
          Upcoming Events
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Join Kelvin Creekman for exclusive events, intimate performances, and unforgettable experiences
        </p>
      </div>

      {/* Next Event Highlight */}
      <Card className="max-w-2xl mx-auto border-electric-700/30 bg-gradient-to-r from-electric-500/10 to-frost-500/10 backdrop-blur-lg">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <Badge className="bg-electric-500/20 text-electric-400 border-electric-500/50">Next Event</Badge>
            <Badge variant="outline" className="text-frost-400 border-frost-400/50">
              {nextEvent.attendees}/{nextEvent.maxAttendees} spots filled
            </Badge>
          </div>

          <h3 className="text-2xl font-bold mb-4 text-electric-400">{nextEvent.title}</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="h-4 w-4 text-electric-400" />
              <span>{nextEvent.date}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="h-4 w-4 text-frost-400" />
              <span>{nextEvent.time}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Users className="h-4 w-4 text-electric-400" />
              <span>{nextEvent.attendees} attending</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
