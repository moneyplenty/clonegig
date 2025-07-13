
import { AdminProtection } from "@/components/admin/admin-protection"
import { AdminStoreManagement } from "@/components/admin/admin-store-management"

export default function AdminStorePage() {
  return (
    <AdminProtection requiredRole="admin">
      <div className="container mx-auto py-8 px-4 md:px-6">
        <h1 className="text-4xl font-bold mb-8 text-center">Store Management</h1>
        <AdminStoreManagement />
      </div>
    </AdminProtection>
  )
}
