import { EventDetails } from "@/components/events/event-details"
import { EventBooking } from "@/components/events/event-booking"
import { RelatedEvents } from "@/components/events/related-events"
import { createClient } from "@/lib/supabase/server"
import { cookies } from "next/headers"

export const dynamic = "force-dynamic"

export default async function EventDetailPage({ params }: { params: { id: string } }) {
  const { id } = params
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const { data: event, error } = await supabase.from("Event").select("*").eq("id", id).single()

  if (error) {
    console.error("Error fetching event:", error)
    return <div>Event not found.</div>
  }

  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <EventDetails event={event} />
          <EventBooking event={event} userId={user?.id || null} />
        </div>
        <div className="lg:col-span-1">
          <RelatedEvents currentEventId={event.id} />
        </div>
      </div>
    </div>
  )
}
