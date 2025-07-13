"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useCart } from "./cart-context"
import { toast } from "@/hooks/use-toast"
import { ShoppingCart, Star } from "lucide-react"
import Image from "next/image"

interface Product {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: string
  stock_quantity: number
  is_featured: boolean
}

export function ProductGrid() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const { addItem } = useCart()

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      // Mock data for now - replace with actual API call
      const mockProducts: Product[] = [
        {
          id: "1",
          name: "Kelvin Creekman T-Shirt",
          description: "Official band t-shirt with electric design",
          price: 25.99,
          image: "/placeholder.svg?height=300&width=300",
          category: "Apparel",
          stock_quantity: 50,
          is_featured: true,
        },
        {
          id: "2",
          name: "Electric Dreams Vinyl",
          description: "Limited edition vinyl record",
          price: 34.99,
          image: "/placeholder.svg?height=300&width=300",
          category: "Music",
          stock_quantity: 25,
          is_featured: true,
        },
        {
          id: "3",
          name: "Band Logo Hoodie",
          description: "Comfortable hoodie with embroidered logo",
          price: 45.99,
          image: "/placeholder.svg?height=300&width=300",
          category: "Apparel",
          stock_quantity: 30,
          is_featured: false,
        },
        {
          id: "4",
          name: "Concert Poster Set",
          description: "Collection of vintage concert posters",
          price: 19.99,
          image: "/placeholder.svg?height=300&width=300",
          category: "Collectibles",
          stock_quantity: 15,
          is_featured: false,
        },
        {
          id: "5",
          name: "Guitar Pick Set",
          description: "Official guitar picks used by Kelvin",
          price: 12.99,
          image: "/placeholder.svg?height=300&width=300",
          category: "Accessories",
          stock_quantity: 100,
          is_featured: true,
        },
        {
          id: "6",
          name: "Signed Photo",
          description: "Autographed 8x10 photo",
          price: 29.99,
          image: "/placeholder.svg?height=300&width=300",
          category: "Collectibles",
          stock_quantity: 10,
          is_featured: false,
        },
      ]

      setProducts(mockProducts)
    } catch (error) {
      console.error("Error fetching products:", error)
      toast({
        title: "Error",
        description: "Failed to load products. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleAddToCart = (product: Product) => {
    if (product.stock_quantity <= 0) {
      toast({
        title: "Out of Stock",
        description: "This item is currently out of stock.",
        variant: "destructive",
      })
      return
    }

    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    })
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader>
              <div className="h-48 bg-muted rounded-lg"></div>
            </CardHeader>
            <CardContent>
              <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-muted rounded w-1/2"></div>
            </CardContent>
            <CardFooter>
              <div className="h-10 bg-muted rounded w-full"></div>
            </CardFooter>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <Card key={product.id} className="overflow-hidden">
          <CardHeader className="p-0">
            <div className="relative">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                width={300}
                height={300}
                className="w-full h-48 object-cover"
              />
              {product.is_featured && (
                <Badge className="absolute top-2 left-2 bg-yellow-500 text-yellow-900">
                  <Star className="h-3 w-3 mr-1" />
                  Featured
                </Badge>
              )}
              {product.stock_quantity <= 5 && product.stock_quantity > 0 && (
                <Badge variant="destructive" className="absolute top-2 right-2">
                  Low Stock
                </Badge>
              )}
              {product.stock_quantity === 0 && (
                <Badge variant="secondary" className="absolute top-2 right-2">
                  Out of Stock
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent className="p-4">
            <CardTitle className="text-lg mb-2">{product.name}</CardTitle>
            <CardDescription className="text-sm mb-3">{product.description}</CardDescription>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold">${product.price}</span>
              <Badge variant="outline">{product.category}</Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-2">{product.stock_quantity} in stock</p>
          </CardContent>
          <CardFooter className="p-4 pt-0">
            <Button onClick={() => handleAddToCart(product)} disabled={product.stock_quantity === 0} className="w-full">
              <ShoppingCart className="h-4 w-4 mr-2" />
              {product.stock_quantity === 0 ? "Out of Stock" : "Add to Cart"}
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
