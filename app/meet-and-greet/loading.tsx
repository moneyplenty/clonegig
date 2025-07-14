import { Skeleton } from "@/components/ui/skeleton"

export default function MeetAndGreetLoading() {
  return (
    <div className="container py-12 md:py-24">
      <div className="mb-8 space-y-4">
        <Skeleton className="h-10 w-64" /> {/* Header Title */}
        <Skeleton className="h-6 w-96" /> {/* Header Description */}
      </div>

      <div className="mb-8 flex flex-wrap gap-2">
        <Skeleton className="h-9 w-24" /> {/* Filter 1 */}
        <Skeleton className="h-9 w-24" /> {/* Filter 2 */}
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="space-y-4">
            <Skeleton className="h-6 w-3/4" /> {/* Session title */}
            <Skeleton className="h-4 w-1/2" /> {/* Session date/time */}
            <Skeleton className="h-4 w-full" /> {/* Session description line 1 */}
            <Skeleton className="h-4 w-5/6" /> {/* Session description line 2 */}
            <Skeleton className="h-10 w-full" /> {/* Button */}
          </div>
        ))}
      </div>

      <div className="mt-12 space-y-4">
        <Skeleton className="h-8 w-56" /> {/* Upcoming Sessions Title */}
        <div className="space-y-2">
          <Skeleton className="h-16 w-full" /> {/* Upcoming Session 1 */}
          <Skeleton className="h-16 w-full" /> {/* Upcoming Session 2 */}
        </div>
      </div>
    </div>
  )
}
