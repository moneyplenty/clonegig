"use client"

import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { useState, useEffect } from "react"
import { useDebounce } from "use-debounce"

export function EventsHeader() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const initialSearch = searchParams.get("search") || ""
  const [searchTerm, setSearchTerm] = useState(initialSearch)
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500)

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString())
    if (debouncedSearchTerm) {
      params.set("search", debouncedSearchTerm)
    } else {
      params.delete("search")
    }
    router.push(`/events?${params.toString()}`)
  }, [debouncedSearchTerm, router, searchParams])

  return (
    <div className="flex flex-col items-center justify-center text-center space-y-4 mb-8">
      <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">Upcoming Events</h1>
      <p className="max-w-xl text-lg text-gray-600 dark:text-gray-400">
        Don&apos;t miss out on Kelvin Creekman&apos;s electrifying concerts and exclusive meet & greet sessions!
      </p>
      <div className="relative w-full max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <Input
          type="text"
          placeholder="Search events..."
          className="pl-10 pr-4 py-2 rounded-md w-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </div>
  )
}
