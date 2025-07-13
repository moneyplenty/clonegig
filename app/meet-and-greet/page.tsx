import { createClient } from "@/lib/supabase/server"
import { cookies } from "next/headers"
import { MeetAndGreetBooking } from "@/components/meet-and-greet/meet-and-greet-booking"
import { UpcomingSessions } from "@/components/meet-and-greet/upcoming-sessions"
import { DailyVideoCall } from "@/components/meet-and-greet/daily-video-call"
import { redirect } from "next/navigation"

export default async function MeetAndGreetPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("full_name, email")
    .eq("id", user.id)
    .single()

  if (profileError) {
    console.error("Error fetching profile:", profileError)
    return <div>Error loading user profile.</div>
  }

  const roomUrl = searchParams.room as string | undefined

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <h1 className="text-4xl font-bold text-center mb-8">Meet & Greet</h1>
      <p className="text-lg text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
        Book a personalized session with Kelvin Creekman! Choose from various session types and times.
      </p>

      {roomUrl ? (
        <DailyVideoCall
          roomUrl={roomUrl}
          userName={profile?.full_name || profile?.email || "Fan"}
          onLeave={() => redirect("/meet-and-greet")}
        />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <MeetAndGreetBooking userId={user.id} />
          <UpcomingSessions userId={user.id} />
        </div>
      )}
    </div>
  )
}
