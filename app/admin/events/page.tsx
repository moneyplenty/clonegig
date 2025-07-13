import { AdminEventManagement } from "@/components/admin/admin-event-management"
import { AdminProtection } from "@/components/admin/admin-protection"

export default function AdminEventsPage() {
  return (
    <AdminProtection>
      <AdminEventManagement />
    </AdminProtection>
  )
}
