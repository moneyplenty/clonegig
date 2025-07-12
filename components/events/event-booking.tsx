"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import { Loader2 } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

interface Event {
  id: string
  title: string
  date: string
  time: string
  location: string
  description: string
  imageUrl: string
  price: number
  ticketsAvailable: number
}

interface EventBookingProps {
  event: Event
}

export function EventBooking({ event }: EventBookingProps) {
  const [quantity, setQuantity] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const supabase = createClient()
  const router = useRouter()

  const handleQuantityChange = (value: string) => {
    const num = Number.parseInt(value)
    if (!isNaN(num) && num > 0 && num <= event.ticketsAvailable) {
      setQuantity(num)
    } else if (num > event.ticketsAvailable) {
      toast({
        title: "Quantity Limit",
        description: `Only ${event.ticketsAvailable} tickets available.`,
        variant: "warning",
      })
      setQuantity(event.ticketsAvailable)
    } else {
      setQuantity(1) // Default to 1 if invalid input
    }
  }

  const handleBookTickets = async () => {
    setIsLoading(true)
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to book tickets.",
        variant: "destructive",
      })
      router.push("/login")
      setIsLoading(false)
      return
    }

    if (quantity > event.ticketsAvailable) {
      toast({
        title: "Not Enough Tickets",
        description: `Only ${event.ticketsAvailable} tickets are available.`,
        variant: "destructive",
      })
      setIsLoading(false)
      return
    }

    try {
      // Simulate booking process
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Send confirmation email via API route
      const response = await fetch("/api/send-event-confirmation", {
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

      if (!response.ok) {
        throw new Error("Failed to send confirmation email")
      }

      toast({
        title: "Tickets Booked!",
        description: `You have successfully booked ${quantity} ticket(s) for ${event.title}. A confirmation email has been sent.`,
        variant: "success",
      })
      // In a real app, you'd update the database for ticketsAvailable
      // For this mock, we'll just show success
    } catch (error: any) {
      toast({
        title: "Booking Failed",
        description: error.message || "There was an error booking your tickets. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const totalPrice = (event.price * quantity).toFixed(2)

  return (
    <Card className="bg-background/50 backdrop-blur-lg border-electric-700/30">
      <CardHeader>
        <CardTitle className="text-electric-200">Book Your Tickets</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div>
          <Label htmlFor="quantity">Number of Tickets</Label>
          <Select value={String(quantity)} onValueChange={handleQuantityChange}>
            <SelectTrigger className="w-full bg-background/50 border-electric-700 text-electric-100">
              <SelectValue placeholder="Select quantity" />
            </SelectTrigger>
            <SelectContent className="bg-background border-electric-700">
              {Array.from({ length: event.ticketsAvailable }, (_, i) => i + 1).map((num) => (
                <SelectItem key={num} value={String(num)} className="focus:bg-electric-900 focus:text-electric-100">
                  {num}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex justify-between font-bold text-electric-100">
          <span>Total Price</span>
          <span>${totalPrice}</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          onClick={handleBookTickets}
          className="w-full bg-gradient-electric hover:animate-electric-pulse"
          disabled={isLoading || quantity === 0 || event.ticketsAvailable === 0}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Booking...
            </>
          ) : event.ticketsAvailable === 0 ? (
            "Sold Out"
          ) : (
            "Book Now"
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}
