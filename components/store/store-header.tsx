import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"

export function StoreHeader() {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
      <div className="text-center md:text-left">
        <h1 className="text-4xl md:text-5xl font-bold text-kelvin-foreground mb-2">Merchandise Store</h1>
        <p className="text-lg text-kelvin-foreground/80">Official Kelvin Creekman gear, apparel, and collectibles.</p>
      </div>
      <div className="flex w-full max-w-md items-center space-x-2">
        <Input
          type="search"
          placeholder="Search products..."
          className="flex-1 bg-kelvin-card text-kelvin-card-foreground border-kelvin-border"
        />
        <Button type="submit" className="bg-electric-500 hover:bg-electric-600 text-white">
          <Icons.search className="h-5 w-5" />
          <span className="sr-only">Search</span>
        </Button>
      </div>
    </div>
  )
}
