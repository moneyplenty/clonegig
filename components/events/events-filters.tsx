"use client"

import { Button } from "@/components/ui/button"
import { useRouter, useSearchParams } from "next/navigation"
import { useCallback } from "react"

export function EventsFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)
      return params.toString()
    },
    [searchParams],
  )

  const removeQueryString = useCallback(
    (name: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.delete(name)
      return params.toString()
    },
    [searchParams],
  )

  const handleFilterChange = (type: string | null) => {
    if (type) {
      router.push(`/events?${createQueryString("type", type)}`)
    } else {
      router.push(`/events?${removeQueryString("type")}`)
    }
  }

  const currentType = searchParams.get("type")

  return (
    <div className="flex flex-wrap gap-2 md:flex-col md:w-48">
      <Button
        variant={currentType === null ? "default" : "outline"}
        onClick={() => handleFilterChange(null)}
        className="w-full"
      >
        All Events
      </Button>
      <Button
        variant={currentType === "concert" ? "default" : "outline"}
        onClick={() => handleFilterChange("concert")}
        className="w-full"
      >
        Concerts
      </Button>
      <Button
        variant={currentType === "meet-greet" ? "default" : "outline"}
        onClick={() => handleFilterChange("meet-greet")}
        className="w-full"
      >
        Meet & Greet
      </Button>
    </div>
  )
}
