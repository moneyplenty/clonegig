import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"

export function FeaturedMerchandise() {
  const featuredProducts = [
    {
      id: "1",
      name: "Kelvin Creekman T-Shirt",
      price: 25.0,
      image: "/merch/kelvin-tshirt.webp",
      description: "Show your support with this official Kelvin Creekman t-shirt.",
    },
    {
      id: "2",
      name: "Electric Dreams Beanie",
      price: 20.0,
      image: "/merch/beanie.jpg",
      description: "Stay warm with the 'Electric Dreams' album beanie.",
    },
    {
      id: "3",
      name: "Kelvin Creekman Mug (Black)",
      price: 15.0,
      image: "/merch/mug-black.webp",
      description: "Enjoy your coffee in this sleek black Kelvin Creekman mug.",
    },
  ]

  return (
    <section className="py-12 md:py-24 lg:py-32 bg-kelvin-card">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-kelvin-foreground">
              Featured Merchandise
            </h2>
            <p className="max-w-[900px] text-kelvin-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Grab exclusive gear and show your love for Kelvin Creekman.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-start gap-6 py-12 lg:grid-cols-3 lg:gap-12">
          {featuredProducts.map((product) => (
            <Card key={product.id} className="flex flex-col bg-card/50 backdrop-blur-sm border-kelvin-border">
              <CardHeader className="p-0">
                <div className="relative w-full h-60">
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
                <CardTitle className="text-lg font-semibold mb-2 text-kelvin-foreground">{product.name}</CardTitle>
                <p className="text-kelvin-muted-foreground text-sm line-clamp-2">{product.description}</p>
                <p className="text-xl font-bold mt-2 text-kelvin-foreground">${product.price.toFixed(2)}</p>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Button
                  className="w-full bg-kelvin-primary text-kelvin-primary-foreground hover:bg-kelvin-primary/90"
                  asChild
                >
                  <Link href="/store">View Product</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        <div className="text-center mt-8">
          <Button
            asChild
            variant="outline"
            className="bg-kelvin-background text-kelvin-foreground border-kelvin-border hover:bg-kelvin-muted"
          >
            <Link href="/store">View All Merchandise</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
