import { AdminMeetGreetDashboard } from "@/components/admin/admin-meet-greet-dashboard"
import { AdminProtection } from "@/components/admin/admin-protection"
import { createClient } from "@/lib/supabase/server"
import { cookies } from "next/headers"

export default async function AdminMeetGreetPage() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <AdminProtection requiredRole="admin">
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-8 text-white">Meet & Greet Management</h1>
        <AdminMeetGreetDashboard />
      </div>
    </AdminProtection>
  )
}
