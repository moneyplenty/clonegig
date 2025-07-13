"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Icons } from "@/components/icons"
import { toast } from "sonner"
import { createClient } from "@/lib/supabase/client"
import { useAuth } from "@/components/auth/auth-provider"
import { AdminVideoCall } from "./admin-video-call"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface MeetGreetBooking {
  id: string
  userId: string
  eventId: string
  sessionType: string
  status: string
  dailyRoomUrl: string | null
  scheduledAt: string
  duration: number
  price: number
  specialRequests: string | null
  contactInfo: any
  createdAt: string
  user: {
    email: string
  }
  event: {
    title: string
  }
}

export function AdminMeetGreetDashboard() {
  const [bookings, setBookings] = useState<MeetGreetBooking[]>([])
  const [loading, setLoading] = useState(true)
  const [activeCall, setActiveCall] = useState<string | null>(null)
  const { user } = useAuth()
  const supabase = createClient()

  useEffect(() => {
    fetchBookings()
  }, [])

  const fetchBookings = async () => {
    try {
      const { data, error } = await supabase
        .from("MeetGreetBooking")
        .select(`
          *,
          user:User(email),
          event:Event(title)
        `)
        .order("scheduledAt", { ascending: true })

      if (error) throw error
      setBookings(data || [])
    } catch (error: any) {
      console.error("Error fetching bookings:", error)
      toast.error("Failed to load bookings")
    } finally {
      setLoading(false)
    }
  }

  const createDailyRoom = async (bookingId: string) => {
    try {
      const response = await fetch("/api/admin/create-daily-room", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ bookingId }),
      })

      if (!response.ok) {
        throw new Error("Failed to create room")
      }

      const { roomUrl } = await response.json()

      // Update booking with room URL
      const { error } = await supabase.from("MeetGreetBooking").update({ dailyRoomUrl: roomUrl }).eq("id", bookingId)

      if (error) throw error

      toast.success("Video room created successfully")
      fetchBookings() // Refresh the list
    } catch (error: any) {
      console.error("Error creating room:", error)
      toast.error("Failed to create video room")
    }
  }

  const joinCall = async (bookingId: string, roomUrl: string) => {
    if (!user) return

    try {
      // Record admin session
      const { error } = await supabase.from("AdminSession").insert({
        adminId: user.id,
        meetGreetBookingId: bookingId,
      })

      if (error) throw error

      setActiveCall(roomUrl)
      toast.success("Joined the call")
    } catch (error: any) {
      console.error("Error joining call:", error)
      toast.error("Failed to join call")
    }
  }

  const sendSignal = async (bookingId: string, message: string) => {
    try {
      const response = await fetch("/api/admin/send-signal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ bookingId, message }),
      })

      if (!response.ok) {
        throw new Error("Failed to send signal")
      }

      toast.success("Signal sent to user")
    } catch (error: any) {
      console.error("Error sending signal:", error)
      toast.error("Failed to send signal")
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-blue-500/20 text-blue-400"
      case "completed":
        return "bg-green-500/20 text-green-400"
      case "cancelled":
        return "bg-red-500/20 text-red-400"
      default:
        return "bg-gray-500/20 text-gray-400"
    }
  }

  const getSessionTypeIcon = (type: string) => {
    switch (type) {
      case "group":
        return <Icons.users className="h-4 w-4" />
      case "private_whatsapp":
        return <Icons.messageCircle className="h-4 w-4" />
      case "private_facetime":
        return <Icons.phone className="h-4 w-4" />
      case "private_video":
        return <Icons.video className="h-4 w-4" />
      default:
        return <Icons.calendar className="h-4 w-4" />
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Icons.spinner className="h-8 w-8 animate-spin text-white" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="bookings" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="bookings">Active Bookings</TabsTrigger>
          <TabsTrigger value="video">Video Call</TabsTrigger>
        </TabsList>

        <TabsContent value="bookings" className="space-y-4">
          {bookings.length === 0 ? (
            <Card className="bg-slate-800/50 border-slate-700">
              <CardContent className="py-12 text-center">
                <Icons.calendar className="h-12 w-12 mx-auto mb-4 text-slate-400" />
                <p className="text-slate-300">No meet & greet bookings found</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {bookings.map((booking) => (
                <Card key={booking.id} className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2 text-white">
                        {getSessionTypeIcon(booking.sessionType)}
                        {booking.event.title}
                      </CardTitle>
                      <Badge className={getStatusColor(booking.status)}>{booking.status}</Badge>
                    </div>
                    <CardDescription className="text-slate-300">
                      {booking.user.email} • {new Date(booking.scheduledAt).toLocaleString()}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-slate-400">Type:</span>
                        <p className="text-white capitalize">{booking.sessionType.replace("_", " ")}</p>
                      </div>
                      <div>
                        <span className="text-slate-400">Duration:</span>
                        <p className="text-white">{booking.duration} minutes</p>
                      </div>
                      <div>
                        <span className="text-slate-400">Price:</span>
                        <p className="text-white">${booking.price}</p>
                      </div>
                      <div>
                        <span className="text-slate-400">Scheduled:</span>
                        <p className="text-white">{new Date(booking.scheduledAt).toLocaleDateString()}</p>
                      </div>
                    </div>

                    {booking.specialRequests && (
                      <div>
                        <span className="text-slate-400 text-sm">Special Requests:</span>
                        <p className="text-white text-sm mt-1">{booking.specialRequests}</p>
                      </div>
                    )}

                    {booking.contactInfo && (
                      <div>
                        <span className="text-slate-400 text-sm">Contact Info:</span>
                        <div className="text-white text-sm mt-1">
                          {booking.contactInfo.whatsappNumber && <p>WhatsApp: {booking.contactInfo.whatsappNumber}</p>}
                          {booking.contactInfo.appleId && <p>Apple ID: {booking.contactInfo.appleId}</p>}
                        </div>
                      </div>
                    )}

                    <div className="flex gap-2 flex-wrap">
                      {!booking.dailyRoomUrl ? (
                        <Button
                          onClick={() => createDailyRoom(booking.id)}
                          size="sm"
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          <Icons.video className="h-4 w-4 mr-2" />
                          Create Video Room
                        </Button>
                      ) : (
                        <Button
                          onClick={() => joinCall(booking.id, booking.dailyRoomUrl!)}
                          size="sm"
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <Icons.video className="h-4 w-4 mr-2" />
                          Join Call
                        </Button>
                      )}

                      <Button
                        onClick={() => sendSignal(booking.id, "Admin is ready to start the session")}
                        size="sm"
                        variant="outline"
                        className="border-purple-500 text-purple-400 hover:bg-purple-500/20"
                      >
                        <Icons.bell className="h-4 w-4 mr-2" />
                        Send Signal
                      </Button>

                      {booking.sessionType.includes("whatsapp") && booking.contactInfo?.whatsappNumber && (
                        <Button
                          onClick={() =>
                            window.open(`https://wa.me/${booking.contactInfo.whatsappNumber.replace(/\D/g, "")}`)
                          }
                          size="sm"
                          variant="outline"
                          className="border-green-500 text-green-400 hover:bg-green-500/20"
                        >
                          <Icons.messageCircle className="h-4 w-4 mr-2" />
                          WhatsApp
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="video">
          {activeCall ? (
            <AdminVideoCall roomUrl={activeCall} onLeave={() => setActiveCall(null)} />
          ) : (
            <Card className="bg-slate-800/50 border-slate-700">
              <CardContent className="py-12 text-center">
                <Icons.video className="h-12 w-12 mx-auto mb-4 text-slate-400" />
                <p className="text-slate-300">No active video call</p>
                <p className="text-slate-400 text-sm mt-2">Join a call from the bookings tab to start</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
