import { notFound } from "next/navigation"
import { EventDetails } from "@/components/events/event-details"
import { EventBooking } from "@/components/events/event-booking"
import { RelatedEvents } from "@/components/events/related-events"

// Mock event data - in production, this would come from your database
const mockEvents = [
  {
    id: "1",
    title: "Kelvin Creekman Live Concert",
    description: "Experience the electrifying performance of Kelvin Creekman in an intimate venue setting.",
    longDescription:
      'Join us for an unforgettable evening with rock sensation Kelvin Creekman. This exclusive concert features songs from his latest album "Frozen Thunder" plus fan favorites that have defined his career. The intimate venue setting ensures every seat has a perfect view of the stage.',
    date: "2024-02-15",
    time: "20:00",
    location: "The Electric Theater, Los Angeles",
    price: 75,
    memberPrice: 60,
    category: "Concert",
    tier: "Frost",
    maxAttendees: 500,
    currentAttendees: 342,
    image: "/placeholder.jpg",
    features: ["VIP Meet & Greet Option", "Exclusive Merchandise", "Professional Recording"],
    status: "upcoming",
  },
  {
    id: "2",
    title: "VIP Meet & Greet Session",
    description: "Personal meet and greet with Kelvin Creekman, including photo opportunities.",
    longDescription:
      "Get up close and personal with Kelvin Creekman in this exclusive VIP experience. Includes a 15-minute personal conversation, professional photo session, and signed merchandise.",
    date: "2024-02-20",
    time: "18:00",
    location: "Studio City, Los Angeles",
    price: 150,
    memberPrice: 120,
    category: "Meet & Greet",
    tier: "Blizzard",
    maxAttendees: 20,
    currentAttendees: 18,
    image: "/placeholder.jpg",
    features: ["15-min Personal Time", "Professional Photos", "Signed Merchandise", "Exclusive Access"],
    status: "upcoming",
  },
]

interface EventPageProps {
  params: {
    id: string
  }
}

export default function EventPage({ params }: EventPageProps) {
  const event = mockEvents.find((e) => e.id === params.id)

  if (!event) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <EventDetails event={event} />
          </div>
          <div className="lg:col-span-1">
            <EventBooking event={event} />
          </div>
        </div>

        <div className="mt-12">
          <RelatedEvents currentEventId={event.id} />
        </div>
      </div>
    </div>
  )
}
