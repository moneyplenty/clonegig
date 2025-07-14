"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Play, Pause, Volume2, VolumeX, Maximize, Minimize, ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import Image from "next/image"

interface MediaItem {
  type: "video" | "image"
  src: string
  title: string
  subtitle: string
}

export function HeroSection() {
  const media: MediaItem[] = [
    {
      type: "video",
      src: "/hero-video-1.mp4", // Ensure this path is correct and the file exists in public/
      title: "Experience the Music Live",
      subtitle: "Join Kelvin Creekman for unforgettable performances.",
    },
    {
      type: "image",
      src: "/placeholder.jpg", // Replace with an actual image if desired
      title: "Exclusive Merchandise",
      subtitle: "Shop limited edition apparel and collectibles.",
    },
    {
      type: "video",
      src: "/hero-video-2.mp4", // Ensure this path is correct and the file exists in public/
      title: "Behind the Scenes",
      subtitle: "Get a glimpse into Kelvin's creative process.",
    },
  ]

  const [currentMediaIndex, setCurrentMediaIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(true)
  const [isFullScreen, setIsFullScreen] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const startAutoPlay = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
    intervalRef.current = setInterval(() => {
      setCurrentMediaIndex((prevIndex) => (prevIndex + 1) % media.length)
    }, 10000) // Change media every 10 seconds
  }, [media.length])

  const stopAutoPlay = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [])

  useEffect(() => {
    if (isPlaying) {
      startAutoPlay()
    } else {
      stopAutoPlay()
    }
    return () => stopAutoPlay()
  }, [isPlaying, startAutoPlay, stopAutoPlay])

  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying && media[currentMediaIndex].type === "video") {
        videoRef.current.play().catch((error) => {
          console.error("Video play failed:", error)
          // This often happens if autoplay is blocked or interrupted.
          // We can choose to ignore it or show a message to the user.
        })
      } else {
        videoRef.current.pause()
      }
      videoRef.current.muted = isMuted
      videoRef.current.load() // Reload video source on index change
    }
  }, [currentMediaIndex, isPlaying, isMuted, media])

  const handlePlayPause = () => {
    setIsPlaying((prev) => !prev)
  }

  const handleMuteToggle = () => {
    setIsMuted((prev) => !prev)
  }

  const handleFullScreenToggle = () => {
    if (!containerRef.current) return

    if (!isFullScreen) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen()
      } else if ((containerRef.current as any).mozRequestFullScreen) {
        /* Firefox */
        ;(containerRef.current as any).mozRequestFullScreen()
      } else if ((containerRef.current as any).webkitRequestFullscreen) {
        /* Chrome, Safari and Opera */
        ;(containerRef.current as any).webkitRequestFullscreen()
      } else if ((containerRef.current as any).msRequestFullscreen) {
        /* IE/Edge */
        ;(containerRef.current as any).msRequestFullscreen()
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
      } else if ((document as any).mozCancelFullScreen) {
        /* Firefox */
        ;(document as any).mozCancelFullScreen()
      } else if ((document as any).webkitExitFullscreen) {
        /* Chrome, Safari and Opera */
        ;(document as any).webkitExitFullscreen()
      } else if ((document as any).msExitFullscreen) {
        /* IE/Edge */
        ;(document as any).msExitFullscreen()
      }
    }
    setIsFullScreen((prev) => !prev)
  }

  const handleNext = () => {
    setCurrentMediaIndex((prevIndex) => (prevIndex + 1) % media.length)
    setIsPlaying(true) // Restart autoplay on manual navigation
  }

  const handlePrev = () => {
    setCurrentMediaIndex((prevIndex) => (prevIndex - 1 + media.length) % media.length)
    setIsPlaying(true) // Restart autoplay on manual navigation
  }

  const currentMedia = media[currentMediaIndex]

  return (
    <section ref={containerRef} className="relative h-[60vh] w-full overflow-hidden md:h-[80vh] lg:h-[90vh]">
      {currentMedia.type === "video" ? (
        <video
          ref={videoRef}
          key={currentMedia.src} // Key change forces re-mount and reload
          src={currentMedia.src}
          loop={false} // Loop is handled by JS now
          muted={isMuted}
          autoPlay
          playsInline
          preload="auto"
          className="absolute left-0 top-0 h-full w-full object-cover"
          onEnded={handleNext} // Auto-advance to next media when video ends
        >
          Your browser does not support the video tag.
        </video>
      ) : (
        <Image
          src={currentMedia.src || "/placeholder.svg"}
          alt={currentMedia.title}
          fill
          className="absolute left-0 top-0 h-full w-full object-cover"
          sizes="(max-width: 768px) 100vw, 100vw"
        />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center text-white">
        <h1 className="text-4xl font-bold drop-shadow-lg md:text-6xl lg:text-7xl">{currentMedia.title}</h1>
        <p className="mt-4 text-lg drop-shadow-md md:text-xl lg:text-2xl">{currentMedia.subtitle}</p>
        <div className="mt-8 flex gap-4">
          <Button asChild size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
            <Link href="/events">Explore Events</Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-white text-white hover:bg-white hover:text-black bg-transparent"
          >
            <Link href="/store">Shop Merchandise</Link>
          </Button>
        </div>
      </div>

      {/* Carousel Controls */}
      <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 space-x-2">
        {media.map((_, index) => (
          <button
            key={index}
            className={cn(
              "h-2 w-2 rounded-full bg-white/50 transition-all",
              currentMediaIndex === index && "w-6 bg-white",
            )}
            onClick={() => {
              setCurrentMediaIndex(index)
              setIsPlaying(true) // Restart autoplay on manual selection
            }}
            aria-label={`Go to media slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Navigation Arrows */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 z-20 -translate-y-1/2 text-white/80 hover:bg-white/20 hover:text-white"
        onClick={handlePrev}
        aria-label="Previous media"
      >
        <ChevronLeft className="h-8 w-8" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 z-20 -translate-y-1/2 text-white/80 hover:bg-white/20 hover:text-white"
        onClick={handleNext}
        aria-label="Next media"
      >
        <ChevronRight className="h-8 w-8" />
      </Button>

      {/* Video Controls (only visible for video media) */}
      {currentMedia.type === "video" && (
        <div className="absolute bottom-4 right-4 z-20 flex space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={handlePlayPause}
            aria-label={isPlaying ? "Pause video" : "Play video"}
          >
            {isPlaying ? <Pause className="h-6 w-6 text-white" /> : <Play className="h-6 w-6 text-white" />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleMuteToggle}
            aria-label={isMuted ? "Unmute video" : "Mute video"}
          >
            {isMuted ? <VolumeX className="h-6 w-6 text-white" /> : <Volume2 className="h-6 w-6 text-white" />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleFullScreenToggle}
            aria-label={isFullScreen ? "Exit fullscreen" : "Enter fullscreen"}
          >
            {isFullScreen ? <Minimize className="h-6 w-6 text-white" /> : <Maximize className="h-6 w-6 text-white" />}
          </Button>
        </div>
      )}
    </section>
  )
}