"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Loader2, CreditCard, Shield, Check } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const membershipTiers = {
  frost_fan: { name: "Frost Fan", price: 9.99, priceId: "price_frost_fan" },
  blizzard_vip: { name: "Blizzard VIP", price: 19.99, priceId: "price_blizzard_vip" },
  avalanche_backstage: { name: "Avalanche Backstage", price: 49.99, priceId: "price_avalanche_backstage" },
}

export default function CheckoutPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [tier, setTier] = useState<string>("")
  const [email, setEmail] = useState<string>("")

  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()

  useEffect(() => {
    const tierParam = searchParams.get("tier")
    const emailParam = searchParams.get("email")

    if (tierParam && emailParam) {
      setTier(tierParam)
      setEmail(decodeURIComponent(emailParam))
    } else {
      router.push("/signup")
    }
  }, [searchParams, router])

  const selectedTier = tier ? membershipTiers[tier as keyof typeof membershipTiers] : null

  const handlePayment = async () => {
    if (!selectedTier) return

    setIsLoading(true)

    try {
      // Simulate Stripe checkout session creation
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // In a real app, this would redirect to Stripe Checkout
      toast({
        title: "Payment Successful! 🎉",
        description: `Welcome to ${selectedTier.name}! Your membership is now active.`,
      })

      // Redirect to dashboard
      setTimeout(() => {
        router.push("/dashboard")
      }, 2000)
    } catch (error) {
      toast({
        title: "Payment Failed",
        description: "There was an error processing your payment. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (!selectedTier) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 p-4">
      <div className="max-w-2xl mx-auto pt-20">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-fire dark:bg-gradient-ice bg-clip-text text-transparent mb-2">
            Complete Your Membership
          </h1>
          <p className="text-muted-foreground">
            You're one step away from joining the exclusive Kelvin Creekman Fan Club
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Order Summary */}
          <Card className="border-fire-500/20 dark:border-ice-500/20">
            <CardHeader>
              <CardTitle className="text-fire-600 dark:text-ice-400">Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">{selectedTier.name} Membership</h3>
                  <p className="text-sm text-muted-foreground">Monthly subscription</p>
                </div>
                <div className="text-right">
                  <div className="font-bold">${selectedTier.price}</div>
                  <div className="text-sm text-muted-foreground">/month</div>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex items-center justify-between font-semibold">
                  <span>Total (Monthly)</span>
                  <span>${selectedTier.price}</span>
                </div>
              </div>

              <div className="space-y-2 pt-4">
                <h4 className="font-semibold text-sm">What's included:</h4>
                <ul className="space-y-1 text-sm">
                  <li className="flex items-center gap-2">
                    <Check className="h-3 w-3 text-green-500" />
                    Exclusive content access
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-3 w-3 text-green-500" />
                    Fan community access
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-3 w-3 text-green-500" />
                    Early music releases
                  </li>
                  {tier === "blizzard_vip" && (
                    <li className="flex items-center gap-2">
                      <Check className="h-3 w-3 text-green-500" />
                      Monthly video calls
                    </li>
                  )}
                  {tier === "avalanche_backstage" && (
                    <li className="flex items-center gap-2">
                      <Check className="h-3 w-3 text-green-500" />
                      Weekly 1-on-1 video calls
                    </li>
                  )}
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Payment */}
          <Card className="border-fire-500/20 dark:border-ice-500/20">
            <CardHeader>
              <CardTitle className="text-fire-600 dark:text-ice-400">Payment Details</CardTitle>
              <CardDescription>Secure payment powered by Stripe</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <div className="p-3 bg-muted rounded-lg text-sm">{email}</div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Shield className="h-4 w-4" />
                  <span>Your payment information is secure and encrypted</span>
                </div>

                <Button
                  onClick={handlePayment}
                  disabled={isLoading}
                  className="w-full bg-gradient-fire dark:bg-gradient-ice hover:opacity-90 transition-opacity"
                  size="lg"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing payment...
                    </>
                  ) : (
                    <>
                      <CreditCard className="mr-2 h-4 w-4" />
                      Pay ${selectedTier.price}/month
                    </>
                  )}
                </Button>

                <p className="text-xs text-center text-muted-foreground">
                  By completing this purchase, you agree to our Terms of Service and Privacy Policy. You can cancel your
                  subscription at any time.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
