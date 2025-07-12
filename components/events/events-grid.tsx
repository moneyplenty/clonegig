import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, DollarSign } from "lucide-react"
import { format } from "date-fns"
import Link from "next/link"

interface Event {
  id: string
  title: string
  description: string
  date: string
  location: string
  price: number
  isMeetGreet: boolean
}

interface EventsGridProps {
  events: Event[]
}

export function EventsGrid({ events }: EventsGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.length === 0 ? (
        <p className="col-span-full text-center text-gray-500">No events found matching your criteria.</p>
      ) : (
        events.map((event) => (
          <Card key={event.id} className="flex flex-col">
            <CardHeader>
              <CardTitle className="text-xl">{event.title}</CardTitle>
              <CardDescription>{event.isMeetGreet ? "Meet & Greet" : "Concert"}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 space-y-2">
              <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                <Calendar className="h-4 w-4" />
                <span>{format(new Date(event.date), "PPPp")}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                <MapPin className="h-4 w-4" />
                <span>{event.location}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                <DollarSign className="h-4 w-4" />
                <span>{event.price === 0 ? "Free" : `$${event.price.toFixed(2)}`}</span>
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-3">{event.description}</p>
            </CardContent>
            <CardFooter>
              <Link href={`/events/${event.id}`} className="w-full">
                <Button className="w-full">View Details</Button>
              </Link>
            </CardFooter>
          </Card>
        ))
      )}
    </div>
  )
}
