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
import { toast } from "sonner"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { format } from "date-fns"
import { DailyVideoCall } from "./daily-video-call"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import Link from "next/link"

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
  userId: string | null
  eventId: string
  eventTitle: string
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

export function MeetAndGreetBooking({ session, onJoinCall, userId, eventId, eventTitle }: MeetAndGreetBookingProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [selectedTime, setSelectedTime] = useState<string>("")
  const [loading, setLoading] = useState(false)
  const { user, userRole, loading: authLoading } = useAuth()
  const router = useRouter()
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
  const supabase = createClient()
  const [roomUrl, setRoomUrl] = useState<string | null>(null)
  const [requestDate, setRequestDate] = useState("")

  const availableTimes = ["10:00 AM", "11:00 AM", "01:00 PM", "02:00 PM", "03:00 PM"] // Mock times

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
    if (!selectedDate || !selectedTime || !user) {
      toast.error("Please select a date, time slot, and ensure you're logged in.")
      return
    }

    if (!formData.name || !formData.email) {
      toast.error("Please fill in your name and email address.")
      return
    }

    setIsBooking(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))

      const booking = {
        id: Math.random().toString(36).substr(2, 9),
        type: "group",
        date: selectedDate,
        timeSlot: selectedTime,
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
          sessionTime: selectedTime,
          sessionType: "Group Meet & Greet Video Call",
          specialRequests: formData.specialRequests,
        }),
      })

      toast.success(
        `Your meet & greet session is booked for ${selectedDate.toLocaleDateString()} at ${selectedTime}. Check your email for details!`,
      )

      setFormData({
        name: "",
        email: "",
        phone: "",
        whatsappNumber: "",
        appleId: "",
        specialRequests: "",
        preferredTime: "",
      })
      setSelectedTime("")
    } catch (error) {
      toast.error("There was an error booking your session. Please try again.")
    } finally {
      setIsBooking(false)
    }
  }

  const handlePrivateBooking = async () => {
    if (!selectedDate || !selectedTime || !user) {
      toast.error("Please select a date, time slot, and ensure you're logged in.")
      return
    }

    if (!formData.name || !formData.email) {
      toast.error("Please fill in your name and email address.")
      return
    }

    setIsBooking(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))

      const booking = {
        id: Math.random().toString(36).substr(2, 9),
        type: "private",
        date: selectedDate,
        timeSlot: selectedTime,
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
          sessionTime: selectedTime,
          sessionType: "Private Session",
          specialRequests: formData.specialRequests,
        }),
      })

      toast.success(
        `Your private session has been booked for ${selectedDate.toLocaleDateString()} at ${selectedTime}. Kelvin will contact you within 24 hours!`,
      )

      setFormData({
        name: "",
        email: "",
        phone: "",
        whatsappNumber: "",
        appleId: "",
        specialRequests: "",
        preferredTime: "",
      })
      setSelectedTime("")
    } catch (error) {
      toast.error("There was an error booking your session. Please try again.")
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
      toast.error("Please log in to book a meet & greet session.")
      router.push("/login")
      setIsBooking(false)
      return
    }

    if (session.isBooked || session.attendees >= session.maxAttendees) {
      toast.error("This session is already booked or full.")
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

      toast.success(
        `You are booked for the meet & greet on ${format(session.date, "PPP")} at ${session.time}. A confirmation email with the video call link has been sent.`,
      )

      // Optionally, store the roomUrl in state or context to pass to DailyVideoCall
      // For now, we'll just trigger the onJoinCall which assumes a fixed room name
      onJoinCall()
    } catch (error: any) {
      toast.error(error.message || "There was an error confirming your booking. Please try again.")
    } finally {
      setIsBooking(false)
    }
  }

  const handleBooking = async () => {
    if (authLoading) return

    if (!user) {
      toast.error("Please log in to book a meet & greet session.")
      router.push("/login")
      return
    }

    // Meet & Greet sessions are premium content
    if (userRole !== "premium" && userRole !== "admin") {
      toast.error("Meet & Greet sessions are exclusive to premium members. Please upgrade your membership.")
      router.push("/join") // Redirect to membership page
      return
    }

    if (!selectedDate || !selectedTime) {
      toast.error("Please select both a date and a time for your session.")
      return
    }

    setLoading(true)
    try {
      // Simulate API call for booking
      const response = await fetch("/api/send-meetgreet-confirmation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          date: selectedDate.toISOString().split("T")[0],
          time: selectedTime,
          userEmail: user.email,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to book session")
      }

      toast.success(
        `Your meet & greet session on ${format(selectedDate, "PPP")} at ${selectedTime} has been confirmed. A confirmation email has been sent.`,
      )
      setSelectedDate(undefined)
      setSelectedTime("")
    } catch (error: any) {
      toast.error(error.message || "There was an error processing your booking. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleRequestSession = async () => {
    if (!userId) {
      toast.error("You must be logged in to request a session.")
      router.push("/login")
      return
    }
    if (!requestDate) {
      toast.error("Please select a date and time for your session.")
      return
    }

    setLoading(true)
    try {
      // In a real application, this would submit a request to the admin
      // For now, we'll simulate a successful request.
      toast.success(
        `Meet & Greet session requested for ${new Date(requestDate).toLocaleString()}. Kelvin's team will review your request.`,
      )
      setRequestDate("") // Clear the input
    } catch (error) {
      console.error("Error requesting session:", error)
      toast.error("An unexpected error occurred while requesting your session.")
    } finally {
      setLoading(false)
    }
  }

  const handleBookSession = async () => {
    if (!user) {
      toast.error("You need to be logged in to book a Meet & Greet session.")
      router.push("/login")
      return
    }

    if (userRole !== "premium") {
      toast.error("Meet & Greet sessions are exclusive to Premium members. Please upgrade your membership.")
      router.push("/join")
      return
    }

    setLoading(true)
    try {
      // Simulate API call to book the session and get a Daily.co room URL
      // In a real app, this would be a server action or API route
      const response = await fetch("/api/create-daily-room", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ eventId, userId: user.id }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to create Daily.co room.")
      }

      const { roomUrl } = await response.json()

      toast.success(`Successfully booked session for ${eventTitle}!`)
      // Redirect user to the Daily.co room
      router.push(roomUrl)
    } catch (error: any) {
      console.error("Booking error:", error)
      toast.error(error.message || "Failed to book session. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const isBookable = !authLoading && user && userRole === "premium"

  return (
    <div className="space-y-8">
      {/* Session Type Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="group" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Group Sessions
          </TabsTrigger>
          <TabsTrigger value="private" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Private Sessions
          </TabsTrigger>
          <TabsTrigger value="request" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Request Session
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
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant={"outline"} className="w-full justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} initialFocus />
                  </PopoverContent>
                </Popover>
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
                  <Select value={selectedTime} onValueChange={setSelectedTime}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a time" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.map((slot) => (
                        <SelectItem
                          key={slot.id}
                          value={slot.time}
                          disabled={!slot.available || !canBookTier(slot.tierRequired)}
                        >
                          {slot.time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
          {selectedDate && selectedTime && formData.name && formData.email && (
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
                    <div className="font-semibold">{selectedTime}</div>
                    <div className="text-sm text-muted-foreground">Time</div>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-electric-500/10 border border-electric-500/30">
                    <Users className="h-8 w-8 mx-auto mb-2 text-electric-400" />
                    <div className="font-semibold">
                      {timeSlots.find((slot) => slot.time === selectedTime)?.currentParticipants + 1 || 0}/
                      {timeSlots.find((slot) => slot.time === selectedTime)?.maxParticipants || 0}
                    </div>
                    <div className="text-sm text-muted-foreground">Participants</div>
                  </div>
                </div>
                <Button
                  onClick={handleGroupBooking}
                  disabled={loading || authLoading || !user}
                  className="w-full bg-gradient-electric hover:animate-electric-pulse"
                  size="lg"
                >
                  {loading ? "Booking..." : user ? "Confirm Group Session" : "Sign In to Book"}
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
                  selectedTime === session.id
                    ? "border-electric-500 bg-electric-500/10"
                    : canBookTier(session.tierRequired)
                      ? "border-electric-700/30 hover:border-electric-500/50"
                      : "border-gray-700/30 opacity-50 cursor-not-allowed"
                }`}
                onClick={() => {
                  if (canBookTier(session.tierRequired)) {
                    setSelectedTime(session.id)
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
          {selectedTime && (
            <Card className="border-electric-700/30 bg-background/50 backdrop-blur-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-electric-400">
                  {getSessionIcon(selectedTime)}
                  Private Session Details
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

                {selectedTime === "whatsapp" && (
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

                {selectedTime === "facetime" && (
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
                      <span className="ml-2 capitalize">
                        {privateSessions.find((s) => s.id === selectedTime)?.type}
                      </span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Duration:</span>
                      <span className="ml-2">
                        {privateSessions.find((s) => s.id === selectedTime)?.duration} minutes
                      </span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Price:</span>
                      <span className="ml-2 font-semibold text-electric-400">
                        ${privateSessions.find((s) => s.id === selectedTime)?.price}
                      </span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Tier:</span>
                      <span className="ml-2 capitalize">
                        {privateSessions.find((s) => s.id === selectedTime)?.tierRequired}
                      </span>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={handlePrivateBooking}
                  disabled={loading || authLoading || !user}
                  className="w-full bg-gradient-electric hover:animate-electric-pulse"
                  size="lg"
                >
                  {loading
                    ? "Booking..."
                    : user
                      ? `Book ${privateSessions.find((s) => s.id === selectedTime)?.type.toUpperCase()} Session - $${privateSessions.find((s) => s.id === selectedTime)?.price}`
                      : "Sign In to Book"}
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Request Session Tab */}
        <TabsContent value="request" className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Request a New Meet & Greet Session</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Want to chat with Kelvin one-on-one? Request a private video session. Availability is limited and
                subject to approval.
              </p>
              <div>
                <Label htmlFor="session-date">Preferred Date & Time</Label>
                <Input
                  id="session-date"
                  type="datetime-local"
                  value={requestDate}
                  onChange={(e) => setRequestDate(e.target.value)}
                  disabled={loading || !userId}
                />
              </div>
              <Button onClick={handleRequestSession} className="w-full" disabled={loading || !userId}>
                {loading ? "Submitting Request..." : "Request Session"}
              </Button>
              {!userId && (
                <p className="text-center text-sm text-kelvin-card-foreground/70">
                  <Link href="/login" className="text-electric-400 hover:underline">
                    Log in
                  </Link>{" "}
                  to request a session.
                </p>
              )}
              {userId && userRole !== "premium" && !authLoading && (
                <p className="text-center text-sm text-kelvin-card-foreground/70">
                  This is a Premium-only feature.{" "}
                  <Link href="/join" className="text-electric-400 hover:underline">
                    Upgrade your membership
                  </Link>{" "}
                  to book.
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {roomUrl && (
        <div className="mt-4 p-4 border rounded-md bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-200">
          <p className="font-semibold mb-2">Your session is booked!</p>
          <p>You can join the call using this link:</p>
          <a
            href={roomUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline break-all"
          >
            {roomUrl}
          </a>
          <p className="mt-2">Please check your email for confirmation and the meeting link.</p>
          <div className="mt-4">
            <DailyVideoCall roomName={roomUrl.split("/").pop() || ""} userName={formData.name} />
          </div>
        </div>
      )}
    </div>
  )
}
