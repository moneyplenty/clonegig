"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Package, Calendar, FileText, Users } from "lucide-react"

export function AdminDashboard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Link href="/admin/store">
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Store Management</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">Products & Orders</p>
            <p className="text-xs text-muted-foreground">Manage merchandise, inventory, and sales.</p>
          </CardContent>
        </Card>
      </Link>

      <Link href="/admin/events">
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Event Management</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">Concerts & Meet-Greets</p>
            <p className="text-xs text-muted-foreground">Schedule and manage fan events.</p>
          </CardContent>
        </Card>
      </Link>

      <Link href="/admin/content">
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Content Management</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">Blogs & Media</p>
            <p className="text-xs text-muted-foreground">Upload and organize exclusive content.</p>
          </CardContent>
        </Card>
      </Link>

      <Link href="/admin/users">
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">User Management</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">Fan & Premium Users</p>
            <p className="text-xs text-muted-foreground">Manage user roles and access.</p>
          </CardContent>
        </Card>
      </Link>
    </div>
  )
}
