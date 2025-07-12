import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Search } from "lucide-react"
import Link from "next/link"
import { useCart } from "./cart-context"

export function StoreHeader() {
  const { cartItems } = useCart()
  const totalItemsInCart = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
      <h1 className="text-4xl font-bold">Merchandise</h1>
      <div className="flex items-center gap-4 w-full md:w-auto">
        <div className="relative flex-1">
          <Input placeholder="Search merchandise..." className="pl-8" />
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        </div>
        <Button variant="outline" size="icon" asChild>
          <Link href="/checkout">
            <ShoppingCart className="h-5 w-5" />
            {totalItemsInCart > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground rounded-full h-4 w-4 flex items-center justify-center text-xs">
                {totalItemsInCart}
              </span>
            )}
            <span className="sr-only">Shopping Cart</span>
          </Link>
        </Button>
      </div>
    </div>
  )
}
