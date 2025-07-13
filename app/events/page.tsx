import { EventsHeader } from "@/components/events/events-header"
import { EventsFilters } from "@/components/events/events-filters"
import { EventsGrid } from "@/components/events/events-grid"

export default function EventsPage() {
  const mockEvents = [
    {
      id: "1",
      title: "Kelvin Creekman Live in Concert",
      date: "2024-10-26T20:00:00Z",
      location: "The Electric Venue, New York, NY",
      image: "/placeholder.svg?height=200&width=300",
      ticketPrice: 75.0,
      isPremium: false,
    },
    {
      id: "2",
      title: "Acoustic Set & Storytelling",
      date: "2024-11-10T18:00:00Z",
      location: "The Blue Note, Chicago, IL",
      image: "/placeholder.svg?height=200&width=300",
      ticketPrice: 50.0,
      isPremium: true,
    },
    {
      id: "3",
      title: "Album Release Party",
      date: "2024-12-05T19:00:00Z",
      location: "Online Stream",
      image: "/placeholder.svg?height=200&width=300",
      ticketPrice: 20.0,
      isPremium: false,
    },
    {
      id: "4",
      title: "Meet & Greet: VIP Session",
      date: "2025-01-15T14:00:00Z",
      location: "Virtual (Zoom)",
      image: "/placeholder.svg?height=200&width=300",
      ticketPrice: 150.0,
      isPremium: true,
    },
    {
      id: "5",
      title: "Charity Gala Performance",
      date: "2025-02-20T19:30:00Z",
      location: "Grand Ballroom, Los Angeles, CA",
      image: "/placeholder.svg?height=200&width=300",
      ticketPrice: 100.0,
      isPremium: false,
    },
  ]

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <EventsHeader />
      <div className="flex flex-col md:flex-row gap-8">
        <EventsFilters />
        <EventsGrid events={mockEvents} />
      </div>
    </div>
  )
}
