import { AdminProtection } from "@/components/admin/admin-protection"
import { AdminContentManagement } from "@/components/admin/admin-content-management"

export default function AdminContentPage() {
  return (
    <AdminProtection requiredRole="admin">
      <div className="container mx-auto py-8 px-4 md:px-6">
        <h1 className="text-4xl font-bold mb-8 text-center">Content Management</h1>
        <AdminContentManagement />
      </div>
    </AdminProtection>
  )
}
