"use client"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useCart } from "@/components/store/cart-context"
import { toast } from "sonner"

interface Product {
  id: string
  name: string
  description: string
  price: number
  image: string
}

interface ProductGridProps {
  products: Product[]
}

export function ProductGrid({ products }: ProductGridProps) {
  const { addToCart } = useCart()

  const handleAddToCart = (product: Product) => {
    addToCart({ ...product, quantity: 1 })
    toast.success(`${product.name} added to cart!`)
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <Card key={product.id} className="flex flex-col">
          <CardHeader className="p-0">
            <div className="relative w-full h-48">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                layout="fill"
                objectFit="cover"
                className="rounded-t-lg"
              />
            </div>
          </CardHeader>
          <CardContent className="flex-1 p-4">
            <CardTitle className="text-lg font-semibold mb-2">{product.name}</CardTitle>
            <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3">{product.description}</p>
          </CardContent>
          <CardFooter className="flex justify-between items-center p-4 border-t">
            <span className="text-xl font-bold">${product.price.toFixed(2)}</span>
            <Button onClick={() => handleAddToCart(product)}>Add to Cart</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
