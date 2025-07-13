import { AdminUserManagement } from "@/components/admin/admin-user-management"
import { AdminProtection } from "@/components/admin/admin-protection"

export default function AdminUsersPage() {
  return (
    <AdminProtection>
      <AdminUserManagement />
    </AdminProtection>
  )
}
