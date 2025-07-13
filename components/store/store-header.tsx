import { Input } from "@/components/ui/input"
import { Search, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "./cart-context"
import Link from "next/link"

export function StoreHeader() {
  const { cart } = useCart()
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
      <h1 className="text-4xl font-bold">Merchandise</h1>
      <div className="relative flex-1 md:flex-grow-0 md:w-1/3">
        <Input placeholder="Search merchandise..." className="pl-8" />
        <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      </div>
      <Button variant="outline" size="lg" asChild>
        <Link href="/checkout">
          <ShoppingCart className="mr-2 h-5 w-5" />
          Cart ({totalItems})
        </Link>
      </Button>
    </div>
  )
}
