import Image from "next/image"
import { Star } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from "@/components/ui/card"

const testimonials = [
  {
    id: 1,
    name: "Alex Johnson",
    avatar: "/placeholder.svg?height=100&width=100",
    testimonial:
      "Being a premium member has completely changed my fan experience. The exclusive content and behind-the-scenes access makes me feel so much closer to the music and creative process.",
    rating: 5,
    memberSince: "2023",
  },
  {
    id: 2,
    name: "Samantha Lee",
    avatar: "/placeholder.svg?height=100&width=100",
    testimonial:
      "The VIP events are incredible! I've met so many other passionate fans and the artist interactions are genuine and meaningful. Worth every penny.",
    rating: 5,
    memberSince: "2022",
  },
  {
    id: 3,
    name: "Marcus Chen",
    avatar: "/placeholder.svg?height=100&width=100",
    testimonial:
      "The exclusive merchandise is top quality and I love having items that aren't available anywhere else. The community is supportive and feels like family.",
    rating: 4,
    memberSince: "2024",
  },
]

export function Testimonials() {
  return (
    <div className="grid gap-6 pt-8 md:grid-cols-3">
      {testimonials.map((testimonial) => (
        <Card key={testimonial.id} className="h-full">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-4">
              <div className="relative h-12 w-12 rounded-full overflow-hidden">
                <Image
                  src={testimonial.avatar || "/placeholder.svg"}
                  alt={testimonial.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="font-medium">{testimonial.name}</h3>
                <CardDescription>Member since {testimonial.memberSince}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <p className="text-muted-foreground italic">"{testimonial.testimonial}"</p>
          </CardContent>
          <CardFooter className="pt-0">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < testimonial.rating ? "text-yellow-500 fill-yellow-500" : "text-muted-foreground"
                  }`}
                />
              ))}
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
