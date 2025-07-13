import { HeroSection } from "@/components/hero-section"
import { UpcomingEvents } from "@/components/upcoming-events"
import { FeaturedMerchandise } from "@/components/featured-merchandise"
import { Testimonials } from "@/components/testimonials"
import { MembershipTiers } from "@/components/membership-tiers"
import { ContentPreview } from "@/components/content-preview"

export default function Home() {
  const mockContent = [
    {
      id: 1,
      title: "Behind the Scenes: Recording 'Electric Dreams'",
      type: "video",
      category: "Exclusive",
      image: "/placeholder.svg?height=200&width=300",
      description: "Go behind the scenes of Kelvin's latest album recording.",
      isPremium: true,
    },
    {
      id: 2,
      title: "Kelvin's Top 5 Guitar Riffs",
      type: "blog",
      category: "Public",
      image: "/placeholder.svg?height=200&width=300",
      description: "Kelvin shares his favorite guitar riffs and how they influenced him.",
      isPremium: false,
    },
    {
      id: 3,
      title: "Fan Art Showcase: August 2024",
      type: "gallery",
      category: "Public",
      image: "/placeholder.svg?height=200&width=300",
      description: "A collection of amazing fan art submitted by the community.",
      isPremium: false,
    },
    {
      id: 4,
      title: "Unreleased Demo: 'Frozen Fire'",
      type: "audio",
      category: "Exclusive",
      image: "/placeholder.svg?height=200&width=300",
      description: "Listen to an exclusive unreleased demo track.",
      isPremium: true,
    },
    {
      id: 5,
      title: "Live Q&A Transcript with Kelvin",
      type: "text",
      category: "Exclusive",
      image: "/placeholder.svg?height=200&width=300",
      description: "Read the full transcript from the latest live Q&A session.",
      isPremium: true,
    },
    {
      id: 6,
      title: "Tour Diary: Road to Electrify",
      type: "blog",
      category: "Public",
      image: "/placeholder.svg?height=200&width=300",
      description: "Follow Kelvin's journey on his latest tour.",
      isPremium: false,
    },
  ]

  return (
    <div className="flex flex-col min-h-[100dvh]">
      <main className="flex-1">
        <HeroSection 
          title="Welcome to Kelvin Creekman's Universe"
          description="Join the Ice Legion and experience exclusive content, live events, and connect with fellow fans worldwide."
          ctaText="Join the Ice Legion"
          ctaLink="/join"
          imageSrc="/placeholder.svg?height=1080&width=1920"
        />
        <section className="py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Latest Content</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Dive into the world of Kelvin Creekman with exclusive videos, blog posts, and more.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <ContentPreview content={mockContent.slice(0, 3)} /> {/* Display a subset for homepage */}
            </div>
          </div>
        </section>
        <UpcomingEvents />
        <FeaturedMerchandise />
        <MembershipTiers />
        <Testimonials />
      </main>
    </div>
  )
}
