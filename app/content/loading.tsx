import { Skeleton } from "@/components/ui/skeleton"

export default function ContentLoading() {
  return (
    <div className="container py-12 md:py-24">
      <div className="mb-8 space-y-4">
        <Skeleton className="h-10 w-64" /> {/* Title */}
        <Skeleton className="h-6 w-96" /> {/* Description */}
      </div>

      <div className="mb-8 flex flex-wrap gap-2">
        <Skeleton className="h-9 w-24" /> {/* Filter 1 */}
        <Skeleton className="h-9 w-24" /> {/* Filter 2 */}
        <Skeleton className="h-9 w-24" /> {/* Filter 3 */}
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="space-y-4">
            <Skeleton className="aspect-video w-full rounded-md" /> {/* Content thumbnail */}
            <Skeleton className="h-6 w-3/4" /> {/* Content title */}
            <Skeleton className="h-4 w-1/2" /> {/* Content type/access level */}
            <Skeleton className="h-4 w-full" /> {/* Content description line 1 */}
            <Skeleton className="h-4 w-5/6" /> {/* Content description line 2 */}
          </div>
        ))}
      </div>
    </div>
  )
}
