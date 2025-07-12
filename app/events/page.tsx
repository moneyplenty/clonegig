import { EventsHeader } from "@/components/events/events-header"
import { EventsFilters } from "@/components/events/events-filters"
import { EventsGrid } from "@/components/events/events-grid"
import { createClient } from "@/lib/supabase/server"
import { cookies } from "next/headers"

export const dynamic = "force-dynamic"

export default async function EventsPage({
  searchParams,
}: {
  searchParams: { type?: string; search?: string }
}) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  let query = supabase
    .from("Event")
    .select("*")
    .gte("date", new Date().toISOString())
    .order("date", { ascending: true })

  if (searchParams.type) {
    query = query.eq("isMeetGreet", searchParams.type === "meet-greet")
  }
  if (searchParams.search) {
    query = query.ilike("title", `%${searchParams.search}%`)
  }

  const { data: events, error } = await query

  if (error) {
    console.error("Error fetching events:", error)
    return <div>Error loading events.</div>
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <EventsHeader />
      <div className="flex flex-col md:flex-row gap-6 mb-8">
        <EventsFilters />
        <div className="flex-1">
          <EventsGrid events={events || []} />
        </div>
      </div>
    </div>
  )
}
