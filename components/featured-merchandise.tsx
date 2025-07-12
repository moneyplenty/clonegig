import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const merchandise = [
  {
    id: 1,
    name: "Ice Storm Vinyl",
    description: "Limited edition signed vinyl with exclusive frosted artwork",
    price: 49.99,
    image: "/placeholder.svg?height=400&width=400",
    exclusive: true,
    inStock: true,
  },
  {
    id: 2,
    name: "Frozen Kingdom Tour Hoodie",
    description: "Premium quality hoodie with 2025 tour dates and electric print",
    price: 59.99,
    image: "/placeholder.svg?height=400&width=400",
    exclusive: true,
    inStock: true,
  },
  {
    id: 3,
    name: "Avalanche Photobook",
    description: "Hardcover photobook with never-before-seen images from the ice caves sessions",
    price: 39.99,
    image: "/placeholder.svg?height=400&width=400",
    exclusive: false,
    inStock: false,
  },
]

export function FeaturedMerchandise() {
  return (
    <div className="grid gap-6 pt-8 md:grid-cols-2 lg:grid-cols-3">
      {merchandise.map((item, index) => (
        <Card
          key={item.id}
          className={`overflow-hidden group relative ${
            index === 0
              ? "ember-card dark:ice-card"
              : index === 1
                ? "fire-card dark:metal-card"
                : "fire-card dark:ice-card"
          }`}
        >
          {/* Theme effects */}
          <div className="absolute inset-0 opacity-5 pointer-events-none">
            <div
              className={`absolute inset-0 blur-[30px] animate-pulse ${
                index === 0
                  ? "bg-ember-400 dark:bg-frost-400"
                  : index === 1
                    ? "bg-fire-400 dark:bg-electric-400"
                    : "bg-fire-500 dark:bg-electric-500"
              }`}
            />
          </div>

          <div className="relative aspect-square bg-muted">
            <Image
              src={item.image || "/placeholder.svg"}
              alt={item.name}
              fill
              className="object-cover transition-all group-hover:scale-105"
            />
            {item.exclusive && (
              <Badge className="absolute top-2 right-2 bg-gradient-fire dark:bg-gradient-electric animate-fire-pulse dark:animate-electric-pulse">
                Ice Legion Exclusive
              </Badge>
            )}
            {!item.inStock && (
              <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
                <Badge
                  variant="outline"
                  className="text-lg font-semibold px-4 py-2 border-fire-500/50 text-fire-300 dark:border-electric-500/50 dark:text-electric-300"
                >
                  Coming Soon
                </Badge>
              </div>
            )}
          </div>

          <CardHeader className="p-4 relative z-10">
            <CardTitle
              className={`text-lg ${
                index === 0
                  ? "ember-text dark:frost-text"
                  : index === 1
                    ? "fire-text dark:metal-text"
                    : "fire-text dark:electric-text"
              }`}
            >
              {item.name}
            </CardTitle>
            <CardDescription>{item.description}</CardDescription>
          </CardHeader>

          <CardFooter className="p-4 pt-0 flex justify-between items-center relative z-10">
            <span className="font-bold text-primary">${item.price.toFixed(2)}</span>
            {item.inStock ? (
              <Button
                asChild
                size="sm"
                className="rounded-full bg-gradient-fire dark:bg-gradient-electric hover:animate-fire-pulse dark:hover:animate-electric-pulse"
              >
                <Link href={`/store/product/${item.id}`}>{item.exclusive ? "Members Buy" : "Buy Now"}</Link>
              </Button>
            ) : (
              <Button
                size="sm"
                variant="outline"
                className="rounded-full border-fire-500/50 hover:border-fire-400 dark:border-electric-500/50 dark:hover:border-electric-400 bg-transparent"
                disabled
              >
                Notify Me
              </Button>
            )}
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
