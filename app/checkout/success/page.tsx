import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { CheckCircle } from "lucide-react"
import { createClient } from "@/lib/supabase/server"
import { cookies } from "next/headers"

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const sessionId = searchParams.session_id as string | undefined
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  let purchaseDetails = null
  if (sessionId) {
    const { data, error } = await supabase
      .from("purchases")
      .select("*")
      .eq("stripe_checkout_session_id", sessionId)
      .single()

    if (error) {
      console.error("Error fetching purchase details:", error)
    } else {
      purchaseDetails = data
    }
  }

  return (
    <div className="flex min-h-[calc(100vh-14rem)] items-center justify-center py-12">
      <Card className="w-full max-w-md mx-auto text-center">
        <CardHeader>
          <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
          <CardTitle className="text-3xl font-bold mt-4">Payment Successful!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">Thank you for your purchase! Your order has been successfully placed.</p>
          {purchaseDetails && (
            <div className="text-left border-t pt-4 mt-4">
              <p className="text-sm font-medium">Order Summary:</p>
              <p className="text-lg font-bold">
                Total: ${purchaseDetails.amount?.toFixed(2)} {purchaseDetails.currency?.toUpperCase()}
              </p>
              <p className="text-sm text-muted-foreground">Order ID: {purchaseDetails.id}</p>
            </div>
          )}
          <div className="flex flex-col gap-2">
            <Link href="/dashboard">
              <Button className="w-full">Go to Dashboard</Button>
            </Link>
            <Link href="/store">
              <Button variant="outline" className="w-full bg-transparent">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
