import { AdminContentManagement } from "@/components/admin/admin-content-management"
import { AdminProtection } from "@/components/admin/admin-protection"

export default function AdminContentPage() {
  return (
    <AdminProtection>
      <AdminContentManagement />
    </AdminProtection>
  )
}
