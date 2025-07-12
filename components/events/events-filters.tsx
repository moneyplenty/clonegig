"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Users, Star, Filter, X } from "lucide-react"

const eventTypes = [
  { id: "all", label: "All Events", icon: Filter },
  { id: "concert", label: "Concerts", icon: Calendar },
  { id: "meetgreet", label: "Meet & Greets", icon: Users },
  { id: "virtual", label: "Virtual Events", icon: MapPin },
  { id: "vip", label: "VIP Events", icon: Star },
]

const locations = [
  { id: "all", label: "All Locations" },
  { id: "new-york", label: "New York" },
  { id: "los-angeles", label: "Los Angeles" },
  { id: "chicago", label: "Chicago" },
  { id: "virtual", label: "Virtual" },
]

const tiers = [
  { id: "all", label: "All Tiers" },
  { id: "public", label: "Public" },
  { id: "frost", label: "Frost+" },
  { id: "blizzard", label: "Blizzard+" },
  { id: "avalanche", label: "Avalanche Only" },
]

export function EventsFilters() {
  const [selectedType, setSelectedType] = useState("all")
  const [selectedLocation, setSelectedLocation] = useState("all")
  const [selectedTier, setSelectedTier] = useState("all")

  const clearFilters = () => {
    setSelectedType("all")
    setSelectedLocation("all")
    setSelectedTier("all")
  }

  const hasActiveFilters = selectedType !== "all" || selectedLocation !== "all" || selectedTier !== "all"

  return (
    <Card className="border-electric-700/30 bg-background/50 backdrop-blur-lg">
      <CardContent className="p-6">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Filter Events</h3>
            {hasActiveFilters && (
              <Button variant="ghost" size="sm" onClick={clearFilters} className="text-muted-foreground">
                <X className="h-4 w-4 mr-2" />
                Clear Filters
              </Button>
            )}
          </div>

          {/* Event Type Filter */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-muted-foreground">Event Type</h4>
            <div className="flex flex-wrap gap-2">
              {eventTypes.map((type) => (
                <Button
                  key={type.id}
                  variant={selectedType === type.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedType(type.id)}
                  className={`flex items-center gap-2 ${
                    selectedType === type.id
                      ? "bg-electric-500 hover:bg-electric-600 text-white"
                      : "border-electric-700/30 hover:border-electric-500/50"
                  }`}
                >
                  <type.icon className="h-4 w-4" />
                  {type.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Location Filter */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-muted-foreground">Location</h4>
            <div className="flex flex-wrap gap-2">
              {locations.map((location) => (
                <Button
                  key={location.id}
                  variant={selectedLocation === location.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedLocation(location.id)}
                  className={`${
                    selectedLocation === location.id
                      ? "bg-electric-500 hover:bg-electric-600 text-white"
                      : "border-electric-700/30 hover:border-electric-500/50"
                  }`}
                >
                  {location.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Tier Filter */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-muted-foreground">Access Level</h4>
            <div className="flex flex-wrap gap-2">
              {tiers.map((tier) => (
                <Button
                  key={tier.id}
                  variant={selectedTier === tier.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedTier(tier.id)}
                  className={`${
                    selectedTier === tier.id
                      ? "bg-electric-500 hover:bg-electric-600 text-white"
                      : "border-electric-700/30 hover:border-electric-500/50"
                  }`}
                >
                  {tier.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Active Filters Display */}
          {hasActiveFilters && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-muted-foreground">Active Filters</h4>
              <div className="flex flex-wrap gap-2">
                {selectedType !== "all" && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    {eventTypes.find((t) => t.id === selectedType)?.label}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => setSelectedType("all")} />
                  </Badge>
                )}
                {selectedLocation !== "all" && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    {locations.find((l) => l.id === selectedLocation)?.label}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => setSelectedLocation("all")} />
                  </Badge>
                )}
                {selectedTier !== "all" && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    {tiers.find((t) => t.id === selectedTier)?.label}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => setSelectedTier("all")} />
                  </Badge>
                )}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
