import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function Testimonials() {
  const testimonials = [
    {
      name: "Fanatic Fan",
      handle: "@fanaticfan",
      avatar: "/placeholder-user.jpg",
      quote: "This fan club is everything I hoped for and more! The exclusive content is amazing.",
    },
    {
      name: "Music Lover",
      handle: "@musiclover",
      avatar: "/placeholder-user.jpg",
      quote: "Being able to connect directly with the artist through meet & greets is a dream come true.",
    },
    {
      name: "Concert Goer",
      handle: "@concertgoer",
      avatar: "/placeholder-user.jpg",
      quote: "The events section keeps me updated, and I've never missed a show since joining!",
    },
  ]

  return (
    <section className="py-12 md:py-20 bg-gray-100 dark:bg-gray-950">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-gray-900 dark:text-white">
          What Our Fans Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="shadow-lg">
              <CardContent className="p-6">
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 italic">&quot;{testimonial.quote}&quot;</p>
                <div className="flex items-center">
                  <Avatar className="h-12 w-12 mr-4">
                    <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.name} />
                    <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.handle}</p>
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
