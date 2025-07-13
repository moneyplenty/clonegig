"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useRouter, useSearchParams } from "next/navigation"
import { Search, X } from "lucide-react"

export function EventsFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const initialFilter = searchParams.get("filter") || ""
  const [filter, setFilter] = useState(initialFilter)

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value)
  }

  const applyFilter = () => {
    const params = new URLSearchParams(searchParams.toString())
    if (filter) {
      params.set("filter", filter)
    } else {
      params.delete("filter")
    }
    router.push(`/events?${params.toString()}`)
  }

  const clearFilter = () => {
    setFilter("")
    const params = new URLSearchParams(searchParams.toString())
    params.delete("filter")
    router.push(`/events?${params.toString()}`)
  }

  return (
    <div className="space-y-4 p-4 border rounded-lg bg-card text-card-foreground shadow-sm">
      <h3 className="text-lg font-semibold mb-2">Filter Events</h3>
      <div className="flex space-x-2">
        <Input
          placeholder="Search by name or location..."
          value={filter}
          onChange={handleFilterChange}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              applyFilter()
            }
          }}
        />
        <Button onClick={applyFilter} size="icon">
          <Search className="h-4 w-4" />
          <span className="sr-only">Apply Filter</span>
        </Button>
        {filter && (
          <Button onClick={clearFilter} variant="outline" size="icon">
            <X className="h-4 w-4" />
            <span className="sr-only">Clear Filter</span>
          </Button>
        )}
      </div>
    </div>
  )
}
