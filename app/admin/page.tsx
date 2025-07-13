import { AdminProtection } from "@/components/admin/admin-protection"
import { AdminDashboard } from "@/components/admin/admin-dashboard"

export default function AdminPage() {
  return (
    <AdminProtection requiredRole="admin">
      <div className="container mx-auto py-8 px-4 md:px-6">
        <h1 className="text-4xl font-bold mb-8 text-center">Admin Dashboard</h1>
        <AdminDashboard />
      </div>
    </AdminProtection>
  )
}
