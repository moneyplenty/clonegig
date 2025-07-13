"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { format } from "date-fns"
import { CalendarIcon, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { useAuth } from "@/components/auth/auth-provider"
import { useToast } from "@/hooks/use-toast"
import { createClient } from "@/lib/supabase/client"
import type { MeetAndGreetSession } from "@/types"

export function MeetAndGreetBooking() {
  const { user, profile, loading: authLoading } = useAuth()
  const { toast } = useToast()
  const supabase = createClient()

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [selectedSession, setSelectedSession] = useState<MeetAndGreetSession | undefined>(undefined)
  const [isBooking, setIsBooking] = useState(false)

  // Dummy data for available sessions (replace with actual data from backend)
  const availableSessions: MeetAndGreetSession[] = [
    {
      id: "session-1",
      type: "private",
      date: "2025-08-15",
      time: "10:00 AM",
      duration: 30,
      price: 50.0,
      max_attendees: null,
      attendees_count: 0,
      created_at: new Date().toISOString(),
    },
    {
      id: "session-2",
      type: "private",
      date: "2025-08-15",
      time: "02:00 PM",
      duration: 30,
      price: 50.0,
      max_attendees: null,
      attendees_count: 0,
      created_at: new Date().toISOString(),
    },
    {
      id: "session-3",
      type: "private",
      date: "2025-08-16",
      time: "11:00 AM",
      duration: 30,
      price: 50.0,
      max_attendees: null,
      attendees_count: 0,
      created_at: new Date().toISOString(),
    },
  ]

  const filteredSessions = selectedDate
    ? availableSessions.filter((session) => session.date === format(selectedDate, "yyyy-MM-dd"))
    : []

  const handleBookPrivateSession = async () => {
    if (!user || !profile) {
      toast({
        title: "Authentication Required",
        description: "Please log in to book a session.",
        variant: "destructive",
      })
      return
    }

    if (!selectedSession) {
      toast({
        title: "No Session Selected",
        description: "Please select a date and time for your private session.",
        variant: "destructive",
      })
      return
    }

    setIsBooking(true)
    try {
      // Initiate Stripe checkout for the private session
      const response = await fetch("/api/stripe-checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: [
            {
              id: selectedSession.id,
              name: `Private Meet & Greet (${selectedSession.time})`,
              price: selectedSession.price,
              quantity: 1,
              type: "meet_and_greet", // Custom type for webhook
              session_id: selectedSession.id,
              user_id: user.id,
            },
          ],
          redirectUrl: `${window.location.origin}/meet-and-greet`, // Redirect back to this page
        }),
      })

      const data = await response.json()

      if (response.ok && data.url) {
        window.location.href = data.url
      } else {
        throw new Error(data.error || "Failed to initiate payment.")
      }
    } catch (error: any) {
      console.error("Stripe checkout error:", error)
      toast({
        title: "Payment Error",
        description: error.message || "There was an issue initiating your payment. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsBooking(false)
    }
  }

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-semibold text-secondary-foreground">Book a Private Session</h3>
      <p className="text-muted-foreground">Experience a one-on-one video call with Kelvin Creekman via Signal.</p>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label
            htmlFor="date"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Select Date
          </label>
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

        <div className="space-y-2">
          <label
            htmlFor="time"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Select Time
          </label>
          <Select
            onValueChange={(value) => setSelectedSession(availableSessions.find((s) => s.id === value))}
            value={selectedSession?.id}
            disabled={!selectedDate || filteredSessions.length === 0}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a time slot" />
            </SelectTrigger>
            <SelectContent>
              {filteredSessions.length > 0 ? (
                filteredSessions.map((session) => (
                  <SelectItem key={session.id} value={session.id}>
                    {session.time} ({session.duration} min) - ${session.price?.toFixed(2)}
                  </SelectItem>
                ))
              ) : (
                <SelectItem value="no-sessions" disabled>
                  No sessions available for this date
                </SelectItem>
              )}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button
        onClick={handleBookPrivateSession}
        className="w-full"
        disabled={!selectedSession || isBooking || authLoading || !user}
      >
        {isBooking ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Processing Payment...
          </>
        ) : (
          "Book Private Session (via Stripe)"
        )}
      </Button>

      {!user && <p className="text-sm text-center text-red-500">Please log in to book a session.</p>}
    </div>
  )
}
