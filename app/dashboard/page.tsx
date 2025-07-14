import { createServerSupabaseClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { format } from "date-fns"
import { Package, Calendar, Users, BookOpen, DollarSign } from "lucide-react"
import { formatPrice } from "@/lib/utils"

export default async function DashboardPage() {
  const supabase = createServerSupabaseClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("username, membership_tier")
    .eq("id", user.id)
    .single()

  if (profileError) {
    console.error("Error fetching profile:", profileError.message)
    // Handle error, maybe redirect to an error page or show a message
  }

  const { data: orders, error: ordersError } = await supabase
    .from("orders")
    .select("*, order_items(quantity, price, products(name))")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(3)

  if (ordersError) {
    console.error("Error fetching orders:", ordersError.message)
  }

  const { data: eventBookings, error: eventBookingsError } = await supabase
    .from("event_bookings")
    .select("*, events(name, date, location)")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(3)

  if (eventBookingsError) {
    console.error("Error fetching event bookings:", eventBookingsError.message)
  }

  const { data: meetGreetBookings, error: meetGreetBookingsError } = await supabase
    .from("meet_and_greet_bookings")
    .select("*, meet_and_greets(title, date, daily_room_url)")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(3)

  if (meetGreetBookingsError) {
    console.error("Error fetching meet & greet bookings:", meetGreetBookingsError.message)
  }

  const { data: content, error: contentError } = await supabase
    .from("content")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(3) // Fetch some content to suggest

  if (contentError) {
    console.error("Error fetching content:", contentError.message)
  }

  return (
    <main className="container py-12 md:py-24">
      <section className="mb-8">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
          Welcome, {profile?.username || user.email}!
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Your current membership tier:{" "}
          <span className="font-semibold capitalize">{profile?.membership_tier?.replace("_", " ") || "Free"}</span>
        </p>
        {profile?.membership_tier === "free" && (
          <Button asChild className="mt-4">
            <Link href="/join">Upgrade Membership</Link>
          </Button>
        )}
      </section>

      <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recent Orders</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {orders && orders.length > 0 ? (
              <ul className="space-y-2">
                {orders.map((order) => (
                  <li key={order.id} className="text-sm">
                    Order #{order.id.substring(0, 8)} - {formatPrice(order.total_amount)} (
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)})
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground">No recent orders.</p>
            )}
            <Button variant="link" className="mt-2 p-0" asChild>
              <Link href="/store">View all orders</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Events</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {eventBookings && eventBookings.length > 0 ? (
              <ul className="space-y-2">
                {eventBookings.map((booking) => (
                  <li key={booking.id} className="text-sm">
                    {booking.events?.name} on {format(new Date(booking.events?.date || ""), "PPP")}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground">No upcoming event bookings.</p>
            )}
            <Button variant="link" className="mt-2 p-0" asChild>
              <Link href="/events">Browse events</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Meet & Greet Sessions</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {meetGreetBookings && meetGreetBookings.length > 0 ? (
              <ul className="space-y-2">
                {meetGreetBookings.map((booking) => (
                  <li key={booking.id} className="text-sm">
                    {booking.meet_and_greets?.title} on {format(new Date(booking.meet_and_greets?.date || ""), "PPP")}
                    {booking.meet_and_greets?.daily_room_url && (
                      <Button variant="link" className="h-auto p-0 text-xs" asChild>
                        <Link href={booking.meet_and_greets.daily_room_url} target="_blank">
                          (Join)
                        </Link>
                      </Button>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground">No upcoming meet & greet sessions.</p>
            )}
            <Button variant="link" className="mt-2 p-0" asChild>
              <Link href="/meet-and-greet">View all sessions</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Exclusive Content</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {content && content.length > 0 ? (
              <ul className="space-y-2">
                {content.map((item) => (
                  <li key={item.id} className="text-sm">
                    {item.title} ({item.type})
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground">No content available.</p>
            )}
            <Button variant="link" className="mt-2 p-0" asChild>
              <Link href="/content">Explore content</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Membership Details</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-sm">
              Your current tier:{" "}
              <span className="font-semibold capitalize">{profile?.membership_tier?.replace("_", " ") || "Free"}</span>
            </p>
            {profile?.membership_tier === "free" ? (
              <p className="text-sm text-muted-foreground">Upgrade to unlock more benefits!</p>
            ) : (
              <p className="text-sm text-muted-foreground">Enjoy your exclusive access.</p>
            )}
            <Button variant="link" className="mt-2 p-0" asChild>
              <Link href="/join">Manage Membership</Link>
            </Button>
          </CardContent>
        </Card>
      </section>
    </main>
  )
}
