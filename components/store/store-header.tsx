"use client"

import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"
import Link from "next/link"
import { useCart } from "@/components/store/cart-context"

export function StoreHeader() {
  const { getTotalItems } = useCart()

  return (
    <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 mb-8">
      <h1 className="text-4xl font-bold tracking-tight">Merchandise</h1>
      <div className="flex items-center space-x-4 w-full md:w-auto">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <Input type="text" placeholder="Search products..." className="pl-10 pr-4 py-2 rounded-md w-full" />
        </div>
        <Link href="/checkout">
          <Button variant="outline" className="relative bg-transparent">
            <ShoppingCart className="h-5 w-5" />
            {getTotalItems() > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full h-5 w-5 flex items-center justify-center text-xs">
                {getTotalItems()}
              </span>
            )}
            <span className="sr-only">Shopping Cart</span>
          </Button>
        </Link>
      </div>
    </div>
  )
}
