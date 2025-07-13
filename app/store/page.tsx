import { createClient } from "@/lib/supabase/server"
import { cookies } from "next/headers"
import { ProductGrid } from "@/components/store/product-grid"
import { StoreHeader } from "@/components/store/store-header"
import { CartProvider } from "@/components/store/cart-context"
import { Suspense } from "react"
import StoreLoading from "./loading"

export default async function StorePage() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const { data: products, error } = await supabase.from("products").select("*")

  if (error) {
    console.error("Error fetching products:", error)
    return <div>Error loading products.</div>
  }

  return (
    <CartProvider>
      <div className="container mx-auto px-4 py-8 md:py-12">
        <StoreHeader />
        <Suspense fallback={<StoreLoading />}>
          <ProductGrid products={products || []} />
        </Suspense>
      </div>
    </CartProvider>
  )
}
