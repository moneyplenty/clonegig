import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, Users, Music } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { SuperFans } from "@/components/super-fans"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-primary/5">
      {/* Super Fans positioned in top right */}
      <div className="absolute top-4 right-4 z-10 hidden lg:block">
        <SuperFans />
      </div>

      <div className="container px-4 md:px-6 py-12 md:py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="flex flex-col justify-center space-y-8">
            <div className="space-y-4">
              <Badge className="w-fit">Official Fan Club</Badge>
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Welcome to Kelvin Creekman's Universe
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Join the Ice Legion and experience exclusive content, live events, and connect with fellow fans
                worldwide.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild>
                <Link href="/join">
                  <Users className="mr-2 h-5 w-5" />
                  Join the Ice Legion
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/events">
                  <Play className="mr-2 h-5 w-5" />
                  Watch Latest
                </Link>
              </Button>
            </div>

            <div className="flex items-center space-x-8 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4" />
                <span>10K+ Fans</span>
              </div>
              <div className="flex items-center space-x-2">
                <Music className="h-4 w-4" />
                <span>50+ Songs</span>
              </div>
              <div className="flex items-center space-x-2">
                <Play className="h-4 w-4" />
                <span>100+ Videos</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative aspect-square overflow-hidden rounded-2xl">
              <Image
                src="/placeholder.svg?height=600&width=600"
                alt="Kelvin Creekman performing"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>

            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 bg-primary text-primary-foreground rounded-full p-4 shadow-lg">
              <Music className="h-6 w-6" />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-secondary text-secondary-foreground rounded-full p-4 shadow-lg">
              <Play className="h-6 w-6" />
            </div>
          </div>
        </div>

        {/* Mobile Super Fans - shown below hero on mobile */}
        <div className="mt-8 lg:hidden">
          <SuperFans />
        </div>
      </div>
    </section>
  )
}
