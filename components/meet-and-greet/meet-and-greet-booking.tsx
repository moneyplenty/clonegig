"use client"

import Link from "next/link"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"
import { supabase } from "@/lib/supabase/client" // Using client-side singleton
import { useAuth } from "@/components/auth/auth-provider" // Import useAuth

interface MeetAndGreetBookingProps {
  isSuperFan: boolean
  userId: string
}

export function MeetAndGreetBooking({ isSuperFan, userId }: MeetAndGreetBookingProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [selectedTime, setSelectedTime] = useState<string | undefined>(undefined)
  const [isBooking, setIsBooking] = useState(false)
  const { toast } = useToast()
  const { user } = useAuth() // Use the useAuth hook to get the current user

  // Dummy available times (in a real app, fetch from backend/database)
  const availableTimes = ["10:00 AM", "11:00 AM", "01:00 PM", "02:00 PM", "03:00 PM"]

  const handleBooking = async () => {
    if (!selectedDate || !selectedTime) {
      toast({
        title: "Missing Information",
        description: "Please select a date and time for your session.",
        variant: "destructive",
      })
      return
    }

    if (!user) {
      toast({
        title: "Authentication Required",
        description: "You must be logged in to book a session.",
        variant: "destructive",
      })
      return
    }

    setIsBooking(true)
    try {
      // Create a Daily.co room (this would typically be done on the server)
      const roomName = `meet-greet-${userId}-${Date.now()}`
      const dailyRoomResponse = await fetch("/api/create-daily-room", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ roomName }),
      })

      const dailyRoomData = await dailyRoomResponse.json()

      if (!dailyRoomResponse.ok) {
        throw new Error(dailyRoomData.error || "Failed to create Daily room.")
      }

      const roomUrl = dailyRoomData.url

      // Record booking in Supabase
      const { error } = await supabase.from("meet_and_greet_bookings").insert({
        user_id: userId,
        session_time: `${selectedDate.toISOString().split("T")[0]} ${selectedTime}`,
        session_type: isSuperFan ? "super_fan_session" : "fan_session",
        status: "confirmed",
        room_url: roomUrl,
        price: isSuperFan ? 0 : 100, // Super fans get it free, others pay
      })

      if (error) {
        throw new Error(error.message)
      }

      toast({
        title: "Booking Confirmed!",
        description: `Your Meet & Greet session is booked for ${format(selectedDate, "PPP")} at ${selectedTime}.`,
      })

      // Send confirmation email
      await fetch("/api/send-meetgreet-confirmation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          toEmail: user.email, // Use user.email from useAuth
          sessionDate: selectedDate.toISOString(),
          sessionTime: selectedTime,
          roomUrl: roomUrl,
        }),
      })

      setSelectedDate(undefined)
      setSelectedTime(undefined)
    } catch (error: any) {
      console.error("Error booking Meet & Greet:", error)
      toast({
        title: "Booking Error",
        description: error.message || "Could not book session. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsBooking(false)
    }
  }

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Book a Session</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="date">Select Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal mt-1",
                  !selectedDate && "text-muted-foreground",
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                initialFocus
                disabled={(date) => date < new Date()} // Disable past dates
              />
            </PopoverContent>
          </Popover>
        </div>
        <div>
          <Label htmlFor="time">Select Time</Label>
          <Select onValueChange={setSelectedTime} value={selectedTime}>
            <SelectTrigger className="w-full mt-1">
              <SelectValue placeholder="Select a time slot" />
            </SelectTrigger>
            <SelectContent>
              {availableTimes.map((time) => (
                <SelectItem key={time} value={time}>
                  {time}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button onClick={handleBooking} className="w-full" disabled={isBooking || !selectedDate || !selectedTime}>
          {isBooking ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Booking...
            </>
          ) : (
            `Book Session ${isSuperFan ? "(Free)" : "(Paid)"}`
          )}
        </Button>
        {!isSuperFan && (
          <p className="text-sm text-muted-foreground text-center">
            Super Fans get Meet & Greet sessions for free!{" "}
            <Link href="/join" className="underline">
              Upgrade your membership
            </Link>
            .
          </p>
        )}
      </CardContent>
    </Card>
  )
}
