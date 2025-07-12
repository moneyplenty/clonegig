import { HeroSection } from "@/components/hero-section"
import { FeaturedMerchandise } from "@/components/featured-merchandise"
import { UpcomingEvents } from "@/components/upcoming-events"
import { Testimonials } from "@/components/testimonials"
import { MembershipTiers } from "@/components/membership-tiers"
import { ContentPreview } from "@/components/content-preview"

export default function HomePage() {
  // Mock content data for the homepage preview
  const mockContent = [
    {
      id: "1",
      title: 'Behind the Scenes: Recording "Electric Dreams"',
      description: "An exclusive look into the making of Kelvin Creekman's latest album.",
      type: "video",
      url: "/placeholder.svg",
      accessLevel: "premium",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "2",
      title: 'Unreleased Track: "Shadows of the Past"',
      description: "Listen to a never-before-heard track from Kelvin's early days.",
      type: "audio",
      url: "/placeholder.svg",
      accessLevel: "fan",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "3",
      title: "Interview: The Inspiration Behind the Lyrics",
      description: "Kelvin shares the stories and inspirations behind his most iconic lyrics.",
      type: "blog",
      url: "/placeholder.svg",
      accessLevel: "guest",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ]

  return (
    <div className="flex flex-col min-h-[100dvh]">
      <main className="flex-1">
        <HeroSection />
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Latest Content</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Check out the newest exclusive content for fans.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              {mockContent.map((item) => (
                <ContentPreview key={item.id} content={item} />
              ))}
            </div>
          </div>
        </section>
        <FeaturedMerchandise />
        <UpcomingEvents />
        <MembershipTiers />
        <Testimonials />
      </main>
    </div>
  )
}
