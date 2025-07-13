"use client"

import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin } from "lucide-react"
import { format } from "date-fns"
import { useAuth } from "@/components/auth/auth-provider"

interface EventItem {
  id: string
  title: string
  date: string
  location: string
  image: string
  ticketPrice: number
  isPremium: boolean
}

interface EventsGridProps {
  events: EventItem[]
}

export function EventsGrid({ events }: EventsGridProps) {
  const { user } = useAuth()

  const canAccess = (event: EventItem) => {
    if (!event.isPremium) {
      return true // Public events are always accessible
    }
    // Premium events require 'premium' or 'admin' role
    return user?.user_metadata?.role === "premium" || user?.user_metadata?.role === "admin"
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 flex-1">
      {events.map((event) => (
        <Card key={event.id} className="flex flex-col">
          <CardHeader className="p-0">
            <div className="relative w-full h-48">
              <Image
                src={event.image || "/placeholder.svg"}
                alt={event.title}
                layout="fill"
                objectFit="cover"
                className="rounded-t-lg"
              />
              {event.isPremium && (
                <Badge className="absolute top-2 left-2 bg-primary text-primary-foreground">Premium</Badge>
              )}
            </div>
          </CardHeader>
          <CardContent className="flex-grow p-4">
            <CardTitle className="text-lg font-semibold mb-2">{event.title}</CardTitle>
            <div className="flex items-center text-muted-foreground text-sm mb-1">
              <Calendar className="mr-2 h-4 w-4" />
              <span>{format(new Date(event.date), "MMM dd, yyyy 'at' p")}</span>
            </div>
            <div className="flex items-center text-muted-foreground text-sm">
              <MapPin className="mr-2 h-4 w-4" />
              <span>{event.location}</span>
            </div>
            <p className="text-xl font-bold mt-2">${event.ticketPrice.toFixed(2)}</p>
          </CardContent>
          <CardFooter className="p-4 pt-0">
            <Button className="w-full" asChild disabled={!canAccess(event)}>
              {canAccess(event) ? (
                <Link href={`/events/${event.id}`}>View Details</Link>
              ) : (
                <Link href="/join">Unlock with Premium</Link>
              )}
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
