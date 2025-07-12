import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"

export function FeaturedMerchandise() {
  const featuredProducts = [
    {
      id: "1",
      name: "Kelvin Creekman T-Shirt",
      image: "/merch/kelvin-tshirt.webp",
      price: 29.99,
      description: "Show your allegiance with this electrifying Kelvin Creekman band tee.",
    },
    {
      id: "2",
      name: "Kelvin Creekman Beanie",
      image: "/merch/beanie.jpg",
      price: 19.99,
      description: "Stay warm and stylish with the official Kelvin Creekman beanie.",
    },
    {
      id: "3",
      name: "Kelvin Creekman Mug",
      image: "/merch/mug-black.webp",
      price: 14.99,
      description: "Start your day with a jolt of rock and roll with this custom mug.",
    },
  ]

  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Featured Merchandise</h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Grab the latest gear and show your support for Kelvin Creekman.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-start gap-6 py-12 lg:grid-cols-3 lg:gap-12">
          {featuredProducts.map((product) => (
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
                <Link href="/store">
                  <Button>View Product</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
        <div className="flex justify-center">
          <Link href="/store">
            <Button size="lg">View All Merchandise</Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
