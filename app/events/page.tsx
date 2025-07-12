import { EventsHeader } from "@/components/events/events-header"
import { EventsFilters } from "@/components/events/events-filters"
import { EventsGrid } from "@/components/events/events-grid"

export default function EventsPage() {
  const events = [
    {
      id: 1,
      title: "Electrifying Live Show - Los Angeles",
      date: "October 26, 2024",
      location: "The Electric Venue, Los Angeles, CA",
      image: "/placeholder.svg?height=200&width=300",
      isPremium: false,
    },
    {
      id: 2,
      title: "Exclusive Fan Q&A - Online",
      date: "November 15, 2024",
      location: "Online (Premium Members Only)",
      image: "/placeholder.svg?height=200&width=300",
      isPremium: true,
    },
    {
      id: 3,
      title: "Album Listening Party - New York",
      date: "December 10, 2024",
      location: "The Sonic Hall, New York, NY",
      image: "/placeholder.svg?height=200&width=300",
      isPremium: false,
    },
    {
      id: 4,
      title: "Meet & Greet - London",
      date: "January 20, 2025",
      location: "The Royal Arena, London, UK",
      image: "/placeholder.svg?height=200&width=300",
      isPremium: true,
    },
  ]

  return (
    <div className="container mx-auto py-8">
      <EventsHeader />
      <div className="flex flex-col md:flex-row gap-8">
        <EventsFilters />
        <EventsGrid events={events} />
      </div>
    </div>
  )
}
