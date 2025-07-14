import { createServerSupabaseClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import { EventDetails } from "@/components/events/event-details"
import { RelatedEvents } from "@/components/events/related-events"
import { EventBooking } from "@/components/events/event-booking"
import { Separator } from "@/components/ui/separator"

interface EventPageProps {
  params: {
    id: string
  }
}

export default async function EventPage({ params }: EventPageProps) {
  const supabase = createServerSupabaseClient()

  const { data: event, error: eventError } = await supabase.from("events").select("*").eq("id", params.id).single()

  if (eventError || !event) {
    console.error("Error fetching event:", eventError?.message || "Event not found")
    notFound()
  }

  // Fetch related events (excluding the current one)
  const { data: relatedEvents, error: relatedEventsError } = await supabase
    .from("events")
    .select("*")
    .neq("id", params.id)
    .limit(3)

  if (relatedEventsError) {
    console.error("Error fetching related events:", relatedEventsError.message)
  }

  const {
    data: { user },
  } = await supabase.auth.getUser()

  let userMembershipTier = "free"
  if (user) {
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("membership_tier")
      .eq("id", user.id)
      .single()

    if (profileError) {
      console.error("Error fetching user profile:", profileError.message)
    } else if (profile) {
      userMembershipTier = profile.membership_tier || "free"
    }
  }

  return (
    <main className="container py-12 md:py-24">
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <EventDetails event={event} />
        </div>
        <div className="lg:col-span-1">
          <EventBooking event={event} user={user} userMembershipTier={userMembershipTier} />
        </div>
      </div>

      <Separator className="my-12" />

      <section>
        <h2 className="mb-6 text-3xl font-bold tracking-tighter">More Events You Might Like</h2>
        <RelatedEvents initialEvents={relatedEvents || []} />
      </section>
    </main>
  )
}
