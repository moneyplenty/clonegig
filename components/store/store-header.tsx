import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

export function StoreHeader() {
  return (
    <section className="container space-y-6 py-12 md:py-24">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">The Official Store</h1>
        <p className="mx-auto mt-4 max-w-[700px] text-lg text-muted-foreground md:text-xl">
          Browse all our exclusive merchandise.
        </p>
      </div>
      <div className="relative mx-auto max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input placeholder="Search products..." className="pl-9" />
      </div>
    </section>
  )
}
