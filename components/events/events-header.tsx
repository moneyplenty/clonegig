import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

export function EventsHeader() {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
      <h1 className="text-4xl font-bold">Upcoming Events</h1>
      <div className="relative flex-1 md:flex-grow-0 md:w-1/3">
        <Input placeholder="Search events..." className="pl-8" />
        <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      </div>
    </div>
  )
}
