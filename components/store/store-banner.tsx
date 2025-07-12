"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingBag, Zap, Crown, Star } from "lucide-react"
import { useAuth } from "@/components/auth/auth-provider"

export function StoreBanner() {
  const { user } = useAuth()
  const userTier = user?.user_metadata?.tier || "guest"

  const getTierInfo = () => {
    switch (userTier) {
      case "frost":
        return {
          icon: <Star className="h-5 w-5" />,
          badge: "Frost Fan",
          discount: "10%",
          color: "text-blue-400",
          bgColor: "bg-blue-500/20",
          borderColor: "border-blue-500/50",
        }
      case "blizzard":
        return {
          icon: <Zap className="h-5 w-5" />,
          badge: "Blizzard VIP",
          discount: "20%",
          color: "text-purple-400",
          bgColor: "bg-purple-500/20",
          borderColor: "border-purple-500/50",
        }
      case "avalanche":
        return {
          icon: <Crown className="h-5 w-5" />,
          badge: "Avalanche Elite",
          discount: "30%",
          color: "text-yellow-400",
          bgColor: "bg-yellow-500/20",
          borderColor: "border-yellow-500/50",
        }
      default:
        return null
    }
  }

  const tierInfo = getTierInfo()

  return (
    <div className="relative overflow-hidden rounded-lg border border-electric-700/30 bg-gradient-to-r from-electric-900/50 to-ice-900/50 backdrop-blur-lg">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-electric-500/10 to-ice-500/10" />
      <div className="absolute top-0 left-0 w-full h-full bg-[url('/placeholder.svg?height=200&width=800')] opacity-5 bg-cover bg-center" />

      <div className="relative p-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          {/* Left Content */}
          <div className="flex-1 text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-3 mb-4">
              <ShoppingBag className="h-8 w-8 text-electric-400" />
              <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-electric bg-clip-text text-transparent">
                Kelvin's Official Store
              </h1>
            </div>

            <p className="text-lg text-muted-foreground mb-4 max-w-2xl">
              Get exclusive merchandise, limited edition items, and show your support for Kelvin Creekman. From electric
              guitars to icy cool apparel - find everything you need to rock the scene.
            </p>

            {/* Member Benefits */}
            {tierInfo && (
              <div className="flex items-center justify-center lg:justify-start gap-3 mb-4">
                <Badge
                  className={`${tierInfo.bgColor} ${tierInfo.color} ${tierInfo.borderColor} flex items-center gap-2`}
                >
                  {tierInfo.icon}
                  {tierInfo.badge}
                </Badge>
                <div className="text-sm">
                  <span className="text-muted-foreground">Your discount: </span>
                  <span className={`font-semibold ${tierInfo.color}`}>{tierInfo.discount} OFF</span>
                </div>
              </div>
            )}

            {!user && (
              <div className="flex items-center justify-center lg:justify-start gap-2 text-sm text-muted-foreground mb-4">
                <Star className="h-4 w-4" />
                <span>Join the fan club for exclusive discounts and early access!</span>
              </div>
            )}
          </div>

          {/* Right Content - CTA */}
          <div className="flex flex-col items-center gap-4">
            {!user && (
              <Button className="bg-gradient-electric hover:animate-electric-pulse px-8 py-3" size="lg">
                Join Fan Club
              </Button>
            )}

            <div className="text-center">
              <div className="text-sm text-muted-foreground">Free shipping on orders over</div>
              <div className="text-2xl font-bold text-electric-400">$75</div>
            </div>
          </div>
        </div>

        {/* Features Bar */}
        <div className="mt-8 pt-6 border-t border-electric-700/30">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="flex items-center justify-center gap-2 text-sm">
              <div className="w-2 h-2 rounded-full bg-electric-400" />
              <span>Authentic Merchandise</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-sm">
              <div className="w-2 h-2 rounded-full bg-ice-400" />
              <span>Limited Edition Items</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-sm">
              <div className="w-2 h-2 rounded-full bg-electric-400" />
              <span>Worldwide Shipping</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
