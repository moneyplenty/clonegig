"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star } from "lucide-react"
import type { Testimonial } from "@/types/index.d"

interface TestimonialsProps {
  initialTestimonials: Testimonial[]
}

export function Testimonials({ initialTestimonials }: TestimonialsProps) {
  if (!initialTestimonials || initialTestimonials.length === 0) {
    return (
      <div className="flex items-center justify-center rounded-md border border-dashed p-8 text-muted-foreground">
        No testimonials available at the moment.
      </div>
    )
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {initialTestimonials.map((testimonial) => (
        <Card key={testimonial.id}>
          <CardHeader>
            <div className="flex items-center gap-4">
              <Avatar>
                <AvatarImage src={testimonial.profiles?.avatar_url || "/placeholder-user.jpg"} />
                <AvatarFallback>{testimonial.profiles?.username?.charAt(0) || "U"}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle>{testimonial.profiles?.username || "Anonymous Fan"}</CardTitle>
                <div className="flex items-center">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < (testimonial.rating || 0) ? "text-yellow-400" : "text-muted-foreground"
                      }`}
                      fill="currentColor"
                    />
                  ))}
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">&quot;{testimonial.content}&quot;</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
