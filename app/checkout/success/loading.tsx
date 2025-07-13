import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"

export default function CheckoutSuccessLoading() {
  return (
    <div className="flex min-h-[calc(100vh-14rem)] items-center justify-center py-12">
      <Card className="w-full max-w-md mx-auto text-center">
        <CardHeader>
          <CheckCircle className="mx-auto h-16 w-16 text-green-500 opacity-50 animate-pulse" />
          <CardTitle className="text-3xl font-bold mt-4">
            <Skeleton className="h-8 w-3/4 mx-auto" />
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6 mx-auto" />
          <div className="text-left border-t pt-4 mt-4 space-y-2">
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-4 w-2/3" />
          </div>
          <div className="flex flex-col gap-2">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
