"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, XCircle } from "lucide-react"
import { toast } from "@/hooks/use-toast"

export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get("session_id")
  const [loading, setLoading] = useState(true)
  const [status, setStatus] = useState<"success" | "failed" | "loading">("loading")

  useEffect(() => {
    if (!sessionId) {
      setStatus("failed")
      setLoading(false)
      toast({
        title: "Payment Error",
        description: "No session ID found. Payment status could not be verified.",
        variant: "destructive",
      })
      return
    }

    // In a real application, you would verify the session ID on your backend
    // to prevent fraud and ensure the payment was successful.
    // For this example, we'll just assume success if a session_id is present.
    const verifyPayment = async () => {
      try {
        // Example: Call your own API route to verify Stripe session
        // const response = await fetch(`/api/verify-stripe-session?session_id=${sessionId}`);
        // const data = await response.json();
        // if (data.verified) {
        //   setStatus("success");
        // } else {
        //   setStatus("failed");
        //   toast({
        //     title: "Payment Verification Failed",
        //     description: "Could not verify your payment. Please contact support.",
        //     variant: "destructive",
        //   });
        // }
        setStatus("success") // Simulating success for demonstration
      } catch (error) {
        console.error("Error verifying payment:", error)
        setStatus("failed")
        toast({
          title: "Payment Error",
          description: "An error occurred while verifying your payment. Please contact support.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    verifyPayment()
  }, [sessionId])

  if (loading) {
    return (
      <div className="flex min-h-[calc(100vh-10rem)] items-center justify-center px-4 py-12">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <div className="mx-auto h-16 w-16 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            <CardTitle className="mt-4 text-2xl font-bold">Verifying Payment...</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Please wait while we confirm your order.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (status === "failed") {
    return (
      <div className="flex min-h-[calc(100vh-10rem)] items-center justify-center px-4 py-12">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <XCircle className="mx-auto h-16 w-16 text-destructive" />
            <CardTitle className="mt-4 text-2xl font-bold">Payment Failed</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              There was an issue processing your payment. Please try again or contact support.
            </p>
            <div className="flex flex-col gap-2">
              <Button asChild>
                <Link href="/store">Return to Store</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/contact">Contact Support</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex min-h-[calc(100vh-10rem)] items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <CheckCircle className="mx-auto h-16 w-16 text-primary" />
          <CardTitle className="mt-4 text-2xl font-bold">Payment Successful!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">Thank you for your purchase. Your order has been placed successfully.</p>
          <p className="text-muted-foreground">
            You will receive an email confirmation shortly with your order details.
          </p>
          <div className="flex flex-col gap-2">
            <Button asChild>
              <Link href="/dashboard">View Your Dashboard</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/store">Continue Shopping</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
