"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { CalendarDays, Crown, Star, Zap, Mail, Video, Award } from "lucide-react"
import { useAuth } from "@/components/auth/auth-provider"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import Link from "next/link"
import { format } from "date-fns"
import Loader2 from "@/components/ui/loader2" // Import Loader2 component

interface UserProfile {
  fullName: string
  email: string
  avatarUrl: string
  membershipTier: "guest" | "frost" | "blizzard" | "avalanche"
  points: number
  badges: string[]
  upcomingEvents: { id: string; title: string; date: string; time: string }[]
  recentOrders: { id: string; item: string; date: string; total: number }[]
}

export default function DashboardPage() {
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()
  const supabase = createClient()
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login")
      return
    }

    const fetchUserProfile = async () => {
      if (user) {
        // In a real app, you'd fetch this from your database based on user.id
        // For now, we'll use mock data and augment with Supabase user info
        const mockProfile: UserProfile = {
          fullName: user.user_metadata?.full_name || user.email?.split("@")[0] || "Fan",
          email: user.email || "N/A",
          avatarUrl: user.user_metadata?.avatar_url || "/placeholder-user.jpg",
          membershipTier: (user.user_metadata?.role as "guest" | "frost" | "blizzard" | "avalanche") || "guest",
          points: 1250,
          badges: ["Early Bird", "Concert Goer"],
          upcomingEvents: [
            { id: "1", title: "Ice Storm Album Launch Party", date: "2025-08-15", time: "7:00 PM" },
            { id: "2", title: "Acoustic Set & Q&A", date: "2025-09-01", time: "3:00 PM" },
          ],
          recentOrders: [
            { id: "o1", item: "Electric Storm T-Shirt", date: "2025-07-10", total: 25.0 },
            { id: "o2", item: "Frozen Fire Beanie", date: "2025-06-20", total: 20.0 },
          ],
        }
        setProfile(mockProfile)
      }
      setIsLoading(false)
    }

    fetchUserProfile()
  }, [user, authLoading, router, supabase])

  if (isLoading || authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-12 w-12 animate-spin text-electric-500" />
        <p className="ml-4 text-electric-200">Loading dashboard...</p>
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="flex min-h-[calc(100vh-64px)] flex-col items-center justify-center p-4 text-center">
        <h2 className="text-3xl font-bold text-electric-100 mb-4">Access Denied</h2>
        <p className="text-muted-foreground mb-8">Please log in to view your dashboard.</p>
        <Button asChild className="bg-gradient-electric hover:animate-electric-pulse">
          <Link href="/login">Go to Login</Link>
        </Button>
      </div>
    )
  }

  const getTierIcon = (tier: string) => {
    switch (tier) {
      case "frost":
        return <Star className="h-5 w-5 text-blue-400" />
      case "blizzard":
        return <Zap className="h-5 w-5 text-purple-400" />
      case "avalanche":
        return <Crown className="h-5 w-5 text-yellow-400" />
      default:
        return null
    }
  }

  return (
    <div className="container mx-auto px-4 py-12 md:py-24">
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-12">
        <span className="bg-gradient-to-r from-electric-400 to-frost-400 bg-clip-text text-transparent">
          Welcome, {profile.fullName}!
        </span>
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* User Profile Card */}
        <Card className="lg:col-span-1 bg-background/50 backdrop-blur-lg border-electric-700/30">
          <CardHeader className="flex flex-col items-center text-center">
            <Avatar className="h-24 w-24 mb-4 border-4 border-electric-500">
              <AvatarImage src={profile.avatarUrl || "/placeholder.svg"} alt={profile.fullName} />
              <AvatarFallback>{profile.fullName[0]}</AvatarFallback>
            </Avatar>
            <CardTitle className="text-2xl text-electric-100">{profile.fullName}</CardTitle>
            <p className="text-muted-foreground">{profile.email}</p>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="flex items-center justify-between text-electric-200">
              <span className="font-semibold">Membership Tier:</span>
              <div className="flex items-center gap-2">
                {getTierIcon(profile.membershipTier)}
                <span className="capitalize">{profile.membershipTier}</span>
              </div>
            </div>
            <div className="flex items-center justify-between text-electric-200">
              <span className="font-semibold">Fan Points:</span>
              <span className="flex items-center gap-1">
                <Award className="h-5 w-5 text-yellow-500" /> {profile.points}
              </span>
            </div>
            <Separator className="bg-electric-700" />
            <div>
              <h3 className="text-lg font-semibold mb-2 text-electric-200">Badges</h3>
              <div className="flex flex-wrap gap-2">
                {profile.badges.length > 0 ? (
                  profile.badges.map((badge, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center rounded-full bg-electric-800 px-3 py-1 text-sm font-medium text-electric-100"
                    >
                      {badge}
                    </span>
                  ))
                ) : (
                  <p className="text-muted-foreground text-sm">No badges yet. Keep engaging!</p>
                )}
              </div>
            </div>
            <Button
              variant="outline"
              className="w-full border-electric-700 text-electric-200 hover:bg-electric-900 hover:text-electric-100 bg-transparent"
            >
              Edit Profile
            </Button>
          </CardContent>
        </Card>

        {/* Upcoming Events & Recent Orders */}
        <div className="lg:col-span-2 grid gap-8">
          <Card className="bg-background/50 backdrop-blur-lg border-electric-700/30">
            <CardHeader>
              <CardTitle className="text-electric-200">Upcoming Events</CardTitle>
            </CardHeader>
            <CardContent>
              {profile.upcomingEvents.length > 0 ? (
                <ul className="space-y-4">
                  {profile.upcomingEvents.map((event) => (
                    <li key={event.id} className="flex items-center justify-between text-electric-200">
                      <div>
                        <p className="font-semibold">{event.title}</p>
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                          <CalendarDays className="h-4 w-4" /> {format(new Date(event.date), "MMM dd, yyyy")} at{" "}
                          {event.time}
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        asChild
                        className="border-electric-700 text-electric-200 hover:bg-electric-900 hover:text-electric-100 bg-transparent"
                      >
                        <Link href={`/events/${event.id}`}>View</Link>
                      </Button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted-foreground text-center py-4">
                  No upcoming events. Check out the{" "}
                  <Link href="/events" className="text-electric-400 hover:underline">
                    Events page
                  </Link>
                  !
                </p>
              )}
            </CardContent>
          </Card>

          <Card className="bg-background/50 backdrop-blur-lg border-electric-700/30">
            <CardHeader>
              <CardTitle className="text-electric-200">Recent Orders</CardTitle>
            </CardHeader>
            <CardContent>
              {profile.recentOrders.length > 0 ? (
                <ul className="space-y-4">
                  {profile.recentOrders.map((order) => (
                    <li key={order.id} className="flex items-center justify-between text-electric-200">
                      <div>
                        <p className="font-semibold">{order.item}</p>
                        <p className="text-sm text-muted-foreground">
                          Ordered on {format(new Date(order.date), "MMM dd, yyyy")}
                        </p>
                      </div>
                      <span className="font-bold">${order.total.toFixed(2)}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted-foreground text-center py-4">
                  No recent orders. Visit the{" "}
                  <Link href="/store" className="text-electric-400 hover:underline">
                    Store
                  </Link>
                  !
                </p>
              )}
            </CardContent>
          </Card>

          <Card className="bg-background/50 backdrop-blur-lg border-electric-700/30">
            <CardHeader>
              <CardTitle className="text-electric-200">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Button asChild className="bg-gradient-electric hover:animate-electric-pulse">
                <Link href="/meet-and-greet">
                  <Video className="mr-2 h-4 w-4" /> Book Meet & Greet
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-electric-700 text-electric-200 hover:bg-electric-900 hover:text-electric-100 bg-transparent"
              >
                <Link href="/content">
                  <Mail className="mr-2 h-4 w-4" /> Access Exclusive Content
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
