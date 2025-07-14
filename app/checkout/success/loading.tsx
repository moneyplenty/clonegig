import { Skeleton } from "@/components/ui/skeleton"

export default function CheckoutSuccessLoading() {
  return (
    <div className="flex min-h-[calc(100vh-10rem)] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-6 text-center">
        <Skeleton className="mx-auto h-16 w-16 rounded-full" /> {/* Checkmark icon */}
        <Skeleton className="mx-auto h-8 w-64" /> {/* Title */}
        <Skeleton className="mx-auto h-6 w-48" /> {/* Description */}
        <div className="space-y-2">
          <Skeleton className="h-10 w-full" /> {/* Button 1 */}
          <Skeleton className="h-10 w-full" /> {/* Button 2 */}
        </div>
      </div>
    </div>
  )
}
