"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Play, Music, Zap, Star, Volume2, VolumeX } from "lucide-react"

const heroSlides = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1920&h=1080&fit=crop",
    video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    title: "Live Performance",
    subtitle: "Experience the Electric Energy",
    description: "Join Kelvin Creekman on stage for an unforgettable rock experience",
    cta: "Watch Live",
    ctaLink: "/events",
    type: "video",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1920&h=1080&fit=crop",
    title: "Studio Sessions",
    subtitle: "Behind the Music",
    description: "Get exclusive access to studio recordings and creative process",
    cta: "Explore Content",
    ctaLink: "/content",
    type: "image",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=1920&h=1080&fit=crop",
    title: "Meet & Greet",
    subtitle: "Connect with Kelvin",
    description: "Book personal video sessions and connect with your favorite artist",
    cta: "Book Session",
    ctaLink: "/meet-and-greet",
    type: "image",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=1920&h=1080&fit=crop",
    video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    title: "Exclusive Merch",
    subtitle: "Official Fan Gear",
    description: "Shop limited edition merchandise and exclusive fan club items",
    cta: "Shop Now",
    ctaLink: "/store",
    type: "video",
  },
]

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(true)
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 8000) // Longer duration for videos

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

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      {/* Background Slides */}
      <div className="absolute inset-0">
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            {slide.type === "video" && slide.video ? (
              <video
                className="absolute inset-0 w-full h-full object-cover"
                autoPlay
                loop
                muted={isMuted}
                playsInline
                onLoadedData={() => setIsVideoLoaded(true)}
              >
                <source src={slide.video} type="video/mp4" />
                <Image
                  src={slide.image || "/placeholder.svg"}
                  alt={slide.title}
                  fill
                  className="object-cover"
                  priority={index === 0}
                />
              </video>
            ) : (
              <Image
                src={slide.image || "/placeholder.svg"}
                alt={slide.title}
                fill
                className="object-cover"
                priority={index === 0}
              />
            )}

            {/* Gradient Overlays for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/30" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60" />
          </div>
        ))}
      </div>

      {/* Animated Theme Effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Light mode - Fire effects */}
        <div className="dark:hidden">
          <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-fire-400 rounded-full animate-ping opacity-60" />
          <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-ember-400 rounded-full animate-pulse opacity-40" />
          <div className="absolute bottom-1/4 left-1/3 w-4 h-4 bg-fire-500 rounded-full animate-bounce opacity-30" />
          <div className="absolute top-1/2 right-1/4 w-2 h-2 bg-ember-300 rounded-full animate-ping opacity-50" />
          <div className="absolute bottom-1/3 right-1/2 w-3 h-3 bg-fire-600 rounded-full animate-pulse opacity-40" />
        </div>

        {/* Dark mode - Ice effects */}
        <div className="hidden dark:block">
          <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-electric-400 rounded-full animate-ping opacity-60" />
          <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-frost-400 rounded-full animate-pulse opacity-40" />
          <div className="absolute bottom-1/4 left-1/3 w-4 h-4 bg-electric-500 rounded-full animate-bounce opacity-30" />
          <div className="absolute top-1/2 right-1/4 w-2 h-2 bg-frost-300 rounded-full animate-ping opacity-50" />
          <div className="absolute bottom-1/3 right-1/2 w-3 h-3 bg-electric-600 rounded-full animate-pulse opacity-40" />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-4xl">
            {heroSlides.map((slide, index) => (
              <div
                key={slide.id}
                className={`transition-all duration-1000 ${
                  index === currentSlide ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8 pointer-events-none"
                }`}
              >
                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="flex items-center gap-3 text-primary">
                      {slide.id === 1 && <Music className="h-6 w-6" />}
                      {slide.id === 2 && <Play className="h-6 w-6" />}
                      {slide.id === 3 && <Star className="h-6 w-6" />}
                      {slide.id === 4 && <Zap className="h-6 w-6" />}
                      <span className="text-lg font-bold uppercase tracking-wider text-fire-400 dark:text-electric-400">
                        {slide.subtitle}
                      </span>
                    </div>
                  </div>

                  <h1 className="text-6xl md:text-8xl lg:text-9xl font-black mb-8 leading-none">
                    <span className="bg-gradient-to-r from-white via-fire-200 to-fire-400 dark:from-white dark:via-electric-200 dark:to-electric-400 bg-clip-text text-transparent drop-shadow-2xl">
                      {slide.title}
                    </span>
                  </h1>

                  <p className="text-2xl md:text-3xl lg:text-4xl text-gray-200 mb-10 leading-relaxed max-w-3xl font-light">
                    {slide.description}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-6">
                  <Button
                    asChild
                    size="lg"
                    className="bg-gradient-to-r from-fire-500 to-ember-500 hover:from-fire-600 hover:to-ember-600 dark:from-electric-500 dark:to-frost-500 dark:hover:from-electric-600 dark:hover:to-frost-600 text-white text-xl px-10 py-8 rounded-full shadow-2xl hover:shadow-fire-500/25 dark:hover:shadow-electric-500/25 transition-all duration-300 hover:scale-105"
                  >
                    <Link href={slide.ctaLink} className="flex items-center gap-3">
                      {slide.cta}
                      <Zap className="h-6 w-6" />
                    </Link>
                  </Button>

                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="border-2 border-fire-400/70 text-fire-200 hover:bg-fire-500/20 hover:border-fire-300 dark:border-electric-400/70 dark:text-electric-200 dark:hover:bg-electric-500/20 dark:hover:border-electric-300 text-xl px-10 py-8 rounded-full bg-black/30 backdrop-blur-sm transition-all duration-300 hover:scale-105"
                  >
                    <Link href="/join" className="flex items-center gap-3">
                      Join Fan Club
                      <Star className="h-6 w-6" />
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Video Controls */}
      {heroSlides[currentSlide].type === "video" && (
        <button
          onClick={toggleMute}
          className="absolute bottom-24 right-6 z-30 p-4 rounded-full bg-black/60 hover:bg-black/80 text-white transition-all hover:scale-110 backdrop-blur-sm"
          aria-label={isMuted ? "Unmute video" : "Mute video"}
        >
          {isMuted ? <VolumeX className="h-6 w-6" /> : <Volume2 className="h-6 w-6" />}
        </button>
      )}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-20 p-4 rounded-full bg-black/60 hover:bg-black/80 text-white transition-all hover:scale-110 backdrop-blur-sm shadow-2xl"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-8 w-8" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-20 p-4 rounded-full bg-black/60 hover:bg-black/80 text-white transition-all hover:scale-110 backdrop-blur-sm shadow-2xl"
        aria-label="Next slide"
      >
        <ChevronRight className="h-8 w-8" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-4">
        {heroSlides.map((slide, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`relative w-4 h-4 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "bg-fire-400 dark:bg-electric-400 scale-125 shadow-lg shadow-fire-400/50 dark:shadow-electric-400/50"
                : "bg-white/50 hover:bg-white/70 hover:scale-110"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          >
            {slide.type === "video" && <Play className="absolute inset-0 w-2 h-2 m-auto text-black/60" />}
          </button>
        ))}
      </div>

      {/* Auto-play Controls */}
      <div className="absolute top-6 right-6 z-20 flex gap-3">
        <button
          onClick={() => setIsAutoPlaying(!isAutoPlaying)}
          className={`p-3 rounded-full transition-all backdrop-blur-sm ${
            isAutoPlaying
              ? "bg-fire-500/30 text-fire-300 dark:bg-electric-500/30 dark:text-electric-300 shadow-lg"
              : "bg-gray-500/30 text-gray-300 hover:bg-gray-400/30"
          }`}
          aria-label={isAutoPlaying ? "Pause slideshow" : "Play slideshow"}
        >
          {isAutoPlaying ? (
            <div className="w-5 h-5 flex items-center justify-center">
              <div className="w-1.5 h-4 bg-current mr-1" />
              <div className="w-1.5 h-4 bg-current" />
            </div>
          ) : (
            <Play className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse" />
        </div>
      </div>

      {/* Lightning/Flame Effect Lines */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Light mode - Flame effects */}
        <div className="dark:hidden">
          <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-fire-400/30 to-transparent animate-pulse" />
          <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-ember-400/30 to-transparent animate-pulse delay-1000" />
          <div className="absolute top-0 left-3/4 w-px h-full bg-gradient-to-b from-transparent via-fire-500/20 to-transparent animate-pulse delay-2000" />
        </div>

        {/* Dark mode - Lightning effects */}
        <div className="hidden dark:block">
          <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-electric-400/30 to-transparent animate-pulse" />
          <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-frost-400/30 to-transparent animate-pulse delay-1000" />
          <div className="absolute top-0 left-3/4 w-px h-full bg-gradient-to-b from-transparent via-electric-500/20 to-transparent animate-pulse delay-2000" />
        </div>
      </div>
    </section>
  )
}
