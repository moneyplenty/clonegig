"use client"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { format } from "date-fns"
import { MapPin, Calendar } from "lucide-react"
import type { Event } from "@/types/index.d"
import { formatPrice } from "@/lib/utils"

interface UpcomingEventsProps {
  initialEvents: Event[]
}

export function UpcomingEvents({ initialEvents }: UpcomingEventsProps) {
  if (!initialEvents || initialEvents.length === 0) {
    return (
      <div className="flex items-center justify-center rounded-md border border-dashed p-8 text-muted-foreground">
        No upcoming events scheduled at the moment.
      </div>
    )
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {initialEvents.map((event) => (
        <Card key={event.id} className="flex flex-col">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">{event.name}</CardTitle>
            <p className="text-muted-foreground line-clamp-2">{event.description}</p>
          </CardHeader>
          <CardContent className="flex-1 space-y-2">
            <div className="flex items-center text-sm text-muted-foreground">
              <Calendar className="mr-2 h-4 w-4" />
              <span>{format(new Date(event.date), "PPP p")}</span>
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <MapPin className="mr-2 h-4 w-4" />
              <span>{event.location}</span>
            </div>
            <div className="text-lg font-bold">{event.price ? formatPrice(event.price) : "Free"}</div>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href={`/events/${event.id}`}>View Details</Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
