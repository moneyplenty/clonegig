import { AdminDashboard } from "@/components/admin/admin-dashboard"
import { AdminProtection } from "@/components/admin/admin-protection"

export default function AdminPage() {
  return (
    <AdminProtection requiredRole="admin">
      <div className="container mx-auto py-8 px-4 min-h-[100dvh] bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        <h1 className="text-4xl font-bold mb-8 text-white">Admin Dashboard</h1>
        <AdminDashboard />
      </div>
    </AdminProtection>
  )
}
