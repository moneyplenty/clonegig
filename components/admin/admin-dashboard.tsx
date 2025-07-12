"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, ShoppingBag, Video, DollarSign, Crown, Settings, Plus } from "lucide-react"
import { useAuth } from "@/components/auth/auth-provider"

export function AdminDashboard() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState("overview")

  // Mock data
  const stats = {
    totalMembers: 1247,
    monthlyRevenue: 18650,
    activeVideoSessions: 3,
    totalOrders: 89,
    newMembersThisMonth: 156,
    conversionRate: 12.5,
  }

  const recentOrders = [
    { id: "ORD-001", customer: "Sarah M.", item: "Kelvin Portrait T-Shirt", amount: 29.99, status: "completed" },
    { id: "ORD-002", customer: "Mike R.", item: "Sacred Geometry Mug", amount: 18.99, status: "processing" },
    { id: "ORD-003", customer: "Emma L.", item: "Kelvin Creekman Beanie", amount: 24.99, status: "shipped" },
  ]

  const upcomingSessions = [
    { id: "1", title: "Weekly Fan Q&A", date: "Today, 7:00 PM", participants: 45 },
    { id: "2", title: "Behind the Scenes", date: "Tomorrow, 3:00 PM", participants: 23 },
    { id: "3", title: "New Song Preview", date: "Friday, 8:00 PM", participants: 78 },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-fire dark:bg-gradient-ice bg-clip-text text-transparent flex items-center gap-2">
              <Crown className="h-8 w-8 text-gold-500" />
              Admin Dashboard
            </h1>
            <p className="text-muted-foreground">
              Welcome back, {user?.email?.split("@")[0]}! Here's what's happening with your fan club.
            </p>
          </div>
          <Badge className="bg-gold-500 text-white">
            <Crown className="h-3 w-3 mr-1" />
            Admin
          </Badge>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border-fire-500/20 dark:border-ice-500/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Members</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-fire-600 dark:text-ice-400">{stats.totalMembers}</div>
              <p className="text-xs text-muted-foreground">+{stats.newMembersThisMonth} this month</p>
            </CardContent>
          </Card>

          <Card className="border-fire-500/20 dark:border-ice-500/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-fire-600 dark:text-ice-400">${stats.monthlyRevenue}</div>
              <p className="text-xs text-muted-foreground">+{stats.conversionRate}% from last month</p>
            </CardContent>
          </Card>

          <Card className="border-fire-500/20 dark:border-ice-500/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Sessions</CardTitle>
              <Video className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-fire-600 dark:text-ice-400">{stats.activeVideoSessions}</div>
              <p className="text-xs text-muted-foreground">Live video sessions</p>
            </CardContent>
          </Card>

          <Card className="border-fire-500/20 dark:border-ice-500/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
              <ShoppingBag className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-fire-600 dark:text-ice-400">{stats.totalOrders}</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="members">Members</TabsTrigger>
            <TabsTrigger value="store">Store</TabsTrigger>
            <TabsTrigger value="sessions">Sessions</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Orders */}
              <Card className="border-fire-500/20 dark:border-ice-500/20">
                <CardHeader>
                  <CardTitle className="text-fire-600 dark:text-ice-400">Recent Orders</CardTitle>
                  <CardDescription>Latest merchandise orders from your fans</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentOrders.map((order) => (
                      <div
                        key={order.id}
                        className="flex items-center justify-between p-3 border border-muted rounded-lg"
                      >
                        <div>
                          <p className="font-medium">{order.customer}</p>
                          <p className="text-sm text-muted-foreground">{order.item}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">${order.amount}</p>
                          <Badge variant={order.status === "completed" ? "default" : "secondary"}>{order.status}</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Upcoming Sessions */}
              <Card className="border-fire-500/20 dark:border-ice-500/20">
                <CardHeader>
                  <CardTitle className="text-fire-600 dark:text-ice-400">Upcoming Sessions</CardTitle>
                  <CardDescription>Your scheduled video sessions with fans</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {upcomingSessions.map((session) => (
                      <div
                        key={session.id}
                        className="flex items-center justify-between p-3 border border-muted rounded-lg"
                      >
                        <div>
                          <p className="font-medium">{session.title}</p>
                          <p className="text-sm text-muted-foreground">{session.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{session.participants} fans</p>
                          <Button size="sm" className="bg-gradient-fire dark:bg-gradient-ice">
                            Join
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="members" className="space-y-4">
            <Card className="border-fire-500/20 dark:border-ice-500/20">
              <CardHeader>
                <CardTitle className="text-fire-600 dark:text-ice-400">Member Management</CardTitle>
                <CardDescription>Manage your fan club members and their subscriptions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Users className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Member Management</h3>
                  <p className="text-muted-foreground mb-4">
                    View and manage all your fan club members, their subscription tiers, and activity.
                  </p>
                  <Button className="bg-gradient-fire dark:bg-gradient-ice">View All Members</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="store" className="space-y-4">
            <Card className="border-fire-500/20 dark:border-ice-500/20">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-fire-600 dark:text-ice-400">Store Management</CardTitle>
                  <CardDescription>Manage your merchandise store and inventory</CardDescription>
                </div>
                <Button className="bg-gradient-fire dark:bg-gradient-ice">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Product
                </Button>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Store Management</h3>
                  <p className="text-muted-foreground mb-4">
                    Add, edit, and manage your merchandise inventory. Track sales and manage orders.
                  </p>
                  <div className="flex gap-2 justify-center">
                    <Button variant="outline">View Products</Button>
                    <Button className="bg-gradient-fire dark:bg-gradient-ice">Manage Orders</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sessions" className="space-y-4">
            <Card className="border-fire-500/20 dark:border-ice-500/20">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-fire-600 dark:text-ice-400">Video Sessions</CardTitle>
                  <CardDescription>Manage your video calls and meet & greet sessions</CardDescription>
                </div>
                <Button className="bg-gradient-fire dark:bg-gradient-ice">
                  <Plus className="h-4 w-4 mr-2" />
                  Schedule Session
                </Button>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Video className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Video Session Management</h3>
                  <p className="text-muted-foreground mb-4">
                    Schedule and manage your video calls with fans. Host live sessions and meet & greets.
                  </p>
                  <div className="flex gap-2 justify-center">
                    <Button variant="outline">View Schedule</Button>
                    <Button className="bg-gradient-fire dark:bg-gradient-ice">Start Live Session</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-4">
            <Card className="border-fire-500/20 dark:border-ice-500/20">
              <CardHeader>
                <CardTitle className="text-fire-600 dark:text-ice-400">Admin Settings</CardTitle>
                <CardDescription>Configure your fan club settings and preferences</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Settings className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Admin Settings</h3>
                  <p className="text-muted-foreground mb-4">
                    Configure payment settings, notification preferences, and other admin options.
                  </p>
                  <Button className="bg-gradient-fire dark:bg-gradient-ice">Open Settings</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
