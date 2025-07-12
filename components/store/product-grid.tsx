"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useCart } from "@/components/store/cart-context"
import { toast } from "@/components/ui/use-toast"

interface Product {
  id: string
  name: string
  description: string
  price: number
  imageUrl: string
}

interface ProductGridProps {
  products: Product[]
}

export function ProductGrid({ products }: ProductGridProps) {
  const { addToCart } = useCart()

  const handleAddToCart = (product: Product) => {
    addToCart(product)
    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart.`,
      variant: "success",
    })
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {products.map((product) => (
        <Card
          key={product.id}
          className="group bg-background/50 backdrop-blur-lg border-electric-700/30 hover:border-electric-500/50 transition-all duration-300 hover:scale-105 overflow-hidden"
        >
          <div className="relative aspect-square overflow-hidden">
            <Image
              src={product.imageUrl || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
            />
          </div>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg leading-tight text-electric-100">{product.name}</CardTitle>
            <CardDescription className="line-clamp-2 text-muted-foreground">{product.description}</CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-2xl font-bold text-electric-400 mb-4">${product.price.toFixed(2)}</div>
          </CardContent>
          <CardFooter>
            <Button
              onClick={() => handleAddToCart(product)}
              className="w-full bg-gradient-electric hover:animate-electric-pulse"
            >
              Add to Cart
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
