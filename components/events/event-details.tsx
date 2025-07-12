import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Calendar, MapPin, DollarSign } from "lucide-react"
import { format } from "date-fns"

interface Event {
  id: string
  title: string
  description: string
  date: string
  location: string
  price: number
  isMeetGreet: boolean
}

interface EventDetailsProps {
  event: Event
}

export function EventDetails({ event }: EventDetailsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-3xl">{event.title}</CardTitle>
        <CardDescription>{event.isMeetGreet ? "Exclusive Meet & Greet Session" : "Concert Event"}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
          <Calendar className="h-5 w-5" />
          <span>{format(new Date(event.date), "PPPp")}</span>
        </div>
        <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
          <MapPin className="h-5 w-5" />
          <span>{event.location}</span>
        </div>
        <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
          <DollarSign className="h-5 w-5" />
          <span>{event.price === 0 ? "Free" : `$${event.price.toFixed(2)}`}</span>
        </div>
        <p className="text-lg leading-relaxed">{event.description}</p>
      </CardContent>
    </Card>
  )
}
