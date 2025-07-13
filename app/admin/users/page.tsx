
import { AdminProtection } from "@/components/admin/admin-protection"
import { AdminUserManagement } from "@/components/admin/admin-user-management"

export default function AdminUsersPage() {
  return (
    <AdminProtection requiredRole="admin">
      <div className="container mx-auto py-8 px-4 md:px-6">
        <h1 className="text-4xl font-bold mb-8 text-center">User Management</h1>
        <AdminUserManagement />
      </div>
    </AdminProtection>
  )
}
