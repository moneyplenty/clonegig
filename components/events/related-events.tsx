"use client"

import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin } from "lucide-react"
import type { Event } from "@/types"

interface RelatedEventsProps {
  initialEvents: Event[]
}

export function RelatedEvents({ initialEvents }: RelatedEventsProps) {
  const events = initialEvents || [] // Ensure it's an array

  if (events.length === 0) {
    return null // Don't render if no related events
  }

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Related Events</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {events.map((event) => (
          <div key={event.id} className="flex items-center space-x-4">
            <div className="relative h-20 w-20 overflow-hidden rounded-md">
              <Image src={event.image_url || "/placeholder.svg"} alt={event.name} layout="fill" objectFit="cover" />
            </div>
            <div className="flex-1">
              <Link href={`/events/${event.id}`} className="font-medium hover:underline">
                {event.name}
              </Link>
              <div className="flex items-center text-sm text-muted-foreground">
                <Calendar className="mr-1 h-3 w-3" />
                <span>{new Date(event.date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <MapPin className="mr-1 h-3 w-3" />
                <span>{event.location || "Online"}</span>
              </div>
            </div>
            <Button asChild variant="outline" size="sm">
              <Link href={`/events/${event.id}`}>View</Link>
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
