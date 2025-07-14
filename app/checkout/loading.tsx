import { Skeleton } from "@/components/ui/skeleton"

export default function CheckoutLoading() {
  return (
    <div className="container grid gap-6 py-12 md:grid-cols-2 lg:gap-12">
      {/* Cart Summary Skeleton */}
      <div className="space-y-4">
        <Skeleton className="h-8 w-48" /> {/* Title */}
        <div className="space-y-2">
          <Skeleton className="h-20 w-full" /> {/* Item 1 */}
          <Skeleton className="h-20 w-full" /> {/* Item 2 */}
          <Skeleton className="h-20 w-full" /> {/* Item 3 */}
        </div>
        <Skeleton className="h-6 w-32 ml-auto" /> {/* Total */}
      </div>

      {/* Checkout Form Skeleton */}
      <div className="space-y-6">
        <Skeleton className="h-8 w-64" /> {/* Title */}
        <div className="space-y-4">
          <Skeleton className="h-10 w-full" /> {/* Email */}
          <Skeleton className="h-10 w-full" /> {/* Name */}
          <Skeleton className="h-10 w-full" /> {/* Address Line 1 */}
          <Skeleton className="h-10 w-full" /> {/* Address Line 2 */}
          <div className="grid grid-cols-2 gap-4">
            <Skeleton className="h-10 w-full" /> {/* City */}
            <Skeleton className="h-10 w-full" /> {/* State */}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Skeleton className="h-10 w-full" /> {/* Zip */}
            <Skeleton className="h-10 w-full" /> {/* Country */}
          </div>
          <Skeleton className="h-10 w-full" /> {/* Card Number */}
          <div className="grid grid-cols-2 gap-4">
            <Skeleton className="h-10 w-full" /> {/* Expiry */}
            <Skeleton className="h-10 w-full" /> {/* CVC */}
          </div>
        </div>
        <Skeleton className="h-12 w-full" /> {/* Place Order Button */}
      </div>
    </div>
  )
}
