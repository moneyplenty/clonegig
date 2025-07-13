import { HeroSection } from "@/components/hero-section"
import { UpcomingEvents } from "@/components/upcoming-events"
import { FeaturedMerchandise } from "@/components/featured-merchandise"
import { Testimonials } from "@/components/testimonials"
import { MembershipTiers } from "@/components/membership-tiers"

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <UpcomingEvents />
      <FeaturedMerchandise />
      <Testimonials />
      <MembershipTiers />
    </>
  )
}
