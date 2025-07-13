import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Star } from "lucide-react"

export function SuperFans() {
  return (
    <section className="py-12 md:py-20 bg-gradient-to-br from-yellow-400 to-orange-500 text-white">
      <div className="container mx-auto px-4 text-center">
        <Star className="h-16 w-16 mx-auto mb-6 text-yellow-200" fill="currentColor" />
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Become a Super Fan!</h2>
        <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
          Unlock the highest tier of exclusive access, personalized experiences, and VIP perks.
        </p>
        <Link href="/join">
          <Button
            size="lg"
            className="bg-white text-orange-600 hover:bg-gray-100 text-lg px-8 py-3 rounded-full shadow-lg transition-transform transform hover:scale-105"
          >
            Upgrade to VIP
          </Button>
        </Link>
      </div>
    </section>
  )
}
