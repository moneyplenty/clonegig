import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

interface HeroSectionProps {
  title: string
  description: string
  ctaText: string
  ctaLink: string
  imageSrc: string
}

export function HeroSection({ title, description, ctaText, ctaLink, imageSrc }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-kelvin-background via-kelvin-card to-kelvin-background">
      <div className="absolute inset-0 bg-gradient-to-r from-kelvin-background/80 to-transparent" />
      <div className="relative container mx-auto px-4 py-24 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h1 className="text-4xl md:text-6xl font-bold text-kelvin-foreground leading-tight">{title}</h1>
            <p className="text-xl text-kelvin-muted-foreground max-w-lg">{description}</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                asChild
                className="bg-kelvin-primary hover:bg-kelvin-primary/90 text-kelvin-primary-foreground"
              >
                <Link href={ctaLink}>{ctaText}</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="border-kelvin-border text-kelvin-foreground hover:bg-kelvin-muted bg-transparent"
              >
                <Link href="/events">View Events</Link>
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-kelvin-primary/20 to-kelvin-secondary/20 backdrop-blur-sm">
              <Image
                src={imageSrc || "/placeholder.svg"}
                alt="Kelvin Creekman"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-kelvin-secondary/20 rounded-full blur-xl" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-kelvin-primary/20 rounded-full blur-xl" />
          </div>
        </div>
      </div>
    </section>
  )
}
