"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, Calendar, ShoppingBag, FileText, DollarSign, TrendingUp } from "lucide-react"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"

interface DashboardStats {
  totalUsers: number
  totalEvents: number
  totalProducts: number
  totalContent: number
  totalRevenue: number
  monthlyGrowth: number
}

export function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    totalEvents: 0,
    totalProducts: 0,
    totalContent: 0,
    totalRevenue: 0,
    monthlyGrowth: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardStats()
  }, [])

  const fetchDashboardStats = async () => {
    try {
      const supabase = createClient()

      // Fetch stats from database
      const [usersResult, eventsResult, productsResult, contentResult] = await Promise.all([
        supabase.from("profiles").select("id", { count: "exact" }),
        supabase.from("events").select("id", { count: "exact" }),
        supabase.from("products").select("id", { count: "exact" }),
        supabase.from("content").select("id", { count: "exact" }),
      ])

      setStats({
        totalUsers: usersResult.count || 0,
        totalEvents: eventsResult.count || 0,
        totalProducts: productsResult.count || 0,
        totalContent: contentResult.count || 0,
        totalRevenue: 12450, // Mock data
        monthlyGrowth: 15.3, // Mock data
      })
    } catch (error) {
      console.error("Error fetching dashboard stats:", error)
      // Use mock data on error
      setStats({
        totalUsers: 1250,
        totalEvents: 15,
        totalProducts: 25,
        totalContent: 45,
        totalRevenue: 12450,
        monthlyGrowth: 15.3,
      })
    } finally {
      setLoading(false)
    }
  }

  const statCards = [
    {
      title: "Total Users",
      value: stats.totalUsers.toLocaleString(),
      description: "Registered members",
      icon: Users,
      href: "/admin/users",
    },
    {
      title: "Events",
      value: stats.totalEvents.toString(),
      description: "Scheduled events",
      icon: Calendar,
      href: "/admin/events",
    },
    {
      title: "Products",
      value: stats.totalProducts.toString(),
      description: "Store items",
      icon: ShoppingBag,
      href: "/admin/store",
    },
    {
      title: "Content",
      value: stats.totalContent.toString(),
      description: "Published content",
      icon: FileText,
      href: "/admin/content",
    },
    {
      title: "Revenue",
      value: `$${stats.totalRevenue.toLocaleString()}`,
      description: "This month",
      icon: DollarSign,
      href: "#",
    },
    {
      title: "Growth",
      value: `+${stats.monthlyGrowth}%`,
      description: "Monthly growth",
      icon: TrendingUp,
      href: "#",
    },
  ]

  if (loading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="h-4 bg-muted rounded w-1/2"></div>
              <div className="h-4 w-4 bg-muted rounded"></div>
            </CardHeader>
            <CardContent>
              <div className="h-8 bg-muted rounded w-1/3 mb-1"></div>
              <div className="h-3 bg-muted rounded w-2/3"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {statCards.map((card) => (
          <Card key={card.title} className="cursor-pointer hover:shadow-md transition-shadow">
            <Link href={card.href}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
                <card.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{card.value}</div>
                <p className="text-xs text-muted-foreground">{card.description}</p>
              </CardContent>
            </Link>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common administrative tasks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button className="w-full justify-start bg-transparent" variant="outline" asChild>
              <Link href="/admin/events">
                <Calendar className="mr-2 h-4 w-4" />
                Create New Event
              </Link>
            </Button>
            <Button className="w-full justify-start bg-transparent" variant="outline" asChild>
              <Link href="/admin/store">
                <ShoppingBag className="mr-2 h-4 w-4" />
                Add Product
              </Link>
            </Button>
            <Button className="w-full justify-start bg-transparent" variant="outline" asChild>
              <Link href="/admin/content">
                <FileText className="mr-2 h-4 w-4" />
                Publish Content
              </Link>
            </Button>
            <Button className="w-full justify-start bg-transparent" variant="outline" asChild>
              <Link href="/admin/users">
                <Users className="mr-2 h-4 w-4" />
                Manage Users
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest system activity</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">New user registered</p>
                <p className="text-xs text-muted-foreground">2 minutes ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">Event ticket purchased</p>
                <p className="text-xs text-muted-foreground">5 minutes ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">New content published</p>
                <p className="text-xs text-muted-foreground">1 hour ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">Store order completed</p>
                <p className="text-xs text-muted-foreground">2 hours ago</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
