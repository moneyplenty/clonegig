import { createClient } from "@/lib/supabase/server"
import { cookies } from "next/headers"
import { AdminStoreManagement } from "@/components/admin/admin-store-management"
import { AdminProtection } from "@/components/admin/admin-protection"

export default async function AdminStorePage() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const { data: products, error } = await supabase.from("products").select("*")

  if (error) {
    console.error("Error fetching products:", error)
    return <div>Error loading products.</div>
  }

  return (
    <AdminProtection>
      <AdminStoreManagement initialProducts={products || []} />
    </AdminProtection>
  )
}
