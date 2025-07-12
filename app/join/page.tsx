import { MembershipTiers } from "@/components/membership-tiers"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function JoinPage() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-purple-700 to-indigo-700 text-white text-center">
          <div className="container px-4 md:px-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight mb-4">
              Become a Part of the Inner Circle
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
              Unlock exclusive access, connect with Kelvin, and get the ultimate fan experience by choosing your
              membership tier.
            </p>
            <Link href="/signup">
              <Button
                size="lg"
                className="bg-white text-purple-700 hover:bg-gray-100 hover:text-purple-800 text-lg px-8 py-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                Get Started
              </Button>
            </Link>
          </div>
        </section>
        <MembershipTiers />
      </main>
    </div>
  )
}
