"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useContext } from "react"
import { CartContext } from "./cart-context"
import { toast } from "@/hooks/use-toast"

interface Product {
  id: string
  name: string
  description: string
  price: number
  image_url: string
  stock: number
}

interface ProductGridProps {
  products: Product[]
}

export function ProductGrid({ products }: ProductGridProps) {
  const { addToCart } = useContext(CartContext)

  const handleAddToCart = (product: Product) => {
    addToCart(product)
    toast({
      title: "Added to cart!",
      description: `${product.name} has been added to your cart.`,
    })
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
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
              <Button onClick={() => handleAddToCart(product)} disabled={product.stock === 0}>
                {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
              </Button>
            </div>
            {product.stock > 0 && product.stock <= 10 && (
              <p className="text-orange-500 text-sm font-medium">Only {product.stock} left in stock!</p>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
