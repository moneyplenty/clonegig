"use client"

import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin } from "lucide-react"
import type { Event } from "@/types"

interface EventsGridProps {
  initialEvents: Event[]
}

export function EventsGrid({ initialEvents }: EventsGridProps) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {initialEvents.length === 0 ? (
        <p className="col-span-full text-center text-muted-foreground">No events found matching your criteria.</p>
      ) : (
        initialEvents.map((event) => (
          <Card key={event.id} className="flex flex-col overflow-hidden rounded-lg shadow-lg">
            <Link href={`/events/${event.id}`} className="relative h-48 w-full overflow-hidden">
              <Image
                src={event.image_url || "/placeholder.svg"}
                alt={event.name}
                layout="fill"
                objectFit="cover"
                className="transition-transform duration-300 hover:scale-105"
              />
            </Link>
            <CardContent className="flex flex-1 flex-col justify-between p-4">
              <div>
                <CardTitle className="text-lg font-semibold">{event.name}</CardTitle>
                <div className="mt-2 flex items-center text-sm text-muted-foreground">
                  <Calendar className="mr-2 h-4 w-4" />
                  <span>{new Date(event.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="mr-2 h-4 w-4" />
                  <span>{event.location || "Online"}</span>
                </div>
              </div>
              <Button asChild className="mt-4 w-full">
                <Link href={`/events/${event.id}`}>View Details</Link>
              </Button>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  )
}
