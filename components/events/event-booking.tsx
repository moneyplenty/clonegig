"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { CreditCard, Shield, Star } from "lucide-react"
import { toast } from "sonner"

interface Event {
  id: string
  title: string
  price: number
  memberPrice: number
  tier: string
  maxAttendees: number
  currentAttendees: number
}

interface EventBookingProps {
  event: Event
}

export function EventBooking({ event }: EventBookingProps) {
  const [isBooking, setIsBooking] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    specialRequests: "",
  })

  const isMember = true // This would come from auth context
  const currentPrice = isMember ? event.memberPrice : event.price
  const savings = event.price - event.memberPrice
  const spotsLeft = event.maxAttendees - event.currentAttendees

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleBooking = async () => {
    if (!formData.name || !formData.email) {
      toast.error("Please fill in all required fields")
      return
    }

    setIsBooking(true)

    try {
      // Send booking confirmation email
      const response = await fetch("/api/send-event-confirmation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          eventTitle: event.title,
          userName: formData.name,
          userEmail: formData.email,
          eventDate: "2024-02-15", // This would come from event data
          eventTime: "20:00",
          eventLocation: "The Electric Theater, Los Angeles",
          price: currentPrice,
          specialRequests: formData.specialRequests,
        }),
      })

      if (response.ok) {
        toast.success("Booking confirmed! Check your email for details.")
        // Reset form
        setFormData({
          name: "",
          email: "",
          phone: "",
          specialRequests: "",
        })
      } else {
        toast.error("Failed to send confirmation email")
      }
    } catch (error) {
      toast.error("Booking failed. Please try again.")
    } finally {
      setIsBooking(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Pricing Card */}
      <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Event Pricing
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-slate-300">Regular Price</span>
              <span className="text-slate-400 line-through">${event.price}</span>
            </div>
            {isMember && (
              <>
                <div className="flex items-center justify-between">
                  <span className="text-slate-300 flex items-center gap-2">
                    <Star className="h-4 w-4 text-yellow-400" />
                    Member Price
                  </span>
                  <span className="text-green-400 font-bold">${event.memberPrice}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400">You Save</span>
                  <span className="text-green-400">${savings}</span>
                </div>
              </>
            )}
          </div>

          <Separator className="bg-slate-700" />

          <div className="flex items-center justify-between text-lg font-bold">
            <span className="text-white">Total</span>
            <span className="text-blue-400">${currentPrice}</span>
          </div>

          {spotsLeft <= 10 && (
            <Badge variant="destructive" className="w-full justify-center">
              Only {spotsLeft} spots left!
            </Badge>
          )}
        </CardContent>
      </Card>

      {/* Booking Form */}
      <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Book Your Spot</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-slate-300">
              Full Name *
            </Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="bg-slate-700/50 border-slate-600 text-white"
              placeholder="Enter your full name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-slate-300">
              Email Address *
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              className="bg-slate-700/50 border-slate-600 text-white"
              placeholder="Enter your email"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="text-slate-300">
              Phone Number
            </Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleInputChange}
              className="bg-slate-700/50 border-slate-600 text-white"
              placeholder="Enter your phone number"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="specialRequests" className="text-slate-300">
              Special Requests
            </Label>
            <Textarea
              id="specialRequests"
              name="specialRequests"
              value={formData.specialRequests}
              onChange={handleInputChange}
              className="bg-slate-700/50 border-slate-600 text-white"
              placeholder="Any special accommodations or requests?"
              rows={3}
            />
          </div>

          <Button
            onClick={handleBooking}
            disabled={isBooking || spotsLeft === 0}
            className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white"
          >
            {isBooking ? "Processing..." : spotsLeft === 0 ? "Sold Out" : `Book Now - $${currentPrice}`}
          </Button>

          <div className="flex items-center gap-2 text-sm text-slate-400">
            <Shield className="h-4 w-4" />
            <span>Secure booking with instant confirmation</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
