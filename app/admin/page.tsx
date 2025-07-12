import type { Metadata } from "next"
import { AdminDashboard } from "@/components/admin/admin-dashboard"
import { AdminProtection } from "@/components/admin/admin-protection"

export const metadata: Metadata = {
  title: "Admin Dashboard | Kelvin Creekman Fan Club",
  description: "Admin dashboard for managing the fan club",
}

export default function AdminPage() {
  return (
    <AdminProtection>
      <AdminDashboard />
    </AdminProtection>
  )
}
