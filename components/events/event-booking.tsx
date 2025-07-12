"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/hooks/use-toast"
import { Loader2 } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

interface EventBookingProps {
  event: {
    id: number
    title: string
    date: string
    time: string
    location: string
    price: number
    isPremium: boolean
  }
}

export function EventBooking({ event }: EventBookingProps) {
  const [quantity, setQuantity] = useState(1)
  const [loading, setLoading] = useState(false)
  const supabase = createClient()

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser()

    if (userError || !user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to book tickets.",
        variant: "destructive",
      })
      setLoading(false)
      return
    }

    // Simulate booking process
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Simulate email confirmation
    const emailResponse = await fetch("/api/send-event-confirmation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userEmail: user.email,
        eventName: event.title,
        eventDate: event.date,
        eventTime: event.time,
        eventLocation: event.location,
        quantity: quantity,
        totalPrice: (event.price * quantity).toFixed(2),
      }),
    })

    if (emailResponse.ok) {
      toast({
        title: "Booking Confirmed!",
        description: `You have booked ${quantity} ticket(s) for ${event.title}. A confirmation email has been sent.`,
        variant: "success",
      })
    } else {
      toast({
        title: "Booking Confirmed (Email Failed)",
        description: "Your booking is confirmed, but there was an issue sending the confirmation email.",
        variant: "warning",
      })
    }

    setLoading(false)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Book Your Tickets</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleBooking} className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="price" className="text-lg font-semibold">
              Price per ticket:
            </Label>
            <span id="price" className="text-lg font-bold">
              ${event.price.toFixed(2)}
            </span>
          </div>
          <div>
            <Label htmlFor="quantity">Quantity</Label>
            <Input
              id="quantity"
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Number.parseInt(e.target.value))}
              required
            />
          </div>
          <div className="flex items-center justify-between font-bold text-xl">
            <span>Total:</span>
            <span>${(event.price * quantity).toFixed(2)}</span>
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Booking...
              </>
            ) : (
              "Book Now"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
