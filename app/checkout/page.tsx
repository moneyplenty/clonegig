"use client"

import Link from "next/link"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/components/store/cart-context"
import { toast } from "@/components/ui/use-toast"
import { Loader2 } from "lucide-react"

export default function CheckoutPage() {
  const { cartItems, getTotalPrice, clearCart } = useCart()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [shippingInfo, setShippingInfo] = useState({
    fullName: "",
    address: "",
    city: "",
    zip: "",
    country: "",
  })
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  })

  const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value })
  }

  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentInfo({ ...paymentInfo, [e.target.name]: e.target.value })
  }

  const handlePlaceOrder = async () => {
    setIsLoading(true)
    // Simulate API call for order processing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Basic validation
    if (
      !shippingInfo.fullName ||
      !shippingInfo.address ||
      !shippingInfo.city ||
      !shippingInfo.zip ||
      !shippingInfo.country ||
      !paymentInfo.cardNumber ||
      !paymentInfo.expiryDate ||
      !paymentInfo.cvv
    ) {
      toast({
        title: "Missing Information",
        description: "Please fill in all shipping and payment details.",
        variant: "destructive",
      })
      setIsLoading(false)
      return
    }

    // Here you would integrate with a payment gateway (e.g., Stripe)
    // For now, we'll just simulate success
    const orderSuccessful = true // Replace with actual payment processing result

    if (orderSuccessful) {
      toast({
        title: "Order Placed!",
        description: "Your order has been successfully placed. Thank you for your purchase!",
        variant: "success",
      })
      clearCart() // Clear cart after successful order
      router.push("/dashboard") // Redirect to a confirmation page or dashboard
    } else {
      toast({
        title: "Order Failed",
        description: "There was an issue processing your payment. Please try again.",
        variant: "destructive",
      })
    }
    setIsLoading(false)
  }

  const totalPrice = getTotalPrice()

  if (cartItems.length === 0 && !isLoading) {
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
            <div>
              <Label htmlFor="cardNumber">Card Number</Label>
              <Input
                id="cardNumber"
                name="cardNumber"
                value={paymentInfo.cardNumber}
                onChange={handlePaymentChange}
                placeholder="•••• •••• •••• ••••"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="expiryDate">Expiry Date</Label>
                <Input
                  id="expiryDate"
                  name="expiryDate"
                  value={paymentInfo.expiryDate}
                  onChange={handlePaymentChange}
                  placeholder="MM/YY"
                />
              </div>
              <div>
                <Label htmlFor="cvv">CVV</Label>
                <Input id="cvv" name="cvv" value={paymentInfo.cvv} onChange={handlePaymentChange} placeholder="123" />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              onClick={handlePlaceOrder}
              className="w-full bg-gradient-electric hover:animate-electric-pulse"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                "Place Order"
              )}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
