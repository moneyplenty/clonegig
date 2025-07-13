import { HeroSection } from "@/components/hero-section"
import { UpcomingEvents } from "@/components/upcoming-events"
import { FeaturedMerchandise } from "@/components/featured-merchandise"
import { Testimonials } from "@/components/testimonials"
import { ContentPreview } from "@/components/content-preview"
import { SuperFans } from "@/components/super-fans"

export default function Home() {
  return (
    <main>
      <HeroSection />
      <UpcomingEvents />
      <FeaturedMerchandise />
      <ContentPreview />
      <SuperFans />
      <Testimonials />
    </main>
  )
}
