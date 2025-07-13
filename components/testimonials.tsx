import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function Testimonials() {
  const testimonials = [
    {
      id: 1,
      name: "Alex R.",
      role: "Long-time Fan",
      avatar: "/placeholder-user.jpg",
      quote:
        "Kelvin Creekman's music has been the soundtrack to my life. This fan club is the perfect place to connect with other fans and get exclusive content!",
    },
    {
      id: 2,
      name: "Samantha L.",
      role: "Premium Member",
      avatar: "/placeholder-user.jpg",
      quote:
        "The premium membership is absolutely worth it! The meet & greets are incredible, and the exclusive content is top-notch. Highly recommend!",
    },
    {
      id: 3,
      name: "Chris P.",
      role: "New Listener",
      avatar: "/placeholder-user.jpg",
      quote:
        "Just discovered Kelvin's music and instantly fell in love. This fan club made it so easy to dive deeper and explore his work. Amazing community!",
    },
  ]

  return (
    <section className="py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">What Fans Are Saying</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Hear from our passionate community members.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-start gap-6 py-12 lg:grid-cols-3 lg:gap-12">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="bg-card/50 backdrop-blur-sm border-kelvin-border">
              <CardContent className="flex flex-col items-center text-center p-6">
                <Avatar className="h-20 w-20 mb-4">
                  <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.name} />
                  <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <p className="text-lg font-semibold text-kelvin-foreground">{testimonial.name}</p>
                <p className="text-sm text-kelvin-muted-foreground mb-4">{testimonial.role}</p>
                <blockquote className="text-kelvin-foreground italic">&quot;{testimonial.quote}&quot;</blockquote>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
