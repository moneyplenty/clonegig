import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Icons } from "@/components/icons"

export function Testimonials() {
  const testimonials = [
    {
      name: "Alex R.",
      role: "Long-time Fan",
      quote: "Kelvin Creekman's music has been the soundtrack to my life. This fan club is the perfect way to connect!",
      avatar: "/placeholder-user.png",
    },
    {
      name: "Sarah L.",
      role: "New Member",
      quote: "The exclusive content is incredible! I feel so much closer to Kelvin and his creative process.",
      avatar: "/placeholder-user.png",
    },
    {
      name: "Mark T.",
      role: "Premium Member",
      quote:
        "The meet & greets are a game-changer. Getting to chat with Kelvin directly is an unforgettable experience.",
      avatar: "/placeholder-user.png",
    },
  ]

  return (
    <section className="py-12 bg-kelvin-card text-kelvin-card-foreground">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-8">What Our Fans Say</h2>
        <p className="text-lg text-kelvin-card-foreground/80 text-center max-w-3xl mx-auto mb-12">
          Hear directly from the passionate community that makes the Kelvin Creekman Fan Club so special.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-kelvin-background text-kelvin-foreground border-kelvin-border shadow-lg">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <Icons.quote className="h-8 w-8 text-electric-400 mb-4" />
                <p className="text-lg italic mb-6">&quot;{testimonial.quote}&quot;</p>
                <Avatar className="h-16 w-16 mb-4">
                  <AvatarImage src={testimonial.avatar || "/placeholder.png"} alt={testimonial.name} />
                  <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <h3 className="font-semibold text-xl">{testimonial.name}</h3>
                <p className="text-sm text-kelvin-foreground/80">{testimonial.role}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
