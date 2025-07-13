import { AdminProtection } from "@/components/admin/admin-protection"
import { AdminUserManagement } from "@/components/admin/admin-user-management"

export default function AdminUsersPage() {
  return (
    <AdminProtection requiredRole="admin">
      <div className="container mx-auto py-8 px-4 md:px-6">
        <AdminUserManagement />
      </div>
    </AdminProtection>
  )
}
