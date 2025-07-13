"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, Crown, Zap, Truck, Shield, Gift, Sparkles } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/components/auth/auth-provider"

const memberBenefits = {
  frost: {
    discount: 10,
    icon: Star,
    color: "text-blue-400",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/30",
  },
  blizzard: {
    discount: 20,
    icon: Zap,
    color: "text-purple-400",
    bgColor: "bg-purple-500/10",
    borderColor: "border-purple-500/30",
  },
  avalanche: {
    discount: 30,
    icon: Crown,
    color: "text-yellow-400",
    bgColor: "bg-yellow-500/10",
    borderColor: "border-yellow-500/30",
  },
}

const storeFeatures = [
  {
    icon: Truck,
    title: "Free Worldwide Shipping",
    description: "On orders over $50",
  },
  {
    icon: Shield,
    title: "Authentic Guarantee",
    description: "100% official merchandise",
  },
  {
    icon: Gift,
    title: "Exclusive Items",
    description: "Fan club member exclusives",
  },
  {
    icon: Sparkles,
    title: "Limited Editions",
    description: "Rare collectibles available",
  },
]

export function StoreBanner() {
  const { user } = useAuth()
  const userTier = user?.user_metadata?.tier as keyof typeof memberBenefits
  const memberInfo = userTier ? memberBenefits[userTier] : null

  return (
    <section className="relative bg-gradient-to-r from-kelvin-primary to-kelvin-secondary py-12 text-kelvin-primary-foreground md:py-24 lg:py-32 overflow-hidden">
      <div className="container px-4 md:px-6 text-center relative z-10">
        {/* Member Benefits Banner */}
        {user && memberInfo ? (
          <Card className={`${memberInfo.bgColor} ${memberInfo.borderColor} border-2`}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-full ${memberInfo.bgColor} ${memberInfo.borderColor} border`}>
                    <memberInfo.icon className={`h-6 w-6 ${memberInfo.color}`} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">
                      Welcome back, {userTier.charAt(0).toUpperCase() + userTier.slice(1)} Member!
                    </h3>
                    <p className="text-muted-foreground">
                      You get <span className={`font-bold ${memberInfo.color}`}>{memberInfo.discount}% off</span> all
                      merchandise
                    </p>
                  </div>
                </div>
                <Badge
                  className={`${memberInfo.bgColor} ${memberInfo.color} ${memberInfo.borderColor} border text-lg px-4 py-2`}
                >
                  {memberInfo.discount}% OFF
                </Badge>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="w-full bg-gradient-to-r from-electric-600 to-frost-600 text-white p-6 mb-8 text-center shadow-lg">
            <h2 className="text-3xl font-bold mb-2">Exclusive Merchandise</h2>
            <p className="mx-auto max-w-[700px] text-kelvin-primary-foreground/90 md:text-xl mt-4">
              Gear up with official Kelvin Creekman apparel, accessories, and collectibles. Limited stock available!
            </p>
            <div className="mt-8">
              <Button
                asChild
                className="bg-kelvin-primary-foreground text-kelvin-primary hover:bg-kelvin-primary-foreground/90"
              >
                <Link href="/store">Shop Now</Link>
              </Button>
            </div>
          </div>
        )}

        {/* Store Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
          {storeFeatures.map((feature, index) => (
            <Card key={index} className="border-electric-700/30 bg-background/50 backdrop-blur-lg">
              <CardContent className="p-4 text-center">
                <feature.icon className="h-8 w-8 mx-auto mb-2 text-electric-400" />
                <h4 className="font-semibold mb-1">{feature.title}</h4>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      {/* Abstract shapes for icy/electrifying feel */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-white/10 rounded-full mix-blend-overlay animate-blob filter blur-xl" />
        <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-electric-purple/10 rounded-full mix-blend-overlay animate-blob animation-delay-2000 filter blur-xl" />
        <div className="absolute bottom-1/4 left-1/2 w-56 h-56 bg-ice-blue/10 rounded-full mix-blend-overlay animate-blob animation-delay-4000 filter blur-xl" />
      </div>
    </section>
  )
}
