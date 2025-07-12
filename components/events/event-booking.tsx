"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { CreditCard, User, Shield, Ticket } from "lucide-react"
import { useAuth } from "@/components/auth/auth-provider"
import { useToast } from "@/hooks/use-toast"

interface Event {
  id: string
  title: string
  price: number
  memberPrice: number
  maxAttendees: number
  currentAttendees: number
  tierRequired: string
}

interface EventBookingProps {
  event: Event
}

export function EventBooking({ event }: EventBookingProps) {
  const [isBooking, setIsBooking] = useState(false)
  const [ticketQuantity, setTicketQuantity] = useState(1)
  const [specialRequests, setSpecialRequests] = useState("")
  const [agreeToTerms, setAgreeToTerms] = useState(false)
  const { user } = useAuth()
  const { toast } = useToast()

  const spotsLeft = event.maxAttendees - event.currentAttendees
  const totalPrice = event.memberPrice * ticketQuantity
  const savings = (event.price - event.memberPrice) * ticketQuantity

  const handleBooking = async () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to book this event.",
        variant: "destructive",
      })
      return
    }

    if (!agreeToTerms) {
      toast({
        title: "Terms Required",
        description: "Please agree to the terms and conditions.",
        variant: "destructive",
      })
      return
    }

    if (ticketQuantity > spotsLeft) {
      toast({
        title: "Not Enough Spots",
        description: `Only ${spotsLeft} spots remaining.`,
        variant: "destructive",
      })
      return
    }

    setIsBooking(true)

    try {
      // Simulate booking process
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Send confirmation email (using Resend)
      await fetch("/api/send-event-confirmation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userEmail: user.email,
          eventTitle: event.title,
          ticketQuantity,
          totalPrice,
          specialRequests,
        }),
      })

      toast({
        title: "Booking Confirmed! 🎉",
        description: `You've successfully booked ${ticketQuantity} ticket(s) for ${event.title}. Check your email for confirmation.`,
      })
    } catch (error) {
      toast({
        title: "Booking Failed",
        description: "There was an error processing your booking. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsBooking(false)
    }
  }

  return (
    <Card className="border-electric-700/30 bg-background/50 backdrop-blur-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-electric-400">
          <Ticket className="h-5 w-5" />
          Book Your Spot
        </CardTitle>
        <CardDescription>Secure your place at this exclusive event</CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Pricing Info */}
        <div className="p-4 rounded-lg bg-electric-500/10 border border-electric-500/30">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Regular Price</span>
            <span className="text-sm line-through text-muted-foreground">${event.price}</span>
          </div>
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium">Member Price</span>
            <span className="font-bold text-electric-400">${event.memberPrice}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-green-400">You Save</span>
            <span className="text-sm font-medium text-green-400">${event.price - event.memberPrice}</span>
          </div>
        </div>

        {/* Ticket Quantity */}
        <div className="space-y-2">
          <Label htmlFor="quantity">Number of Tickets</Label>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setTicketQuantity(Math.max(1, ticketQuantity - 1))}
              disabled={ticketQuantity <= 1}
            >
              -
            </Button>
            <Input
              id="quantity"
              type="number"
              value={ticketQuantity}
              onChange={(e) =>
                setTicketQuantity(Math.max(1, Math.min(spotsLeft, Number.parseInt(e.target.value) || 1)))
              }
              className="w-20 text-center"
              min="1"
              max={spotsLeft}
            />
            <Button
              variant="outline"
              size="sm"
              onClick={() => setTicketQuantity(Math.min(spotsLeft, ticketQuantity + 1))}
              disabled={ticketQuantity >= spotsLeft}
            >
              +
            </Button>
            <span className="text-sm text-muted-foreground ml-2">(Max: {spotsLeft} available)</span>
          </div>
        </div>

        {/* Special Requests */}
        <div className="space-y-2">
          <Label htmlFor="requests">Special Requests (Optional)</Label>
          <Textarea
            id="requests"
            placeholder="Any special accommodations or requests..."
            value={specialRequests}
            onChange={(e) => setSpecialRequests(e.target.value)}
            className="min-h-[80px]"
          />
        </div>

        <Separator />

        {/* Order Summary */}
        <div className="space-y-3">
          <h4 className="font-semibold text-electric-400">Order Summary</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Tickets ({ticketQuantity}x)</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-green-400">
              <span>Member Savings</span>
              <span>-${savings.toFixed(2)}</span>
            </div>
            <Separator />
            <div className="flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span className="text-electric-400">${totalPrice.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Terms Agreement */}
        <div className="flex items-start space-x-2">
          <Checkbox
            id="terms"
            checked={agreeToTerms}
            onCheckedChange={(checked) => setAgreeToTerms(checked as boolean)}
          />
          <Label htmlFor="terms" className="text-sm text-muted-foreground leading-relaxed">
            I agree to the event terms and conditions, cancellation policy, and understand that tickets are
            non-refundable.
          </Label>
        </div>

        {/* Booking Button */}
        <Button
          onClick={handleBooking}
          disabled={isBooking || !user || spotsLeft === 0 || !agreeToTerms}
          className="w-full bg-gradient-electric hover:animate-electric-pulse"
          size="lg"
        >
          {isBooking ? (
            "Processing..."
          ) : !user ? (
            <>
              <User className="h-4 w-4 mr-2" />
              Sign In to Book
            </>
          ) : spotsLeft === 0 ? (
            "Event Full"
          ) : (
            <>
              <CreditCard className="h-4 w-4 mr-2" />
              Book Now - ${totalPrice.toFixed(2)}
            </>
          )}
        </Button>

        {/* Security Badge */}
        <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <Shield className="h-4 w-4" />
          <span>Secure payment processing</span>
        </div>
      </CardContent>
    </Card>
  )
}
