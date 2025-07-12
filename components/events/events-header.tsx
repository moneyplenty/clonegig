import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

export function EventsHeader() {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
      <h1 className="text-4xl md:text-5xl font-bold text-center md:text-left">
        <span className="bg-gradient-to-r from-electric-400 to-frost-400 bg-clip-text text-transparent">
          Upcoming Events
        </span>
      </h1>
      <div className="relative w-full md:w-auto">
        <Input
          type="search"
          placeholder="Search events..."
          className="w-full md:w-64 pr-10 bg-background/50 border-electric-700 text-electric-100"
        />
        <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
      </div>
    </div>
  )
}
