import { HeroSection } from "@/components/hero-section"
import { FeaturedMerchandise } from "@/components/featured-merchandise"
import { UpcomingEvents } from "@/components/upcoming-events"
import { MembershipTiers } from "@/components/membership-tiers"
import { Testimonials } from "@/components/testimonials"
import { createClient } from "@/lib/supabase/server"
import { cookies } from "next/headers"
import type { SuperFan } from "@/types"

export const dynamic = "force-dynamic"

export default async function HomePage() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  // Fetch super fans
  const { data: superFansData, error: superFansError } = await supabase
    .from("User")
    .select("email, user_metadata") // Assuming user_metadata contains tiktokUrl and name
    .eq("user_metadata->>isSuperFan", true) // Filter for super fans
    .limit(3) // Limit to a few super fans

  let superFans: SuperFan[] = []
  if (superFansError) {
    console.error("Error fetching super fans:", superFansError)
  } else if (superFansData) {
    superFans = superFansData
      .map((user) => {
        const metadata = user.user_metadata as { name?: string; tiktokUrl?: string; isSuperFan?: boolean }
        if (metadata?.isSuperFan && metadata?.tiktokUrl && metadata?.name) {
          return {
            name: metadata.name,
            tiktokUrl: metadata.tiktokUrl,
          }
        }
        return null
      })
      .filter(Boolean) as SuperFan[]
  }

  return (
    <div className="flex flex-col min-h-[100dvh] bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <HeroSection
        title="Experience the Electrifying World of Kelvin Creekman"
        description="Join the official fan club for exclusive content, merchandise, events, and direct access to Kelvin."
        ctaText="Join the Fan Club"
        ctaLink="/join"
        imageSrc="/placeholder.png" // Replace with a high-quality hero image
        superFans={superFans}
      />
      <FeaturedMerchandise />
      <UpcomingEvents />
      <MembershipTiers />
      <Testimonials />
    </div>
  )
}
