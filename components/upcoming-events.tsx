import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { createClient } from "@/lib/supabase/server"
import { cookies } from "next/headers"

interface Event {
  id: string
  name: string
  description: string
  date: string
  location: string
  ticket_price: number
  image_url: string
}

export async function UpcomingEvents() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const { data: events, error } = await supabase.from("events").select("*").order("date", { ascending: true }).limit(3)

  if (error) {
    console.error("Error fetching events:", error)
    return <div>Error loading events.</div>
  }

  return (
    <section className="py-12 md:py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-gray-900 dark:text-white">
          Upcoming Events
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <Card key={event.id} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="relative w-full h-48">
                <Image
                  src={event.image_url || "/placeholder.svg"}
                  alt={event.name}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-t-lg"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-xl font-semibold">{event.name}</CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400">
                  {new Date(event.date).toLocaleDateString()} at {event.location}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <p className="text-gray-700 dark:text-gray-300 line-clamp-3">{event.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-primary">
                    {event.ticket_price > 0 ? `$${event.ticket_price.toFixed(2)}` : "Free"}
                  </span>
                  <Link href={`/events/${event.id}`}>
                    <Button variant="outline">View Details</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link href="/events">
            <Button
              size="lg"
              className="bg-purple-600 hover:bg-purple-700 text-white text-lg px-8 py-3 rounded-full shadow-md"
            >
              View All Events
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
