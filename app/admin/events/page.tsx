import { AdminProtection } from "@/components/admin/admin-protection"
import { AdminEventManagement } from "@/components/admin/admin-event-management"

export default function AdminEventsPage() {
  return (
    <AdminProtection requiredRole="admin">
      <div className="flex flex-col min-h-[100dvh] bg-kelvin-background text-kelvin-foreground">
        <main className="flex-1 container mx-auto py-12 px-4 md:px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">Event Management</h1>
          <AdminEventManagement />
        </main>
      </div>
    </AdminProtection>
  )
}
