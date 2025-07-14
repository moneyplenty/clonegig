import { Button } from "@/components/ui/button"
import Link from "next/link"

export function StoreBanner() {
  return (
    <section className="relative overflow-hidden bg-primary py-12 text-primary-foreground md:py-20">
      <div className="container relative z-10 text-center">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
          Shop Official Creekman Merchandise
        </h1>
        <p className="mx-auto mt-4 max-w-[700px] text-lg md:text-xl">
          Discover exclusive apparel, accessories, and collectibles.
        </p>
        <Button asChild className="mt-8" variant="secondary" size="lg">
          <Link href="/store">Explore the Store</Link>
        </Button>
      </div>
      {/* Add some subtle background graphics or patterns here */}
      <div className="absolute inset-0 z-0 opacity-10">
        <svg className="h-full w-full" fill="none" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
          <defs>
            <pattern id="pattern-circles" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
              <circle cx="5" cy="5" r="1" fill="currentColor" />
            </pattern>
          </defs>
          <rect x="0" y="0" width="100%" height="100%" fill="url(#pattern-circles)" />
        </svg>
      </div>
    </section>
  )
}
