import { AdminProtection } from "@/components/admin/admin-protection"
import { AdminEventManagement } from "@/components/admin/admin-event-management"

export default function AdminEventsPage() {
  return (
    <AdminProtection requiredRole="admin">
      <div className="container mx-auto py-8 px-4 md:px-6">
        <h1 className="text-4xl font-bold mb-8 text-center">Event Management</h1>
        <AdminEventManagement />
      </div>
    </AdminProtection>
  )
}
