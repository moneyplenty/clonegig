import { Suspense } from "react"
import { MeetAndGreetBooking } from "@/components/meet-and-greet/meet-and-greet-booking"
import { UpcomingSessions } from "@/components/meet-and-greet/upcoming-sessions"
import { DailyVideoCall } from "@/components/meet-and-greet/daily-video-call"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Video, Calendar, Users } from "lucide-react"

export default function MeetAndGreetPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-electric-400 to-frost-400 bg-clip-text text-transparent">
          Meet & Greet with Kelvin
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Get up close and personal with Kelvin Creekman through exclusive video sessions
        </p>
      </div>

      <Tabs defaultValue="book" className="max-w-4xl mx-auto">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="book" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Book Session
          </TabsTrigger>
          <TabsTrigger value="upcoming" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Upcoming
          </TabsTrigger>
          <TabsTrigger value="live" className="flex items-center gap-2">
            <Video className="h-4 w-4" />
            Live Session
          </TabsTrigger>
        </TabsList>

        <TabsContent value="book" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-electric-500" />
                Book Your Meet & Greet
              </CardTitle>
              <CardDescription>
                Choose from available time slots for your exclusive video session with Kelvin
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Suspense fallback={<div>Loading booking system...</div>}>
                <MeetAndGreetBooking />
              </Suspense>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="upcoming" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-frost-500" />
                Your Upcoming Sessions
              </CardTitle>
              <CardDescription>View and manage your scheduled meet & greet sessions</CardDescription>
            </CardHeader>
            <CardContent>
              <Suspense fallback={<div>Loading sessions...</div>}>
                <UpcomingSessions />
              </Suspense>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="live" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Video className="h-5 w-5 text-electric-500" />
                Live Video Session
              </CardTitle>
              <CardDescription>Join your scheduled video call with Kelvin Creekman</CardDescription>
            </CardHeader>
            <CardContent>
              <Suspense fallback={<div>Loading video call...</div>}>
                <DailyVideoCall />
              </Suspense>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
