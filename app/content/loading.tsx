import { Skeleton } from "@/components/ui/skeleton"

export default function ContentLoading() {
  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-10 w-full md:w-1/3" />
      </div>
      <div className="flex flex-col md:flex-row gap-8">
        <Skeleton className="w-full md:w-1/4 h-[300px] shrink-0" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 flex-1">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-64 w-full" />
          ))}
        </div>
      </div>
    </div>
  )
}
