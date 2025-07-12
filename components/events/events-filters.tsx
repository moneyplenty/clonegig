"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Video, Music, Users, Filter } from "lucide-react"

export function EventsFilters() {
  const [activeFilter, setActiveFilter] = useState("all")
  const [showFilters, setShowFilters] = useState(false)

  const filters = [
    { id: "all", label: "All Events", icon: Calendar, count: 8 },
    { id: "concert", label: "Concerts", icon: Music, count: 3 },
    { id: "meet-greet", label: "Meet & Greets", icon: Video, count: 2 },
    { id: "exclusive", label: "VIP Only", icon: Users, count: 3 },
  ]

  return (
    <Card className="border-electric-700/30 bg-background/50 backdrop-blur-lg">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-electric-400">Filter Events</h2>
          <Button variant="outline" size="sm" onClick={() => setShowFilters(!showFilters)} className="md:hidden">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </div>

        <div className={`${showFilters ? "block" : "hidden"} md:block`}>
          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => {
              const Icon = filter.icon
              return (
                <Button
                  key={filter.id}
                  variant={activeFilter === filter.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveFilter(filter.id)}
                  className={`${
                    activeFilter === filter.id
                      ? "bg-gradient-electric text-white"
                      : "border-electric-700/30 hover:border-electric-500/50"
                  }`}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {filter.label}
                  <Badge variant="secondary" className="ml-2 bg-electric-500/20 text-electric-400">
                    {filter.count}
                  </Badge>
                </Button>
              )
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
