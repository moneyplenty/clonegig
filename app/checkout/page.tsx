"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Icons } from "@/components/icons"
import { useCart } from "@/components/store/cart-context"

export default function CheckoutPage() {
  const searchParams = useSearchParams()
  const success = searchParams.get("success")
  const canceled = searchParams.get("canceled")
  const [message, setMessage] = useState("")
  const [isSuccess, setIsSuccess] = useState(false)
  const { clearCart } = useCart()

  useEffect(() => {
    if (success) {
      setMessage("Payment successful! Your order has been placed.")
      setIsSuccess(true)
      clearCart() // Clear cart on successful payment
    } else if (canceled) {
      setMessage("Payment canceled. You can try again or continue shopping.")
      setIsSuccess(false)
    } else {
      setMessage("Processing your order...")
      // This might be a direct navigation without success/canceled params,
      // or a page refresh. In a real app, you'd check session status here.
    }
  }, [success, canceled, clearCart])

  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-kelvin-background px-4 py-12 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md space-y-8 rounded-lg bg-kelvin-card p-8 shadow-lg border border-kelvin-border text-center">
        <CardHeader>
          {isSuccess ? (
            <Icons.checkCircle className="mx-auto h-16 w-16 text-green-500 mb-4" />
          ) : (
            <Icons.info className="mx-auto h-16 w-16 text-blue-500 mb-4" />
          )}
          <CardTitle className="text-3xl font-bold tracking-tight text-kelvin-foreground">
            {isSuccess ? "Order Confirmed!" : "Payment Status"}
          </CardTitle>
          <CardDescription className="text-kelvin-foreground/80">{message}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {isSuccess ? (
            <>
              <p className="text-kelvin-foreground/90">
                Thank you for your purchase! You will receive an email confirmation shortly.
              </p>
              <Button asChild className="w-full bg-electric-500 hover:bg-electric-600 text-white">
                <Link href="/dashboard">View Your Dashboard</Link>
              </Button>
            </>
          ) : (
            <>
              <p className="text-kelvin-foreground/90">
                If you encountered an issue, please try again or contact support.
              </p>
              <Button asChild className="w-full bg-frost-500 hover:bg-frost-600 text-white">
                <Link href="/store">Continue Shopping</Link>
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
