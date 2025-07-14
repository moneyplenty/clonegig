"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"
import { useAuth } from "@/components/auth/auth-provider"
import { createClient } from "@/lib/supabase/client"
import { toast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { useState } from "react"

interface MembershipTierProps {
  title: string
  description: string
  price: string
  features: string[]
  tier: "free" | "fan" | "super_fan"
  stripePriceId?: string // Optional Stripe Price ID for paid tiers
}

export function MembershipTier({ title, description, price, features, tier, stripePriceId }: MembershipTierProps) {
  const { user, loading: authLoading } = useAuth()
  const supabase = createClient()
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleJoin = async () => {
    if (authLoading) return // Prevent action if auth status is still loading

    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in or sign up to join a membership tier.",
        variant: "destructive",
      })
      router.push("/login")
      return
    }

    setLoading(true)

    if (tier === "free") {
      // For free tier, update user's profile directly
      const { error } = await supabase.from("profiles").update({ membership_tier: "free" }).eq("id", user.id)

      if (error) {
        console.error("Error setting free tier:", error.message)
        toast({
          title: "Error",
          description: "Failed to set free membership tier.",
          variant: "destructive",
        })
      } else {
        toast({
          title: "Success",
          description: "You are now on the Free tier!",
        })
        router.refresh() // Refresh to show updated membership
      }
      setLoading(false)
      return
    }

    // For paid tiers, initiate Stripe checkout
    if (!stripePriceId) {
      toast({
        title: "Configuration Error",
        description: "Stripe Price ID is missing for this tier.",
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
          items: [{ price: Number.parseFloat(price.replace(/[^0-9.-]+/g, "")), quantity: 1, name: title }], // Simplified for subscription
          customerEmail: user.email,
          // In a real subscription flow, you'd send the priceId directly to Stripe
          // and handle subscription creation on the webhook.
          // For this example, we're using a generic product checkout.
          // A proper subscription flow would involve Stripe's pricing API and webhooks.
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to create checkout session")
      }

      if (data.url) {
        router.push(data.url) // Redirect to Stripe Checkout page
      } else {
        toast({
          title: "Checkout Error",
          description: "Could not get Stripe checkout URL.",
          variant: "destructive",
        })
      }
    } catch (error: any) {
      console.error("Stripe checkout failed:", error)
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
    <Card className="flex h-full flex-col">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="mb-4 text-4xl font-bold">{price}</div>
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center">
              <CheckCircle className="mr-2 h-5 w-5 text-primary" />
              {feature}
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={handleJoin} disabled={loading || authLoading}>
          {loading ? "Processing..." : `Join ${title}`}
        </Button>
      </CardFooter>
    </Card>
  )
}
