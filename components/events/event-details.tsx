// This component is not directly used as app/events/[id]/page.tsx handles details.
// It's kept here for reference if a separate client component for details is needed.
"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import { Calendar, MapPin, DollarSign } from "lucide-react"
import { EventBooking } from "@/components/events/event-booking"
import type { Event } from "@/types"

interface EventDetailsProps {
  event: Event
}

export function EventDetails({ event }: EventDetailsProps) {
  return (
    <div className="grid gap-8 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <div className="relative h-64 w-full overflow-hidden rounded-md">
              <Image src={event.image_url || "/placeholder.svg"} alt={event.name} layout="fill" objectFit="cover" />
            </div>
            <CardTitle className="mt-4 text-3xl font-bold">{event.name}</CardTitle>
            <p className="text-muted-foreground">{event.description}</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2 text-muted-foreground">
              <Calendar className="h-5 w-5" />
              <span>{new Date(event.date).toLocaleString()}</span>
            </div>
            <div className="flex items-center space-x-2 text-muted-foreground">
              <MapPin className="h-5 w-5" />
              <span>{event.location || "Online"}</span>
            </div>
            <div className="flex items-center space-x-2 text-muted-foreground">
              <DollarSign className="h-5 w-5" />
              <span>{event.price === 0 ? "Free" : `$${event.price.toFixed(2)}`}</span>
            </div>
            {event.ticket_count !== null && (
              <p className="text-sm text-muted-foreground">
                {event.ticket_count > 0 ? `${event.ticket_count} tickets remaining` : "Sold Out"}
              </p>
            )}
          </CardContent>
        </Card>
      </div>
      <div className="lg:col-span-1">
        <EventBooking event={event} />
        {/* You might add a "Related Events" component here */}
      </div>
    </div>
  )
}
