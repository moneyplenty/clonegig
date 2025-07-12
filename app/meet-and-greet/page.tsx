import { MeetAndGreetBooking } from "@/components/meet-and-greet/meet-and-greet-booking"
import { UpcomingSessions } from "@/components/meet-and-greet/upcoming-sessions"
import { DailyVideoCall } from "@/components/meet-and-greet/daily-video-call"
import { createClient } from "@/lib/supabase/server"
import { cookies } from "next/headers"

export default async function MeetAndGreetPage() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-4xl font-bold text-center mb-8">Meet & Greet with Kelvin Creekman</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-8">
          {/* Pass a mock session object for now, as the component expects it */}
          <MeetAndGreetBooking
            session={{
              id: "mock-session",
              date: new Date(),
              time: "N/A",
              isBooked: false,
              attendees: 0,
              maxAttendees: 0,
            }}
            onJoinCall={() => {}}
            userId={user?.id || null}
          />
          <UpcomingSessions userId={user?.id || null} />
        </div>
        <div>
          <DailyVideoCall />
        </div>
      </div>
    </div>
  )
}
