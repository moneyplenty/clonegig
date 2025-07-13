import { createClient } from "@/lib/supabase/server"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Calendar, ShoppingBag, BookOpen, Video, User } from "lucide-react"

export default async function DashboardPage() {
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
    .select("full_name, email, membership_tier, role")
    .eq("id", user.id)
    .single()

  if (profileError) {
    console.error("Error fetching profile:", profileError)
    return <div>Error loading user profile.</div>
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <h1 className="text-4xl font-bold text-center mb-8">Welcome, {profile?.full_name || profile?.email}!</h1>
      <p className="text-lg text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
        Your current membership tier:{" "}
        <span className="font-semibold text-primary">{profile?.membership_tier?.toUpperCase()}</span>
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <Card className="text-center shadow-lg">
          <CardHeader>
            <Calendar className="mx-auto h-12 w-12 text-primary mb-4" />
            <CardTitle className="text-2xl">My Events</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">View your upcoming event bookings and details.</p>
            <Link href="/events">
              <Button size="lg">Go to Events</Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="text-center shadow-lg">
          <CardHeader>
            <ShoppingBag className="mx-auto h-12 w-12 text-primary mb-4" />
            <CardTitle className="text-2xl">My Orders</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">Track your merchandise orders and purchase history.</p>
            <Link href="/store">
              <Button size="lg">Go to Store</Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="text-center shadow-lg">
          <CardHeader>
            <BookOpen className="mx-auto h-12 w-12 text-primary mb-4" />
            <CardTitle className="text-2xl">My Content</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">Access exclusive content unlocked by your membership.</p>
            <Link href="/content">
              <Button size="lg">Go to Content</Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="text-center shadow-lg">
          <CardHeader>
            <Video className="mx-auto h-12 w-12 text-primary mb-4" />
            <CardTitle className="text-2xl">Meet & Greet Sessions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">Manage your personalized video call sessions.</p>
            <Link href="/meet-and-greet">
              <Button size="lg">Manage Sessions</Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="text-center shadow-lg">
          <CardHeader>
            <User className="mx-auto h-12 w-12 text-primary mb-4" />
            <CardTitle className="text-2xl">My Profile</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">Update your personal information and membership details.</p>
            <Link href="/profile">
              <Button size="lg">Edit Profile</Button>
            </Link>
          </CardContent>
        </Card>

        {profile?.role === "admin" && (
          <Card className="text-center shadow-lg bg-gold-400 text-white">
            <CardHeader>
              <User className="mx-auto h-12 w-12 text-white mb-4" />
              <CardTitle className="text-2xl">Admin Panel</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-white/90">Access administrative tools to manage users, content, and events.</p>
              <Link href="/admin">
                <Button size="lg" className="bg-white text-gold-600 hover:bg-gray-100">
                  Go to Admin Panel
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
