"use client"
import Image from "next/image"
import Link from "next/link"
import type { Product } from "@/types/index.d"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { formatPrice } from "@/lib/utils"
import { useCart } from "@/components/store/cart-context"
import { toast } from "@/hooks/use-toast"

interface FeaturedMerchandiseProps {
  initialProducts: Product[]
}

export function FeaturedMerchandise({ initialProducts }: FeaturedMerchandiseProps) {
  const { addToCart } = useCart()

  const handleAddToCart = (product: Product) => {
    addToCart(product, 1)
    toast({
      title: "Added to cart!",
      description: `${product.name} has been added to your cart.`,
    })
  }

  if (!initialProducts || initialProducts.length === 0) {
    return (
      <div className="flex items-center justify-center rounded-md border border-dashed p-8 text-muted-foreground">
        No featured merchandise available at the moment.
      </div>
    )
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {initialProducts.map((product) => (
        <Card key={product.id} className="flex flex-col overflow-hidden">
          <Link href={`/store/${product.id}`} className="relative block aspect-square overflow-hidden">
            <Image
              src={product.image_url || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover transition-all hover:scale-105"
            />
          </Link>
          <CardContent className="flex-1 p-4">
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <p className="text-muted-foreground">{product.description}</p>
            <p className="mt-2 text-xl font-bold">{formatPrice(product.price)}</p>
          </CardContent>
          <CardFooter className="p-4 pt-0">
            <Button className="w-full" onClick={() => handleAddToCart(product)}>
              Add to Cart
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
