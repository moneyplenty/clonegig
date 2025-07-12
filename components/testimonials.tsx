"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface Testimonial {
  id: string
  quote: string
  author: string
  role: string
  avatar: string
  rating: number
}

const testimonials: Testimonial[] = [
  {
    id: "1",
    quote: "Kelvin Creekman's music is pure fire! This fan club is the best way to stay connected.",
    author: "Alex 'Metalhead' Johnson",
    role: "Die-hard Fan",
    avatar: "/placeholder-user.jpg",
    rating: 5,
  },
  {
    id: "2",
    quote: "The exclusive content is incredible. It's like being backstage all the time!",
    author: "Sarah 'Shredder' Lee",
    role: "Premium Member",
    avatar: "/placeholder-user.jpg",
    rating: 5,
  },
  {
    id: "3",
    quote: "I finally got to meet Kelvin through a virtual meet & greet. Best experience ever!",
    author: "Mark 'Riff' Davis",
    role: "Blizzard VIP",
    avatar: "/placeholder-user.jpg",
    rating: 5,
  },
  {
    id: "4",
    quote:
      "The private FaceTime session with Kelvin was absolutely incredible! He's so down-to-earth and genuinely cares about his fans. The Avalanche Elite membership is worth every penny for the exclusive access.",
    author: "Sarah Mitchell",
    role: "Avalanche Elite",
    avatar: "/avatars/sarah.jpg",
    rating: 5,
  },
  {
    id: "5",
    quote:
      "Being part of the Blizzard VIP tier has completely changed my fan experience. The behind-the-scenes content and group video calls are amazing. Kelvin's music has helped me through tough times.",
    author: "Marcus Rodriguez",
    role: "Blizzard VIP",
    avatar: "/avatars/marcus.jpg",
    rating: 5,
  },
  {
    id: "6",
    quote:
      "Even as a Frost Fan, I get so much value! The community is incredible, and the monthly content keeps me connected to Kelvin's journey. Planning to upgrade to Blizzard VIP soon!",
    author: "Emma Thompson",
    role: "Frost Fan",
    avatar: "/avatars/emma.jpg",
    rating: 5,
  },
  {
    id: "7",
    quote:
      "The studio visit opportunity was a dream come true! Watching Kelvin work on new songs and getting to contribute ideas was surreal. This fan club is more than just membership - it's family.",
    author: "Jake Wilson",
    role: "Avalanche Elite",
    avatar: "/avatars/jake.jpg",
    rating: 5,
  },
  {
    id: "8",
    quote:
      "The WhatsApp video calls are so personal and intimate. Kelvin remembered details from our previous conversations! The merchandise discounts are great too. Highly recommend!",
    author: "Lisa Chen",
    role: "Blizzard VIP",
    avatar: "/avatars/lisa.jpg",
    rating: 5,
  },
  {
    id: "9",
    quote:
      "The community forum is fantastic for connecting with other fans. Kelvin occasionally drops in to chat, which is incredible. Great value for the price point!",
    author: "David Park",
    role: "Frost Fan",
    avatar: "/avatars/david.jpg",
    rating: 5,
  },
  {
    id: "10",
    quote: "Kelvin's music is pure energy! His live shows are an electrifying experience you won't forget.",
    author: "Alex R.",
    role: "Verified Fan",
    avatar: "/placeholder-user.jpg",
    rating: 5,
  },
  {
    id: "11",
    quote:
      "The fan club is amazing! Exclusive content and early access to tickets make it a must-join for any true fan.",
    author: "Sarah L.",
    role: "Verified Fan",
    avatar: "/placeholder-user.jpg",
    rating: 5,
  },
  {
    id: "12",
    quote:
      "I've been following Kelvin for years, and this fan club takes it to the next level. The community is fantastic!",
    author: "Mark T.",
    role: "Verified Fan",
    avatar: "/placeholder-user.jpg",
    rating: 5,
  },
]

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const visibleTestimonials = [
    testimonials[currentIndex],
    testimonials[(currentIndex + 1) % testimonials.length],
    testimonials[(currentIndex + 2) % testimonials.length],
  ]

  return (
    <section className="py-12 md:py-24 bg-electric-950/20">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-8">
          <span className="bg-gradient-to-r from-frost-400 to-electric-400 bg-clip-text text-transparent">
            What Fans Are Saying
          </span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {visibleTestimonials.map((testimonial, index) => (
            <Card key={testimonial.id} className="bg-background/50 backdrop-blur-lg border-frost-700/30">
              <CardContent className="p-6">
                <p className="text-lg italic mb-4 text-electric-100">"{testimonial.quote}"</p>
                <div className="flex items-center justify-center">
                  <Avatar className="h-12 w-12 mr-4">
                    <AvatarImage src={testimonial.avatar || "/placeholder-user.jpg"} alt={testimonial.author} />
                    <AvatarFallback>{testimonial.author.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-frost-300">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentIndex(index)
                setIsAutoPlaying(false)
              }}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentIndex ? "bg-electric-400 scale-125" : "bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
        <div className="text-center mt-6">
          <button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            {isAutoPlaying ? "Pause" : "Resume"} Auto-play
          </button>
        </div>
      </div>
    </section>
  )
}
