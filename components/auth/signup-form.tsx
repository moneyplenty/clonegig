"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/components/auth/auth-provider"
import { useToast } from "@/hooks/use-toast"
import { Eye, EyeOff, Loader2, Check, Crown, Star, Zap } from "lucide-react"

const membershipTiers = [
  {
    id: "frost_fan",
    name: "Frost Fan",
    price: 9.99,
    icon: Star,
    color: "bg-blue-500",
    features: ["Monthly exclusive content", "Fan community access", "Early music releases", "Digital downloads"],
  },
  {
    id: "blizzard_vip",
    name: "Blizzard VIP",
    price: 19.99,
    icon: Zap,
    color: "bg-purple-500",
    popular: true,
    features: [
      "Everything in Frost Fan",
      "Monthly video calls",
      "Exclusive merchandise discounts",
      "Behind-the-scenes content",
      "Priority customer support",
    ],
  },
  {
    id: "avalanche_backstage",
    name: "Avalanche Backstage",
    price: 49.99,
    icon: Crown,
    color: "bg-gold-500",
    features: [
      "Everything in Blizzard VIP",
      "Weekly 1-on-1 video calls",
      "Signed merchandise",
      "Concert ticket presales",
      "Personal song requests",
      "Birthday video messages",
    ],
  },
]

export function SignupForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [selectedTier, setSelectedTier] = useState("blizzard_vip")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const { signUp } = useAuth()
  const { toast } = useToast()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      toast({
        title: "Password mismatch",
        description: "Passwords do not match. Please try again.",
        variant: "destructive",
      })
      return
    }

    if (password.length < 6) {
      toast({
        title: "Password too short",
        description: "Password must be at least 6 characters long.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      await signUp(email, password)

      // Redirect to Stripe checkout for membership payment
      const selectedTierData = membershipTiers.find((tier) => tier.id === selectedTier)

      toast({
        title: "Account created! 🎉",
        description: `Redirecting to payment for ${selectedTierData?.name} membership...`,
      })

      // Simulate Stripe checkout redirect
      setTimeout(() => {
        router.push(`/checkout?tier=${selectedTier}&email=${encodeURIComponent(email)}`)
      }, 2000)
    } catch (error: any) {
      toast({
        title: "Sign up failed",
        description: error.message || "An error occurred during sign up.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Membership Tier Selection */}
      <div className="space-y-4">
        <Label className="text-base font-semibold">Choose Your Membership</Label>
        <div className="grid gap-3">
          {membershipTiers.map((tier) => {
            const Icon = tier.icon
            return (
              <Card
                key={tier.id}
                className={`cursor-pointer transition-all duration-200 ${
                  selectedTier === tier.id
                    ? "border-fire-500 dark:border-ice-500 bg-fire-50 dark:bg-ice-950/20"
                    : "border-muted hover:border-fire-300 dark:hover:border-ice-300"
                } ${tier.popular ? "ring-2 ring-fire-500 dark:ring-ice-500" : ""}`}
                onClick={() => setSelectedTier(tier.id)}
              >
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`p-1 rounded-full ${tier.color}`}>
                        <Icon className="h-4 w-4 text-white" />
                      </div>
                      <CardTitle className="text-lg">{tier.name}</CardTitle>
                      {tier.popular && <Badge className="bg-fire-500 dark:bg-ice-500 text-white">Most Popular</Badge>}
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold">${tier.price}</div>
                      <div className="text-sm text-muted-foreground">/month</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-1">
                    {tier.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm">
                        <Check className="h-3 w-3 text-green-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Account Details Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border-fire-500/20 dark:border-ice-500/20 focus:border-fire-500 dark:focus:border-ice-500"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Create a password (min. 6 characters)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="border-fire-500/20 dark:border-ice-500/20 focus:border-fire-500 dark:focus:border-ice-500 pr-10"
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4 text-muted-foreground" />
              ) : (
                <Eye className="h-4 w-4 text-muted-foreground" />
              )}
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            type="password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="border-fire-500/20 dark:border-ice-500/20 focus:border-fire-500 dark:focus:border-ice-500"
          />
        </div>

        <Button
          type="submit"
          className="w-full bg-gradient-fire dark:bg-gradient-ice hover:opacity-90 transition-opacity"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating account...
            </>
          ) : (
            `Create Account & Pay $${membershipTiers.find((t) => t.id === selectedTier)?.price}/month`
          )}
        </Button>
      </form>
    </div>
  )
}
