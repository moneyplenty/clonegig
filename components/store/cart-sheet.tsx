"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Icons } from "@/components/icons"
import { useCart } from "./cart-context"
import Image from "next/image"
import { formatPrice } from "@/lib/utils"

export function CartSheet() {
  const { items, removeItem, updateQuantity, getTotalPrice, getTotalItems } = useCart()
  const [isLoading, setIsLoading] = useState(false)

  const handleCheckout = async () => {
    if (items.length === 0) return

    setIsLoading(true)
    try {
      const response = await fetch("/api/stripe-checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: items.map((item) => ({
            id: item.id,
            quantity: item.quantity,
          })),
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to create checkout session")
      }

      const { url } = await response.json()
      window.location.href = url
    } catch (error) {
      console.error("Checkout error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const totalItems = getTotalItems()

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm" className="relative">
          <Icons.shoppingCart className="h-5 w-5" />
          {totalItems > 0 && (
            <Badge variant="destructive" className="absolute -right-2 -top-2 h-5 w-5 rounded-full p-0 text-xs">
              {totalItems}
            </Badge>
          )}
          <span className="sr-only">Shopping cart</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="flex w-full flex-col pr-0 sm:max-w-lg">
        <SheetHeader className="space-y-2.5 pr-6">
          <SheetTitle>Cart ({totalItems})</SheetTitle>
          <SheetDescription>Review your items and proceed to checkout</SheetDescription>
        </SheetHeader>
        {items.length > 0 ? (
          <>
            <div className="flex flex-1 flex-col gap-5 overflow-hidden pr-6">
              <div className="space-y-3">
                {items.map((item) => (
                  <div key={item.id} className="space-y-3">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center space-x-4">
                        <div className="relative aspect-square h-16 w-16 min-w-fit overflow-hidden rounded">
                          <Image
                            src={item.image || "/placeholder.svg?height=64&width=64"}
                            alt={item.name}
                            fill
                            className="absolute object-cover"
                          />
                        </div>
                        <div className="flex flex-col space-y-1">
                          <span className="line-clamp-1 text-sm font-medium">{item.name}</span>
                          <span className="line-clamp-1 text-xs capitalize text-muted-foreground">
                            {formatPrice(item.price)}
                          </span>
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-6 w-6 bg-transparent"
                              onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                            >
                              <Icons.minus className="h-3 w-3" />
                            </Button>
                            <span className="text-xs">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-6 w-6 bg-transparent"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <Icons.plus className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 bg-transparent"
                        onClick={() => removeItem(item.id)}
                      >
                        <Icons.trash className="h-3 w-3" />
                      </Button>
                    </div>
                    <Separator />
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-4 pr-6">
              <Separator />
              <div className="space-y-1.5 text-sm">
                <div className="flex">
                  <span className="flex-1">Total</span>
                  <span className="font-medium">{formatPrice(getTotalPrice())}</span>
                </div>
              </div>
              <Button onClick={handleCheckout} className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  "Proceed to Checkout"
                )}
              </Button>
            </div>
          </>
        ) : (
          <div className="flex h-full flex-col items-center justify-center space-y-1">
            <Icons.shoppingCart className="h-12 w-12 text-muted-foreground" />
            <div className="text-xl font-semibold">Your cart is empty</div>
            <SheetTrigger asChild>
              <Button variant="link" size="sm" className="text-muted-foreground">
                Continue shopping
              </Button>
            </SheetTrigger>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}
