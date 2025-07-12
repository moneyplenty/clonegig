import { Skeleton } from "@/components/ui/skeleton"

export default function CheckoutLoading() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-24">
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-12">
        <span className="bg-gradient-to-r from-electric-400 to-frost-400 bg-clip-text text-transparent">Checkout</span>
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Shipping Information Skeleton */}
        <div className="lg:col-span-2 space-y-6">
          <Skeleton className="h-10 w-48" /> {/* Title */}
          <div className="grid gap-4">
            <Skeleton className="h-10 w-full" /> {/* Full Name */}
            <Skeleton className="h-10 w-full" /> {/* Address */}
            <div className="grid grid-cols-2 gap-4">
              <Skeleton className="h-10 w-full" /> {/* City */}
              <Skeleton className="h-10 w-full" /> {/* Zip Code */}
            </div>
            <Skeleton className="h-10 w-full" /> {/* Country */}
          </div>
        </div>

        {/* Order Summary & Payment Skeleton */}
        <div className="lg:col-span-1 space-y-6">
          <Skeleton className="h-10 w-48" /> {/* Title */}
          <div className="grid gap-4">
            <Skeleton className="h-6 w-full" /> {/* Item 1 */}
            <Skeleton className="h-6 w-full" /> {/* Item 2 */}
            <Skeleton className="h-1 w-full" /> {/* Separator */}
            <Skeleton className="h-8 w-full" /> {/* Total */}
          </div>
          <Skeleton className="h-8 w-56 mt-6" /> {/* Payment Info Title */}
          <div className="grid gap-4">
            <Skeleton className="h-10 w-full" /> {/* Card Number */}
            <div className="grid grid-cols-2 gap-4">
              <Skeleton className="h-10 w-full" /> {/* Expiry Date */}
              <Skeleton className="h-10 w-full" /> {/* CVV */}
            </div>
          </div>
          <Skeleton className="h-12 w-full mt-6" /> {/* Place Order Button */}
        </div>
      </div>
    </div>
  )
}
