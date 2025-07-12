"use client"

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Clock, Users, Crown, Star, Zap, CalendarIcon } from "lucide-react"
import { useAuth } from "@/components/auth/auth-provider"
import { useToast } from "@/hooks/use-toast"

interface TimeSlot {
  id: string
  time: string
  available: boolean
  maxParticipants: number
  currentParticipants: number
  tierRequired: "frost" | "blizzard" | "avalanche"
}

interface BookingProps {
  onBookingComplete?: (booking: any) => void
}

export function MeetAndGreetBooking({ onBookingComplete }: BookingProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot | null>(null)
  const [isBooking, setIsBooking] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    specialRequests: "",
  })
  const { user } = useAuth()
  const { toast } = useToast()

  // Mock time slots - in production, this would come from your database
  const timeSlots: TimeSlot[] = [
    {
      id: "1",
      time: "2:00 PM",
      available: true,
      maxParticipants: 10,
      currentParticipants: 3,
      tierRequired: "frost",
    },
    {
      id: "2",
      time: "3:30 PM",
      available: true,
      maxParticipants: 8,
      currentParticipants: 5,
      tierRequired: "blizzard",
    },
    {
      id: "3",
      time: "5:00 PM",
      available: false,
      maxParticipants: 5,
      currentParticipants: 5,
      tierRequired: "avalanche",
    },
    {
      id: "4",
      time: "7:00 PM",
      available: true,
      maxParticipants: 12,
      currentParticipants: 2,
      tierRequired: "frost",
    },
  ]

  const getTierBadge = (tier: string) => {
    switch (tier) {
      case "frost":
        return <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/50">Frost Fan</Badge>
      case "blizzard":
        return <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/50">Blizzard VIP</Badge>
      case "avalanche":
        return <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/50">Avalanche</Badge>
      default:
        return null
    }
  }

  const getTierIcon = (tier: string) => {
    switch (tier) {
      case "frost":
        return <Star className="h-4 w-4" />
      case "blizzard":
        return <Zap className="h-4 w-4" />
      case "avalanche":
        return <Crown className="h-4 w-4" />
      default:
        return null
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleBooking = async () => {
    if (!selectedTimeSlot || !selectedDate || !user) {
      toast({
        title: "Booking Error",
        description: "Please select a date, time slot, and ensure you're logged in.",
        variant: "destructive",
      })
      return
    }

    if (!formData.name || !formData.email) {
      toast({
        title: "Missing Information",
        description: "Please fill in your name and email address.",
        variant: "destructive",
      })
      return
    }

    setIsBooking(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      const booking = {
        id: Math.random().toString(36).substr(2, 9),
        date: selectedDate,
        timeSlot: selectedTimeSlot,
        userId: user.id,
        userInfo: formData,
        status: "confirmed",
        createdAt: new Date(),
      }

      // Send confirmation email
      await fetch("/api/send-meetgreet-confirmation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName: formData.name,
          userEmail: formData.email,
          sessionDate: selectedDate.toLocaleDateString(),
          sessionTime: selectedTimeSlot.time,
          sessionType: "Meet & Greet Video Call",
          specialRequests: formData.specialRequests,
        }),
      })

      toast({
        title: "Booking Confirmed! 🎸",
        description: `Your meet & greet session is booked for ${selectedDate.toLocaleDateString()} at ${selectedTimeSlot.time}. Check your email for details!`,
      })

      onBookingComplete?.(booking)

      // Reset form
      setFormData({ name: "", email: "", specialRequests: "" })
      setSelectedTimeSlot(null)
    } catch (error) {
      toast({
        title: "Booking Failed",
        description: "There was an error booking your session. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsBooking(false)
    }
  }

  const userTier = user?.user_metadata?.tier || "guest"
  const canBookTier = (requiredTier: string) => {
    const tierHierarchy = { guest: 0, frost: 1, blizzard: 2, avalanche: 3 }
    return (
      tierHierarchy[userTier as keyof typeof tierHierarchy] >= tierHierarchy[requiredTier as keyof typeof tierHierarchy]
    )
  }

  return (
    <div className="space-y-8">
      {/* User Information Form */}
      <Card className="border-electric-700/30 bg-background/50 backdrop-blur-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-electric-400">
            <Users className="h-5 w-5" />
            Your Information
          </CardTitle>
          <CardDescription>Please provide your details for the meet & greet session</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Enter your full name"
                className="border-electric-700/30 bg-background/50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="Enter your email"
                className="border-electric-700/30 bg-background/50"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="requests">Special Requests (Optional)</Label>
            <Textarea
              id="requests"
              value={formData.specialRequests}
              onChange={(e) => handleInputChange("specialRequests", e.target.value)}
              placeholder="Any special requests or questions for Kelvin?"
              className="border-electric-700/30 bg-background/50"
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Calendar Section */}
        <Card className="border-electric-700/30 bg-background/50 backdrop-blur-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-electric-400">
              <CalendarIcon className="h-5 w-5" />
              Select Date
            </CardTitle>
            <CardDescription>Choose a date for your meet & greet session</CardDescription>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              disabled={(date) => date < new Date() || date > new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)}
              className="rounded-md border border-electric-700/30"
            />
          </CardContent>
        </Card>

        {/* Time Slots Section */}
        <Card className="border-electric-700/30 bg-background/50 backdrop-blur-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-electric-400">
              <Clock className="h-5 w-5" />
              Available Time Slots
            </CardTitle>
            <CardDescription>
              {selectedDate
                ? `Sessions for ${selectedDate.toLocaleDateString()}`
                : "Select a date to see available times"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {selectedDate ? (
              timeSlots.map((slot) => (
                <div
                  key={slot.id}
                  className={`p-4 rounded-lg border transition-all cursor-pointer ${
                    selectedTimeSlot?.id === slot.id
                      ? "border-electric-500 bg-electric-500/10"
                      : slot.available && canBookTier(slot.tierRequired)
                        ? "border-electric-700/30 hover:border-electric-500/50 hover:bg-electric-500/5"
                        : "border-gray-700/30 bg-gray-500/5 cursor-not-allowed opacity-50"
                  }`}
                  onClick={() => {
                    if (slot.available && canBookTier(slot.tierRequired)) {
                      setSelectedTimeSlot(slot)
                    }
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {getTierIcon(slot.tierRequired)}
                      <div>
                        <div className="font-semibold text-lg">{slot.time}</div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Users className="h-4 w-4" />
                          {slot.currentParticipants}/{slot.maxParticipants} participants
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      {getTierBadge(slot.tierRequired)}
                      {!slot.available && <Badge variant="destructive">Full</Badge>}
                      {!canBookTier(slot.tierRequired) && (
                        <Badge variant="outline" className="text-yellow-400 border-yellow-400/50">
                          Upgrade Required
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <CalendarIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Select a date to view available time slots</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Booking Summary */}
      {selectedDate && selectedTimeSlot && formData.name && formData.email && (
        <Card className="border-electric-700/30 bg-background/50 backdrop-blur-lg">
          <CardHeader>
            <CardTitle className="text-electric-400">Booking Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="text-center p-4 rounded-lg bg-electric-500/10 border border-electric-500/30">
                <CalendarIcon className="h-8 w-8 mx-auto mb-2 text-electric-400" />
                <div className="font-semibold">{selectedDate.toLocaleDateString()}</div>
                <div className="text-sm text-muted-foreground">Date</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-electric-500/10 border border-electric-500/30">
                <Clock className="h-8 w-8 mx-auto mb-2 text-electric-400" />
                <div className="font-semibold">{selectedTimeSlot.time}</div>
                <div className="text-sm text-muted-foreground">Time</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-electric-500/10 border border-electric-500/30">
                <Users className="h-8 w-8 mx-auto mb-2 text-electric-400" />
                <div className="font-semibold">
                  {selectedTimeSlot.currentParticipants + 1}/{selectedTimeSlot.maxParticipants}
                </div>
                <div className="text-sm text-muted-foreground">Participants</div>
              </div>
            </div>
            <Button
              onClick={handleBooking}
              disabled={isBooking || !user}
              className="w-full bg-gradient-electric hover:animate-electric-pulse"
              size="lg"
            >
              {isBooking ? "Booking..." : user ? "Confirm Booking" : "Sign In to Book"}
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
