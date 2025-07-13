"use client"

import type React from "react"

import { useContext, useState } from "react"
import { CartContext } from "@/components/store/cart-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/hooks/use-toast"
import { Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"

export default function CheckoutPage() {
  const { cartItems, totalPrice, clearCart } = useContext(CartContext)
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [shippingInfo, setShippingInfo] = useState({
    fullName: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  })
  const [paymentInfo, setPaymentInfo] = useState({
    cardName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  })

  const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setShippingInfo((prev) => ({ ...prev, [name]: value }))
  }

  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPaymentInfo((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    if (cartItems.length === 0) {
      toast({
        title: "Cart is Empty",
        description: "Please add items to your cart before checking out.",
        variant: "destructive",
      })
      setLoading(false)
      return
    }

    // Basic validation for shipping and payment info
    const isShippingValid = Object.values(shippingInfo).every((info) => info.trim() !== "")
    const isPaymentValid = Object.values(paymentInfo).every((info) => info.trim() !== "")

    if (!isShippingValid || !isPaymentValid) {
      toast({
        title: "Missing Information",
        description: "Please fill in all shipping and payment details.",
        variant: "destructive",
      })
      setLoading(false)
      return
    }

    try {
      const response = await fetch("/api/stripe-checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: cartItems,
          customerEmail: "customer@example.com", // Replace with actual user email
        }),
      })

      const data = await response.json()

      if (response.ok) {
        clearCart() // Clear cart after successful checkout session creation
        router.push(data.url) // Redirect to Stripe Checkout page
      } else {
        throw new Error(data.error || "Failed to create checkout session.")
      }
    } catch (error: any) {
      console.error("Checkout error:", error)
      toast({
        title: "Checkout Failed",
        description: error.message || "An unexpected error occurred during checkout.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
      <h1 className="text-4xl font-bold text-center mb-8">Checkout</h1>
      <form onSubmit={handleCheckout} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Shipping Information</CardTitle>
              <CardDescription>Enter your shipping address.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  name="fullName"
                  value={shippingInfo.fullName}
                  onChange={handleShippingChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="address">Address</Label>
                <Textarea
                  id="address"
                  name="address"
                  value={shippingInfo.address}
                  onChange={handleShippingChange}
                  required
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input id="city" name="city" value={shippingInfo.city} onChange={handleShippingChange} required />
                </div>
                <div>
                  <Label htmlFor="state">State/Province</Label>
                  <Input id="state" name="state" value={shippingInfo.state} onChange={handleShippingChange} required />
                </div>
                <div>
                  <Label htmlFor="zip">Zip/Postal Code</Label>
                  <Input id="zip" name="zip" value={shippingInfo.zip} onChange={handleShippingChange} required />
                </div>
              </div>
              <div>
                <Label htmlFor="country">Country</Label>
                <Input
                  id="country"
                  name="country"
                  value={shippingInfo.country}
                  onChange={handleShippingChange}
                  required
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Payment Information</CardTitle>
              <CardDescription>Enter your payment details.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="cardName">Name on Card</Label>
                <Input
                  id="cardName"
                  name="cardName"
                  value={paymentInfo.cardName}
                  onChange={handlePaymentChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="cardNumber">Card Number</Label>
                <Input
                  id="cardNumber"
                  name="cardNumber"
                  value={paymentInfo.cardNumber}
                  onChange={handlePaymentChange}
                  required
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="expiryDate">Expiry Date (MM/YY)</Label>
                  <Input
                    id="expiryDate"
                    name="expiryDate"
                    value={paymentInfo.expiryDate}
                    onChange={handlePaymentChange}
                    placeholder="MM/YY"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="cvv">CVV</Label>
                  <Input id="cvv" name="cvv" value={paymentInfo.cvv} onChange={handlePaymentChange} required />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="lg:col-span-1 h-fit sticky top-20">
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span>
                    {item.name} (x{item.quantity})
                  </span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-between font-bold text-lg border-t pt-4">
              <span>Total</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <Button type="submit" className="w-full" disabled={loading || cartItems.length === 0}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Place Order
            </Button>
          </CardContent>
        </Card>
      </form>
    </div>
  )
}
