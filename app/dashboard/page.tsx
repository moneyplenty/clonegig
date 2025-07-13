"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/components/auth/auth-provider"
import { Loader2, Crown, Star, Zap, ShoppingBag, Calendar, BookOpen, MessageCircle } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="sr-only">Loading...</span>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] p-4 text-center">
        <h1 className="text-3xl font-bold mb-4">Access Denied</h1>
        <p className="text-lg text-muted-foreground mb-6">Please log in to view your dashboard.</p>
        <Button asChild>
          <Link href="/login">Go to Login</Link>
        </Button>
      </div>
    )
  }

  const userRole = user.user_metadata?.role || "fan" // Default to 'fan' if role is not set

  const getTierIcon = (role: string) => {
    switch (role) {
      case "guest":
        return null
      case "fan":
        return <Star className="h-5 w-5 text-blue-400" />
      case "premium":
        return <Zap className="h-5 w-5 text-purple-400" />
      case "admin":
        return <Crown className="h-5 w-5 text-gold-400" />
      default:
        return null
    }
  }

  const getTierName = (role: string) => {
    switch (role) {
      case "guest":
        return "Guest"
      case "fan":
        return "Frost Fan"
      case "premium":
        return "Blizzard VIP"
      case "admin":
        return "Avalanche Elite (Admin)"
      default:
        return "Unknown Tier"
    }
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Welcome, {user.email}!</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="bg-background/50 backdrop-blur-lg border-electric-700/30">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-electric-200">Your Membership Tier</CardTitle>
            {getTierIcon(userRole)}
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-frost-300">{getTierName(userRole)}</p>
            <p className="text-xs text-muted-foreground mt-1">
              {userRole === "guest" && "Sign up or upgrade to unlock more features!"}
              {userRole === "fan" && "Enjoy basic fan benefits. Consider upgrading for more!"}
              {userRole === "premium" && "You have access to exclusive content and priority features!"}
              {userRole === "admin" && "You have full administrative privileges."}
            </p>
            {userRole === "fan" && (
              <Button asChild className="mt-4 bg-gradient-electric hover:animate-electric-pulse">
                <Link href="/join">Upgrade Membership</Link>
              </Button>
            )}
          </CardContent>
        </Card>

        <Card className="bg-background/50 backdrop-blur-lg border-electric-700/30">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-electric-200">Recent Orders</CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">No recent orders</p>
            <p className="text-xs text-muted-foreground">Check out the latest merchandise!</p>
            <Button asChild className="mt-4 bg-gradient-electric hover:animate-electric-pulse">
              <Link href="/store">Go to Store</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-background/50 backdrop-blur-lg border-electric-700/30">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-electric-200">Upcoming Events</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">No upcoming events booked</p>
            <p className="text-xs text-muted-foreground">Find exciting events to join.</p>
            <Button asChild className="mt-4 bg-gradient-electric hover:animate-electric-pulse">
              <Link href="/events">View Events</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-background/50 backdrop-blur-lg border-electric-700/30">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-electric-200">Exclusive Content</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">Access your premium content.</p>
            <p className="text-xs text-muted-foreground">Dive into behind-the-scenes and more.</p>
            <Button asChild className="mt-4 bg-gradient-electric hover:animate-electric-pulse">
              <Link href="/content">View Content</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-background/50 backdrop-blur-lg border-electric-700/30">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-electric-200">Community Hub</CardTitle>
            <MessageCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">Connect with other fans.</p>
            <p className="text-xs text-muted-foreground">Join discussions and make new friends.</p>
            <Button asChild className="mt-4 bg-gradient-electric hover:animate-electric-pulse">
              <Link href="/community">Go to Community</Link>
            </Button>
          </CardContent>
        </Card>

        {userRole === "admin" && (
          <Card className="bg-background/50 backdrop-blur-lg border-electric-700/30">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-electric-200">Admin Panel</CardTitle>
              <Crown className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">Manage the fan club website.</p>
              <p className="text-xs text-muted-foreground">Access all administrative functionalities.</p>
              <Button asChild className="mt-4 bg-gradient-electric hover:animate-electric-pulse">
                <Link href="/admin">Go to Admin</Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
