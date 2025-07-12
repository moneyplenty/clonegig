import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface Product {
  id: string
  name: string
  price: number
  imageUrl: string
}

const mockProducts: Product[] = [
  {
    id: "1",
    name: "Electric Storm T-Shirt",
    price: 25.0,
    imageUrl: "/merch/kelvin-tshirt.webp",
  },
  {
    id: "2",
    name: "Frozen Fire Beanie",
    price: 20.0,
    imageUrl: "/merch/beanie.jpg",
  },
  {
    id: "3",
    name: "Ice Legion Mug (Black)",
    price: 15.0,
    imageUrl: "/merch/mug-black.webp",
  },
  {
    id: "4",
    name: "Signed Notepad",
    price: 30.0,
    imageUrl: "/merch/notepad.webp",
  },
]

export function FeaturedMerchandise() {
  return (
    <section className="container mx-auto px-4 py-12 md:py-24">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
        <span className="bg-gradient-to-r from-electric-400 to-frost-400 bg-clip-text text-transparent">
          Featured Merchandise
        </span>
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {mockProducts.map((product) => (
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
            </CardHeader>
            <CardContent className="pt-0">
              <div className="text-2xl font-bold text-electric-400">${product.price.toFixed(2)}</div>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full bg-gradient-electric hover:animate-electric-pulse">
                <Link href="/store">View Product</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      <div className="text-center mt-12">
        <Button asChild size="lg" className="bg-gradient-electric hover:animate-electric-pulse">
          <Link href="/store">View All Merchandise</Link>
        </Button>
      </div>
    </section>
  )
}
