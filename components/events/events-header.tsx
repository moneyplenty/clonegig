import { Button } from "@/components/ui/button"
import Link from "next/link"

export function EventsHeader() {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center mb-8">
      <h1 className="text-4xl font-bold text-center md:text-left mb-4 md:mb-0">All Events</h1>
      <Link href="/meet-and-greet">
        <Button
          size="lg"
          className="bg-purple-600 hover:bg-purple-700 text-white text-lg px-8 py-3 rounded-full shadow-md"
        >
          Book a Meet & Greet
        </Button>
      </Link>
    </div>
  )
}
