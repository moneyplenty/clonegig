import { StoreHeader } from "@/components/store/store-header"
import { ProductGrid } from "@/components/store/product-grid"
import { StoreBanner } from "@/components/store/store-banner"
import { createClient } from "@/lib/supabase/server"
import { cookies } from "next/headers"

export const dynamic = "force-dynamic"

export default async function StorePage() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const { data: products, error } = await supabase.from("Product").select("*")

  if (error) {
    console.error("Error fetching products:", error)
    return <div>Error loading products.</div>
  }

  return (
    <div className="flex flex-col min-h-screen">
      <StoreBanner />
      <main className="flex-1 container mx-auto py-8 px-4">
        <StoreHeader />
        <ProductGrid products={products || []} />
      </main>
    </div>
  )
}
