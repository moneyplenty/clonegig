"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"
import { useEffect, useState } from "react"
import { format } from "date-fns"
import Link from "next/link"

interface Event {
  id: string
  title: string
  date: string
  location: string
  price: number
  isMeetGreet: boolean
}

interface RelatedEventsProps {
  currentEventId: string
}

export function RelatedEvents({ currentEventId }: RelatedEventsProps) {
  const [relatedEvents, setRelatedEvents] = useState<Event[]>([])
  const supabase = createClient()

  useEffect(() => {
    const fetchRelatedEvents = async () => {
      const { data, error } = await supabase
        .from("Event")
        .select("*")
        .neq("id", currentEventId) // Exclude the current event
        .gte("date", new Date().toISOString()) // Only future events
        .order("date", { ascending: true })
        .limit(3) // Limit to 3 related events

      if (error) {
        console.error("Error fetching related events:", error)
      } else {
        setRelatedEvents(data || [])
      }
    }

    fetchRelatedEvents()
  }, [currentEventId, supabase])

  return (
    <Card>
      <CardHeader>
        <CardTitle>More Events</CardTitle>
      </CardHeader>
      <CardContent>
        {relatedEvents.length > 0 ? (
          <ul className="space-y-4">
            {relatedEvents.map((event) => (
              <li key={event.id} className="border-b pb-4 last:border-b-0 last:pb-0">
                <h3 className="text-lg font-semibold">{event.title}</h3>
                <p className="text-sm text-gray-500">
                  {format(new Date(event.date), "PPP")} at {event.location}
                </p>
                <Link href={`/events/${event.id}`}>
                  <Button variant="outline" size="sm" className="mt-2 bg-transparent">
                    View Details
                  </Button>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p>No other upcoming events found.</p>
        )}
      </CardContent>
    </Card>
  )
}
