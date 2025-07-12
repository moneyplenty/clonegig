import { AdminProtection } from "@/components/admin/admin-protection"
import { AdminDashboard } from "@/components/admin/admin-dashboard"
import { createClient } from "@/lib/supabase/server"
import { cookies } from "next/headers"

export default async function AdminPage() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <AdminProtection user={user}>
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-4xl font-bold text-center mb-8">Admin Dashboard</h1>
        <AdminDashboard />
      </div>
    </AdminProtection>
  )
}
