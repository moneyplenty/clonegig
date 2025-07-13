import Image from "next/image"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Calendar, MapPin, Ticket } from "lucide-react"
import { format } from "date-fns"

interface EventDetailsProps {
  event: {
    id: string
    title: string
    date: string
    location: string
    description: string
    image: string
    ticketPrice: number
    isPremium: boolean
  }
}

export function EventDetails({ event }: EventDetailsProps) {
  return (
    <Card className="bg-card/50 backdrop-blur-sm border-kelvin-border">
      <CardHeader className="p-0">
        <div className="relative w-full h-64 md:h-80 lg:h-96">
          <Image
            src={event.image || "/placeholder.svg"}
            alt={event.title}
            layout="fill"
            objectFit="cover"
            className="rounded-t-lg"
          />
        </div>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold">{event.title}</h1>
        <div className="flex items-center text-muted-foreground">
          <Calendar className="mr-2 h-5 w-5" />
          <span>{format(new Date(event.date), "PPP 'at' p")}</span>
        </div>
        <div className="flex items-center text-muted-foreground">
          <MapPin className="mr-2 h-5 w-5" />
          <span>{event.location}</span>
        </div>
        <div className="flex items-center text-muted-foreground">
          <Ticket className="mr-2 h-5 w-5" />
          <span>Tickets from ${event.ticketPrice.toFixed(2)}</span>
        </div>
        <p className="text-lg leading-relaxed">{event.description}</p>
      </CardContent>
    </Card>
  )
}
