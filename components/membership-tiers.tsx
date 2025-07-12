import { cn } from "@/lib/utils"
import type React from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check, Crown, Star, Zap } from "lucide-react"
import Link from "next/link"

interface Tier {
  id: string
  name: string
  price: string
  features: string[]
  icon: React.ElementType
  iconColor: string
  buttonText: string
}

const tiers: Tier[] = [
  {
    id: "frost",
    name: "Frost Fan",
    price: "$9.99/month",
    features: [
      "Access to exclusive blog posts",
      "Early access to merchandise drops",
      "Monthly newsletter",
      "Fan-only polls & surveys",
    ],
    icon: Star,
    iconColor: "text-blue-400",
    buttonText: "Join Frost Tier",
  },
  {
    id: "blizzard",
    name: "Blizzard VIP",
    price: "$19.99/month",
    features: [
      "All Frost Fan benefits",
      "Exclusive video content (behind-the-scenes, vlogs)",
      "Priority access to event tickets",
      "Access to private Discord channel",
      "Quarterly Q&A sessions with Kelvin",
    ],
    icon: Zap,
    iconColor: "text-purple-400",
    buttonText: "Join Blizzard Tier",
  },
  {
    id: "avalanche",
    name: "Avalanche Elite",
    price: "$49.99/month",
    features: [
      "All Blizzard VIP benefits",
      "Early access to unreleased music demos",
      "Annual virtual meet & greet lottery entry",
      "Signed merchandise discount (10%)",
      "Personalized birthday message from Kelvin",
      "Exclusive 'Avalanche' badge on profile",
    ],
    icon: Crown,
    iconColor: "text-yellow-400",
    buttonText: "Join Avalanche Tier",
  },
]

export function MembershipTiers() {
  return (
    <section className="container mx-auto px-4 py-12 md:py-24">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
        <span className="bg-gradient-to-r from-electric-400 to-frost-400 bg-clip-text text-transparent">
          Membership Tiers
        </span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {tiers.map((tier) => (
          <Card key={tier.id} className="bg-background/50 backdrop-blur-lg border-electric-700/30 flex flex-col">
            <CardHeader className="text-center pb-4">
              <tier.icon className={cn("h-12 w-12 mx-auto mb-4", tier.iconColor)} />
              <CardTitle className="text-2xl font-bold text-electric-100">{tier.name}</CardTitle>
              <p className="text-3xl font-extrabold text-electric-400">{tier.price}</p>
            </CardHeader>
            <CardContent className="flex-1">
              <ul className="space-y-2 text-muted-foreground">
                {tier.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-green-400" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter className="pt-6">
              <Button asChild className="w-full bg-gradient-electric hover:animate-electric-pulse">
                <Link href="/join">{tier.buttonText}</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  )
}
