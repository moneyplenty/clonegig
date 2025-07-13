import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Crown, Star, Users, ExternalLink } from "lucide-react"

interface HeroSectionProps {
  title: string
  description: string
  ctaText: string
  ctaLink: string
  imageSrc?: string
  videoSrc?: string
  videoPoster?: string
}

export function HeroSection({
  title,
  description,
  ctaText,
  ctaLink,
  imageSrc,
  videoSrc,
  videoPoster,
}: HeroSectionProps) {
  const hasMedia = imageSrc || videoSrc

  const topMembers = [
    { name: "Alexandra Storm", tier: "Avalanche", icon: Crown, hasTikTok: true },
    { name: "Marcus Frost", tier: "Blizzard", icon: Star, hasTikTok: true },
    { name: "Luna Ice", tier: "Avalanche", icon: Crown, hasTikTok: true },
    { name: "Phoenix Winter", tier: "Frost", icon: Users, hasTikTok: false },
    { name: "Echo Blaze", tier: "Blizzard", icon: Star, hasTikTok: false },
  ]

  const getTierColor = (tier: string) => {
    switch (tier) {
      case "Avalanche": return "text-yellow-400 border-yellow-400/50 bg-yellow-400/10"
      case "Blizzard": return "text-purple-400 border-purple-400/50 bg-purple-400/10"
      case "Frost": return "text-blue-400 border-blue-400/50 bg-blue-400/10"
      default: return "text-gray-400 border-gray-400/50 bg-gray-400/10"
    }
  }

  return (
    <section className="relative w-full h-[calc(100vh-4rem)] flex items-center justify-center text-center overflow-hidden">
      {hasMedia && (
        <div className="absolute inset-0 z-0">
          {videoSrc ? (
            <video
              className="w-full h-full object-cover"
              autoPlay
              loop
              muted
              playsInline
              src={videoSrc || undefined}
              poster={videoPoster || undefined}
            >
              Your browser does not support the video tag.
            </video>
          ) : (
            <Image
              src={imageSrc || "/placeholder.svg"}
              alt="Hero Background"
              layout="fill"
              objectFit="cover"
              priority
            />
          )}
          <div className="absolute inset-0 bg-black/60" />
        </div>
      )}

      {/* TOP MEMBERS Section - Fixed position */}
      <div className="absolute top-4 right-4 z-20 w-80">
        <Card className="bg-black/80 backdrop-blur-lg border-electric-700/30 shadow-2xl">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-4">
              <Crown className="h-5 w-5 text-yellow-400" />
              <h3 className="text-lg font-bold text-white">TOP MEMBERS</h3>
            </div>
            <div className="space-y-3">
              {topMembers.map((member, index) => {
                const Icon = member.icon
                return (
                  <div
                    key={member.name}
                    className="flex items-center justify-between p-3 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-electric-400 to-frost-400 flex items-center justify-center text-black font-bold text-sm">
                          {index + 1}
                        </div>
                        <Icon className={`h-4 w-4 ${getTierColor(member.tier).split(' ')[0]}`} />
                      </div>
                      <div className="text-left">
                        <p className="text-white font-medium text-sm">{member.name}</p>
                        <Badge className={`${getTierColor(member.tier)} text-xs px-2 py-0`}>
                          {member.tier}
                        </Badge>
                      </div>
                    </div>
                    {member.hasTikTok && (
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-8 w-8 p-0 text-white hover:bg-white/20"
                        asChild
                      >
                        <Link
                          href="https://www.tiktok.com/@lk_larr_?_t=ZS-8xyuzCdnwMk&_r=1"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </Link>
                      </Button>
                    )}
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="relative z-10 text-white px-4 md:px-8 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6 drop-shadow-lg">
          <span className="bg-gradient-to-r from-electric-400 to-frost-400 bg-clip-text text-transparent">{title}</span>
        </h1>
        <p className="text-lg md:text-xl mb-8 opacity-90 drop-shadow-md">{description}</p>
        <Button size="lg" className="bg-gradient-electric hover:animate-electric-pulse" asChild>
          <Link href={ctaLink}>{ctaLink}</Link>
        </Button>
      </div>
    </section>
  )
}
