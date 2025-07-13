"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import type { Product } from "@/types"
import { useCart } from "./cart-context"
import { toast } from "sonner"

interface ProductGridProps {
  products: Product[]
}

export function ProductGrid({ products }: ProductGridProps) {
  const { addToCart } = useCart()

  const handleAddToCart = (product: Product) => {
    addToCart(product)
    toast.success(`${product.name} added to cart!`)
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
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
            <Button
              className="w-full bg-electric-500 hover:bg-electric-600 text-white"
              onClick={() => handleAddToCart(product)}
            >
              Add to Cart
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
