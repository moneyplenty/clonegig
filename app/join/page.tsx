import { MembershipTiers } from "@/components/membership-tiers"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function JoinPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Join the Fan Club</h1>
      <MembershipTiers />

      {/* Ready to Join section */}
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
