"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Crown, Zap } from "lucide-react"
import Link from "next/link"

const membershipTiers = [
  {
    id: "premium",
    name: "Ice Legion Member",
    description: "Unlock exclusive content and special perks",
    price: 9.99,
    period: "month",
    icon: Zap,
    popular: true,
    features: [
      "Exclusive video content",
      "Behind-the-scenes footage",
      "Monthly live Q&A sessions",
      "Early event ticket access",
      "Member-only merchandise discounts",
      "Priority customer support",
    ],
  },
  {
    id: "vip",
    name: "VIP Ice Legion",
    description: "The ultimate fan experience with maximum access",
    price: 24.99,
    period: "month",
    icon: Crown,
    popular: false,
    features: [
      "All Premium features",
      "Unlimited meet & greet access",
      "Personal video messages",
      "Exclusive VIP events",
      "Signed merchandise included",
      "Direct messaging with Kelvin",
      "VIP customer support",
      "Annual exclusive merchandise box",
    ],
  },
]

export default function JoinPage() {
  return (
    <div className="container px-4 py-8">
      <div className="mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Join the Ice Legion</h1>
          <p className="text-xl text-muted-foreground">
            Choose your membership tier and unlock exclusive content, events, and perks.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {membershipTiers.map((tier) => {
            const Icon = tier.icon
            return (
              <Card
                key={tier.id}
                className={`flex flex-col relative ${tier.popular ? "border-primary shadow-lg scale-105" : ""}`}
              >
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground">Most Popular</Badge>
                  </div>
                )}
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-2xl">{tier.name}</CardTitle>
                  <CardDescription>{tier.description}</CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">${tier.price}</span>
                    <span className="text-muted-foreground">/{tier.period}</span>
                  </div>
                </CardHeader>
                <CardContent className="flex-1">
                  <ul className="space-y-3">
                    {tier.features.map((feature, index) => (
                      <li key={index} className="flex items-center space-x-3">
                        <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" variant={tier.popular ? "default" : "outline"} size="lg">
                    Choose {tier.name}
                  </Button>
                </CardFooter>
              </Card>
            )
          })}
        </div>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-4">Already have an account?</p>
          <Button variant="outline" asChild>
            <Link href="/login">Sign In</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
