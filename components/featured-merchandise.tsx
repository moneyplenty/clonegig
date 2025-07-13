import { CardFooter } from "@/components/ui/card"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { cookies } from "next/headers"
import type { Product } from "@/types"

export async function FeaturedMerchandise() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const { data: products, error } = await supabase.from("Product").select("*").limit(4) // Fetch up to 4 featured products

  if (error) {
    console.error("Error fetching featured products:", error)
    return <div>Error loading featured merchandise.</div>
  }

  if (!products || products.length === 0) {
    return <div className="text-center text-kelvin-foreground/80">No featured merchandise available at the moment.</div>
  }

  return (
    <section className="py-12 bg-kelvin-background text-kelvin-foreground">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-8">Featured Merchandise</h2>
        <p className="text-lg text-kelvin-foreground/80 text-center max-w-3xl mx-auto mb-12">
          Discover the latest and most popular gear from Kelvin Creekman&apos;s official store.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product: Product) => (
            <Card
              key={product.id}
              className="bg-kelvin-card text-kelvin-card-foreground border-kelvin-border shadow-lg flex flex-col"
            >
              <CardHeader className="p-0">
                <div className="relative w-full h-48">
                  <Image
                    src={product.image || "/placeholder.png"}
                    alt={product.name}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-t-lg"
                  />
                </div>
              </CardHeader>
              <CardContent className="flex-1 p-4">
                <CardTitle className="text-xl font-semibold mb-2">{product.name}</CardTitle>
                <CardDescription className="text-kelvin-card-foreground/80 line-clamp-3">
                  {product.description}
                </CardDescription>
                <p className="text-2xl font-bold text-electric-400 mt-4">${product.price.toFixed(2)}</p>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Button asChild className="w-full bg-electric-500 hover:bg-electric-600 text-white">
                  <Link href={`/store?product=${product.id}`}>View Product</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        <div className="text-center mt-12">
          <Button asChild size="lg" className="bg-frost-500 hover:bg-frost-600 text-white">
            <Link href="/store">View All Merchandise</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
