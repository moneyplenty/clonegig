import { createServerSupabaseClient } from "@/lib/supabase/server"
import { ProductGrid } from "@/components/store/product-grid"
import { StoreHeader } from "@/components/store/store-header"
import { StoreBanner } from "@/components/store/store-banner"

export default async function StorePage() {
  const supabase = createServerSupabaseClient()

  const { data: products, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching products:", error.message)
    return <div className="container py-12 text-center">Failed to load products.</div>
  }

  return (
    <main>
      <StoreBanner />
      <StoreHeader />
      <section className="container py-8">
        <ProductGrid initialProducts={products || []} />
      </section>
    </main>
  )
}
