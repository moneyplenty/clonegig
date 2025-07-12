import { Suspense } from "react"
import { notFound } from "next/navigation"
import { EventDetails } from "@/components/events/event-details"
import { EventBooking } from "@/components/events/event-booking"
import { RelatedEvents } from "@/components/events/related-events"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

interface EventPageProps {
  params: {
    id: string
  }
}

// Mock event data - in production, this would come from your database
const events = [
  {
    id: "1",
    title: "Exclusive Album Release Party",
    description: "Be the first to hear Kelvin's new album 'Fire & Ice' in an intimate setting with fellow fans.",
    longDescription:
      "Join Kelvin Creekman for an unforgettable evening celebrating the release of his highly anticipated album 'Fire & Ice'. This exclusive event will feature live acoustic performances of new tracks, behind-the-scenes stories about the album creation process, and a special Q&A session where you can ask Kelvin anything about his musical journey.\n\nThe evening will include:\n• Live acoustic performances of 5 new songs\n• Exclusive behind-the-scenes album stories\n• Interactive Q&A session\n• Meet & greet photo opportunities\n• Limited edition album signing\n• Complimentary refreshments\n\nThis is a once-in-a-lifetime opportunity to experience Kelvin's new music in an intimate setting before it's released to the world.",
    image: "/placeholder.svg?height=600&width=800",
    date: "2025-02-15",
    time: "19:00",
    endTime: "22:00",
    location: "The Diamond Club, New York",
    venue: {
      name: "The Diamond Club",
      address: "123 Music Row, New York, NY 10001",
      capacity: 150,
    },
    price: 89.99,
    memberPrice: 69.99,
    category: "concert",
    tierRequired: "frost",
    maxAttendees: 150,
    currentAttendees: 87,
    status: "upcoming",
    features: ["Live acoustic performance", "Meet & greet", "Album signing", "Q&A session", "Exclusive merchandise"],
  },
  {
    id: "2",
    title: "Virtual Meet & Greet Session",
    description: "Personal video chat session with Kelvin Creekman - limited to 20 fans only.",
    longDescription:
      "Get up close and personal with Kelvin in this exclusive virtual meet & greet session. Limited to just 20 fans, this intimate video call will give you the chance to have a real conversation with Kelvin, ask questions about his music, and share your own stories.\n\nWhat to expect:\n• 45-minute group video session\n• Personal interaction with Kelvin\n• Opportunity to ask questions\n• Share your fan stories\n• Exclusive behind-the-scenes insights\n• Digital autographed photo\n\nThis session is perfect for fans who want a more personal connection with Kelvin but can't attend in-person events.",
    image: "/placeholder.svg?height=600&width=800",
    date: "2025-02-08",
    time: "15:00",
    endTime: "15:45",
    location: "Online Video Call",
    venue: {
      name: "Zoom Meeting Room",
      address: "Virtual Event",
      capacity: 20,
    },
    price: 49.99,
    memberPrice: 29.99,
    category: "meet-greet",
    tierRequired: "frost",
    maxAttendees: 20,
    currentAttendees: 12,
    status: "upcoming",
    features: [
      "45-minute video session",
      "Personal interaction",
      "Q&A opportunity",
      "Digital autograph",
      "Recording access",
    ],
  },
]

export default function EventPage({ params }: EventPageProps) {
  const event = events.find((e) => e.id === params.id)

  if (!event) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4 py-8">
        <Suspense fallback={<EventDetailsSkeleton />}>
          <EventDetails event={event} />
        </Suspense>

        <div className="mt-8 grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Suspense fallback={<EventBookingSkeleton />}>
              <EventBooking event={event} />
            </Suspense>
          </div>

          <div>
            <Suspense fallback={<RelatedEventsSkeleton />}>
              <RelatedEvents currentEventId={event.id} />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  )
}

function EventDetailsSkeleton() {
  return (
    <Card className="border-electric-700/30 bg-background/50 backdrop-blur-lg">
      <CardContent className="p-8">
        <Skeleton className="h-64 w-full mb-6" />
        <Skeleton className="h-8 w-3/4 mb-4" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-2/3" />
      </CardContent>
    </Card>
  )
}

function EventBookingSkeleton() {
  return (
    <Card className="border-electric-700/30 bg-background/50 backdrop-blur-lg">
      <CardContent className="p-6">
        <Skeleton className="h-6 w-1/2 mb-4" />
        <Skeleton className="h-32 w-full mb-4" />
        <Skeleton className="h-12 w-full" />
      </CardContent>
    </Card>
  )
}

function RelatedEventsSkeleton() {
  return (
    <Card className="border-electric-700/30 bg-background/50 backdrop-blur-lg">
      <CardContent className="p-6">
        <Skeleton className="h-6 w-1/2 mb-4" />
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex gap-4">
              <Skeleton className="h-16 w-16" />
              <div className="flex-1">
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-3 w-2/3" />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export function generateStaticParams() {
  return events.map((event) => ({
    id: event.id,
  }))
}
