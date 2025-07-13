import { EventDetails } from "@/components/events/event-details"
import { EventBooking } from "@/components/events/event-booking"
import { RelatedEvents } from "@/components/events/related-events"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

interface EventPageProps {
  params: {
    id: string
  }
}

export default function EventPage({ params }: EventPageProps) {
  // In a real application, you would fetch event data based on params.id
  const mockEvent = {
    id: params.id,
    title: "Kelvin Creekman Live in Concert",
    date: "2024-10-26T20:00:00Z",
    location: "The Electric Venue, New York, NY",
    description:
      "Join Kelvin Creekman for an electrifying live performance featuring hits from 'Electric Dreams' and classic fan favorites. This is a night you won't want to miss!",
    image: "/placeholder.svg?height=400&width=800",
    ticketPrice: 75.0,
    isPremium: false,
    relatedEvents: [
      {
        id: "2",
        title: "Acoustic Set & Storytelling",
        date: "2024-11-10",
        location: "The Blue Note, Chicago, IL",
        image: "/placeholder.svg?height=200&width=300",
      },
      {
        id: "3",
        title: "Album Release Party",
        date: "2024-12-05",
        location: "Online Stream",
        image: "/placeholder.svg?height=200&width=300",
      },
    ],
  }

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <EventDetails event={mockEvent} />
          <Card className="bg-card/50 backdrop-blur-sm border-kelvin-border">
            <CardHeader>
              <CardTitle>Book Your Tickets</CardTitle>
              <CardDescription>Secure your spot for this unforgettable event.</CardDescription>
            </CardHeader>
            <CardContent>
              <EventBooking event={mockEvent} />
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-1">
          <RelatedEvents events={mockEvent.relatedEvents} />
        </div>
      </div>
    </div>
  )
}
