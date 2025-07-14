"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useCart } from "@/components/store/cart-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { formatPrice } from "@/lib/utils"
import Image from "next/image"
import { toast } from "@/hooks/use-toast"
import { useAuth } from "@/components/auth/auth-provider"

export default function CheckoutPage() {
  const { cartItems, totalPrice, clearCart } = useCart()
  const { user } = useAuth()
  const router = useRouter()

  const [formData, setFormData] = useState({
    email: user?.email || "",
    name: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  })
  const [loading, setLoading] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    if (cartItems.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Please add items to your cart before checking out.",
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
          customerEmail: formData.email,
          // You might want to send shipping address details to Stripe as well
          // For simplicity, we're focusing on payment session creation here.
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to create checkout session")
      }

      if (data.url) {
        clearCart() // Clear cart after successful session creation
        router.push(data.url) // Redirect to Stripe Checkout page
      } else {
        toast({
          title: "Checkout Error",
          description: "Could not get Stripe checkout URL.",
          variant: "destructive",
        })
      }
    } catch (error: any) {
      console.error("Checkout failed:", error)
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
    <main className="container grid gap-6 py-12 md:grid-cols-2 lg:gap-12">
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Order Summary</h2>
        {cartItems.length === 0 ? (
          <Card>
            <CardContent className="p-6 text-center text-muted-foreground">Your cart is empty.</CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {cartItems.map((item) => (
              <Card key={item.id} className="flex items-center p-4">
                <Image
                  src={item.image_url || "/placeholder.svg"}
                  alt={item.name}
                  width={80}
                  height={80}
                  className="mr-4 rounded-md object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                  <p className="text-sm font-medium">{formatPrice(item.price)} each</p>
                </div>
                <div className="text-lg font-bold">{formatPrice(item.price * item.quantity)}</div>
              </Card>
            ))}
            <Separator />
            <div className="flex justify-between text-xl font-bold">
              <span>Total:</span>
              <span>{formatPrice(totalPrice)}</span>
            </div>
          </div>
        )}
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Shipping & Payment</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={formData.email} onChange={handleInputChange} required />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Shipping Address</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" value={formData.name} onChange={handleInputChange} required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="address1">Address Line 1</Label>
                <Input id="address1" value={formData.address1} onChange={handleInputChange} required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="address2">Address Line 2 (Optional)</Label>
                <Input id="address2" value={formData.address2} onChange={handleInputChange} />
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="grid gap-2">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" value={formData.city} onChange={handleInputChange} required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="state">State / Province</Label>
                  <Input id="state" value={formData.state} onChange={handleInputChange} required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="zip">Zip / Postal Code</Label>
                  <Input id="zip" value={formData.zip} onChange={handleInputChange} required />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="country">Country</Label>
                <Input id="country" value={formData.country} onChange={handleInputChange} required />
              </div>
            </CardContent>
          </Card>

          {/* Stripe handles payment details on their hosted page, so no need for card inputs here */}
          <Button type="submit" className="w-full" size="lg" disabled={loading || cartItems.length === 0}>
            {loading ? "Processing..." : `Pay ${formatPrice(totalPrice)}`}
          </Button>
        </form>
      </div>
    </main>
  )
}
