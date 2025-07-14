"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Calendar, MapPin } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface EventsFiltersProps {
  onFilterChange: (filters: { query: string; date: string; location: string }) => void
}

export function EventsFilters({ onFilterChange }: EventsFiltersProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const currentCategory = searchParams.get("category") || "all"
  const currentDateFilter = searchParams.get("date") || "upcoming"

  const [query, setQuery] = useState("")
  const [date, setDate] = useState("")
  const [location, setLocation] = useState("")

  const handleCategoryChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("category", value)
    router.push(`/events?${params.toString()}`)
  }

  const handleDateFilterChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("date", value)
    router.push(`/events?${params.toString()}`)
  }

  const handleApplyFilters = () => {
    onFilterChange({ query, date, location })
  }

  const handleClearFilters = () => {
    setQuery("")
    setDate("")
    setLocation("")
    onFilterChange({ query: "", date: "", location: "" })
  }

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-8 p-4 border rounded-lg bg-card shadow-sm">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search events..."
          className="pl-9"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <div className="relative flex-1">
        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input type="date" className="pl-9" value={date} onChange={(e) => setDate(e.target.value)} />
      </div>
      <div className="relative flex-1">
        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Filter by location..."
          className="pl-9"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>
      <Select value={currentCategory} onValueChange={handleCategoryChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Filter by Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Categories</SelectItem>
          <SelectItem value="concert">Concert</SelectItem>
          <SelectItem value="meet_and_greet">Meet & Greet</SelectItem>
          <SelectItem value="workshop">Workshop</SelectItem>
          <SelectItem value="online">Online Event</SelectItem>
          {/* Add more categories as needed */}
        </SelectContent>
      </Select>

      <Select value={currentDateFilter} onValueChange={handleDateFilterChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Filter by Date" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="upcoming">Upcoming</SelectItem>
          <SelectItem value="past">Past</SelectItem>
          <SelectItem value="all">All Dates</SelectItem>
        </SelectContent>
      </Select>

      <Button onClick={handleApplyFilters}>Apply Filters</Button>
      <Button variant="outline" onClick={handleClearFilters}>
        Clear Filters
      </Button>
      <Button variant="outline" onClick={() => router.push("/events")}>
        Reset Filters
      </Button>
    </div>
  )
}
