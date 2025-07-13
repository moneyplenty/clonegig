import { EventsHeader } from "@/components/events/events-header"
import { EventsFilters } from "@/components/events/events-filters"
import { EventsGrid } from "@/components/events/events-grid"
import { createClient } from "@/lib/supabase/server"
import { cookies } from "next/headers"

export const dynamic = "force-dynamic"

interface EventsPageProps {
  searchParams: {
    type?: string
  }
}

export default async function EventsPage({ searchParams }: EventsPageProps) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  let query = supabase.from("Event").select("*").order("date", { ascending: true })

  if (searchParams.type === "meet-and-greet") {
    query = query.eq("isMeetGreet", true)
  } else if (searchParams.type === "concert") {
    query = query.eq("isMeetGreet", false) // Assuming non-meet-and-greet are concerts
  }

  const { data: events, error } = await query

  if (error) {
    console.error("Error fetching events:", error)
    return <div>Error loading events.</div>
  }

  return (
    <div className="flex flex-col min-h-[100dvh] bg-kelvin-background text-kelvin-foreground">
      <main className="flex-1 container mx-auto py-12 px-4 md:px-6">
        <EventsHeader />
        <div className="flex flex-col md:flex-row gap-8">
          <aside className="md:w-1/4">
            <EventsFilters />
          </aside>
          <section className="md:w-3/4">
            <EventsGrid events={events || []} />
          </section>
        </div>
      </main>
    </div>
  )
}
