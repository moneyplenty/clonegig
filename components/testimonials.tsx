"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star } from "lucide-react"

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
    <section className="py-24 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-electric-400 to-frost-400 bg-clip-text text-transparent">
              What Fans Are Saying
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Real stories from real fans who've experienced the magic of being part of Kelvin's community.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Featured Testimonial */}
          <Card className="border-electric-700/30 bg-background/50 backdrop-blur-lg mb-12">
            <CardContent className="p-8">
              <div className="flex items-start gap-6">
                <div className="flex-1">
                  <p className="text-lg md:text-xl leading-relaxed mb-6 text-foreground">
                    "{testimonials[currentIndex].quote}"
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12 border-2 border-electric-500/50">
                        <AvatarImage
                          src={testimonials[currentIndex].avatar || "/placeholder.svg"}
                          alt={testimonials[currentIndex].author}
                        />
                        <AvatarFallback className="bg-electric-500/20 text-electric-400">
                          {testimonials[currentIndex].author[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold">{testimonials[currentIndex].author}</h4>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-sm text-muted-foreground">{testimonials[currentIndex].role}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: testimonials[currentIndex].rating }).map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Testimonial Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {visibleTestimonials.slice(1).map((testimonial, index) => (
              <Card
                key={testimonial.id}
                className="border-electric-700/30 bg-background/50 backdrop-blur-lg hover:border-electric-500/50 transition-all duration-300 cursor-pointer"
                onClick={() => setCurrentIndex((currentIndex + index + 1) % testimonials.length)}
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-1 mb-3">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-3">"{testimonial.quote}"</p>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8 border border-electric-500/50">
                      <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.author} />
                      <AvatarFallback className="bg-electric-500/20 text-electric-400 text-xs">
                        {testimonial.author[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm truncate">{testimonial.author}</div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">{testimonial.role}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Navigation Dots */}
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

          {/* Auto-play Toggle */}
          <div className="text-center mt-6">
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {isAutoPlaying ? "Pause" : "Resume"} Auto-play
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
