import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselDots,
} from "@/components/ui/carousel"

export function Testimonials() {
  const testimonials = [
    {
      quote:
        "Kelvin Creekman's music changed my life! The energy, the lyrics, everything is just pure fire. Best fan club ever!",
      name: "Alex M.",
      title: "Die-hard Fan",
      avatar: "/placeholder-user.jpg",
    },
    {
      quote:
        "The exclusive content is incredible. It's like being right there in the studio with Kelvin. Worth every penny of the premium membership!",
      name: "Sarah L.",
      title: "Premium Member",
      avatar: "/placeholder-user.jpg",
    },
    {
      quote:
        "Attending the virtual meet & greet was a dream come true. Kelvin is genuinely amazing with his fans. Highly recommend!",
      name: "Chris P.",
      title: "Blizzard VIP",
      avatar: "/placeholder-user.jpg",
    },
    {
      quote:
        "The merchandise quality is top-notch. I wear my Kelvin Creekman t-shirt everywhere. This fan club truly delivers!",
      name: "Jordan K.",
      title: "Frost Fan",
      avatar: "/placeholder-user.jpg",
    },
  ]

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">What Our Fans Say</h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Hear directly from the Kelvin Creekman community.
            </p>
          </div>
        </div>
        <Carousel className="w-full max-w-3xl mx-auto">
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index}>
                <Card className="bg-white dark:bg-gray-900 shadow-lg">
                  <CardContent className="flex flex-col items-center p-6 text-center">
                    <Avatar className="h-20 w-20 mb-4">
                      <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.name} />
                      <AvatarFallback>
                        {testimonial.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <p className="text-lg italic text-gray-700 dark:text-gray-300 mb-4">
                      &quot;{testimonial.quote}&quot;
                    </p>
                    <p className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.title}</p>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
          <CarouselDots />
        </Carousel>
      </div>
    </section>
  )
}
