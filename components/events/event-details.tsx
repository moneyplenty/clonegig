"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { format } from "date-fns"
import { MapPin, Calendar, DollarSign, Loader2 } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import { createClient } from "@/lib/supabase/client"
import { useState, useEffect } from "react"

interface EventDetailsProps {
  eventId: string
}

interface Event {
  id: string
  name: string
  description: string
  date: string
  location: string
  ticket_price: number
  image_url: string
}

export function EventDetails({ eventId }: EventDetailsProps) {
  const supabase = createClient()
  const [event, setEvent] = useState<Event | null>(null)
  const [loading, setLoading] = useState(true)
  const [isBooking, setIsBooking] = useState(false)

  useEffect(() => {
    const fetchEvent = async () => {
      setLoading(true)
      const { data, error } = await supabase.from("events").select("*").eq("id", eventId).single()

      if (error) {
        console.error("Error fetching event:", error)
        toast({
          title: "Error",
          description: "Failed to load event details.",
          variant: "destructive",
        })
      } else {
        setEvent(data)
      }
      setLoading(false)
    }

    fetchEvent()
  }, [eventId, supabase])

  const handleBookTicket = async () => {
    if (!event) return

    setIsBooking(true)
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to book tickets.",
        variant: "destructive",
      })
      setIsBooking(false)
      return
    }

    try {
      // Simulate a checkout process or direct booking
      // In a real app, this would redirect to Stripe Checkout or similar
      toast({
        title: "Booking Initiated",
        description: `Attempting to book ticket for ${event.name}...`,
      })

      // For simplicity, we'll just insert a booking record.
      // In a real scenario, this would involve a Stripe checkout session.
      const { error: bookingError } = await supabase.from("event_bookings").insert({
        event_id: event.id,
        user_id: user.id,
        booking_date: new Date().toISOString(),
        price_paid: event.ticket_price,
        status: "confirmed", // Assuming direct confirmation for simplicity
      })

      if (bookingError) {
        throw new Error(bookingError.message)
      }

      toast({
        title: "Ticket Booked!",
        description: `You have successfully booked a ticket for ${event.name}.`,
      })
    } catch (error: any) {
      console.error("Booking failed:", error)
      toast({
        title: "Booking Failed",
        description: `Failed to book ticket: ${error.message || "Unknown error"}`,
        variant: "destructive",
      })
    } finally {
      setIsBooking(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        <p className="ml-2 text-lg">Loading event details...</p>
      </div>
    )
  }

  if (!event) {
    return <div className="text-center text-xl text-muted-foreground py-10">Event not found.</div>
  }

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-lg">
      <CardHeader>
        <div className="relative w-full h-64 md:h-80 rounded-t-lg overflow-hidden">
          <Image
            src={event.image_url || "/placeholder.svg"}
            alt={event.name}
            layout="fill"
            objectFit="cover"
            className="rounded-t-lg"
          />
        </div>
        <CardTitle className="text-3xl font-bold mt-4">{event.name}</CardTitle>
        <CardDescription className="flex items-center text-muted-foreground">
          <Calendar className="h-4 w-4 mr-2" />
          {format(new Date(event.date), "PPP")}
        </CardDescription>
        <CardDescription className="flex items-center text-muted-foreground">
          <MapPin className="h-4 w-4 mr-2" />
          {event.location}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">{event.description}</p>
        <div className="flex items-center justify-between pt-4 border-t">
          <div className="flex items-center text-2xl font-bold text-primary">
            <DollarSign className="h-6 w-6 mr-2" />
            {event.ticket_price > 0 ? event.ticket_price.toFixed(2) : "Free"}
          </div>
          <Button onClick={handleBookTicket} disabled={isBooking}>
            {isBooking && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {event.ticket_price > 0 ? "Book Ticket" : "Register for Free"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
