"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { useState } from "react"

interface Event {
  id: string
  title: string
  date: string
  location: string
  price: number
  isMeetGreet: boolean
}

interface EventBookingProps {
  event: Event
  userId: string | null
}

export function EventBooking({ event, userId }: EventBookingProps) {
  const router = useRouter()
  const supabase = createClient()
  const [loading, setLoading] = useState(false)

  const handleBookEvent = async () => {
    if (!userId) {
      toast.error("You must be logged in to book an event.")
      router.push("/login")
      return
    }

    setLoading(true)
    try {
      // In a real application, you would integrate with a payment gateway here
      // For simplicity, we'll simulate a successful booking and send an email.

      const response = await fetch("/api/send-event-confirmation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userEmail: (await supabase.auth.getUser()).data.user?.email,
          eventName: event.title,
          eventDate: event.date,
          eventLocation: event.location,
        }),
      })

      if (response.ok) {
        toast.success(`Successfully booked ${event.title}! A confirmation email has been sent.`)
      } else {
        toast.error("Failed to book event or send confirmation email.")
      }
    } catch (error) {
      console.error("Error booking event:", error)
      toast.error("An unexpected error occurred.")
    } finally {
      setLoading(false)
    }
  }

  const handleBookMeetGreet = async () => {
    if (!userId) {
      toast.error("You must be logged in to book a Meet & Greet.")
      router.push("/login")
      return
    }

    setLoading(true)
    try {
      // In a real application, you would integrate with a payment gateway here
      // and then create a Daily.co room and send the link.

      // Simulate Daily.co room creation
      const dailyRoomResponse = await fetch("/api/create-daily-room", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ roomName: `meet-greet-${event.id}-${userId}` }),
      })

      const { roomUrl, error: dailyError } = await dailyRoomResponse.json()

      if (dailyError) {
        toast.error(`Failed to create video room: ${dailyError.message}`)
        setLoading(false)
        return
      }

      const emailResponse = await fetch("/api/send-meetgreet-confirmation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userEmail: (await supabase.auth.getUser()).data.user?.email,
          eventName: event.title,
          eventDate: event.date,
          eventLocation: event.location,
          dailyRoomUrl: roomUrl,
        }),
      })

      if (emailResponse.ok) {
        toast.success(
          `Successfully booked ${event.title} Meet & Greet! A confirmation email with video link has been sent.`,
        )
      } else {
        toast.error("Failed to send Meet & Greet confirmation email.")
      }
    } catch (error) {
      console.error("Error booking Meet & Greet:", error)
      toast.error("An unexpected error occurred.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Book Your Spot</CardTitle>
      </CardHeader>
      <CardContent>
        {event.isMeetGreet ? (
          <Button onClick={handleBookMeetGreet} className="w-full" disabled={loading}>
            {loading ? "Booking Meet & Greet..." : `Book Meet & Greet - $${event.price.toFixed(2)}`}
          </Button>
        ) : (
          <Button onClick={handleBookEvent} className="w-full" disabled={loading}>
            {loading ? "Booking Event..." : `Book Event - $${event.price.toFixed(2)}`}
          </Button>
        )}
        {!userId && <p className="text-sm text-center text-gray-500 mt-2">You must be logged in to book.</p>}
      </CardContent>
    </Card>
  )
}
