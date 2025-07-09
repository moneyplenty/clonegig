import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const merchandise = [
  {
    id: 1,
    name: "Limited Edition Vinyl",
    description: "Signed collector's edition with exclusive artwork",
    price: 49.99,
    image: "/placeholder.svg?height=400&width=400",
    exclusive: true,
    inStock: true,
  },
  {
    id: 2,
    name: "Tour Hoodie 2025",
    description: "Premium quality hoodie with tour dates",
    price: 59.99,
    image: "/placeholder.svg?height=400&width=400",
    exclusive: true,
    inStock: true,
  },
  {
    id: 3,
    name: "Collector's Photobook",
    description: "Hardcover photobook with never-before-seen images",
    price: 39.99,
    image: "/placeholder.svg?height=400&width=400",
    exclusive: false,
    inStock: false,
  },
]

export function FeaturedMerchandise() {
  return (
    <div className="grid gap-6 pt-8 md:grid-cols-2 lg:grid-cols-3">
      {merchandise.map((item) => (
        <Card key={item.id} className="overflow-hidden group">
          <div className="relative aspect-square bg-muted">
            <Image
              src={item.image || "/placeholder.svg"}
              alt={item.name}
              fill
              className="object-cover transition-all group-hover:scale-105"
            />
            {item.exclusive && <Badge className="absolute top-2 right-2 bg-primary">Members Only</Badge>}
            {!item.inStock && (
              <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
                <Badge variant="outline" className="text-lg font-semibold px-4 py-2">
                  Coming Soon
                </Badge>
              </div>
            )}
          </div>
          <CardHeader className="p-4">
            <CardTitle className="text-lg">{item.name}</CardTitle>
            <CardDescription>{item.description}</CardDescription>
          </CardHeader>
          <CardFooter className="p-4 pt-0 flex justify-between items-center">
            <span className="font-bold">${item.price.toFixed(2)}</span>
            {item.inStock ? (
              <Button asChild size="sm" className="rounded-full">
                <Link href={`/store/product/${item.id}`}>{item.exclusive ? "Members Buy" : "Buy Now"}</Link>
              </Button>
            ) : (
              <Button size="sm" variant="outline" className="rounded-full" disabled>
                Notify Me
              </Button>
            )}
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
