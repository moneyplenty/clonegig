"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, Zap, Crown, Truck, Shield, Gift, Sparkles } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/components/auth/auth-provider"
import Image from "next/image"

const memberBenefits = {
  frost: {
    discount: 10,
    icon: Star,
    color: "text-blue-400",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/50",
  },
  blizzard: {
    discount: 20,
    icon: Zap,
    color: "text-purple-400",
    bgColor: "bg-purple-500/10",
    borderColor: "border-purple-500/50",
  },
  avalanche: {
    discount: 30,
    icon: Crown,
    color: "text-yellow-400",
    bgColor: "bg-yellow-500/10",
    borderColor: "border-yellow-500/50",
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
    <div className="relative w-full h-48 bg-gradient-to-r from-electric-500 to-frost-500 flex items-center justify-center text-white overflow-hidden">
      <Image
        src="/placeholder.png" // Replace with a relevant store banner image
        alt="Store Banner"
        layout="fill"
        objectFit="cover"
        className="absolute inset-0 z-0 opacity-30"
      />
      <div className="absolute inset-0 bg-black/40 z-10" />
      <div className="relative z-20 text-center px-4">
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight drop-shadow-lg">The Official Store</h1>
        <p className="text-lg md:text-xl mt-2 opacity-90 drop-shadow-md">
          Gear up with exclusive Kelvin Creekman merchandise.
        </p>
      </div>
      <div className="absolute bottom-0 left-0 right-0 px-4 sm:px-6 lg:px-8 z-20">
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
          <Link href="/store">
            <Button
              variant="secondary"
              className="bg-white text-purple-700 hover:bg-gray-100 hover:text-purple-800 text-lg px-8 py-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              Shop Now
            </Button>
          </Link>
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
    </div>
  )
}
