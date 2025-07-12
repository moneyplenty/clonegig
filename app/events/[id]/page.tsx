import { EventDetails } from "@/components/events/event-details"
import { EventBooking } from "@/components/events/event-booking"
import { RelatedEvents } from "@/components/events/related-events"

interface EventPageProps {
  params: {
    id: string
  }
}

export default function EventPage({ params }: EventPageProps) {
  const eventId = Number.parseInt(params.id)

  // Mock data for a single event
  const event = {
    id: eventId,
    title: `Electrifying Live Show ${eventId}`,
    date: "October 26, 2024",
    time: "8:00 PM PST",
    location: "The Electric Venue, Los Angeles, CA",
    description: `Join Kelvin Creekman for an unforgettable live performance! This will be an electrifying night filled with new hits and fan favorites. Don't miss out on the most anticipated rock event of the year.`,
    image: "/placeholder.svg?height=400&width=600",
    price: 50.0,
    isPremium: eventId % 2 === 0, // Example: even IDs are premium
  }

  // Mock data for related events
  const relatedEvents = [
    {
      id: 101,
      title: "Acoustic Night with Kelvin",
      date: "November 10, 2024",
      location: "The Cozy Cafe",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 102,
      title: "Rockumentary Premiere",
      date: "December 1, 2024",
      location: "Local Cinema",
      image: "/placeholder.svg?height=200&width=300",
    },
  ]

  return (
    <div className="container mx-auto py-8">
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
          <EventDetails event={event} />
          <EventBooking event={event} />
        </div>
        <div className="md:col-span-1">
          <RelatedEvents events={relatedEvents} />
        </div>
      </div>
    </div>
  )
}
