"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { CalendarIcon, Loader2 } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/hooks/use-toast"
import { createClient } from "@/lib/supabase/client"

interface MeetAndGreetBookingProps {
  userId: string
}

export function MeetAndGreetBooking({ userId }: MeetAndGreetBookingProps) {
  const supabase = createClient()
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [selectedTime, setSelectedTime] = useState<string | undefined>(undefined)
  const [selectedType, setSelectedType] = useState<string | undefined>(undefined)
  const [loading, setLoading] = useState(false)

  const availableTimes = [
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "01:00 PM",
    "01:30 PM",
    "02:00 PM",
    "02:30 PM",
    "03:00 PM",
    "03:30 PM",
    "04:00 PM",
    "04:30 PM",
  ]

  const sessionTypes = [
    { value: "15-min-chat", label: "15-min Chat ($50)", price: 50 },
    { value: "30-min-qa", label: "30-min Q&A ($90)", price: 90 },
    { value: "60-min-masterclass", label: "60-min Masterclass ($150)", price: 150 },
  ]

  const handleBooking = async () => {
    if (!selectedDate || !selectedTime || !selectedType) {
      toast({
        title: "Missing Information",
        description: "Please select a date, time, and session type.",
        variant: "destructive",
      })
      return
    }

    setLoading(true)
    const sessionPrice = sessionTypes.find((type) => type.value === selectedType)?.price || 0
    const sessionDateTime = new Date(selectedDate)
    const [time, ampm] = selectedTime.split(" ")
    let [hours, minutes] = time.split(":").map(Number)

    if (ampm === "PM" && hours !== 12) {
      hours += 12
    }
    if (ampm === "AM" && hours === 12) {
      hours = 0
    }

    sessionDateTime.setHours(hours, minutes, 0, 0)

    const { error } = await supabase.from("meet_and_greet_bookings").insert({
      user_id: userId,
      session_time: sessionDateTime.toISOString(),
      session_type: selectedType,
      status: "pending", // Admin will confirm later
      price: sessionPrice,
    })

    if (error) {
      console.error("Error booking session:", error)
      toast({
        title: "Booking Failed",
        description: `There was an error booking your session: ${error.message}`,
        variant: "destructive",
      })
    } else {
      toast({
        title: "Booking Confirmed!",
        description: "Your session request has been sent. Please await confirmation.",
      })
      // Optionally clear form or redirect
      setSelectedDate(new Date())
      setSelectedTime(undefined)
      setSelectedType(undefined)
    }
    setLoading(false)
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Book a Session</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-2">Select Date</h3>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn("w-full justify-start text-left font-normal", !selectedDate && "text-muted-foreground")}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} initialFocus />
            </PopoverContent>
          </Popover>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Select Time</h3>
          <Select onValueChange={setSelectedTime} value={selectedTime}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Choose a time slot" />
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

        <div>
          <h3 className="text-lg font-semibold mb-2">Select Session Type</h3>
          <Select onValueChange={setSelectedType} value={selectedType}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Choose a session type" />
            </SelectTrigger>
            <SelectContent>
              {sessionTypes.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button
          onClick={handleBooking}
          className="w-full"
          disabled={loading || !selectedDate || !selectedTime || !selectedType}
        >
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Book Session
        </Button>
      </CardContent>
    </Card>
  )
}
