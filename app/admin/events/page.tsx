import { AdminProtection } from "@/components/admin/admin-protection"
import { AdminEventManagement } from "@/components/admin/admin-event-management"
import { createClient } from "@/lib/supabase/server"
import { cookies } from "next/headers"

export const dynamic = "force-dynamic"

export default async function AdminEventsPage() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <AdminProtection user={user}>
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-4xl font-bold text-center mb-8">Event Management</h1>
        <AdminEventManagement />
      </div>
    </AdminProtection>
  )
}
