import { createClient } from "@/lib/supabase/server"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default async function DashboardPage() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  // Fetch user's role from public.users table
  const { data: profile, error: profileError } = await supabase.from("User").select("role").eq("id", user.id).single()

  if (profileError || !profile) {
    console.error("Error fetching user profile:", profileError)
    // Handle error, maybe redirect to an error page or show a generic message
    return <div>Error loading user profile.</div>
  }

  const userRole = profile.role || "guest"

  return (
    <div className="flex flex-col min-h-[100dvh] bg-kelvin-background text-kelvin-foreground">
      <main className="flex-1 container mx-auto py-12 px-4 md:px-6">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">Your Dashboard</h1>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="bg-kelvin-card text-kelvin-card-foreground border-kelvin-border shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-2xl font-bold">Membership Status</CardTitle>
              <Icons.crown className="h-6 w-6 text-electric-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold capitalize">{userRole}</div>
              <p className="text-sm text-kelvin-card-foreground/80 mt-2">
                {userRole === "guest" && "Upgrade for more exclusive content!"}
                {userRole === "fan" && "Enjoy basic membership benefits."}
                {userRole === "premium" && "You have full access to all features!"}
              </p>
              {userRole !== "premium" && (
                <Button asChild className="mt-4 w-full bg-electric-500 hover:bg-electric-600 text-white">
                  <Link href="/join">Upgrade Membership</Link>
                </Button>
              )}
            </CardContent>
          </Card>

          <Card className="bg-kelvin-card text-kelvin-card-foreground border-kelvin-border shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-2xl font-bold">Recent Orders</CardTitle>
              <Icons.package className="h-6 w-6 text-frost-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">No recent orders</div>
              <p className="text-sm text-kelvin-card-foreground/80 mt-2">
                Looks like you haven&apos;t purchased anything yet.
              </p>
              <Button asChild className="mt-4 w-full bg-frost-500 hover:bg-frost-600 text-white">
                <Link href="/store">Browse Store</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-kelvin-card text-kelvin-card-foreground border-kelvin-border shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-2xl font-bold">Upcoming Events</CardTitle>
              <Icons.calendar className="h-6 w-6 text-purple-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">No upcoming events</div>
              <p className="text-sm text-kelvin-card-foreground/80 mt-2">
                Check out the events page for new announcements.
              </p>
              <Button asChild className="mt-4 w-full bg-purple-500 hover:bg-purple-600 text-white">
                <Link href="/events">View Events</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-kelvin-card text-kelvin-card-foreground border-kelvin-border shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-2xl font-bold">Exclusive Content</CardTitle>
              <Icons.fileText className="h-6 w-6 text-electric-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Access Granted</div>
              <p className="text-sm text-kelvin-card-foreground/80 mt-2">
                Explore exclusive articles, videos, and music.
              </p>
              <Button asChild className="mt-4 w-full bg-electric-500 hover:bg-electric-600 text-white">
                <Link href="/content">Go to Content</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-kelvin-card text-kelvin-card-foreground border-kelvin-border shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-2xl font-bold">Community Hub</CardTitle>
              <Icons.users className="h-6 w-6 text-frost-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Connect with Fans</div>
              <p className="text-sm text-kelvin-card-foreground/80 mt-2">
                Join discussions and meet other Kelvin Creekman enthusiasts.
              </p>
              <Button asChild className="mt-4 w-full bg-frost-500 hover:bg-frost-600 text-white">
                <Link href="/community">Visit Community</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
