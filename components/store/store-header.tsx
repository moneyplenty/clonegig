import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, ShoppingCart } from "lucide-react"
import { useCart } from "@/components/store/cart-context"
import Link from "next/link"

export function StoreHeader() {
  const { cartItems } = useCart()
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
      <h1 className="text-4xl md:text-5xl font-bold text-center md:text-left">
        <span className="bg-gradient-to-r from-electric-400 to-frost-400 bg-clip-text text-transparent">
          Merchandise
        </span>
      </h1>
      <div className="flex items-center gap-4 w-full md:w-auto">
        <div className="relative flex-1 md:flex-none">
          <Input
            type="search"
            placeholder="Search merchandise..."
            className="w-full md:w-64 pr-10 bg-background/50 border-electric-700 text-electric-100"
          />
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        </div>
        <Button
          variant="outline"
          size="icon"
          asChild
          className="relative border-electric-700 text-electric-200 hover:bg-electric-900 hover:text-electric-100 bg-transparent"
        >
          <Link href="/checkout">
            <ShoppingCart className="h-5 w-5" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-electric-500 text-xs font-bold text-white">
                {totalItems}
              </span>
            )}
            <span className="sr-only">Shopping Cart</span>
          </Link>
        </Button>
      </div>
    </div>
  )
}
