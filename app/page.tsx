import { HeroSection } from "@/components/hero-section"
import { FeaturedMerchandise } from "@/components/featured-merchandise"
import { UpcomingEvents } from "@/components/upcoming-events"
import { Testimonials } from "@/components/testimonials"
import { SuperFans } from "@/components/super-fans"
import { createServerSupabaseClient } from "@/lib/supabase/server"

export default async function IndexPage() {
  const supabase = createServerSupabaseClient()

  const { data: products, error: productsError } = await supabase.from("products").select("*").limit(3)
  const { data: events, error: eventsError } = await supabase.from("events").select("*").limit(3)
  const { data: testimonials, error: testimonialsError } = await supabase.from("testimonials").select("*").limit(3)
  const { data: superFans, error: superFansError } = await supabase
    .from("profiles")
    .select("id, username, avatar_url, membership_tier")
    .eq("membership_tier", "super_fan")
    .limit(5)

  if (productsError) console.error("Error fetching products:", productsError.message)
  if (eventsError) console.error("Error fetching events:", eventsError.message)
  if (testimonialsError) console.error("Error fetching testimonials:", testimonialsError.message)
  if (superFansError) console.error("Error fetching super fans:", superFansError.message)

  return (
    <>
      <HeroSection />
      <section id="featured-merchandise" className="container space-y-8 py-12 lg:py-20">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div className="max-w-xl">
            <h2 className="text-3xl font-bold leading-tight tracking-tighter md:text-4xl">Featured Merchandise</h2>
            <p className="mt-2 text-lg text-muted-foreground">
              Check out the latest and most popular items from our store.
            </p>
          </div>
        </div>
        <FeaturedMerchandise initialProducts={products || []} />
      </section>

      <section id="upcoming-events" className="container space-y-8 py-12 lg:py-20">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div className="max-w-xl">
            <h2 className="text-3xl font-bold leading-tight tracking-tighter md:text-4xl">Upcoming Events</h2>
            <p className="mt-2 text-lg text-muted-foreground">
              Don't miss out on these exciting opportunities to connect.
            </p>
          </div>
        </div>
        <UpcomingEvents initialEvents={events || []} />
      </section>

      <section id="testimonials" className="container space-y-8 py-12 lg:py-20">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div className="max-w-xl">
            <h2 className="text-3xl font-bold leading-tight tracking-tighter md:text-4xl">What Our Fans Say</h2>
            <p className="mt-2 text-lg text-muted-foreground">
              Hear from our amazing community members about their experiences.
            </p>
          </div>
        </div>
        <Testimonials initialTestimonials={testimonials || []} />
      </section>

      <section id="super-fans" className="container space-y-8 py-12 lg:py-20">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div className="max-w-xl">
            <h2 className="text-3xl font-bold leading-tight tracking-tighter md:text-4xl">Our Super Fans</h2>
            <p className="mt-2 text-lg text-muted-foreground">
              Meet some of our most dedicated and supportive community members.
            </p>
          </div>
        </div>
        <SuperFans initialSuperFans={superFans || []} />
      </section>
    </>
  )
}
