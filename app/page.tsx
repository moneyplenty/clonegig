import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MembershipTiers } from "@/components/membership-tiers"
import { ContentPreview } from "@/components/content-preview"
import { FeaturedMerchandise } from "@/components/featured-merchandise"
import { Testimonials } from "@/components/testimonials"
import { UpcomingEvents } from "@/components/upcoming-events"
import { HeroSection } from "@/components/hero-section"

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection
        title="Unleash the Storm"
        subtitle="Join the official Kelvin Creekman Fan Club and get exclusive access to music, merch, and events."
        ctaText="Join the Ice Legion"
        ctaLink="/join"
        videoUrl="/placeholder.mp4" // Replace with actual video URL
        videoPosterUrl="/placeholder.jpg" // Replace with actual video poster image
      />
      <FeaturedMerchandise />
      <UpcomingEvents />
      <MembershipTiers />
      <Testimonials />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Latest Exclusive Content</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  A glimpse of what awaits you as a premium member.
                </p>
              </div>
            </div>
            <ContentPreview />
            <div className="flex justify-center mt-8">
              <Button asChild size="lg" className="rounded-full">
                <Link href="/join">Unlock All Content</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Exclusive Merchandise</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Limited edition items available only to club members.
                </p>
              </div>
            </div>
            <FeaturedMerchandise />
            <div className="flex justify-center mt-8">
              <Button asChild size="lg" variant="outline" className="rounded-full bg-transparent">
                <Link href="/store">Visit Store</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-primary/20 to-primary/10">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Ready to Join the Family?</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Become a premium member today and unlock a world of exclusive experiences.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button asChild size="lg" className="rounded-full">
                  <Link href="/join">Join Now</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="rounded-full bg-transparent">
                  <Link href="/tiers">View Membership Options</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
