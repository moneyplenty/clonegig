"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ShoppingCart, Star, Search } from "lucide-react"
import Image from "next/image"

const products = [
  {
    id: 1,
    name: "Electric Dreams Album Vinyl",
    description: "Limited edition vinyl record of Kelvin's latest album with exclusive artwork.",
    price: 29.99,
    originalPrice: 39.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.8,
    reviews: 124,
    isLimited: true,
    category: "Music",
    inStock: true,
  },
  {
    id: 2,
    name: "Ice Legion Hoodie",
    description: "Premium quality hoodie with embroidered Ice Legion logo. Available in multiple colors.",
    price: 59.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.9,
    reviews: 89,
    isLimited: false,
    category: "Apparel",
    inStock: true,
  },
  {
    id: 3,
    name: "Signed Guitar Pick Set",
    description: "Set of 5 guitar picks personally signed by Kelvin Creekman. Comes with certificate of authenticity.",
    price: 24.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 5.0,
    reviews: 67,
    isLimited: true,
    category: "Collectibles",
    inStock: false,
  },
  {
    id: 4,
    name: "Ice Legion T-Shirt",
    description: "Comfortable cotton t-shirt with Ice Legion design. Perfect for concerts and casual wear.",
    price: 24.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.7,
    reviews: 156,
    isLimited: false,
    category: "Apparel",
    inStock: true,
  },
  {
    id: 5,
    name: "Kelvin's Guitar Strap",
    description: "Replica of the guitar strap used by Kelvin during live performances.",
    price: 34.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.6,
    reviews: 43,
    isLimited: false,
    category: "Accessories",
    inStock: true,
  },
  {
    id: 6,
    name: "Exclusive Photo Book",
    description: "Behind-the-scenes photo book featuring rare images from tours and recording sessions.",
    price: 49.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.9,
    reviews: 78,
    isLimited: true,
    category: "Books",
    inStock: true,
  },
]

export default function StorePage() {
  return (
    <div className="container px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Official Store</h1>
        <p className="text-xl text-muted-foreground">
          Show your support with official Kelvin Creekman merchandise and collectibles.
        </p>
      </div>

      {/* Filters */}
      <div className="mb-8 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search products..." className="pl-10" />
        </div>
        <Select>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="music">Music</SelectItem>
            <SelectItem value="apparel">Apparel</SelectItem>
            <SelectItem value="collectibles">Collectibles</SelectItem>
            <SelectItem value="accessories">Accessories</SelectItem>
            <SelectItem value="books">Books</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="featured">Featured</SelectItem>
            <SelectItem value="price-low">Price: Low to High</SelectItem>
            <SelectItem value="price-high">Price: High to Low</SelectItem>
            <SelectItem value="rating">Highest Rated</SelectItem>
            <SelectItem value="newest">Newest</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Products Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <Card key={product.id} className="flex flex-col">
            <div className="relative aspect-square overflow-hidden rounded-t-lg">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover transition-transform hover:scale-105"
              />
              <div className="absolute top-2 left-2">
                <Badge variant="secondary">{product.category}</Badge>
              </div>
              {product.isLimited && (
                <div className="absolute top-2 right-2">
                  <Badge variant="destructive">Limited</Badge>
                </div>
              )}
              {product.originalPrice && (
                <div className="absolute bottom-2 left-2">
                  <Badge variant="default">Sale</Badge>
                </div>
              )}
              {!product.inStock && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <Badge variant="destructive" className="text-lg">
                    Out of Stock
                  </Badge>
                </div>
              )}
            </div>
            <CardHeader>
              <CardTitle className="line-clamp-2">{product.name}</CardTitle>
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">{product.rating}</span>
                </div>
                <span className="text-sm text-muted-foreground">({product.reviews} reviews)</span>
              </div>
            </CardHeader>
            <CardContent className="flex-1">
              <p className="text-sm text-muted-foreground line-clamp-3 mb-4">{product.description}</p>
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-bold">${product.price}</span>
                {product.originalPrice && (
                  <span className="text-lg text-muted-foreground line-through">${product.originalPrice}</span>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" disabled={!product.inStock}>
                <ShoppingCart className="mr-2 h-4 w-4" />
                {product.inStock ? "Add to Cart" : "Out of Stock"}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
