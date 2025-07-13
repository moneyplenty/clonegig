import { AdminProtection } from "@/components/admin/admin-protection"
import { AdminDashboard } from "@/components/admin/admin-dashboard"

export default function AdminPage() {
  return (
    <AdminProtection requiredRole="admin">
      <div className="container mx-auto py-8 px-4 md:px-6">
        <div className="flex flex-col space-y-4 mb-8">
          <h1 className="text-4xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage your fan club website from this central dashboard.</p>
        </div>
        <AdminDashboard />
      </div>
    </AdminProtection>
  )
}
