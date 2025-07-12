"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useCart } from "@/components/store/cart-context"
import { loadStripe } from "@stripe/stripe-js"
import { toast } from "sonner"

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the Stripe object on every render.
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

export default function CheckoutPage() {
  const searchParams = useSearchParams()
  const success = searchParams.get("success")
  const canceled = searchParams.get("canceled")
  const { cart, getTotalPrice, clearCart } = useCart()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (success) {
      toast.success("Order placed successfully! Thank you for your purchase.")
      clearCart()
    }

    if (canceled) {
      toast.error("Payment canceled. You can try again.")
    }
  }, [success, canceled, clearCart])

  const handleCheckout = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/stripe-checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cartItems: cart }),
      })

      const { sessionId, error } = await response.json()

      if (error) {
        toast.error(`Checkout failed: ${error}`)
        setLoading(false)
        return
      }

      const stripe = await stripePromise
      if (stripe) {
        const { error: stripeError } = await stripe.redirectToCheckout({ sessionId })
        if (stripeError) {
          toast.error(`Stripe redirect error: ${stripeError.message}`)
        }
      }
    } catch (error) {
      console.error("Error during checkout:", error)
      toast.error("An unexpected error occurred during checkout.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Checkout</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent>
            {cart.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              <ul className="space-y-4">
                {cart.map((item) => (
                  <li key={item.id} className="flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                      <div>
                        <p className="font-semibold">{item.name}</p>
                        <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                      </div>
                    </div>
                    <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                  </li>
                ))}
              </ul>
            )}
            <div className="border-t pt-4 mt-4 flex justify-between items-center">
              <p className="text-lg font-bold">Total:</p>
              <p className="text-lg font-bold">${getTotalPrice().toFixed(2)}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Payment Information</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              Click the button below to proceed to a secure checkout page powered by Stripe.
            </p>
            <Button onClick={handleCheckout} disabled={cart.length === 0 || loading} className="w-full py-3 text-lg">
              {loading ? "Processing..." : "Proceed to Payment"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
