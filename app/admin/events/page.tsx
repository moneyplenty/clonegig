import { AdminEventManagement } from "@/components/admin/admin-event-management"
import { AdminProtection } from "@/components/admin/admin-protection"

export default function AdminEventsPage() {
  return (
    <AdminProtection>
      <div className="container mx-auto py-8">
        <h1 className="text-4xl font-bold mb-8 text-center">Event Management</h1>
        <AdminEventManagement />
      </div>
    </AdminProtection>
  )
}
