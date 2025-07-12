"use client"

import { CardDescription } from "@/components/ui/card"

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Clock,
  Users,
  Crown,
  Star,
  Zap,
  CalendarIcon,
  Video,
  MessageCircle,
  Phone,
  Shield,
  CheckCircle,
} from "lucide-react"
import { useAuth } from "@/components/auth/auth-provider"
import { toast } from "@/components/ui/use-toast"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { format } from "date-fns"

interface TimeSlot {
  id: string
  time: string
  available: boolean
  maxParticipants: number
  currentParticipants: number
  tierRequired: "frost" | "blizzard" | "avalanche"
  price: number
}

interface PrivateSession {
  id: string
  type: "whatsapp" | "facetime" | "video"
  duration: number
  price: number
  tierRequired: "blizzard" | "avalanche"
  description: string
}

interface Session {
  id: string
  date: Date
  time: string
  isBooked: boolean
  attendees: number
  maxAttendees: number
}

interface MeetAndGreetBookingProps {
  session: Session
  onJoinCall: () => void
}

const timeSlots: TimeSlot[] = [
  {
    id: "1",
    time: "2:00 PM",
    available: true,
    maxParticipants: 10,
    currentParticipants: 3,
    tierRequired: "frost",
    price: 0,
  },
  {
    id: "2",
    time: "3:30 PM",
    available: true,
    maxParticipants: 8,
    currentParticipants: 5,
    tierRequired: "blizzard",
    price: 0,
  },
  {
    id: "3",
    time: "5:00 PM",
    available: false,
    maxParticipants: 5,
    currentParticipants: 5,
    tierRequired: "avalanche",
    price: 0,
  },
  {
    id: "4",
    time: "7:00 PM",
    available: true,
    maxParticipants: 12,
    currentParticipants: 2,
    tierRequired: "frost",
    price: 0,
  },
]

const privateSessions: PrivateSession[] = [
  {
    id: "whatsapp",
    type: "whatsapp",
    duration: 30,
    price: 150,
    tierRequired: "blizzard",
    description: "Private WhatsApp video call with Kelvin. Perfect for personal conversations and getting advice.",
  },
  {
    id: "facetime",
    type: "facetime",
    duration: 45,
    price: 200,
    tierRequired: "avalanche",
    description: "Exclusive FaceTime session with Kelvin. High-quality video call for the ultimate fan experience.",
  },
  {
    id: "video",
    type: "video",
    duration: 60,
    price: 300,
    tierRequired: "avalanche",
    description: "Premium private video session with screen sharing and recording included.",
  },
]

export function MeetAndGreetBooking({ session, onJoinCall }: MeetAndGreetBookingProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot | null>(null)
  const [selectedPrivateSession, setSelectedPrivateSession] = useState<PrivateSession | null>(null)
  const [isBooking, setIsBooking] = useState(false)
  const [activeTab, setActiveTab] = useState("group")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    whatsappNumber: "",
    appleId: "",
    specialRequests: "",
    preferredTime: "",
  })
  const { user } = useAuth()
  const supabase = createClient()
  const router = useRouter()

  const getTierBadge = (tier: string) => {
    switch (tier) {
      case "frost":
        return <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/50">Frost Fan</Badge>
      case "blizzard":
        return <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/50">Blizzard VIP</Badge>
      case "avalanche":
        return <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/50">Avalanche Elite</Badge>
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

  const getSessionIcon = (type: string) => {
    switch (type) {
      case "whatsapp":
        return <MessageCircle className="h-5 w-5 text-green-500" />
      case "facetime":
        return <Phone className="h-5 w-5 text-blue-500" />
      case "video":
        return <Video className="h-5 w-5 text-purple-500" />
      default:
        return <Video className="h-5 w-5" />
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleGroupBooking = async () => {
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
      await new Promise((resolve) => setTimeout(resolve, 2000))

      const booking = {
        id: Math.random().toString(36).substr(2, 9),
        type: "group",
        date: selectedDate,
        timeSlot: selectedTimeSlot,
        userId: user.id,
        userInfo: formData,
        status: "confirmed",
        createdAt: new Date(),
      }

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
          sessionType: "Group Meet & Greet Video Call",
          specialRequests: formData.specialRequests,
        }),
      })

      toast({
        title: "Group Session Booked! 🎸",
        description: `Your meet & greet session is booked for ${selectedDate.toLocaleDateString()} at ${selectedTimeSlot.time}. Check your email for details!`,
      })

      setFormData({
        name: "",
        email: "",
        phone: "",
        whatsappNumber: "",
        appleId: "",
        specialRequests: "",
        preferredTime: "",
      })
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

  const handlePrivateBooking = async () => {
    if (!selectedPrivateSession || !user) {
      toast({
        title: "Booking Error",
        description: "Please select a session type and ensure you're logged in.",
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

    // Validate required contact info based on session type
    if (selectedPrivateSession.type === "whatsapp" && !formData.whatsappNumber) {
      toast({
        title: "WhatsApp Number Required",
        description: "Please provide your WhatsApp number for the session.",
        variant: "destructive",
      })
      return
    }

    if (selectedPrivateSession.type === "facetime" && !formData.appleId) {
      toast({
        title: "Apple ID Required",
        description: "Please provide your Apple ID for the FaceTime session.",
        variant: "destructive",
      })
      return
    }

    setIsBooking(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))

      const booking = {
        id: Math.random().toString(36).substr(2, 9),
        type: "private",
        session: selectedPrivateSession,
        userId: user.id,
        userInfo: formData,
        status: "confirmed",
        createdAt: new Date(),
      }

      await fetch("/api/send-meetgreet-confirmation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName: formData.name,
          userEmail: formData.email,
          sessionType: `Private ${selectedPrivateSession.type.toUpperCase()} Session`,
          sessionDuration: `${selectedPrivateSession.duration} minutes`,
          sessionPrice: `$${selectedPrivateSession.price}`,
          contactInfo: selectedPrivateSession.type === "whatsapp" ? formData.whatsappNumber : formData.appleId,
          specialRequests: formData.specialRequests,
          preferredTime: formData.preferredTime,
        }),
      })

      toast({
        title: "Private Session Booked! 🔥",
        description: `Your private ${selectedPrivateSession.type} session has been booked. Kelvin will contact you within 24 hours!`,
      })

      setFormData({
        name: "",
        email: "",
        phone: "",
        whatsappNumber: "",
        appleId: "",
        specialRequests: "",
        preferredTime: "",
      })
      setSelectedPrivateSession(null)
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

  const handleConfirmBooking = async () => {
    setIsBooking(true)
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to book a meet & greet session.",
        variant: "destructive",
      })
      router.push("/login")
      setIsBooking(false)
      return
    }

    if (session.isBooked || session.attendees >= session.maxAttendees) {
      toast({
        title: "Session Unavailable",
        description: "This session is already booked or full.",
        variant: "destructive",
      })
      setIsBooking(false)
      return
    }

    try {
      // Simulate booking process
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // In a real application, you would update the database to mark the session as booked
      // and increment attendees count. For this mock, we'll just proceed.

      // Call API route to create Daily room and send confirmation email
      const response = await fetch("/api/create-daily-room", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sessionId: session.id,
          userEmail: user.email,
          userName: user.user_metadata?.full_name || user.email,
          sessionDate: format(session.date, "PPP"),
          sessionTime: session.time,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to create Daily room or send confirmation email")
      }

      const { roomUrl } = await response.json()

      toast({
        title: "Booking Confirmed!",
        description: `You are booked for the meet & greet on ${format(session.date, "PPP")} at ${session.time}. A confirmation email with the video call link has been sent.`,
        variant: "success",
      })

      // Optionally, store the roomUrl in state or context to pass to DailyVideoCall
      // For now, we'll just trigger the onJoinCall which assumes a fixed room name
      onJoinCall()
    } catch (error: any) {
      toast({
        title: "Booking Failed",
        description: error.message || "There was an error confirming your booking. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsBooking(false)
    }
  }

  return (
    <div className="space-y-8">
      {/* Session Type Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="group" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Group Sessions
          </TabsTrigger>
          <TabsTrigger value="private" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Private Sessions
          </TabsTrigger>
        </TabsList>

        {/* Group Sessions Tab */}
        <TabsContent value="group" className="space-y-8">
          {/* User Information Form */}
          <Card className="border-electric-700/30 bg-background/50 backdrop-blur-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-electric-400">
                <Users className="h-5 w-5" />
                Your Information
              </CardTitle>
              <CardDescription>Please provide your details for the group meet & greet session</CardDescription>
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

          {/* Group Booking Summary */}
          {selectedDate && selectedTimeSlot && formData.name && formData.email && (
            <Card className="border-electric-700/30 bg-background/50 backdrop-blur-lg">
              <CardHeader>
                <CardTitle className="text-electric-400">Group Session Summary</CardTitle>
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
                  onClick={handleGroupBooking}
                  disabled={isBooking || !user}
                  className="w-full bg-gradient-electric hover:animate-electric-pulse"
                  size="lg"
                >
                  {isBooking ? "Booking..." : user ? "Confirm Group Session" : "Sign In to Book"}
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Private Sessions Tab */}
        <TabsContent value="private" className="space-y-8">
          {/* Private Session Options */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {privateSessions.map((session) => (
              <Card
                key={session.id}
                className={`cursor-pointer transition-all border-2 ${
                  selectedPrivateSession?.id === session.id
                    ? "border-electric-500 bg-electric-500/10"
                    : canBookTier(session.tierRequired)
                      ? "border-electric-700/30 hover:border-electric-500/50"
                      : "border-gray-700/30 opacity-50 cursor-not-allowed"
                }`}
                onClick={() => {
                  if (canBookTier(session.tierRequired)) {
                    setSelectedPrivateSession(session)
                  }
                }}
              >
                <CardHeader className="text-center">
                  <div className="flex justify-center mb-2">{getSessionIcon(session.type)}</div>
                  <CardTitle className="capitalize">{session.type} Session</CardTitle>
                  <CardDescription className="text-2xl font-bold text-electric-400">${session.price}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <Badge className="mb-2">{session.duration} minutes</Badge>
                    <div className="mb-2">{getTierBadge(session.tierRequired)}</div>
                  </div>
                  <p className="text-sm text-muted-foreground text-center">{session.description}</p>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>One-on-one with Kelvin</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Flexible scheduling</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Private & secure</span>
                    </div>
                    {session.type === "video" && (
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>Recording included</span>
                      </div>
                    )}
                  </div>

                  {!canBookTier(session.tierRequired) && (
                    <Badge variant="outline" className="w-full justify-center text-yellow-400 border-yellow-400/50">
                      Upgrade to {session.tierRequired} Required
                    </Badge>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Private Session Form */}
          {selectedPrivateSession && (
            <Card className="border-electric-700/30 bg-background/50 backdrop-blur-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-electric-400">
                  {getSessionIcon(selectedPrivateSession.type)}
                  Private {selectedPrivateSession.type.toUpperCase()} Session Details
                </CardTitle>
                <CardDescription>
                  Fill in your details for the private session. Kelvin will contact you within 24 hours to schedule.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="private-name">Full Name</Label>
                    <Input
                      id="private-name"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      placeholder="Enter your full name"
                      className="border-electric-700/30 bg-background/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="private-email">Email Address</Label>
                    <Input
                      id="private-email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder="Enter your email"
                      className="border-electric-700/30 bg-background/50"
                    />
                  </div>
                </div>

                {selectedPrivateSession.type === "whatsapp" && (
                  <div className="space-y-2">
                    <Label htmlFor="whatsapp">WhatsApp Number (with country code)</Label>
                    <Input
                      id="whatsapp"
                      value={formData.whatsappNumber}
                      onChange={(e) => handleInputChange("whatsappNumber", e.target.value)}
                      placeholder="+1 234 567 8900"
                      className="border-electric-700/30 bg-background/50"
                    />
                  </div>
                )}

                {selectedPrivateSession.type === "facetime" && (
                  <div className="space-y-2">
                    <Label htmlFor="appleid">Apple ID (Email or Phone)</Label>
                    <Input
                      id="appleid"
                      value={formData.appleId}
                      onChange={(e) => handleInputChange("appleId", e.target.value)}
                      placeholder="your.email@example.com or +1234567890"
                      className="border-electric-700/30 bg-background/50"
                    />
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="preferred-time">Preferred Time/Date</Label>
                  <Input
                    id="preferred-time"
                    value={formData.preferredTime}
                    onChange={(e) => handleInputChange("preferredTime", e.target.value)}
                    placeholder="e.g., Weekends, evenings, specific dates"
                    className="border-electric-700/30 bg-background/50"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="private-requests">Special Requests or Topics</Label>
                  <Textarea
                    id="private-requests"
                    value={formData.specialRequests}
                    onChange={(e) => handleInputChange("specialRequests", e.target.value)}
                    placeholder="What would you like to discuss with Kelvin? Any specific topics or questions?"
                    className="border-electric-700/30 bg-background/50"
                    rows={4}
                  />
                </div>

                <div className="p-4 rounded-lg bg-electric-500/10 border border-electric-500/30">
                  <h4 className="font-semibold mb-2">Session Summary:</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Type:</span>
                      <span className="ml-2 capitalize">{selectedPrivateSession.type}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Duration:</span>
                      <span className="ml-2">{selectedPrivateSession.duration} minutes</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Price:</span>
                      <span className="ml-2 font-semibold text-electric-400">${selectedPrivateSession.price}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Tier:</span>
                      <span className="ml-2 capitalize">{selectedPrivateSession.tierRequired}</span>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={handlePrivateBooking}
                  disabled={isBooking || !user}
                  className="w-full bg-gradient-electric hover:animate-electric-pulse"
                  size="lg"
                >
                  {isBooking
                    ? "Booking..."
                    : user
                      ? `Book ${selectedPrivateSession.type.toUpperCase()} Session - $${selectedPrivateSession.price}`
                      : "Sign In to Book"}
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
