import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { User, Crown, Star, Zap, Package, Calendar, FileText } from "lucide-react"
import { createClient } from "@/lib/supabase/server"
import { cookies } from "next/headers"

export const dynamic = "force-dynamic"

export default async function DashboardPage() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError) {
    console.error("Error fetching user:", userError)
    // Handle error, maybe redirect to login or show a generic message
    return <div>Error loading user data. Please try logging in again.</div>
  }

  const userRole = user?.user_metadata?.role || "guest"

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "guest":
        return <User className="h-6 w-6 text-gray-500" />
      case "fan":
        return <Star className="h-6 w-6 text-blue-500" />
      case "premium":
        return <Zap className="h-6 w-6 text-purple-500" />
      case "admin":
        return <Crown className="h-6 w-6 text-yellow-500" />
      default:
        return <User className="h-6 w-6 text-gray-500" />
    }
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-4xl font-bold text-center mb-8">Welcome, {user?.email || "Guest"}!</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Membership Status Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Membership Status</CardTitle>
            {getRoleIcon(userRole)}
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold capitalize">{userRole} Member</p>
            <p className="text-xs text-muted-foreground">
              {userRole === "guest" && "Upgrade to unlock exclusive content and benefits!"}
              {userRole === "fan" && "Enjoy fan-exclusive content and early access!"}
              {userRole === "premium" && "You have full access to all premium features!"}
              {userRole === "admin" && "You have full administrative control."}
            </p>
            {userRole === "guest" && (
              <Link href="/join">
                <Button size="sm" className="mt-4">
                  Upgrade Membership
                </Button>
              </Link>
            )}
          </CardContent>
        </Card>

        {/* Quick Links */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Links</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-2">
            <Link href="/store">
              <Button variant="ghost" className="w-full justify-start">
                <Package className="mr-2 h-4 w-4" /> Shop Merchandise
              </Button>
            </Link>
            <Link href="/events">
              <Button variant="ghost" className="w-full justify-start">
                <Calendar className="mr-2 h-4 w-4" /> View Events
              </Button>
            </Link>
            <Link href="/content">
              <Button variant="ghost" className="w-full justify-start">
                <FileText className="mr-2 h-4 w-4" /> Exclusive Content
              </Button>
            </Link>
            {userRole === "admin" && (
              <Link href="/admin">
                <Button variant="ghost" className="w-full justify-start">
                  <Crown className="mr-2 h-4 w-4" /> Admin Dashboard
                </Button>
              </Link>
            )}
          </CardContent>
        </Card>

        {/* Recent Activity (Placeholder) */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">No recent activity to display.</p>
            {/* In a real app, this would show recent purchases, event bookings, etc. */}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
