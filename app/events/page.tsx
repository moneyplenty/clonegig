import { createServerSupabaseClient } from "@/lib/supabase/server"
import { EventsHeader } from "@/components/events/events-header"
import { EventsGrid } from "@/components/events/events-grid"
import { EventsFilters } from "@/components/events/events-filters"

export default async function EventsPage() {
  const supabase = createServerSupabaseClient()

  const { data: events, error } = await supabase.from("events").select("*").order("date", { ascending: true })

  if (error) {
    console.error("Error fetching events:", error.message)
    return <div className="container py-12 text-center">Failed to load events.</div>
  }

  return (
    <main className="container py-12 md:py-24">
      <EventsHeader />
      <EventsFilters />
      <EventsGrid initialEvents={events || []} />
    </main>
  )
}
