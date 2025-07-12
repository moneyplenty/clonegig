import Link from "next/link"
import { Button } from "@/components/ui/button"
import { EventDetails } from "@/components/events/event-details"
import { EventBooking } from "@/components/events/event-booking"
import { RelatedEvents } from "@/components/events/related-events"

interface Event {
  id: string
  title: string
  date: string
  time: string
  location: string
  description: string
  imageUrl: string
  price: number
  ticketsAvailable: number
}

const mockEvents: Event[] = [
  {
    id: "1",
    title: "Ice Storm Album Launch Party",
    date: "2025-08-15",
    time: "7:00 PM",
    location: "The Electric Venue, New York",
    description:
      "Join Kelvin Creekman for an electrifying night celebrating the launch of his new album, 'Ice Storm'. Expect live performances, special guests, and exclusive merchandise.",
    imageUrl: "/placeholder.svg?height=400&width=600",
    price: 50.0,
    ticketsAvailable: 150,
  },
  {
    id: "2",
    title: "Acoustic Set & Q&A",
    date: "2025-09-01",
    time: "3:00 PM",
    location: "The Frosty Lounge, Los Angeles",
    description:
      "An intimate acoustic performance followed by a Q&A session with Kelvin. A rare chance to hear his hits unplugged and ask your burning questions.",
    imageUrl: "/placeholder.svg?height=400&width=600",
    price: 35.0,
    ticketsAvailable: 50,
  },
  {
    id: "3",
    title: "Winter's Embrace Tour - London",
    date: "2025-10-20",
    time: "8:00 PM",
    location: "O2 Academy, London",
    description:
      "Kelvin Creekman brings the 'Winter's Embrace' tour to London! Prepare for a full-throttle rock experience with new tracks and fan favorites.",
    imageUrl: "/placeholder.svg?height=400&width=600",
    price: 65.0,
    ticketsAvailable: 300,
  },
  {
    id: "4",
    title: "Fan Meetup & Signing Session",
    date: "2025-11-10",
    time: "1:00 PM",
    location: "Metalhead Comics, Berlin",
    description:
      "Meet Kelvin, get autographs, and take photos at this exclusive fan meetup. Limited entry, so arrive early!",
    imageUrl: "/placeholder.svg?height=400&width=600",
    price: 0.0, // Free event
    ticketsAvailable: 200,
  },
]

export default function EventDetailPage({ params }: { params: { id: string } }) {
  const event = mockEvents.find((e) => e.id === params.id)

  if (!event) {
    return (
      <div className="flex min-h-[calc(100vh-64px)] flex-col items-center justify-center p-4 text-center">
        <h2 className="text-3xl font-bold text-electric-100 mb-4">Event Not Found</h2>
        <p className="text-muted-foreground mb-8">
          The event you are looking for does not exist or has been cancelled.
        </p>
        <Button asChild className="bg-gradient-electric hover:animate-electric-pulse">
          <Link href="/events">View All Events</Link>
        </Button>
      </div>
    )
  }

  const relatedEvents = mockEvents.filter((e) => e.id !== params.id).slice(0, 2) // Show up to 2 related events

  return (
    <div className="container mx-auto px-4 py-12 md:py-24">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <EventDetails event={event} />
        </div>
        <div className="lg:col-span-1">
          <EventBooking event={event} />
        </div>
      </div>
      {relatedEvents.length > 0 && (
        <div className="mt-24">
          <RelatedEvents events={relatedEvents} />
        </div>
      )}
    </div>
  )
}
