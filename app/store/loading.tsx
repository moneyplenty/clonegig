import { Skeleton } from "@/components/ui/skeleton"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

export default function StoreLoading() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-24">
      <Skeleton className="h-24 w-full rounded-lg mb-12" /> {/* Store Banner */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
        <Skeleton className="h-12 w-64" /> {/* Header Title */}
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative flex-1 md:flex-none">
            <Input
              type="search"
              placeholder="Search merchandise..."
              className="w-full md:w-64 pr-10 bg-background/50 border-electric-700 text-electric-100"
              disabled
            />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          </div>
          <Skeleton className="h-10 w-10 rounded-md" /> {/* Cart Button */}
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="space-y-4">
            <Skeleton className="aspect-square w-full rounded-lg" />
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-10 w-full" />
          </div>
        ))}
      </div>
    </div>
  )
}
