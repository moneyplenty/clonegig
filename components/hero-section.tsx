"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Play, Pause, Volume2, VolumeX, ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface HeroSlide {
  id: number
  type: "video" | "image"
  src: string
  poster?: string
  title: string
  subtitle: string
  description: string
  cta: string
  ctaLink: string
}

interface HeroSectionProps {
  title: string
  subtitle: string
  ctaText: string
  ctaLink: string
  imageUrl?: string
  videoUrl?: string
  videoPosterUrl?: string
}

const heroSlides: HeroSlide[] = [
  {
    id: 1,
    type: "video",
    src: "/videos/kelvin-performance.mp4",
    poster: "/images/kelvin-stage.jpg",
    title: "KELVIN CREEKMAN",
    subtitle: "Official Fan Club",
    description: "Join the ultimate rock and metal experience with exclusive content, meet & greets, and VIP access",
    cta: "Join the Club",
    ctaLink: "/join",
  },
  {
    id: 2,
    type: "image",
    src: "/images/kelvin-studio.jpg",
    title: "BEHIND THE SCENES",
    subtitle: "Exclusive Content",
    description: "Get unprecedented access to studio sessions, songwriting process, and personal moments",
    cta: "Explore Content",
    ctaLink: "/content",
  },
  {
    id: 3,
    type: "video",
    src: "/videos/kelvin-backstage.mp4",
    poster: "/images/kelvin-backstage.jpg",
    title: "MEET & GREET",
    subtitle: "Personal Connection",
    description: "Book private video calls and group sessions with Kelvin for an unforgettable experience",
    cta: "Book Session",
    ctaLink: "/meet-and-greet",
  },
  {
    id: 4,
    type: "image",
    src: "/images/kelvin-merchandise.jpg",
    title: "EXCLUSIVE MERCH",
    subtitle: "Fan Store",
    description: "Limited edition merchandise, signed items, and exclusive designs only for club members",
    cta: "Shop Now",
    ctaLink: "/store",
  },
]

export function HeroSection({
  title,
  subtitle,
  ctaText,
  ctaLink,
  imageUrl,
  videoUrl,
  videoPosterUrl,
}: HeroSectionProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(true)
  const [isAutoPlay, setIsAutoPlay] = useState(true)

  useEffect(() => {
    if (!isAutoPlay) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 8000)

    return () => clearInterval(interval)
  }, [isAutoPlay])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
    setIsAutoPlay(!isPlaying)
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  const currentSlideData = heroSlides[currentSlide]

  const hasVideo = videoUrl && videoUrl.trim() !== ""
  const hasImage = imageUrl && imageUrl.trim() !== ""

  return (
    <section className="relative h-[calc(100vh-64px)] w-full overflow-hidden">
      {hasVideo ? (
        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          src={videoUrl || undefined}
          poster={videoPosterUrl || undefined}
          aria-label="Background video of Kelvin Creekman performing"
        >
          Your browser does not support the video tag.
        </video>
      ) : hasImage ? (
        <Image
          src={imageUrl || "/placeholder.svg"}
          alt="Kelvin Creekman performing"
          fill
          priority
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-electric-950 to-background" />
      )}
      <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-center p-4">
        <div className="z-10 max-w-4xl space-y-6">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white drop-shadow-lg">
            {title || currentSlideData.title}
          </h1>
          <p className="text-lg md:text-xl text-electric-200 drop-shadow-md">{subtitle || currentSlideData.subtitle}</p>
          <Button asChild size="lg" className="bg-gradient-electric hover:animate-electric-pulse text-lg px-8 py-3">
            <Link href={ctaLink || currentSlideData.ctaLink}>{ctaText || currentSlideData.cta}</Link>
          </Button>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex items-center gap-4 bg-black/50 backdrop-blur-lg rounded-full px-6 py-3">
          {/* Slide Indicators */}
          <div className="flex gap-2">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentSlide ? "bg-electric-400 scale-125" : "bg-white/30 hover:bg-white/50"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Media Controls */}
          <div className="flex items-center gap-2 ml-4 pl-4 border-l border-white/20">
            <Button variant="ghost" size="sm" onClick={togglePlayPause} className="text-white hover:bg-white/20 p-2">
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button>

            {currentSlideData.type === "video" && (
              <Button variant="ghost" size="sm" onClick={toggleMute} className="text-white hover:bg-white/20 p-2">
                {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Arrow Navigation */}
      <Button
        variant="ghost"
        size="sm"
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 text-white hover:bg-white/20 p-3"
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>

      <Button
        variant="ghost"
        size="sm"
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 text-white hover:bg-white/20 p-3"
      >
        <ChevronRight className="h-6 w-6" />
      </Button>

      {/* Auto-play Toggle */}
      <div className="absolute top-4 right-4 z-20">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsAutoPlay(!isAutoPlay)}
          className={`text-white hover:bg-white/20 ${isAutoPlay ? "bg-electric-500/20" : ""}`}
        >
          {isAutoPlay ? "Auto" : "Manual"}
        </Button>
      </div>
    </section>
  )
}
