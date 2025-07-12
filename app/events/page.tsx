import { Suspense } from "react"
import { EventsHeader } from "@/components/events/events-header"
import { EventsFilters } from "@/components/events/events-filters"
import { EventsGrid } from "@/components/events/events-grid"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

function EventsLoading() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i} className="overflow-hidden">
            <Skeleton className="h-48 w-full" />
            <CardContent className="p-4 space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default function EventsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <EventsHeader />

      <div className="mt-8 space-y-8">
        <EventsFilters />

        <Suspense fallback={<EventsLoading />}>
          <EventsGrid />
        </Suspense>
      </div>
    </div>
  )
}
