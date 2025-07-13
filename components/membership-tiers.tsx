"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Star, Crown, Zap } from "lucide-react"
import Link from "next/link"

const membershipTiers = [
  {
    id: "free",
    name: "Free Fan",
    description: "Get started with basic access to Kelvin's content",
    price: 0,
    period: "forever",
    icon: Star,
    popular: false,
    features: [
      "Access to public content",
      "Community forum access",
      "Monthly newsletter",
      "Basic event notifications",
      "Standard customer support",
    ],
    limitations: ["No exclusive content", "No meet & greet access", "No early event access"],
  },
  {
    id: "premium",
    name: "Ice Legion Member",
    description: "Unlock exclusive content and special perks",
    price: 9.99,
    period: "month",
    icon: Zap,
    popular: true,
    features: [
      "All Free features",
      "Exclusive video content",
      "Behind-the-scenes footage",
      "Monthly live Q&A sessions",
      "Early event ticket access",
      "Member-only merchandise discounts",
      "Priority customer support",
    ],
    limitations: ["Limited meet & greet access"],
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
    limitations: [],
  },
]

export function MembershipTiers() {
  return (
    <section className="py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Join the Ice Legion</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Choose the perfect membership tier to unlock exclusive content and connect with Kelvin.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-3 lg:gap-8">
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
                  <Button className="w-full" variant={tier.popular ? "default" : "outline"} asChild>
                    <Link href={tier.id === "free" ? "/signup" : "/join"}>
                      {tier.id === "free" ? "Get Started" : "Upgrade Now"}
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
