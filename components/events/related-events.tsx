"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin } from "lucide-react"
import Link from "next/link"

// Mock related events data
const relatedEvents = [
  {
    id: "3",
    title: "Acoustic Session & Q&A",
    description: "Intimate acoustic performance with fan Q&A session.",
    date: "2024-03-01",
    time: "19:00",
    location: "The Lounge, Nashville",
    price: 45,
    memberPrice: 35,
    category: "Concert",
    tier: "Frost",
  },
  {
    id: "5",
    title: "Fan Club Meetup",
    description: "Connect with fellow fans and enjoy exclusive content.",
    date: "2024-03-15",
    time: "17:00",
    location: "Community Center, Chicago",
    price: 25,
    memberPrice: 15,
    category: "Meet & Greet",
    tier: "Frost",
  },
  {
    id: "6",
    title: "Behind the Scenes Tour",
    description: "Exclusive tour of recording studio and equipment.",
    date: "2024-03-25",
    time: "14:00",
    location: "Creekman Studios, Nashville",
    price: 100,
    memberPrice: 80,
    category: "VIP Only",
    tier: "Blizzard",
  },
]

interface RelatedEventsProps {
  currentEventId: string
}

export function RelatedEvents({ currentEventId }: RelatedEventsProps) {
  const filteredEvents = relatedEvents.filter((event) => event.id !== currentEventId)

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

  if (filteredEvents.length === 0) {
    return null
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">You Might Also Like</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map((event) => (
          <Card
            key={event.id}
            className="bg-slate-800/50 backdrop-blur-sm border-slate-700 hover:border-blue-500/50 transition-all duration-300"
          >
            <CardContent className="p-6">
              {/* Badges */}
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge className={getCategoryColor(event.category)}>{event.category}</Badge>
                <Badge className={getTierColor(event.tier)}>{event.tier}</Badge>
              </div>

              {/* Event Details */}
              <div className="space-y-3">
                <h3 className="text-lg font-bold text-white">{event.title}</h3>
                <p className="text-slate-300 text-sm">{event.description}</p>

                {/* Date, Time, Location */}
                <div className="space-y-2 text-sm text-slate-400">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-blue-400" />
                    <span>
                      {new Date(event.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-blue-400" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-blue-400" />
                    <span>{event.location.split(",")[1]?.trim() || event.location}</span>
                  </div>
                </div>

                {/* Pricing */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-700">
                  <div>
                    <div className="text-lg font-bold text-white">
                      ${event.memberPrice}
                      <span className="text-sm text-slate-400 ml-1">member</span>
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <Link href={`/events/${event.id}`} className="block mt-4">
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white">
                    View Event
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
