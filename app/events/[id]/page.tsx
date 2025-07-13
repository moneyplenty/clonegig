import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import { format } from "date-fns"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { EventDetails } from "@/components/events/event-details"
import { RelatedEvents } from "@/components/events/related-events"

export default async function EventDetailsPage({ params }: { params: { id: string } }) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const { data: event, error } = await supabase.from("events").select("*").eq("id", params.id).single()

  if (error || !event) {
    console.error("Error fetching event:", error)
    notFound()
  }

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const handleBookEvent = async () => {
    "use server"
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      redirect(`/login?redirect=/events/${params.id}`)
    }

    // Check if user has already booked this event
    const { data: existingBooking, error: existingBookingError } = await supabase
      .from("event_bookings")
      .select("*")
      .eq("user_id", user.id)
      .eq("event_id", params.id)
      .single()

    if (existingBookingError && existingBookingError.code !== "PGRST116") {
      // PGRST116 means no rows found
      console.error("Error checking existing booking:", existingBookingError)
      return { success: false, message: "Error checking existing booking." }
    }

    if (existingBooking) {
      return { success: false, message: "You have already booked this event." }
    }

    const { error: insertError } = await supabase.from("event_bookings").insert({
      user_id: user.id,
      event_id: params.id,
      booking_date: new Date().toISOString(),
      status: "confirmed", // Or 'pending' if there's a payment step
    })

    if (insertError) {
      console.error("Error booking event:", insertError)
      return { success: false, message: "Failed to book event." }
    }

    // Send confirmation email (optional, can be done via a separate service/webhook)
    try {
      await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/send-event-confirmation`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: user.email,
          eventTitle: event.title,
          eventDate: format(new Date(event.date), "PPP"),
          eventTime: event.time,
          eventLocation: event.location,
        }),
      })
    } catch (emailError) {
      console.error("Failed to send event confirmation email:", emailError)
      // Don't block the user if email fails, but log it
    }

    redirect(`/dashboard?bookedEvent=${event.id}`) // Redirect to dashboard with a success message
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <EventDetails eventId={params.id} />
      <RelatedEvents currentEventId={params.id} />
    </div>
  )
}
