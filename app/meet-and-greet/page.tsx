import { Suspense } from "react"
import { MeetAndGreetBooking } from "@/components/meet-and-greet/meet-and-greet-booking"
import { UpcomingSessions } from "@/components/meet-and-greet/upcoming-sessions"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { createClient } from "@/lib/supabase/server"
import type { MeetAndGreetBooking as MeetAndGreetBookingType } from "@/types"
import { SignalVideoCall } from "@/components/meet-and-greet/signal-video-call"
import { redirect } from "next/navigation"

export default async function MeetAndGreetPage() {
  const supabase = await createClient() // Explicitly await the client creation
  console.log("Supabase client in MeetAndGreetPage:", supabase) // Debug log

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login?redirect=/meet-and-greet")
  }

  // Fetch user's confirmed private meet & greet bookings
  const { data: bookings, error: bookingsError } = await supabase
    .from("meet_and_greet_bookings")
    .select("*")
    .eq("user_id", user.id)
    .eq("payment_status", "completed")
    .not("room_url", "is", null) // Only fetch bookings with a room_url
    .order("created_at", { ascending: false })
    .limit(1) // Assuming only one active private session at a time for simplicity

  if (bookingsError) {
    console.error("Error fetching meet and greet bookings:", bookingsError)
  }

  const activePrivateBooking: MeetAndGreetBookingType | null = bookings?.[0] || null

  return (
    <div className="container py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-primary mb-4">Meet & Greet with Kelvin Creekman</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Connect with Kelvin Creekman through exclusive group sessions or private one-on-one video calls.
        </p>
      </div>

      {activePrivateBooking && activePrivateBooking.room_url ? (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-green-500">Your Private Session is Ready!</CardTitle>
            <CardDescription>You have a confirmed private meet & greet session. Join the call below.</CardDescription>
          </CardHeader>
          <CardContent>
            <SignalVideoCall
              roomId={activePrivateBooking.room_url.split("/").pop() || ""} // Extract room ID from URL
              userName={user.user_metadata?.full_name || user.email || "Fan"}
            />
            <p className="text-sm text-muted-foreground mt-4">
              Please note: This is a demo room URL. In a production environment, this would be a live video call link.
            </p>
          </CardContent>
        </Card>
      ) : (
        <MeetAndGreetBooking />
      )}

      <Separator className="my-12" />

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-primary mb-6 text-center">Upcoming Group Sessions</h2>
        <Suspense fallback={<div>Loading upcoming sessions...</div>}>
          <UpcomingSessions />
        </Suspense>
      </section>
    </div>
  )
}
