"use client"

import Link from "next/link"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/components/store/cart-context"
import { toast } from "@/hooks/use-toast"
import { Loader2 } from "lucide-react"

export default function CheckoutPage() {
  const { cartItems, getTotalPrice, clearCart } = useCart()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(false)
  const [shippingInfo, setShippingInfo] = useState({
    fullName: "",
    address: "",
    city: "",
    zip: "",
    country: "",
  })

  useEffect(() => {
    if (searchParams.get("success")) {
      toast({
        title: "Order Placed!",
        description: "Your order has been successfully placed. Thank you for your purchase!",
        variant: "success",
      })
      clearCart()
      // Optionally redirect after a short delay or show a confirmation message
      // router.push("/dashboard");
    } else if (searchParams.get("canceled")) {
      toast({
        title: "Checkout Canceled",
        description: "Your checkout process was canceled. You can try again.",
        variant: "info",
      })
    }
  }, [searchParams, clearCart])

  const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value })
  }

  const handlePlaceOrder = async () => {
    setIsLoading(true)

    // Basic validation for shipping info
    if (
      !shippingInfo.fullName ||
      !shippingInfo.address ||
      !shippingInfo.city ||
      !shippingInfo.zip ||
      !shippingInfo.country
    ) {
      toast({
        title: "Missing Information",
        description: "Please fill in all shipping details.",
        variant: "destructive",
      })
      setIsLoading(false)
      return
    }

    try {
      const response = await fetch("/api/stripe-checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cartItems }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Failed to create checkout session")
      }

      const { url } = await response.json()
      window.location.href = url // Redirect to Stripe Checkout
    } catch (error: any) {
      toast({
        title: "Checkout Error",
        description: error.message || "An unexpected error occurred during checkout.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const totalPrice = getTotalPrice()

  if (cartItems.length === 0 && !searchParams.get("success") && !searchParams.get("canceled")) {
    return (
      <div className="flex min-h-[calc(100vh-64px)] flex-col items-center justify-center p-4 text-center">
        <h2 className="text-3xl font-bold text-electric-100 mb-4">Your Cart is Empty</h2>
        <p className="text-muted-foreground mb-8">Add some awesome merchandise to your cart to proceed to checkout!</p>
        <Button asChild className="bg-gradient-electric hover:animate-electric-pulse">
          <Link href="/store">Go to Store</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12 md:py-24">
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-12">
        <span className="bg-gradient-to-r from-electric-400 to-frost-400 bg-clip-text text-transparent">Checkout</span>
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Shipping Information */}
        <Card className="lg:col-span-2 bg-background/50 backdrop-blur-lg border-electric-700/30">
          <CardHeader>
            <CardTitle className="text-electric-200">Shipping Information</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div>
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                name="fullName"
                value={shippingInfo.fullName}
                onChange={handleShippingChange}
                placeholder="John Doe"
              />
            </div>
            <div>
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                name="address"
                value={shippingInfo.address}
                onChange={handleShippingChange}
                placeholder="123 Rock St"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  name="city"
                  value={shippingInfo.city}
                  onChange={handleShippingChange}
                  placeholder="Rockville"
                />
              </div>
              <div>
                <Label htmlFor="zip">Zip Code</Label>
                <Input
                  id="zip"
                  name="zip"
                  value={shippingInfo.zip}
                  onChange={handleShippingChange}
                  placeholder="12345"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="country">Country</Label>
              <Input
                id="country"
                name="country"
                value={shippingInfo.country}
                onChange={handleShippingChange}
                placeholder="USA"
              />
            </div>
          </CardContent>
        </Card>

        {/* Order Summary & Payment */}
        <Card className="lg:col-span-1 bg-background/50 backdrop-blur-lg border-electric-700/30">
          <CardHeader>
            <CardTitle className="text-electric-200">Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between text-muted-foreground">
                <span>
                  {item.name} (x{item.quantity})
                </span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <Separator className="my-2 bg-electric-700" />
            <div className="flex justify-between font-bold text-electric-100">
              <span>Total</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>

            <h3 className="text-lg font-semibold mt-6 mb-4 text-electric-200">Payment Information</h3>
            <p className="text-sm text-muted-foreground">
              You will be redirected to a secure Stripe page to complete your purchase.
            </p>
          </CardContent>
          <CardFooter>
            <Button
              onClick={handlePlaceOrder}
              className="w-full bg-gradient-electric hover:animate-electric-pulse"
              disabled={isLoading || cartItems.length === 0}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Redirecting to Payment...
                </>
              ) : (
                "Proceed to Payment"
              )}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
