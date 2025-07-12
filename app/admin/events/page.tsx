import { AdminProtection } from "@/components/admin/admin-protection"
import { AdminEventManagement } from "@/components/admin/admin-event-management"

export default function AdminEventsPage() {
  return (
    <AdminProtection>
      <div className="container mx-auto px-4 py-12 md:py-24">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-12">
          <span className="bg-gradient-to-r from-electric-400 to-frost-400 bg-clip-text text-transparent">
            Event Management
          </span>
        </h1>
        <AdminEventManagement />
      </div>
    </AdminProtection>
  )
}
