"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Image from "next/image"
import { Icons } from "@/components/icons"

const superFans = [
  { name: "Sarah M.", tiktokUrl: "https://tiktok.com/@sarahm_fan" },
  { name: "Mike R.", tiktokUrl: "https://tiktok.com/@mikerock2024" },
  { name: "Emma K.", tiktokUrl: "https://tiktok.com/@emmak_music" },
]

export function HeroSection() {
  return (
    <section className="relative overflow-hidden py-20 lg:py-32">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-slate-900/20" />
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-8">
            <div className="space-y-6">
              <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/50 px-4 py-2">🎸 Official Fan Club</Badge>

              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-white">
                Welcome to the{" "}
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
                  Kelvin Creekman
                </span>{" "}
                Fan Club
              </h1>

              <p className="text-xl text-slate-300 max-w-2xl leading-relaxed">
                Join thousands of fans in the ultimate rock and metal experience. Get exclusive content, merchandise,
                and direct access to Kelvin himself.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg">
                <Link href="/signup">Join the Club</Link>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-slate-600 text-slate-300 hover:bg-slate-800 px-8 py-4 text-lg bg-transparent"
              >
                <Link href="/store">Shop Merch</Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-slate-700">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">15K+</div>
                <div className="text-sm text-slate-400">Active Members</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">500+</div>
                <div className="text-sm text-slate-400">Exclusive Videos</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">50+</div>
                <div className="text-sm text-slate-400">Live Events</div>
              </div>
            </div>
          </div>

          {/* Right Side - Super Fans & Image */}
          <div className="lg:col-span-4 space-y-6">
            {/* Super Fans Section */}
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <Icons.star className="h-5 w-5 text-yellow-400" />
                  Super Fans
                </h3>
                <div className="space-y-3">
                  {superFans.map((fan, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-slate-300">{fan.name}</span>
                      <a
                        href={fan.tiktokUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-pink-400 hover:text-pink-300 transition-colors"
                      >
                        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                        </svg>
                        <span className="text-xs">TikTok</span>
                      </a>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Hero Image */}
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-slate-700">
                <Image
                  src="/kelvin-logo.png"
                  alt="Kelvin Creekman"
                  width={400}
                  height={400}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium animate-pulse">
                Live Now
              </div>

              <div className="absolute -bottom-4 -left-4 bg-purple-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                🎵 New Album
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
