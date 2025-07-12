"use client"

import { AdminDashboard } from "@/components/admin/admin-dashboard"
import { AdminProtection } from "@/components/admin/admin-protection"

export default function AdminPage() {
  return (
    <AdminProtection>
      <div className="container mx-auto py-8">
        <h1 className="text-4xl font-bold mb-8 text-center">Admin Dashboard</h1>
        <AdminDashboard />
      </div>
    </AdminProtection>
  )
}
