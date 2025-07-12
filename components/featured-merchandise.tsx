import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export function FeaturedMerchandise() {
  const featuredProducts = [
    {
      id: 1,
      name: "Kelvin Creekman T-Shirt",
      price: 25.0,
      image: "/merch/kelvin-tshirt.webp",
      description: "Official band t-shirt, 100% cotton.",
    },
    {
      id: 2,
      name: "Icy Electrifying Beanie",
      price: 18.0,
      image: "/merch/beanie.jpg",
      description: "Stay warm with this electrifying beanie.",
    },
    {
      id: 3,
      name: "Kelvin Creekman Mug (Black)",
      price: 12.0,
      image: "/merch/mug-black.webp",
      description: "Start your day with Kelvin's energy.",
    },
  ]

  return (
    <section className="py-12 md:py-24 bg-gradient-to-b from-background to-electric-950/10">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-8">
          <span className="bg-gradient-to-r from-electric-400 to-frost-400 bg-clip-text text-transparent">
            Featured Merchandise
          </span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map((product) => (
            <Card key={product.id} className="flex flex-col bg-background/50 backdrop-blur-lg border-electric-700/30">
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
              <CardContent className="flex-grow p-4">
                <CardTitle className="text-lg font-semibold mb-2 text-electric-100">{product.name}</CardTitle>
                <p className="text-muted-foreground text-sm line-clamp-2">{product.description}</p>
                <p className="text-xl font-bold mt-2 text-frost-300">${product.price.toFixed(2)}</p>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Button className="w-full bg-gradient-electric hover:animate-electric-pulse" asChild>
                  <Link href="/store">View Product</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        <Button
          variant="outline"
          className="mt-12 bg-electric-900/30 border-electric-700 text-electric-200 hover:bg-electric-800/50"
          asChild
        >
          <Link href="/store">View All Merchandise</Link>
        </Button>
      </div>
    </section>
  )
}
