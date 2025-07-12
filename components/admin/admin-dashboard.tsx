"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, ShoppingBag, CalendarDays, Newspaper, Settings } from "lucide-react"
import Link from "next/link"
import { AdminEventManagement } from "@/components/admin/admin-event-management"

export function AdminDashboard() {
  return (
    <div className="grid gap-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="bg-background/50 backdrop-blur-lg border-electric-700/30">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-electric-200">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-electric-100">2,350</div>
            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
          </CardContent>
        </Card>
        <Card className="bg-background/50 backdrop-blur-lg border-electric-700/30">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-electric-200">Sales</CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-electric-100">$12,345.78</div>
            <p className="text-xs text-muted-foreground">+15.5% from last month</p>
          </CardContent>
        </Card>
        <Card className="bg-background/50 backdrop-blur-lg border-electric-700/30">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-electric-200">Active Events</CardTitle>
            <CalendarDays className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-electric-100">5</div>
            <p className="text-xs text-muted-foreground">Upcoming and ongoing</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="events" className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-electric-900/50 border border-electric-700">
          <TabsTrigger
            value="events"
            className="text-electric-200 data-[state=active]:bg-electric-700 data-[state=active]:text-electric-100"
          >
            Events
          </TabsTrigger>
          <TabsTrigger
            value="products"
            className="text-electric-200 data-[state=active]:bg-electric-700 data-[state=active]:text-electric-100"
          >
            Products
          </TabsTrigger>
          <TabsTrigger
            value="content"
            className="text-electric-200 data-[state=active]:bg-electric-700 data-[state=active]:text-electric-100"
          >
            Content
          </TabsTrigger>
          <TabsTrigger
            value="settings"
            className="text-electric-200 data-[state=active]:bg-electric-700 data-[state=active]:text-electric-100"
          >
            Settings
          </TabsTrigger>
        </TabsList>
        <TabsContent value="events" className="mt-6">
          <Card className="bg-background/50 backdrop-blur-lg border-electric-700/30">
            <CardHeader>
              <CardTitle className="text-electric-200">Event Management</CardTitle>
            </CardHeader>
            <CardContent>
              <AdminEventManagement />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="products" className="mt-6">
          <Card className="bg-background/50 backdrop-blur-lg border-electric-700/30">
            <CardHeader>
              <CardTitle className="text-electric-200">Product Management</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Manage your merchandise here.</p>
              <Button className="mt-4 bg-gradient-electric hover:animate-electric-pulse" asChild>
                <Link href="/admin/store">Go to Product Admin</Link>
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="content" className="mt-6">
          <Card className="bg-background/50 backdrop-blur-lg border-electric-700/30">
            <CardHeader>
              <CardTitle className="text-electric-200">Content Management</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Upload and manage exclusive content.</p>
              <Button className="mt-4 bg-gradient-electric hover:animate-electric-pulse">
                <Newspaper className="mr-2 h-4 w-4" /> Manage Content
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="settings" className="mt-6">
          <Card className="bg-background/50 backdrop-blur-lg border-electric-700/30">
            <CardHeader>
              <CardTitle className="text-electric-200">Admin Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Configure admin panel settings.</p>
              <Button className="mt-4 bg-gradient-electric hover:animate-electric-pulse">
                <Settings className="mr-2 h-4 w-4" /> General Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
