"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/components/store/cart-context"
import { useToast } from "@/hooks/use-toast"
import { ShoppingCart, Star } from "lucide-react"

interface Product {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: string
  inStock: boolean
  isExclusive: boolean
  sizes: string[]
  colors: string[]
}

interface ProductGridProps {
  products: Product[]
}

export function ProductGrid({ products }: ProductGridProps) {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const { addItem } = useCart()
  const { toast } = useToast()

  const filteredProducts = products.filter(
    (product) => selectedCategory === "all" || product.category === selectedCategory,
  )

  const handleAddToCart = (product: Product) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    })

    toast({
      title: "Added to cart! 🛒",
      description: `${product.name} has been added to your cart.`,
    })
  }

  return (
    <div className="space-y-6">
      {/* Category Filter */}
      <div className="flex gap-2 flex-wrap">
        <Button
          variant={selectedCategory === "all" ? "default" : "outline"}
          onClick={() => setSelectedCategory("all")}
          className={selectedCategory === "all" ? "bg-gradient-fire dark:bg-gradient-ice" : ""}
        >
          All Products
        </Button>
        <Button
          variant={selectedCategory === "apparel" ? "default" : "outline"}
          onClick={() => setSelectedCategory("apparel")}
          className={selectedCategory === "apparel" ? "bg-gradient-fire dark:bg-gradient-ice" : ""}
        >
          Apparel
        </Button>
        <Button
          variant={selectedCategory === "accessories" ? "default" : "outline"}
          onClick={() => setSelectedCategory("accessories")}
          className={selectedCategory === "accessories" ? "bg-gradient-fire dark:bg-gradient-ice" : ""}
        >
          Accessories
        </Button>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <Card
            key={product.id}
            className="group border-fire-500/20 dark:border-ice-500/20 hover:border-fire-500/40 dark:hover:border-ice-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-fire-500/10 dark:hover:shadow-ice-500/10"
          >
            <CardHeader className="p-0">
              <div className="relative aspect-square overflow-hidden rounded-t-lg">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {product.isExclusive && (
                  <Badge className="absolute top-3 right-3 bg-fire-500 dark:bg-ice-500 text-white">
                    <Star className="h-3 w-3 mr-1" />
                    Exclusive
                  </Badge>
                )}
                {!product.inStock && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <Badge variant="destructive">Out of Stock</Badge>
                  </div>
                )}
              </div>
            </CardHeader>

            <CardContent className="p-4 space-y-2">
              <CardTitle className="text-lg group-hover:text-fire-600 dark:group-hover:text-ice-400 transition-colors">
                {product.name}
              </CardTitle>
              <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-fire-600 dark:text-ice-400">${product.price}</span>
                <div className="flex gap-1">
                  {product.colors.map((color, index) => (
                    <div
                      key={index}
                      className={`w-4 h-4 rounded-full border border-muted ${
                        color.toLowerCase() === "black"
                          ? "bg-black"
                          : color.toLowerCase() === "white"
                            ? "bg-white"
                            : "bg-gray-400"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </CardContent>

            <CardFooter className="p-4 pt-0">
              <Button
                onClick={() => handleAddToCart(product)}
                disabled={!product.inStock}
                className="w-full bg-gradient-fire dark:bg-gradient-ice hover:opacity-90 transition-opacity"
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                {product.inStock ? "Add to Cart" : "Out of Stock"}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
