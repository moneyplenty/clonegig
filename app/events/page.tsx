import { EventsHeader } from "@/components/events/events-header"
import { EventsFilters } from "@/components/events/events-filters"
import { EventsGrid } from "@/components/events/events-grid"

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
  {
    id: "5",
    title: "Virtual Concert: Frostbite Fury",
    date: "2025-12-05",
    time: "9:00 PM EST",
    location: "Online",
    description:
      "Experience Kelvin Creekman's 'Frostbite Fury' concert from the comfort of your home. A high-production virtual event with interactive elements.",
    imageUrl: "/placeholder.svg?height=400&width=600",
    price: 20.0,
    ticketsAvailable: 1000,
  },
  {
    id: "6",
    title: "Charity Stream for Music Education",
    date: "2026-01-15",
    time: "6:00 PM PST",
    location: "Online",
    description:
      "Join Kelvin for a special charity live stream to raise funds for music education programs. Expect rare acoustic performances and giveaways.",
    imageUrl: "/placeholder.svg?height=400&width=600",
    price: 0.0, // Free event, donations encouraged
    ticketsAvailable: 9999, // Essentially unlimited for a stream
  },
]

export default function EventsPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-24">
      <EventsHeader />
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <EventsFilters />
        </div>
        <div className="lg:col-span-3">
          <EventsGrid events={mockEvents} />
        </div>
      </div>
    </div>
  )
}
