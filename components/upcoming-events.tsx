"use client"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { format } from "date-fns"
import { Icons } from "@/components/icons"
import { createClient } from "@/lib/supabase/server"
import { cookies } from "next/headers"
import type { Event as EventType } from "@/types"

const mockEvents: EventType[] = [
  {
    id: "1",
    title: "Electric Storm Tour - NYC",
    description: "Experience Kelvin's most electrifying performance yet in the heart of New York City",
    date: "2024-02-15",
    time: "8:00 PM",
    location: "Madison Square Garden, New York",
    type: "concert",
    tierRequired: "public",
    price: 75,
    memberPrice: 60,
    capacity: 20000,
    registered: 18500,
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop",
    featured: true,
    imageUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop",
  },
  {
    id: "2",
    title: "Intimate Meet & Greet",
    description: "Personal conversation with Kelvin in a small group setting",
    date: "2024-02-10",
    time: "3:00 PM",
    location: "Private Studio, Los Angeles",
    type: "meetgreet",
    tierRequired: "blizzard",
    price: 200,
    memberPrice: 160,
    capacity: 15,
    registered: 12,
    image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=800&h=600&fit=crop",
    featured: false,
    imageUrl: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=800&h=600&fit=crop",
  },
  {
    id: "3",
    title: "Virtual Acoustic Session",
    description: "Exclusive acoustic performance streamed live to fan club members",
    date: "2024-02-08",
    time: "7:00 PM",
    location: "Virtual Event",
    type: "virtual",
    tierRequired: "frost",
    price: 25,
    memberPrice: 20,
    capacity: 1000,
    registered: 750,
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop",
    featured: false,
    imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop",
  },
  {
    id: "4",
    title: "VIP Backstage Experience",
    description: "Ultimate fan experience with backstage access and exclusive merchandise",
    date: "2024-02-20",
    time: "6:00 PM",
    location: "The Forum, Los Angeles",
    type: "vip",
    tierRequired: "avalanche",
    price: 500,
    memberPrice: 350,
    capacity: 50,
    registered: 45,
    image: "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=800&h=600&fit=crop",
    featured: true,
    imageUrl: "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=800&h=600&fit=crop",
  },
  {
    id: "5",
    title: "Chicago Rock Festival",
    description: "Kelvin headlines the biggest rock festival in the Midwest",
    date: "2024-03-01",
    time: "9:00 PM",
    location: "Grant Park, Chicago",
    type: "concert",
    tierRequired: "public",
    price: 85,
    memberPrice: 68,
    capacity: 50000,
    registered: 42000,
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop",
    featured: false,
    imageUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop",
  },
  {
    id: "6",
    title: "Songwriting Workshop",
    description: "Learn songwriting techniques directly from Kelvin in this interactive session",
    date: "2024-02-25",
    time: "2:00 PM",
    location: "Virtual Event",
    type: "virtual",
    tierRequired: "blizzard",
    price: 100,
    memberPrice: 80,
    capacity: 100,
    registered: 85,
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop",
    featured: false,
    imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop",
  },
]

const additionalEvents = [
  {
    id: "1",
    title: "Kelvin Creekman Live in Concert",
    date: "2024-10-26T20:00:00Z",
    location: "The Electric Venue, New York, NY",
    image: "/placeholder.png?height=200&width=300",
    ticketPrice: 75.0,
    isMeetGreet: false,
  },
  {
    id: "2",
    title: "Acoustic Set & Storytelling",
    date: "2024-11-10T18:00:00Z",
    location: "The Blue Note, Chicago, IL",
    image: "/placeholder.png?height=200&width=300",
    ticketPrice: 50.0,
    isMeetGreet: true,
  },
  {
    id: "3",
    title: "Album Release Party",
    date: "2024-12-05T19:00:00Z",
    location: "Online Stream",
    image: "/placeholder.png?height=200&width=300",
    ticketPrice: 20.0,
    isMeetGreet: false,
  },
]

const upcomingEvents = [
  {
    id: "4",
    title: "Electric Dreams Tour: New York",
    date: "2025-08-15T20:00:00Z",
    location: "Madison Square Garden, NYC",
    description: "Join Kelvin Creekman for an unforgettable night of rock and metal.",
    isMeetGreet: false,
  },
  {
    id: "5",
    title: "Exclusive Fan Meet & Greet",
    date: "2025-09-01T18:00:00Z",
    location: "Online (Virtual Session)",
    description: "A rare opportunity to chat live with Kelvin Creekman. Limited spots!",
    isMeetGreet: true,
  },
  {
    id: "6",
    title: "Album Launch Party: London",
    date: "2025-10-20T19:30:00Z",
    location: "O2 Arena, London",
    description: "Celebrate the launch of Kelvin's new album with a spectacular show.",
    isMeetGreet: false,
  },
]

export async function UpcomingEvents() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const { data: eventsFromSupabase, error } = await supabase
    .from("Event")
    .select("*")
    .order("date", { ascending: true })
    .limit(3) // Fetch up to 3 upcoming events

  if (error) {
    console.error("Error fetching upcoming events:", error)
    return <div>Error loading upcoming events.</div>
  }

  const events = [...mockEvents, ...additionalEvents, ...upcomingEvents, ...(eventsFromSupabase || [])]

  const getEventTypeIcon = (type: string) => {
    switch (type) {
      case "concert":
        return <Icons.calendar className="h-4 w-4" />
      case "meetgreet":
        return <Icons.mapPin className="h-4 w-4" />
      case "virtual":
        return <Icons.mapPin className="h-4 w-4" />
      case "vip":
        return <Icons.mapPin className="h-4 w-4" />
      default:
        return <Icons.calendar className="h-4 w-4" />
    }
  }

  const getTierBadge = (tier: string) => {
    switch (tier) {
      case "public":
        return <Badge variant="outline">Public</Badge>
      case "frost":
        return <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/50">Frost+</Badge>
      case "blizzard":
        return <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/50">Blizzard+</Badge>
      case "avalanche":
        return <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/50">Avalanche</Badge>
      default:
        return <Badge variant="outline">Public</Badge>
    }
  }

  const getTierIcon = (tier: string) => {
    switch (tier) {
      case "frost":
        return <Icons.mapPin className="h-3 w-3" />
      case "blizzard":
        return <Icons.mapPin className="h-3 w-3" />
      case "avalanche":
        return <Icons.mapPin className="h-3 w-3" />
      default:
        return null
    }
  }

  const getAvailabilityColor = (registered: number, capacity: number) => {
    const percentage = (registered / capacity) * 100
    if (percentage >= 90) return "text-red-500"
    if (percentage >= 70) return "text-yellow-500"
    return "text-green-500"
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return format(date, "MMM dd, yyyy")
  }

  // Sort events: featured first, then by date
  const sortedEvents = [...events].sort((a, b) => {
    if (a.featured && !b.featured) return -1
    if (!a.featured && b.featured) return 1
    return new Date(a.date).getTime() - new Date(b.date).getTime()
  })

  const nextEvent = sortedEvents.find((event) => new Date(event.date) > new Date())

  return (
    <section className="py-12 bg-kelvin-card text-kelvin-card-foreground">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-8">Upcoming Events</h2>
        <p className="text-lg text-kelvin-card-foreground/80 text-center max-w-3xl mx-auto mb-12">
          Don&apos;t miss out on Kelvin Creekman&apos;s live performances, virtual meet & greets, and special
          appearances.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedEvents.map((event) => (
            <Card key={event.id} className="bg-kelvin-background text-kelvin-foreground border-kelvin-border shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-semibold">{event.title}</CardTitle>
                <CardDescription className="text-kelvin-foreground/80">
                  <div className="flex items-center gap-1 mt-1">
                    <Icons.calendar className="w-4 h-4" />
                    {new Date(event.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </div>
                  <div className="flex items-center gap-1">
                    <Icons.clock className="w-4 h-4" />
                    {new Date(event.date).toLocaleTimeString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                  <div className="flex items-center gap-1">
                    <Icons.mapPin className="w-4 h-4" />
                    {event.location}
                  </div>
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <p className="text-kelvin-foreground/90 line-clamp-3">{event.description}</p>
                {event.capacity && event.registered && (
                  <div className="space-y-1 mb-4">
                    <div className="flex items-center justify-between text-xs">
                      <span>Availability</span>
                      <span className={getAvailabilityColor(event.registered, event.capacity)}>
                        {event.capacity - event.registered} left
                      </span>
                    </div>
                    <Progress value={(event.registered / event.capacity) * 100} className="h-1" />
                  </div>
                )}
                {event.memberPrice && event.price && (
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="font-bold text-electric-400">${event.memberPrice}</div>
                      {event.price !== event.memberPrice && (
                        <div className="text-xs text-muted-foreground line-through">${event.price}</div>
                      )}
                    </div>
                    <Button asChild size="sm" className="bg-gradient-electric">
                      <Link href={`/events/${event.id}`}>Book</Link>
                    </Button>
                  </div>
                )}
                {event.ticketPrice && (
                  <p className="text-xl font-bold mt-2 text-kelvin-foreground">${event.ticketPrice.toFixed(2)}</p>
                )}
                <Button asChild className="w-full bg-electric-500 hover:bg-electric-600 text-white">
                  <Link href={`/events/${event.id}`}>View Details</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="text-center mt-12">
          <Button asChild size="lg" className="bg-frost-500 hover:bg-frost-600 text-white">
            <Link href="/events">View All Events</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
