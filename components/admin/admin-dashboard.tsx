"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Chart } from "@/components/ui/chart"
import { DollarSign, Users, Calendar, Package } from "lucide-react"

export function AdminDashboard() {
  const salesData = [
    { name: "Jan", sales: 4000 },
    { name: "Feb", sales: 3000 },
    { name: "Mar", sales: 5000 },
    { name: "Apr", sales: 4500 },
    { name: "May", sales: 6000 },
    { name: "Jun", sales: 5500 },
  ]

  const usersData = [
    { name: "Jan", users: 100 },
    { name: "Feb", users: 120 },
    { name: "Mar", users: 150 },
    { name: "Apr", users: 130 },
    { name: "May", users: 180 },
    { name: "Jun", users: 200 },
  ]

  const bookingsData = [
    { name: "Jan", bookings: 10 },
    { name: "Feb", bookings: 15 },
    { name: "Mar", bookings: 20 },
    { name: "Apr", bookings: 18 },
    { name: "May", bookings: 25 },
    { name: "Jun", bookings: 30 },
  ]

  const productStockData = [
    { name: "T-Shirt", stock: 100 },
    { name: "Beanie", stock: 50 },
    { name: "Mug", stock: 75 },
    { name: "Pin Set", stock: 60 },
  ]

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,231.89</div>
            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+2350</div>
            <p className="text-xs text-muted-foreground">+180.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Event Bookings</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+12,234</div>
            <p className="text-xs text-muted-foreground">+19% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Products in Stock</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">573</div>
            <p className="text-xs text-muted-foreground">+50 since last week</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Sales Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <Chart data={salesData} type="line" xAxisKey="name" yAxisKey="sales" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>New Users Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <Chart data={usersData} type="area" xAxisKey="name" yAxisKey="users" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Event Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <Chart data={bookingsData} type="bar" xAxisKey="name" yAxisKey="bookings" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Product Stock Levels</CardTitle>
          </CardHeader>
          <CardContent>
            <Chart data={productStockData} type="bar" xAxisKey="name" yAxisKey="stock" />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
