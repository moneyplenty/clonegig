import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Filter, Search, ShoppingCart } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function StorePage() {
  // This would normally be fetched from an API
  const products = [
    {
      id: 1,
      name: "Limited Edition Vinyl",
      description: "Signed collector's edition with exclusive artwork",
      price: 49.99,
      image: "/placeholder.svg?height=400&width=400",
      category: "music",
      exclusive: true,
      inStock: true,
    },
    {
      id: 2,
      name: "Tour Hoodie 2025",
      description: "Premium quality hoodie with tour dates",
      price: 59.99,
      image: "/placeholder.svg?height=400&width=400",
      category: "apparel",
      exclusive: true,
      inStock: true,
    },
    {
      id: 3,
      name: "Collector's Photobook",
      description: "Hardcover photobook with never-before-seen images",
      price: 39.99,
      image: "/placeholder.svg?height=400&width=400",
      category: "collectibles",
      exclusive: false,
      inStock: true,
    },
    {
      id: 4,
      name: "Concert Tee",
      description: "Soft cotton t-shirt with tour artwork",
      price: 29.99,
      image: "/placeholder.svg?height=400&width=400",
      category: "apparel",
      exclusive: false,
      inStock: true,
    },
    {
      id: 5,
      name: "Signed Poster Set",
      description: "Set of 3 signed posters from the latest photoshoot",
      price: 34.99,
      image: "/placeholder.svg?height=400&width=400",
      category: "collectibles",
      exclusive: true,
      inStock: true,
    },
    {
      id: 6,
      name: "Digital Album Download",
      description: "High-quality digital download with bonus tracks",
      price: 14.99,
      image: "/placeholder.svg?height=400&width=400",
      category: "music",
      exclusive: false,
      inStock: true,
    },
  ]

  return (
    <div className="container py-10">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Merchandise Store</h1>
            <p className="text-muted-foreground">Exclusive merchandise and collectibles for fans</p>
          </div>
          <div className="flex w-full md:w-auto gap-2">
            <div className="relative w-full md:w-auto">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search products..." className="w-full md:w-[200px] pl-8 rounded-full" />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="rounded-full">
                  <Filter className="h-4 w-4" />
                  <span className="sr-only">Filter</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuLabel>Filter By</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>All Products</DropdownMenuItem>
                  <DropdownMenuItem>Member Exclusives</DropdownMenuItem>
                  <DropdownMenuItem>New Arrivals</DropdownMenuItem>
                  <DropdownMenuItem>Best Sellers</DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>Price: Low to High</DropdownMenuItem>
                  <DropdownMenuItem>Price: High to Low</DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button size="icon" variant="outline" className="rounded-full relative">
              <ShoppingCart className="h-4 w-4" />
              <span className="sr-only">Shopping Cart</span>
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-[10px] font-medium text-primary-foreground flex items-center justify-center">
                0
              </span>
            </Button>
          </div>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="apparel">Apparel</TabsTrigger>
            <TabsTrigger value="music">Music</TabsTrigger>
            <TabsTrigger value="collectibles">Collectibles</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => (
                <Card key={product.id} className="overflow-hidden group">
                  <div className="relative aspect-square bg-muted">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      fill
                      className="object-cover transition-all group-hover:scale-105"
                    />
                    {product.exclusive && <Badge className="absolute top-2 right-2 bg-primary">Members Only</Badge>}
                  </div>
                  <CardHeader className="p-4">
                    <CardTitle className="text-lg">{product.name}</CardTitle>
                    <CardDescription>{product.description}</CardDescription>
                  </CardHeader>
                  <CardFooter className="p-4 pt-0 flex justify-between items-center">
                    <span className="font-bold">${product.price.toFixed(2)}</span>
                    <Button asChild size="sm" className="rounded-full">
                      <Link href={`/store/product/${product.id}`}>{product.exclusive ? "Members Buy" : "Buy Now"}</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="apparel" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {products
                .filter((product) => product.category === "apparel")
                .map((product) => (
                  <Card key={product.id} className="overflow-hidden group">
                    <div className="relative aspect-square bg-muted">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        className="object-cover transition-all group-hover:scale-105"
                      />
                      {product.exclusive && <Badge className="absolute top-2 right-2 bg-primary">Members Only</Badge>}
                    </div>
                    <CardHeader className="p-4">
                      <CardTitle className="text-lg">{product.name}</CardTitle>
                      <CardDescription>{product.description}</CardDescription>
                    </CardHeader>
                    <CardFooter className="p-4 pt-0 flex justify-between items-center">
                      <span className="font-bold">${product.price.toFixed(2)}</span>
                      <Button asChild size="sm" className="rounded-full">
                        <Link href={`/store/product/${product.id}`}>
                          {product.exclusive ? "Members Buy" : "Buy Now"}
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
            </div>
          </TabsContent>
          <TabsContent value="music" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {products
                .filter((product) => product.category === "music")
                .map((product) => (
                  <Card key={product.id} className="overflow-hidden group">
                    <div className="relative aspect-square bg-muted">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        className="object-cover transition-all group-hover:scale-105"
                      />
                      {product.exclusive && <Badge className="absolute top-2 right-2 bg-primary">Members Only</Badge>}
                    </div>
                    <CardHeader className="p-4">
                      <CardTitle className="text-lg">{product.name}</CardTitle>
                      <CardDescription>{product.description}</CardDescription>
                    </CardHeader>
                    <CardFooter className="p-4 pt-0 flex justify-between items-center">
                      <span className="font-bold">${product.price.toFixed(2)}</span>
                      <Button asChild size="sm" className="rounded-full">
                        <Link href={`/store/product/${product.id}`}>
                          {product.exclusive ? "Members Buy" : "Buy Now"}
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
            </div>
          </TabsContent>
          <TabsContent value="collectibles" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {products
                .filter((product) => product.category === "collectibles")
                .map((product) => (
                  <Card key={product.id} className="overflow-hidden group">
                    <div className="relative aspect-square bg-muted">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        className="object-cover transition-all group-hover:scale-105"
                      />
                      {product.exclusive && <Badge className="absolute top-2 right-2 bg-primary">Members Only</Badge>}
                    </div>
                    <CardHeader className="p-4">
                      <CardTitle className="text-lg">{product.name}</CardTitle>
                      <CardDescription>{product.description}</CardDescription>
                    </CardHeader>
                    <CardFooter className="p-4 pt-0 flex justify-between items-center">
                      <span className="font-bold">${product.price.toFixed(2)}</span>
                      <Button asChild size="sm" className="rounded-full">
                        <Link href={`/store/product/${product.id}`}>
                          {product.exclusive ? "Members Buy" : "Buy Now"}
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-12 bg-muted/50 rounded-lg p-8">
          <div className="grid gap-8 md:grid-cols-2 items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Member Exclusive Benefits</h2>
              <p className="mt-4 text-muted-foreground">
                Join our premium fan club to unlock exclusive merchandise and special discounts.
              </p>
              <ul className="mt-6 space-y-4">
                <li className="flex items-start">
                  <span className="mr-2 text-primary">•</span>
                  <span>Access to limited edition merchandise not available to the public</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-primary">•</span>
                  <span>15% discount on all regular merchandise</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-primary">•</span>
                  <span>Early access to new merchandise drops</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-primary">•</span>
                  <span>Free shipping on orders over $50</span>
                </li>
              </ul>
              <div className="mt-6">
                <Button asChild className="rounded-full">
                  <Link href="/join">Become a Member</Link>
                </Button>
              </div>
            </div>
            <div className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden">
              <Image
                src="/placeholder.svg?height=800&width=600"
                alt="Exclusive merchandise"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
