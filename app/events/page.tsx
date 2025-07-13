import { createClient } from "@/lib/supabase/server"
import { cookies } from "next/headers"
import { EventsGrid } from "@/components/events/events-grid"
import { EventsHeader } from "@/components/events/events-header"
import { EventsFilters } from "@/components/events/events-filters"
import { Suspense } from "react"
import EventsLoading from "./loading"

export default async function EventsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const { data: events, error } = await supabase.from("events").select("*").order("date", { ascending: true })

  if (error) {
    console.error("Error fetching events:", error)
    return <div>Error loading events.</div>
  }

  const filter = searchParams.filter as string | undefined
  const filteredEvents = events.filter((event) => {
    if (!filter) return true
    return (
      event.name.toLowerCase().includes(filter.toLowerCase()) ||
      event.description?.toLowerCase().includes(filter.toLowerCase()) ||
      event.location.toLowerCase().includes(filter.toLowerCase())
    )
  })

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <EventsHeader />
      <div className="flex flex-col md:flex-row gap-8 mt-8">
        <div className="md:w-1/4">
          <EventsFilters />
        </div>
        <div className="md:w-3/4">
          <Suspense fallback={<EventsLoading />}>
            <EventsGrid events={filteredEvents} />
          </Suspense>
        </div>
      </div>
    </div>
  )
}
