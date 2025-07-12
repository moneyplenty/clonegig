import { MembershipTiers } from "@/components/membership-tiers"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function JoinPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-24">
      <section className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="bg-gradient-to-r from-electric-400 to-frost-400 bg-clip-text text-transparent">
            Join the Kelvin Creekman Fan Club
          </span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Become a part of the Ice Legion and unlock exclusive access to content, merchandise, events, and more!
        </p>
      </section>

      <MembershipTiers />

      <section className="mt-24 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          <span className="bg-gradient-to-r from-frost-400 to-electric-400 bg-clip-text text-transparent">
            Ready to Join?
          </span>
        </h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
          Choose your tier and start your journey with the Ice Legion today.
        </p>
        <Button asChild size="lg" className="bg-gradient-electric hover:animate-electric-pulse">
          <Link href="/signup">Sign Up Now</Link>
        </Button>
      </section>
    </div>
  )
}
