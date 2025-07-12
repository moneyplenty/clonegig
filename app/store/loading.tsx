import { Skeleton } from "@/components/ui/skeleton"
import { StoreBanner } from "@/components/store/store-banner"

export default function StoreLoading() {
  return (
    <div className="flex flex-col min-h-screen">
      <StoreBanner />
      <main className="flex-1 container mx-auto py-8 px-4">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 mb-8">
          <Skeleton className="h-10 w-64" />
          <div className="flex items-center space-x-4 w-full md:w-auto">
            <Skeleton className="h-10 flex-1" />
            <Skeleton className="h-10 w-10 rounded-md" />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="flex flex-col space-y-3">
              <Skeleton className="h-[200px] w-full rounded-lg" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
              <div className="flex justify-between items-center">
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-10 w-24" />
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
