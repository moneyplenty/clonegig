"use client"

import { Calendar, Clock, MapPin, Users, CheckCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

interface Event {
  id: string
  title: string
  description: string
  longDescription: string
  date: string
  time: string
  location: string
  price: number
  memberPrice: number
  category: string
  tier: string
  maxAttendees: number
  currentAttendees: number
  image: string
  features: string[]
  status: string
}

interface EventDetailsProps {
  event: Event
}

export function EventDetails({ event }: EventDetailsProps) {
  const getAvailabilityPercentage = (current: number, max: number) => {
    return (current / max) * 100
  }

  const getTierColor = (tier: string) => {
    switch (tier) {
      case "Frost":
        return "bg-blue-500/20 text-blue-300 border-blue-500/30"
      case "Blizzard":
        return "bg-cyan-500/20 text-cyan-300 border-cyan-500/30"
      case "Avalanche":
        return "bg-purple-500/20 text-purple-300 border-purple-500/30"
      default:
        return "bg-slate-500/20 text-slate-300 border-slate-500/30"
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Concert":
        return "bg-red-500/20 text-red-300 border-red-500/30"
      case "Meet & Greet":
        return "bg-green-500/20 text-green-300 border-green-500/30"
      case "VIP Only":
        return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30"
      default:
        return "bg-slate-500/20 text-slate-300 border-slate-500/30"
    }
  }

  return (
    <div className="space-y-6">
      {/* Event Header */}
      <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
        <CardContent className="p-6">
          {/* Badges */}
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge className={getCategoryColor(event.category)}>{event.category}</Badge>
            <Badge className={getTierColor(event.tier)}>{event.tier} Tier</Badge>
            <Badge className="bg-green-500/20 text-green-300 border-green-500/30">{event.status}</Badge>
          </div>

          {/* Event Image */}
          <div className="w-full h-64 bg-gradient-to-br from-slate-700 to-slate-800 rounded-lg mb-6 flex items-center justify-center">
            <div className="text-slate-500">Event Image</div>
          </div>

          {/* Title and Description */}
          <div className="space-y-4">
            <h1 className="text-3xl font-bold text-white">{event.title}</h1>
            <p className="text-lg text-slate-300">{event.description}</p>
            <p className="text-slate-400 leading-relaxed">{event.longDescription}</p>
          </div>
        </CardContent>
      </Card>

      {/* Event Information */}
      <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Event Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Date, Time, Location */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-blue-400" />
              <div>
                <div className="text-sm text-slate-400">Date</div>
                <div className="text-white font-medium">
                  {new Date(event.date).toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-blue-400" />
              <div>
                <div className="text-sm text-slate-400">Time</div>
                <div className="text-white font-medium">{event.time}</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-blue-400" />
              <div>
                <div className="text-sm text-slate-400">Location</div>
                <div className="text-white font-medium">{event.location}</div>
              </div>
            </div>
          </div>

          {/* Availability */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-400" />
                <span className="text-white font-medium">Availability</span>
              </div>
              <span className="text-slate-300">
                {event.currentAttendees}/{event.maxAttendees} attendees
              </span>
            </div>
            <Progress value={getAvailabilityPercentage(event.currentAttendees, event.maxAttendees)} className="h-3" />
            <div className="text-sm text-slate-400">{event.maxAttendees - event.currentAttendees} spots remaining</div>
          </div>
        </CardContent>
      </Card>

      {/* Event Features */}
      <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">What's Included</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {event.features.map((feature, index) => (
              <div key={index} className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-400" />
                <span className="text-slate-300">{feature}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
