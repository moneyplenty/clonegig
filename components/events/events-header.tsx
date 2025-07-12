"use client"

import { Calendar, MapPin, Users, Star } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export function EventsHeader() {
  return (
    <div className="text-center space-y-6">
      <div className="space-y-4">
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-fire-400 to-ember-400 dark:from-electric-400 dark:to-frost-400 bg-clip-text text-transparent">
          Upcoming Events
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Join Kelvin Creekman for exclusive concerts, meet & greets, and special events. Fan club members get priority
          access and special pricing.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-4">
        <Badge variant="outline" className="flex items-center gap-2 px-4 py-2">
          <Calendar className="h-4 w-4" />
          Live Concerts
        </Badge>
        <Badge variant="outline" className="flex items-center gap-2 px-4 py-2">
          <Users className="h-4 w-4" />
          Meet & Greets
        </Badge>
        <Badge variant="outline" className="flex items-center gap-2 px-4 py-2">
          <MapPin className="h-4 w-4" />
          Virtual Events
        </Badge>
        <Badge variant="outline" className="flex items-center gap-2 px-4 py-2">
          <Star className="h-4 w-4" />
          VIP Experiences
        </Badge>
      </div>
    </div>
  )
}
