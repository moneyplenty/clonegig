import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-kelvin-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-kelvin-card p-8 shadow-lg border border-kelvin-border">
        <Skeleton className="h-10 w-3/4 mx-auto mb-6" />
        <div className="space-y-4">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
        </div>
        <Skeleton className="h-10 w-full mt-8" />
      </div>
    </div>
  )
}
