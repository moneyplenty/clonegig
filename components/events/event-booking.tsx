"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/hooks/use-toast"
import { useAuth } from "@/components/auth/auth-provider"
import { useRouter } from "next/navigation"

interface EventBookingProps {
  event: {
    id: string
    title: string
    ticketPrice: number
    isPremium: boolean
  }
}

export function EventBooking({ event }: EventBookingProps) {
  const [quantity, setQuantity] = useState(1)
  const [loading, setLoading] = useState(false)
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()

  const handleBooking = async () => {
    if (authLoading) return

    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to book tickets.",
        variant: "destructive",
      })
      router.push("/login")
      return
    }

    if (event.isPremium && user.user_metadata?.role !== "premium" && user.user_metadata?.role !== "admin") {
      toast({
        title: "Premium Access Required",
        description: "This is a premium event. Please upgrade your membership to book tickets.",
        variant: "destructive",
      })
      router.push("/join") // Redirect to membership page
      return
    }

    setLoading(true)
    try {
      // Simulate API call for booking
      const response = await fetch("/api/send-event-confirmation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          eventId: event.id,
          eventName: event.title,
          quantity,
          totalPrice: (event.ticketPrice * quantity).toFixed(2),
          userEmail: user.email,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to book event")
      }

      toast({
        title: "Booking Confirmed!",
        description: `You have successfully booked ${quantity} ticket(s) for ${event.title}. A confirmation email has been sent.`,
        variant: "default",
      })
    } catch (error: any) {
      toast({
        title: "Booking Failed",
        description: error.message || "There was an error processing your booking. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label htmlFor="quantity" className="text-lg">
          Quantity
        </Label>
        <Select value={String(quantity)} onValueChange={(value) => setQuantity(Number(value))}>
          <SelectTrigger className="w-[100px]">
            <SelectValue placeholder="1" />
          </SelectTrigger>
          <SelectContent>
            {[1, 2, 3, 4, 5].map((num) => (
              <SelectItem key={num} value={String(num)}>
                {num}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-center justify-between text-xl font-bold">
        <span>Total:</span>
        <span>${(event.ticketPrice * quantity).toFixed(2)}</span>
      </div>
      <Button onClick={handleBooking} className="w-full" disabled={loading || authLoading}>
        {loading
          ? "Booking..."
          : event.isPremium &&
              (!user || (user.user_metadata?.role !== "premium" && user.user_metadata?.role !== "admin"))
            ? "Upgrade to Premium"
            : "Book Now"}
      </Button>
      {event.isPremium &&
        (!user || (user.user_metadata?.role !== "premium" && user.user_metadata?.role !== "admin")) && (
          <p className="text-sm text-center text-muted-foreground">
            This is a premium event. Upgrade your membership to gain access.
          </p>
        )}
    </div>
  )
}
