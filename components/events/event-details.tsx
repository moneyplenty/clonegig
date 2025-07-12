import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Clock, MapPin } from "lucide-react"

interface EventDetailsProps {
  event: {
    id: number
    title: string
    date: string
    time: string
    location: string
    description: string
    image: string
    price: number
    isPremium: boolean
  }
}

export function EventDetails({ event }: EventDetailsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-3xl">{event.title}</CardTitle>
        <div className="flex items-center text-muted-foreground text-sm mt-2">
          <Calendar className="h-4 w-4 mr-1" /> {event.date}
          <Clock className="h-4 w-4 mr-1 ml-4" /> {event.time}
          <MapPin className="h-4 w-4 mr-1 ml-4" /> {event.location}
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative w-full h-64 mb-4">
          <Image
            src={event.image || "/placeholder.svg"}
            alt={event.title}
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        </div>
        <p className="text-lg leading-relaxed">{event.description}</p>
        {event.isPremium && <p className="mt-4 text-primary font-semibold">This is a Premium Fan exclusive event.</p>}
      </CardContent>
    </Card>
  )
}
