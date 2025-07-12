"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, MapPin, Music, Users, Star, Zap, Crown } from "lucide-react"

interface FilterState {
  category: string
  location: string
  tier: string
  dateRange: string
}

export function EventsFilters() {
  const [filters, setFilters] = useState<FilterState>({
    category: "all",
    location: "all",
    tier: "all",
    dateRange: "all",
  })

  const categories = [
    { value: "all", label: "All Events", icon: Calendar },
    { value: "concert", label: "Concerts", icon: Music },
    { value: "meetgreet", label: "Meet & Greets", icon: Users },
    { value: "exclusive", label: "VIP Events", icon: Star },
  ]

  const locations = [
    { value: "all", label: "All Locations" },
    { value: "chicago", label: "Chicago, IL" },
    { value: "newyork", label: "New York, NY" },
    { value: "losangeles", label: "Los Angeles, CA" },
    { value: "nashville", label: "Nashville, TN" },
    { value: "online", label: "Online Events" },
  ]

  const tiers = [
    { value: "all", label: "All Tiers", icon: null },
    { value: "frost", label: "Frost Fan", icon: Star, color: "text-blue-400" },
    { value: "blizzard", label: "Blizzard VIP", icon: Zap, color: "text-purple-400" },
    { value: "avalanche", label: "Avalanche Elite", icon: Crown, color: "text-yellow-400" },
  ]

  const dateRanges = [
    { value: "all", label: "All Dates" },
    { value: "thisweek", label: "This Week" },
    { value: "thismonth", label: "This Month" },
    { value: "next3months", label: "Next 3 Months" },
  ]

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const clearFilters = () => {
    setFilters({
      category: "all",
      location: "all",
      tier: "all",
      dateRange: "all",
    })
  }

  const hasActiveFilters = Object.values(filters).some((value) => value !== "all")

  return (
    <div className="space-y-6">
      {/* Filter Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Category Filter */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">Event Type</label>
          <Select value={filters.category} onValueChange={(value) => handleFilterChange("category", value)}>
            <SelectTrigger className="border-electric-700/30 bg-background/50">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => {
                const Icon = category.icon
                return (
                  <SelectItem key={category.value} value={category.value}>
                    <div className="flex items-center gap-2">
                      <Icon className="h-4 w-4" />
                      {category.label}
                    </div>
                  </SelectItem>
                )
              })}
            </SelectContent>
          </Select>
        </div>

        {/* Location Filter */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">Location</label>
          <Select value={filters.location} onValueChange={(value) => handleFilterChange("location", value)}>
            <SelectTrigger className="border-electric-700/30 bg-background/50">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {locations.map((location) => (
                <SelectItem key={location.value} value={location.value}>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    {location.label}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Tier Filter */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">Access Level</label>
          <Select value={filters.tier} onValueChange={(value) => handleFilterChange("tier", value)}>
            <SelectTrigger className="border-electric-700/30 bg-background/50">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {tiers.map((tier) => {
                const Icon = tier.icon
                return (
                  <SelectItem key={tier.value} value={tier.value}>
                    <div className="flex items-center gap-2">
                      {Icon && <Icon className={`h-4 w-4 ${tier.color}`} />}
                      {tier.label}
                    </div>
                  </SelectItem>
                )
              })}
            </SelectContent>
          </Select>
        </div>

        {/* Date Range Filter */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">Date Range</label>
          <Select value={filters.dateRange} onValueChange={(value) => handleFilterChange("dateRange", value)}>
            <SelectTrigger className="border-electric-700/30 bg-background/50">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {dateRanges.map((range) => (
                <SelectItem key={range.value} value={range.value}>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {range.label}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Active Filters & Clear */}
      {hasActiveFilters && (
        <div className="flex items-center gap-4 flex-wrap">
          <span className="text-sm font-medium text-muted-foreground">Active filters:</span>
          <div className="flex items-center gap-2 flex-wrap">
            {filters.category !== "all" && (
              <Badge variant="secondary" className="bg-electric-500/20 text-electric-400">
                {categories.find((c) => c.value === filters.category)?.label}
              </Badge>
            )}
            {filters.location !== "all" && (
              <Badge variant="secondary" className="bg-electric-500/20 text-electric-400">
                {locations.find((l) => l.value === filters.location)?.label}
              </Badge>
            )}
            {filters.tier !== "all" && (
              <Badge variant="secondary" className="bg-electric-500/20 text-electric-400">
                {tiers.find((t) => t.value === filters.tier)?.label}
              </Badge>
            )}
            {filters.dateRange !== "all" && (
              <Badge variant="secondary" className="bg-electric-500/20 text-electric-400">
                {dateRanges.find((d) => d.value === filters.dateRange)?.label}
              </Badge>
            )}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="text-muted-foreground hover:text-electric-400"
          >
            Clear all
          </Button>
        </div>
      )}
    </div>
  )
}
