"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"
import { useEffect, useState } from "react"
import { format } from "date-fns"
import Link from "next/link"

interface UpcomingSessionsProps {
  userId: string | null
}

interface Event {
  id: string
  title: string
  date: string
  location: string
  isMeetGreet: boolean
}

export function UpcomingSessions({ userId }: UpcomingSessionsProps) {
  const [upcomingMeetGreets, setUpcomingMeetGreets] = useState<Event[]>([])
  const supabase = createClient()

  useEffect(() => {
    const fetchUpcomingMeetGreets = async () => {
      const { data, error } = await supabase
        .from("Event")
        .select("*")
        .eq("isMeetGreet", true)
        .gte("date", new Date().toISOString())
        .order("date", { ascending: true })

      if (error) {
        console.error("Error fetching upcoming meet & greets:", error)
      } else {
        setUpcomingMeetGreets(data || [])
      }
    }

    fetchUpcomingMeetGreets()
  }, [supabase])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Upcoming Meet & Greet Sessions</CardTitle>
      </CardHeader>
      <CardContent>
        {userId ? (
          upcomingMeetGreets.length > 0 ? (
            <ul className="space-y-4">
              {upcomingMeetGreets.map((event) => (
                <li key={event.id} className="border-b pb-4 last:border-b-0 last:pb-0">
                  <h3 className="text-lg font-semibold">{event.title}</h3>
                  <p className="text-sm text-gray-500">
                    {format(new Date(event.date), "PPPp")} at {event.location}
                  </p>
                  <Link href={`/meet-and-greet/${event.id}`}>
                    <Button size="sm" className="mt-2">
                      Join Session
                    </Button>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p>No upcoming meet & greet sessions found.</p>
          )
        ) : (
          <p>Please log in to view your upcoming meet & greet sessions.</p>
        )}
      </CardContent>
    </Card>
  )
}
