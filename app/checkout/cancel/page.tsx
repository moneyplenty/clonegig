import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { XCircle } from "lucide-react"

export default function CheckoutCancelPage() {
  return (
    <div className="flex min-h-[calc(100vh-14rem)] items-center justify-center py-12">
      <Card className="w-full max-w-md mx-auto text-center">
        <CardHeader>
          <XCircle className="mx-auto h-16 w-16 text-red-500" />
          <CardTitle className="text-3xl font-bold mt-4">Payment Cancelled</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">Your payment was cancelled. No charges have been made.</p>
          <p className="text-muted-foreground">If you encountered an issue, please try again or contact support.</p>
          <div className="flex flex-col gap-2">
            <Link href="/store">
              <Button className="w-full">Return to Store</Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" className="w-full bg-transparent">
                Contact Support
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
