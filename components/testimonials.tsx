"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star } from "lucide-react"

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    username: "@sarah_music_lover",
    avatar: "/placeholder.svg?height=40&width=40",
    content:
      "Being part of the Ice Legion has been incredible! The exclusive content and live sessions are amazing. Kelvin really cares about his fans.",
    rating: 5,
    verified: true,
  },
  {
    id: 2,
    name: "Mike Rodriguez",
    username: "@mike_guitar_fan",
    avatar: "/placeholder.svg?height=40&width=40",
    content:
      "The meet & greet sessions are worth every penny. Getting to chat with Kelvin about music production was a dream come true!",
    rating: 5,
    verified: true,
  },
  {
    id: 3,
    name: "Emma Chen",
    username: "@emma_ice_legion",
    avatar: "/placeholder.svg?height=40&width=40",
    content:
      "The community here is fantastic. I've made so many friends who share the same passion for Kelvin's music. Highly recommend joining!",
    rating: 5,
    verified: true,
  },
  {
    id: 4,
    name: "David Thompson",
    username: "@david_kc_fan",
    avatar: "/placeholder.svg?height=40&width=40",
    content:
      "The exclusive tracks and behind-the-scenes content make the membership so valuable. Can't wait for the next live concert!",
    rating: 5,
    verified: true,
  },
  {
    id: 5,
    name: "Lisa Park",
    username: "@lisa_music_fan",
    avatar: "/placeholder.svg?height=40&width=40",
    content:
      "Kelvin's acoustic sessions are pure magic. The intimate setting and personal interaction make it feel like a private concert.",
    rating: 5,
    verified: true,
  },
  {
    id: 6,
    name: "Alex Wilson",
    username: "@alex_ice_cold",
    avatar: "/placeholder.svg?height=40&width=40",
    content:
      "The merchandise quality is top-notch and the signed items are authentic. Great value for money and fast shipping!",
    rating: 5,
    verified: true,
  },
]

export function Testimonials() {
  return (
    <section className="py-12 md:py-24 lg:py-32 bg-muted/50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">What Fans Are Saying</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Join thousands of satisfied fans who are part of the Ice Legion community.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-6xl gap-6 py-12 lg:grid-cols-3 lg:gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="flex flex-col">
              <CardContent className="pt-6">
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mb-4">"{testimonial.content}"</p>
                <div className="flex items-center space-x-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.name} />
                    <AvatarFallback>
                      {testimonial.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium">{testimonial.name}</span>
                      {testimonial.verified && (
                        <div className="h-4 w-4 rounded-full bg-blue-500 flex items-center justify-center">
                          <svg className="h-2.5 w-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      )}
                    </div>
                    <span className="text-xs text-muted-foreground">{testimonial.username}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
