"use client"

import Link from "next/link"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import type { Event } from "@/types"
import { useAuth } from "@/components/auth/auth-provider"
import { useRouter } from "next/navigation"

interface EventBookingProps {
  event: Event
}

export function EventBooking({ event }: EventBookingProps) {
  const [quantity, setQuantity] = useState(1)
  const [loading, setLoading] = useState(false)
  const { user, userRole, loading: authLoading } = useAuth()
  const router = useRouter()

  const handleBooking = async () => {
    if (!user) {
      toast.error("You need to be logged in to book events.")
      router.push("/login")
      return
    }

    if (event.isMeetGreet && userRole !== "premium") {
      toast.error("Meet & Greet sessions are exclusive to Premium members. Please upgrade your membership.")
      router.push("/join")
      return
    }

    setLoading(true)
    try {
      // Simulate booking API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // In a real application, you would:
      // 1. Call a server action or API route to process the booking.
      // 2. Handle payment if event.price > 0 (e.g., Stripe Checkout).
      // 3. Store booking details in your database.
      // 4. Send a confirmation email.

      toast.success(`Successfully booked ${quantity} ticket(s) for ${event.title}!`)
      setQuantity(1) // Reset quantity
    } catch (error) {
      console.error("Booking error:", error)
      toast.error("Failed to book event. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const isBookable = !authLoading && user && (!event.isMeetGreet || userRole === "premium")

  return (
    <Card className="bg-kelvin-card text-kelvin-card-foreground border-kelvin-border shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Book Your Spot</CardTitle>
        <CardDescription className="text-kelvin-card-foreground/80">
          Secure your tickets for this exciting event.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {event.price > 0 && (
          <div className="flex items-center justify-between">
            <Label htmlFor="quantity" className="text-lg">
              Price per ticket:
            </Label>
            <span className="text-xl font-bold text-electric-400">${event.price.toFixed(2)}</span>
          </div>
        )}
        <div className="flex items-center justify-between">
          <Label htmlFor="quantity" className="text-lg">
            Quantity:
          </Label>
          <Input
            id="quantity"
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(Number.parseInt(e.target.value))}
            className="w-24 bg-kelvin-input text-kelvin-foreground border-kelvin-border"
            disabled={loading || !isBookable}
          />
        </div>
        <div className="flex items-center justify-between text-xl font-bold">
          <span>Total:</span>
          <span className="text-frost-400">${(event.price * quantity).toFixed(2)}</span>
        </div>
        <Button
          onClick={handleBooking}
          className="w-full bg-electric-500 hover:bg-electric-600 text-white"
          disabled={loading || !isBookable}
        >
          {loading ? "Booking..." : event.price > 0 ? "Proceed to Payment" : "Confirm Booking"}
        </Button>
        {!user && !authLoading && (
          <p className="text-center text-sm text-kelvin-card-foreground/70">
            <Link href="/login" className="text-electric-400 hover:underline">
              Log in
            </Link>{" "}
            to book your tickets.
          </p>
        )}
        {event.isMeetGreet && user && userRole !== "premium" && !authLoading && (
          <p className="text-center text-sm text-kelvin-card-foreground/70">
            This is a Premium-only event.{" "}
            <Link href="/join" className="text-electric-400 hover:underline">
              Upgrade your membership
            </Link>{" "}
            to book.
          </p>
        )}
      </CardContent>
    </Card>
  )
}
