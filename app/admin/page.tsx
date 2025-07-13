import { AdminDashboard } from "@/components/admin/admin-dashboard"
import { AdminProtection } from "@/components/admin/admin-protection"

export default function AdminPage() {
  return (
    <AdminProtection>
      <AdminDashboard />
    </AdminProtection>
  )
}
