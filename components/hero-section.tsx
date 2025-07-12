"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Play, Music, Zap, Star } from "lucide-react"

const heroSlides = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1200&h=800&fit=crop",
    title: "Live Performance",
    subtitle: "Experience the Electric Energy",
    description: "Join Kelvin Creekman on stage for an unforgettable rock experience",
    cta: "Watch Live",
    ctaLink: "/events",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&h=800&fit=crop",
    title: "Studio Sessions",
    subtitle: "Behind the Music",
    description: "Get exclusive access to studio recordings and creative process",
    cta: "Explore Content",
    ctaLink: "/content",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=1200&h=800&fit=crop",
    title: "Meet & Greet",
    subtitle: "Connect with Kelvin",
    description: "Book personal video sessions and connect with your favorite artist",
    cta: "Book Session",
    ctaLink: "/meet-and-greet",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=1200&h=800&fit=crop",
    title: "Exclusive Merch",
    subtitle: "Official Fan Gear",
    description: "Shop limited edition merchandise and exclusive fan club items",
    cta: "Shop Now",
    ctaLink: "/store",
  },
]

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    setIsAutoPlaying(false)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
    setIsAutoPlaying(false)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
    setIsAutoPlaying(false)
  }

  return (
    <section className="relative h-[80vh] min-h-[600px] overflow-hidden bg-gradient-to-br from-background via-background/95 to-primary/10">
      {/* Background Slides */}
      <div className="absolute inset-0">
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={slide.image || "/placeholder.svg"}
              alt={slide.title}
              fill
              className="object-cover"
              priority={index === 0}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </div>
        ))}
      </div>

      {/* Theme Effects */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Light mode - Fire effects */}
        <div className="dark:hidden">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-fire-400 rounded-full animate-ping" />
          <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-ember-400 rounded-full animate-pulse" />
          <div className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-fire-500 rounded-full animate-bounce opacity-60" />
          <div className="absolute top-1/2 right-1/4 w-1 h-1 bg-ember-300 rounded-full animate-ping" />
        </div>

        {/* Dark mode - Ice effects */}
        <div className="hidden dark:block">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-electric-400 rounded-full animate-ping" />
          <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-frost-400 rounded-full animate-pulse" />
          <div className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-electric-500 rounded-full animate-bounce opacity-60" />
          <div className="absolute top-1/2 right-1/4 w-1 h-1 bg-frost-300 rounded-full animate-ping" />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            {heroSlides.map((slide, index) => (
              <div
                key={slide.id}
                className={`transition-all duration-1000 ${
                  index === currentSlide ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8 pointer-events-none"
                }`}
              >
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center gap-2 text-primary">
                      {slide.id === 1 && <Music className="h-5 w-5" />}
                      {slide.id === 2 && <Play className="h-5 w-5" />}
                      {slide.id === 3 && <Star className="h-5 w-5" />}
                      {slide.id === 4 && <Zap className="h-5 w-5" />}
                      <span className="text-sm font-semibold uppercase tracking-wider">{slide.subtitle}</span>
                    </div>
                  </div>
                  <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                    <span className="bg-gradient-to-r from-white via-primary/80 to-primary bg-clip-text text-transparent fire-text dark:frost-text">
                      {slide.title}
                    </span>
                  </h1>
                  <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed max-w-2xl">
                    {slide.description}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    asChild
                    size="lg"
                    className="bg-gradient-fire dark:bg-gradient-electric hover:animate-fire-pulse dark:hover:animate-electric-pulse text-lg px-8 py-6 rounded-full"
                  >
                    <Link href={slide.ctaLink}>
                      {slide.cta}
                      <Zap className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="border-fire-500/50 text-fire-300 hover:bg-fire-500/10 hover:border-fire-400 dark:border-electric-500/50 dark:text-electric-300 dark:hover:bg-electric-500/10 dark:hover:border-electric-400 text-lg px-8 py-6 rounded-full bg-transparent"
                  >
                    <Link href="/join">
                      Join Fan Club
                      <Star className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/50 hover:bg-black/70 text-white transition-all hover:scale-110 fire-glow dark:frost-glow"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/50 hover:bg-black/70 text-white transition-all hover:scale-110 fire-glow dark:frost-glow"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide
                ? "bg-fire-400 dark:bg-electric-400 scale-125 fire-glow dark:frost-glow"
                : "bg-white/50 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Auto-play indicator */}
      <div className="absolute top-4 right-4 z-20">
        <button
          onClick={() => setIsAutoPlaying(!isAutoPlaying)}
          className={`p-2 rounded-full transition-all ${
            isAutoPlaying
              ? "bg-fire-500/20 text-fire-400 dark:bg-electric-500/20 dark:text-electric-400"
              : "bg-gray-500/20 text-gray-400"
          }`}
          aria-label={isAutoPlaying ? "Pause slideshow" : "Play slideshow"}
        >
          {isAutoPlaying ? (
            <div className="w-4 h-4 flex items-center justify-center">
              <div className="w-1 h-3 bg-current mr-0.5" />
              <div className="w-1 h-3 bg-current" />
            </div>
          ) : (
            <Play className="h-4 w-4" />
          )}
        </button>
      </div>

      {/* Theme Lightning/Flame Effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Light mode - Flame effects */}
        <div className="dark:hidden">
          <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-fire-400/20 to-transparent animate-pulse flame-flicker" />
          <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-ember-400/20 to-transparent animate-pulse delay-1000 flame-flicker" />
        </div>

        {/* Dark mode - Lightning effects */}
        <div className="hidden dark:block">
          <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-electric-400/20 to-transparent animate-pulse lightning-flash" />
          <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-frost-400/20 to-transparent animate-pulse delay-1000 lightning-flash" />
        </div>
      </div>
    </section>
  )
}
