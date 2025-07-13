import { createClient } from "@/lib/supabase/server"
import { cookies } from "next/headers"
import { notFound } from "next/navigation"
import { EventDetails } from "@/components/events/event-details"
import { EventBooking } from "@/components/events/event-booking"
import { RelatedEvents } from "@/components/events/related-events"

export const dynamic = "force-dynamic"

interface EventPageProps {
  params: {
    id: string
  }
}

export default async function EventPage({ params }: EventPageProps) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const { data: event, error } = await supabase.from("Event").select("*").eq("id", params.id).single()

  if (error || !event) {
    console.error("Error fetching event:", error)
    notFound()
  }

  return (
    <div className="flex flex-col min-h-[100dvh] bg-kelvin-background text-kelvin-foreground">
      <main className="flex-1 container mx-auto py-12 px-4 md:px-6">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <EventDetails event={event} />
            <div className="mt-8">
              <EventBooking event={event} />
            </div>
          </div>
          <aside className="lg:col-span-1">
            <RelatedEvents currentEventId={event.id} />
          </aside>
        </div>
      </main>
    </div>
  )
}
