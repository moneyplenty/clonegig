import { createServerSupabaseClient } from "@/lib/supabase/server"
import type { MeetAndGreet } from "@/types/index.d"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { format } from "date-fns"
import { Users, Calendar, Lock } from "lucide-react"
import { getMembershipLevel } from "@/lib/utils"
import { UpcomingSessions } from "@/components/meet-and-greet/upcoming-sessions"
import { Separator } from "@/components/ui/separator"

export default async function MeetAndGreetPage() {
  const supabase = createServerSupabaseClient()
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

  const { data: meetAndGreets, error } = await supabase
    .from("meet_and_greets")
    .select("*")
    .order("date", { ascending: true })

  if (error) {
    console.error("Error fetching meet and greets:", error.message)
    return <div className="container py-12 text-center">Failed to load meet and greets.</div>
  }

  const { data: userBookings, error: bookingsError } = await supabase
    .from("meet_and_greet_bookings")
    .select("*, meet_and_greets(title, date, daily_room_url)")
    .eq("user_id", user?.id || "")
    .order("date", { ascending: true })

  if (bookingsError) {
    console.error("Error fetching user meet & greet bookings:", bookingsError.message)
  }

  const canAccess = (accessLevel: string) => {
    const userLevel = getMembershipLevel(userMembershipTier)
    const requiredLevel = getMembershipLevel(accessLevel)
    return userLevel >= requiredLevel
  }

  return (
    <main className="container py-12 md:py-24">
      <section className="mb-8 text-center">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">Meet & Greet Sessions</h1>
        <p className="mx-auto mt-4 max-w-[700px] text-lg text-muted-foreground md:text-xl">
          Connect directly with Creekman in exclusive online sessions.
        </p>
      </section>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {meetAndGreets.map((session: MeetAndGreet) => {
          const hasAccess = canAccess(session.access_level)
          const isBooked = userBookings?.some((booking) => booking.meet_and_greet_id === session.id)

          return (
            <Card key={session.id} className="flex flex-col">
              <CardHeader>
                <CardTitle className="text-xl font-semibold">{session.title}</CardTitle>
                <p className="text-muted-foreground line-clamp-2">{session.description}</p>
              </CardHeader>
              <CardContent className="flex-1 space-y-2">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="mr-2 h-4 w-4" />
                  <span>{format(new Date(session.date), "PPP p")}</span>
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Users className="mr-2 h-4 w-4" />
                  <span>Max Participants: {session.max_participants}</span>
                </div>
                <div className="flex items-center text-sm text-muted-foreground capitalize">
                  <Lock className="mr-2 h-4 w-4" />
                  <span>Access Level: {session.access_level.replace("_", " ")}</span>
                </div>
              </CardContent>
              <CardFooter>
                {hasAccess ? (
                  isBooked ? (
                    <Button disabled className="w-full">
                      Booked
                    </Button>
                  ) : (
                    <Button asChild className="w-full">
                      <Link href={`/meet-and-greet/${session.id}`}>Book Now</Link>
                    </Button>
                  )
                ) : (
                  <Button asChild variant="secondary" className="w-full">
                    <Link href="/join">Unlock Access</Link>
                  </Button>
                )}
              </CardFooter>
            </Card>
          )
        })}
      </div>

      {userBookings && userBookings.length > 0 && (
        <>
          <Separator className="my-12" />
          <section>
            <h2 className="mb-6 text-3xl font-bold tracking-tighter">Your Upcoming Sessions</h2>
            <UpcomingSessions initialBookings={userBookings} />
          </section>
        </>
      )}
    </main>
  )
}
