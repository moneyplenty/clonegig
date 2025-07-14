import { Skeleton } from "@/components/ui/skeleton"

export default function StoreLoading() {
  return (
    <div className="container py-12 md:py-24">
      <div className="mb-8 space-y-4 text-center">
        <Skeleton className="mx-auto h-10 w-64" /> {/* Header Title */}
        <Skeleton className="mx-auto h-6 w-96" /> {/* Header Description */}
      </div>
      <Skeleton className="mx-auto h-10 w-full max-w-md" /> {/* Search Bar */}
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="space-y-4">
            <Skeleton className="aspect-square w-full rounded-md" /> {/* Product Image */}
            <Skeleton className="h-6 w-3/4" /> {/* Product Name */}
            <Skeleton className="h-4 w-1/2" /> {/* Product Price */}
            <Skeleton className="h-10 w-full" /> {/* Add to Cart Button */}
          </div>
        ))}
      </div>
    </div>
  )
}
