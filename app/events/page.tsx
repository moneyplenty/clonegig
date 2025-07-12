import { Suspense } from "react"
import { EventsHeader } from "@/components/events/events-header"
import { EventsGrid } from "@/components/events/events-grid"
import { EventsFilters } from "@/components/events/events-filters"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function EventsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4 py-8">
        <EventsHeader />

        <div className="mt-8 space-y-8">
          <Suspense fallback={<EventsFiltersSkeleton />}>
            <EventsFilters />
          </Suspense>

          <Suspense fallback={<EventsGridSkeleton />}>
            <EventsGrid />
          </Suspense>
        </div>
      </div>
    </div>
  )
}

function EventsFiltersSkeleton() {
  return (
    <Card className="border-electric-700/30 bg-background/50 backdrop-blur-lg">
      <CardContent className="p-6">
        <div className="flex gap-4">
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-10 w-32" />
        </div>
      </CardContent>
    </Card>
  )
}

function EventsGridSkeleton() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <Card key={i} className="border-electric-700/30 bg-background/50 backdrop-blur-lg">
          <CardContent className="p-6">
            <Skeleton className="h-48 w-full mb-4" />
            <Skeleton className="h-6 w-3/4 mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-2/3" />
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
