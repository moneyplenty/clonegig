"use client"

import { ShoppingCart } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CartContext } from "./cart-context"
import { useContext } from "react"

export function StoreHeader() {
  const { cartItems } = useContext(CartContext)
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <div className="flex items-center justify-between py-4 px-6 border-b">
      <h1 className="text-2xl font-bold">Merchandise Store</h1>
      <Link href="/store/cart">
        <Button variant="ghost" size="icon" className="relative">
          <ShoppingCart className="h-6 w-6" />
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
              {totalItems}
            </span>
          )}
          <span className="sr-only">Shopping Cart</span>
        </Button>
      </Link>
    </div>
  )
}
