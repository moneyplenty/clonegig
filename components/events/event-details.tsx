import Image from "next/image"
import { CalendarDays, Clock, MapPin, DollarSign } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { format } from "date-fns"

interface Event {
  id: string
  title: string
  date: string
  time: string
  location: string
  description: string
  imageUrl: string
  price: number
  ticketsAvailable: number
}

interface EventDetailsProps {
  event: Event
}

export function EventDetails({ event }: EventDetailsProps) {
  return (
    <Card className="bg-background/50 backdrop-blur-lg border-electric-700/30">
      <div className="relative aspect-video overflow-hidden rounded-t-lg">
        <Image src={event.imageUrl || "/placeholder.svg"} alt={event.title} fill className="object-cover" />
      </div>
      <CardHeader>
        <CardTitle className="text-3xl md:text-4xl text-electric-100">{event.title}</CardTitle>
        <CardDescription className="text-lg text-muted-foreground">{event.description}</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-electric-200">
          <div className="flex items-center gap-3">
            <CalendarDays className="h-6 w-6 text-frost-400" />
            <div>
              <p className="font-semibold">Date</p>
              <p>{format(new Date(event.date), "PPP")}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Clock className="h-6 w-6 text-frost-400" />
            <div>
              <p className="font-semibold">Time</p>
              <p>{event.time}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <MapPin className="h-6 w-6 text-frost-400" />
            <div>
              <p className="font-semibold">Location</p>
              <p>{event.location}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <DollarSign className="h-6 w-6 text-frost-400" />
            <div>
              <p className="font-semibold">Price</p>
              <p>{event.price === 0 ? "Free" : `$${event.price.toFixed(2)}`}</p>
            </div>
          </div>
        </div>
        <Separator className="bg-electric-700" />
        <div className="text-muted-foreground">
          <h3 className="text-xl font-semibold mb-2 text-electric-200">About This Event</h3>
          <p>{event.description}</p>
          <p className="mt-4">
            Tickets remaining: <span className="font-bold text-electric-400">{event.ticketsAvailable}</span>
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
