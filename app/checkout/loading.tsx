import { Loader2 } from "lucide-react"

export default function CheckoutLoading() {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
      <Loader2 className="h-8 w-8 animate-spin" />
      <span className="sr-only">Loading...</span>
    </div>
  )
}
