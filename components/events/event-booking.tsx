"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { Loader2 } from "lucide-react"
import { useAuth } from "@/components/auth/auth-provider"
import type { Event } from "@/types"

interface EventBookingProps {
  event: Event
}

export function EventBooking({ event }: EventBookingProps) {
  const { user } = useAuth()
  const [quantity, setQuantity] = useState(1)
  const [isBooking, setIsBooking] = useState(false)
  const { toast } = useToast()

  const handleBooking = async () => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please log in to book tickets.",
        variant: "destructive",
      })
      return
    }

    if (event.ticket_count !== null && quantity > event.ticket_count) {
      toast({
        title: "Not Enough Tickets",
        description: `Only ${event.ticket_count} tickets available.`,
        variant: "destructive",
      })
      return
    }

    setIsBooking(true)
    try {
      // Simulate payment or direct booking for free events
      if (event.price === 0) {
        // For free events, directly "book"
        // In a real app, you might record this booking in a 'user_events' table
        toast({
          title: "Booking Confirmed!",
          description: `You have successfully booked ${quantity} ticket(s) for ${event.name}.`,
        })

        // Optionally send confirmation email
        await fetch("/api/send-event-confirmation", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            toEmail: user.email,
            eventName: event.name,
            eventDate: event.date,
            eventLocation: event.location,
          }),
        })
      } else {
        // For paid events, redirect to Stripe checkout
        const response = await fetch("/api/stripe-checkout", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            cartItems: [
              {
                id: event.id,
                name: event.name,
                price: event.price,
                quantity: quantity,
                image_url: event.image_url,
                description: event.description,
                stock: event.ticket_count, // Pass stock for potential decrement
              },
            ],
          }),
        })

        const data = await response.json()

        if (response.ok) {
          window.location.href = data.url // Redirect to Stripe Checkout
        } else {
          toast({
            title: "Checkout Failed",
            description: data.error || "An unexpected error occurred during checkout.",
            variant: "destructive",
          })
        }
      }
    } catch (error) {
      console.error("Error booking event:", error)
      toast({
        title: "Booking Error",
        description: "Could not complete booking. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsBooking(false)
    }
  }

  const isSoldOut = event.ticket_count !== null && event.ticket_count <= 0
  const isPastEvent = new Date(event.date) < new Date()

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Book Your Spot</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {isPastEvent ? (
          <p className="text-destructive">This event has already passed.</p>
        ) : isSoldOut ? (
          <p className="text-destructive">Tickets are sold out for this event.</p>
        ) : (
          <>
            <div>
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                id="quantity"
                type="number"
                min="1"
                max={event.ticket_count || undefined}
                value={quantity}
                onChange={(e) => setQuantity(Number.parseInt(e.target.value))}
                className="mt-1"
              />
            </div>
            <Button onClick={handleBooking} className="w-full" disabled={isBooking || quantity <= 0}>
              {isBooking ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Booking...
                </>
              ) : event.price === 0 ? (
                "Book Free Ticket(s)"
              ) : (
                `Book for $${(event.price * quantity).toFixed(2)}`
              )}
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  )
}
