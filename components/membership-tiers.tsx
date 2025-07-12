import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check, Crown, Star, Zap } from "lucide-react"
import Link from "next/link"

export function MembershipTiers() {
  const tiers = [
    {
      name: "Frost Fan",
      price: "Free",
      features: [
        "Access to public news & updates",
        "Basic community forum access",
        "Early access to general ticket sales",
      ],
      icon: Star,
      buttonText: "Join for Free",
      link: "/signup",
    },
    {
      name: "Blizzard VIP",
      price: "$9.99/month",
      features: [
        "All Frost Fan benefits",
        "Exclusive content & behind-the-scenes",
        "Priority access to meet & greets",
        "Discount on merchandise",
        "Private Discord channel access",
      ],
      icon: Zap,
      buttonText: "Upgrade to VIP",
      link: "/join",
    },
    {
      name: "Avalanche Elite",
      price: "$24.99/month",
      features: [
        "All Blizzard VIP benefits",
        "Personalized video messages from Kelvin",
        "Signed merchandise giveaways",
        "Exclusive virtual listening parties",
        "Annual private online Q&A with Kelvin",
      ],
      icon: Crown,
      buttonText: "Go Elite",
      link: "/join",
    },
  ]

  return (
    <section className="py-12 md:py-24 bg-gradient-to-t from-background to-electric-950/10">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-8">
          <span className="bg-gradient-to-r from-electric-400 to-frost-400 bg-clip-text text-transparent">
            Choose Your Membership
          </span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tiers.map((tier, index) => (
            <Card key={index} className="flex flex-col bg-background/50 backdrop-blur-lg border-frost-700/30">
              <CardHeader className="text-center pb-4">
                <tier.icon className="h-12 w-12 mx-auto mb-4 text-electric-400" />
                <CardTitle className="text-2xl font-bold text-frost-300">{tier.name}</CardTitle>
                <p className="text-4xl font-extrabold text-electric-200">{tier.price}</p>
              </CardHeader>
              <CardContent className="flex-grow p-6 pt-0">
                <ul className="space-y-2 text-left text-electric-100">
                  {tier.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <Check className="h-5 w-5 text-green-400 mr-2 shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <div className="p-6 pt-0">
                <Button className="w-full bg-gradient-electric hover:animate-electric-pulse" asChild>
                  <Link href={tier.link}>{tier.buttonText}</Link>
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
