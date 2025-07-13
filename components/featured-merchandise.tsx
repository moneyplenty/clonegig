"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Star } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const featuredProducts = [
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
  },
]

export function FeaturedMerchandise() {
  return (
    <section className="py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Featured Merchandise</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Show your support with official Kelvin Creekman merchandise and collectibles.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-start gap-6 py-12 lg:grid-cols-3 lg:gap-12">
          {featuredProducts.map((product) => (
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
                <p className="text-sm text-muted-foreground line-clamp-3">{product.description}</p>
                <div className="mt-4 flex items-center space-x-2">
                  <span className="text-2xl font-bold">${product.price}</span>
                  {product.originalPrice && (
                    <span className="text-lg text-muted-foreground line-through">${product.originalPrice}</span>
                  )}
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Add to Cart
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        <div className="flex justify-center">
          <Button variant="outline" size="lg" asChild>
            <Link href="/store">View All Products</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
