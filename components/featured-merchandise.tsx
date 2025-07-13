import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { createClient } from "@/lib/supabase/server"
import { cookies } from "next/headers"

interface Product {
  id: string
  name: string
  description: string
  price: number
  image_url: string
  stock: number
}

export async function FeaturedMerchandise() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const { data: products, error } = await supabase.from("products").select("*").limit(4) // Fetch a few featured products

  if (error) {
    console.error("Error fetching products:", error)
    return <div>Error loading merchandise.</div>
  }

  return (
    <section className="py-12 md:py-20 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-gray-900 dark:text-white">
          Featured Merchandise
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <Card key={product.id} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="relative w-full h-48">
                <Image
                  src={product.image_url || "/placeholder.svg"}
                  alt={product.name}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-t-lg"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-xl font-semibold">{product.name}</CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400">{product.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-primary">${product.price.toFixed(2)}</span>
                  <Link href={`/store?product=${product.id}`}>
                    <Button variant="outline">View Product</Button>
                  </Link>
                </div>
                {product.stock === 0 && <p className="text-red-500 text-sm font-medium">Out of Stock</p>}
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link href="/store">
            <Button
              size="lg"
              className="bg-purple-600 hover:bg-purple-700 text-white text-lg px-8 py-3 rounded-full shadow-md"
            >
              Browse All Merchandise
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
