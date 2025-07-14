import { MembershipTier } from "@/components/membership-tiers"
import { Separator } from "@/components/ui/separator"

export default function JoinPage() {
  return (
    <main className="container py-12 md:py-24">
      <section className="mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">Join the Creekman Family</h1>
        <p className="mx-auto mt-4 max-w-[700px] text-lg text-muted-foreground md:text-xl">
          Choose the membership tier that best suits you and unlock exclusive benefits!
        </p>
      </section>

      <div className="grid gap-8 md:grid-cols-3">
        <MembershipTier
          title="Free Fan"
          description="Basic access to the Creekman community."
          price="Free"
          features={["Access to public content", "Newsletter subscription", "Basic event notifications"]}
          tier="free"
        />
        <MembershipTier
          title="Dedicated Fan"
          description="Unlock more exclusive content and early access."
          price="$9.99/month"
          features={[
            "All Free Fan benefits",
            "Exclusive articles & audio",
            "Early access to event tickets",
            "Fan-only meet & greets",
          ]}
          tier="fan"
          stripePriceId="price_123_fan_tier" // Replace with your actual Stripe Price ID
        />
        <MembershipTier
          title="Super Fan"
          description="Get the ultimate Creekman experience with all access."
          price="$24.99/month"
          features={[
            "All Dedicated Fan benefits",
            "Exclusive video content",
            "Priority access to meet & greets",
            "Merchandise discounts",
            "Personalized updates",
          ]}
          tier="super_fan"
          stripePriceId="price_456_superfan_tier" // Replace with your actual Stripe Price ID
        />
      </div>

      <Separator className="my-12" />

      <section className="text-center">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Why Join?</h2>
        <p className="mx-auto mt-4 max-w-[700px] text-lg text-muted-foreground">
          Becoming a member means more than just access; it means becoming a vital part of the Creekman journey. Your
          support directly fuels new music, more events, and a stronger community.
        </p>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-2">
            <h3 className="text-xl font-semibold">Support the Artist</h3>
            <p className="text-muted-foreground">Your membership helps create more music and experiences.</p>
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-semibold">Exclusive Access</h3>
            <p className="text-muted-foreground">Get content and experiences not available anywhere else.</p>
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-semibold">Join the Community</h3>
            <p className="text-muted-foreground">Connect with other fans and the artist directly.</p>
          </div>
        </div>
      </section>
    </main>
  )
}
