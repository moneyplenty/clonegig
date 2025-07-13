"use client"

import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { toast } from "sonner"

export default function StoreSuccessPage() {
  const [sessionData, setSessionData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const searchParams = useSearchParams()
  const router = useRouter()
  const sessionId = searchParams.get("session_id")

  useEffect(() => {
    if (sessionId) {
      fetch(`/api/verify-checkout-session?session_id=${sessionId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.session) {
            setSessionData(data.session)
          } else {
            toast.error("Failed to verify order")
          }
        })
        .catch((error) => {
          console.error("Error verifying session:", error)
          toast.error("Failed to verify order")
        })
        .finally(() => {
          setLoading(false)
        })
    } else {
      setLoading(false)
    }
  }, [sessionId])

  if (loading) {
    return (
      <div className="flex min-h-[100dvh] items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        <Icons.spinner className="h-8 w-8 animate-spin text-white" />
      </div>
    )
  }

  if (!sessionData) {
    return (
      <div className="flex min-h-[100dvh] items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 px-4">
        <Card className="w-full max-w-md bg-slate-800/50 border-slate-700">
          <CardHeader className="text-center">
            <CardTitle className="text-red-400">Order Not Found</CardTitle>
            <CardDescription className="text-slate-300">
              We couldn't find your order. Please check your email for confirmation.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => router.push("/store")} className="w-full">
              Back to Store
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 px-4 py-12">
      <Card className="w-full max-w-2xl bg-slate-800/50 border-slate-700">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/20">
            <Icons.checkCircle className="h-8 w-8 text-green-400" />
          </div>
          <CardTitle className="text-3xl text-white">Order Confirmed!</CardTitle>
          <CardDescription className="text-slate-300">
            Thank you for your purchase. Your order has been successfully processed.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="p-6 rounded-lg bg-blue-500/10 border border-blue-500/20">
            <h3 className="font-semibold text-blue-400 mb-4">Order Details</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-slate-400">Order ID:</span>
                <p className="text-white font-mono">{sessionData.id}</p>
              </div>
              <div>
                <span className="text-slate-400">Total Amount:</span>
                <p className="text-white font-semibold">${(sessionData.amount_total / 100).toFixed(2)}</p>
              </div>
              <div>
                <span className="text-slate-400">Payment Status:</span>
                <p className="text-green-400 capitalize">{sessionData.payment_status}</p>
              </div>
              <div>
                <span className="text-slate-400">Email:</span>
                <p className="text-white">{sessionData.customer_details?.email}</p>
              </div>
            </div>
          </div>

          {sessionData.shipping_details && (
            <div className="p-6 rounded-lg bg-purple-500/10 border border-purple-500/20">
              <h3 className="font-semibold text-purple-400 mb-4">Shipping Information</h3>
              <div className="text-sm text-slate-300">
                <p className="text-white font-medium">{sessionData.shipping_details.name}</p>
                <p>{sessionData.shipping_details.address.line1}</p>
                {sessionData.shipping_details.address.line2 && <p>{sessionData.shipping_details.address.line2}</p>}
                <p>
                  {sessionData.shipping_details.address.city}, {sessionData.shipping_details.address.state}{" "}
                  {sessionData.shipping_details.address.postal_code}
                </p>
                <p>{sessionData.shipping_details.address.country}</p>
              </div>
            </div>
          )}

          <div className="text-center space-y-4">
            <p className="text-slate-300">
              A confirmation email has been sent to your email address with tracking information.
            </p>
            <div className="flex gap-4 justify-center">
              <Button onClick={() => router.push("/dashboard")} variant="outline">
                Go to Dashboard
              </Button>
              <Button onClick={() => router.push("/store")} className="bg-blue-600 hover:bg-blue-700">
                Continue Shopping
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
