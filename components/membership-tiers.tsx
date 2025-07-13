"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckIcon } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface MembershipTiersProps {
  currentMembership: string
}

export function MembershipTiers({ currentMembership }: MembershipTiersProps) {
  const tiers = [
    {
      name: "Free Fan",
      price: "Free",
      description: "Access to basic content and community features.",
      features: ["Access to free content", "Community forum access", "Event announcements", "Newsletter subscription"],
      tier: "free",
    },
    {
      name: "Premium Fan",
      price: "$9.99/month",
      description: "Unlock exclusive content and early access.",
      features: [
        "All Free Fan benefits",
        "Exclusive audio demos",
        "Behind-the-scenes videos",
        "Early access to ticket sales",
        "Priority support",
      ],
      tier: "premium",
    },
    {
      name: "VIP Fan",
      price: "$29.99/month",
      description: "The ultimate fan experience with personalized perks.",
      features: [
        "All Premium Fan benefits",
        "1-on-1 video calls with Kelvin",
        "Signed merchandise discounts",
        "Exclusive VIP events",
        "Personalized shout-outs",
      ],
      tier: "vip",
    },
  ]

  return (
    <div className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto">
      {tiers.map((tier, index) => (
        <Card
          key={index}
          className={cn("flex flex-col", currentMembership === tier.tier && "border-primary ring-2 ring-primary")}
        >
          <CardHeader>
            <CardTitle className="text-2xl">{tier.name}</CardTitle>
            <CardDescription>{tier.description}</CardDescription>
          </CardHeader>
          <CardContent className="flex-1">
            <div className="text-4xl font-bold mb-4">{tier.price}</div>
            <ul className="space-y-2">
              {tier.features.map((feature, featureIndex) => (
                <li key={featureIndex} className="flex items-center">
                  <CheckIcon className="w-5 h-5 text-green-500 mr-2" />
                  {feature}
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            {currentMembership === tier.tier ? (
              <Button disabled className="w-full">
                Current Plan
              </Button>
            ) : (
              <Button asChild className="w-full">
                <Link href={`/checkout?tier=${tier.tier}`}>Choose Plan</Link>
              </Button>
            )}
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
