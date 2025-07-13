"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function AdminDashboard() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <Card className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-colors">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-2xl font-bold text-white">Product Management</CardTitle>
          <Icons.package className="h-6 w-6 text-blue-400" />
        </CardHeader>
        <CardContent>
          <p className="text-sm text-slate-300 mt-2">Add, edit, or remove merchandise from your store.</p>
          <Button asChild className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white">
            <Link href="/admin/store">Manage Products</Link>
          </Button>
        </CardContent>
      </Card>

      <Card className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-colors">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-2xl font-bold text-white">Event Management</CardTitle>
          <Icons.calendar className="h-6 w-6 text-purple-400" />
        </CardHeader>
        <CardContent>
          <p className="text-sm text-slate-300 mt-2">Schedule and manage upcoming events and meet & greets.</p>
          <Button asChild className="mt-4 w-full bg-purple-600 hover:bg-purple-700 text-white">
            <Link href="/admin/events">Manage Events</Link>
          </Button>
        </CardContent>
      </Card>

      <Card className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-colors">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-2xl font-bold text-white">Meet & Greet</CardTitle>
          <Icons.video className="h-6 w-6 text-green-400" />
        </CardHeader>
        <CardContent>
          <p className="text-sm text-slate-300 mt-2">Manage meet & greet sessions and video calls with fans.</p>
          <Button asChild className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white">
            <Link href="/admin/meet-greet">Manage Sessions</Link>
          </Button>
        </CardContent>
      </Card>

      <Card className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-colors">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-2xl font-bold text-white">Content Management</CardTitle>
          <Icons.fileText className="h-6 w-6 text-yellow-400" />
        </CardHeader>
        <CardContent>
          <p className="text-sm text-slate-300 mt-2">
            Upload and organize exclusive content for different membership tiers.
          </p>
          <Button asChild className="mt-4 w-full bg-yellow-600 hover:bg-yellow-700 text-white">
            <Link href="/admin/content">Manage Content</Link>
          </Button>
        </CardContent>
      </Card>

      <Card className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-colors">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-2xl font-bold text-white">User Management</CardTitle>
          <Icons.users className="h-6 w-6 text-red-400" />
        </CardHeader>
        <CardContent>
          <p className="text-sm text-slate-300 mt-2">View and manage fan club members and their roles.</p>
          <Button asChild className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white">
            <Link href="/admin/users">Manage Users</Link>
          </Button>
        </CardContent>
      </Card>

      <Card className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-colors">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-2xl font-bold text-white">Order Management</CardTitle>
          <Icons.truck className="h-6 w-6 text-indigo-400" />
        </CardHeader>
        <CardContent>
          <p className="text-sm text-slate-300 mt-2">Track and process merchandise orders.</p>
          <Button asChild className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 text-white">
            <Link href="/admin/orders">Manage Orders</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
