"use client"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CalendarDays, MapPin, DollarSign } from "lucide-react"
import { format } from "date-fns"

interface Event {
  id: string
  title: string
  description: string
  date: string
  time: string
  location: string
  type: "concert" | "meetgreet" | "virtual" | "vip"
  tierRequired: "public" | "frost" | "blizzard" | "avalanche"
  price: number
  memberPrice: number
  capacity: number
  registered: number
  image: string
  featured: boolean
  imageUrl: string
  ticketsAvailable: number
}

interface EventsGridProps {
  events: Event[]
}

const mockEvents: Event[] = [
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
    ticketsAvailable: 1450,
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
    ticketsAvailable: 3,
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
    ticketsAvailable: 250,
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
    image: "https://images.unsplash.com/photo-1540039155733-1cb2f99b2d8b?w=800&h=600&fit=crop",
    featured: true,
    imageUrl: "https://images.unsplash.com/photo-1540039155733-1cb2f99b2d8b?w=800&h=600&fit=crop",
    ticketsAvailable: 5,
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
    ticketsAvailable: 8000,
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
    ticketsAvailable: 15,
  },
]

export function EventsGrid({ events }: EventsGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {events.map((event) => (
        <Card
          key={event.id}
          className="group bg-background/50 backdrop-blur-lg border-electric-700/30 hover:border-electric-500/50 transition-all duration-300 hover:scale-105 overflow-hidden"
        >
          <div className="relative aspect-video overflow-hidden">
            <Image
              src={event.imageUrl || "/placeholder.svg"}
              alt={event.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
            />
          </div>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg leading-tight text-electric-100">{event.title}</CardTitle>
            <CardDescription className="line-clamp-2 text-muted-foreground">{event.description}</CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex items-center gap-2 text-sm text-electric-200 mb-2">
              <CalendarDays className="h-4 w-4 text-frost-400" />
              {format(new Date(event.date), "MMM dd, yyyy")} at {event.time}
            </div>
            <div className="flex items-center gap-2 text-sm text-electric-200">
              <MapPin className="h-4 w-4 text-frost-400" />
              {event.location}
            </div>
            <div className="flex items-center gap-2 text-sm text-electric-200 mt-2">
              <DollarSign className="h-4 w-4 text-frost-400" />
              {event.price === 0 ? "Free" : `$${event.price.toFixed(2)}`}
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full bg-gradient-electric hover:animate-electric-pulse">
              <Link href={`/events/${event.id}`}>View Details</Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
