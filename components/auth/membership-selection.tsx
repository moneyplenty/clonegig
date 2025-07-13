"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Icons } from "@/components/icons"
import { toast } from "sonner"
import { loadStripe } from "@stripe/stripe-js"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

const membershipTiers = [
  {
    id: "fan",
    name: "Fan",
    price: 9.99,
    stripePriceId: "price_fan_monthly", // Replace with actual Stripe price ID
    description: "Basic access to exclusive content",
    features: ["Access to fan-only content", "Monthly newsletter", "Community forum access", "Early ticket access"],
    popular: false,
    color: "blue",
  },
  {
    id: "premium",
    name: "Premium",
    price: 19.99,
    stripePriceId: "price_premium_monthly", // Replace with actual Stripe price ID
    description: "Full access plus exclusive perks",
    features: [
      "Everything in Fan tier",
      "Meet & greet sessions",
      "Exclusive merchandise discounts",
      "Behind-the-scenes content",
      "Priority customer support",
    ],
    popular: true,
    color: "purple",
  },
  {
    id: "vip",
    name: "VIP",
    price: 49.99,
    stripePriceId: "price_vip_monthly", // Replace with actual Stripe price ID
    description: "Ultimate fan experience",
    features: [
      "Everything in Premium tier",
      "Private video calls with Kelvin",
      "Signed merchandise",
      "VIP concert experiences",
      "Personal birthday messages",
    ],
    popular: false,
    color: "gold",
  },
]

export function MembershipSelection() {
  const [loading, setLoading] = useState<string | null>(null)
  const router = useRouter()

  const handleSelectTier = async (tier: (typeof membershipTiers)[0]) => {
    setLoading(tier.id)

    try {
      const stripe = await stripePromise
      if (!stripe) {
        throw new Error("Stripe failed to load")
      }

      // Create checkout session for membership
      const response = await fetch("/api/create-membership-checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tierName: tier.name,
          tierPrice: tier.price,
          stripePriceId: tier.stripePriceId,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to create checkout session")
      }

      const { sessionId } = await response.json()

      // Redirect to Stripe Checkout
      const { error } = await stripe.redirectToCheckout({
        sessionId,
      })

      if (error) {
        throw new Error(error.message)
      }
    } catch (error: any) {
      console.error("Membership selection error:", error)
      toast.error(error.message || "Failed to process membership selection")
    } finally {
      setLoading(null)
    }
  }

  const getColorClasses = (color: string, isPopular: boolean) => {
    const baseClasses = "transition-all duration-300 hover:scale-105"

    if (isPopular) {
      return `${baseClasses} border-2 border-purple-500 bg-gradient-to-br from-purple-900/50 to-blue-900/50 shadow-lg shadow-purple-500/25`
    }

    switch (color) {
      case "blue":
        return `${baseClasses} border border-blue-700/50 bg-gradient-to-br from-blue-900/30 to-slate-900/30 hover:border-blue-500/50`
      case "purple":
        return `${baseClasses} border border-purple-700/50 bg-gradient-to-br from-purple-900/30 to-slate-900/30 hover:border-purple-500/50`
      case "gold":
        return `${baseClasses} border border-yellow-700/50 bg-gradient-to-br from-yellow-900/30 to-slate-900/30 hover:border-yellow-500/50`
      default:
        return `${baseClasses} border border-slate-700/50 bg-gradient-to-br from-slate-900/30 to-slate-800/30 hover:border-slate-500/50`
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {membershipTiers.map((tier) => (
        <Card key={tier.id} className={getColorClasses(tier.color, tier.popular)}>
          {tier.popular && (
            <div className="relative">
              <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-purple-500 text-white px-4 py-1">
                Most Popular
              </Badge>
            </div>
          )}

          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl font-bold text-white">{tier.name}</CardTitle>
            <CardDescription className="text-slate-300">{tier.description}</CardDescription>
            <div className="mt-4">
              <span className="text-4xl font-bold text-white">${tier.price}</span>
              <span className="text-slate-400">/month</span>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            <ul className="space-y-3">
              {tier.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <Icons.checkCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-200 text-sm">{feature}</span>
                </li>
              ))}
            </ul>

            <Button
              onClick={() => handleSelectTier(tier)}
              disabled={loading === tier.id}
              className={`w-full py-3 text-lg font-semibold ${
                tier.popular
                  ? "bg-purple-600 hover:bg-purple-700 text-white"
                  : "bg-white hover:bg-slate-100 text-slate-900"
              }`}
            >
              {loading === tier.id ? (
                <>
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                `Choose ${tier.name}`
              )}
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
