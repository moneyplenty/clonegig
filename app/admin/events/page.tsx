import { AdminProtection } from "@/components/admin/admin-protection"
import { AdminEventManagement } from "@/components/admin/admin-event-management"

export default function AdminEventsPage() {
  return (
    <AdminProtection>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Event Management</h1>
            <p className="text-slate-300">Manage all events, bookings, and attendee information</p>
          </div>

          <AdminEventManagement />
        </div>
      </div>
    </AdminProtection>
  )
}
