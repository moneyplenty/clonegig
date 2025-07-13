import { MembershipTiers } from "@/components/membership-tiers"
import { createClient } from "@/lib/supabase/server"
import { cookies } from "next/headers"

export default async function JoinPage() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("membership_tier")
    .eq("id", user?.id)
    .single()

  if (profileError) {
    console.error("Error fetching profile:", profileError)
  }

  const currentMembership = profile?.membership_tier || "free"

  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
      <h1 className="text-4xl font-bold text-center mb-8">Join the Fan Club</h1>
      <p className="text-lg text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
        Choose the membership tier that best suits you and unlock exclusive benefits!
      </p>
      <MembershipTiers currentMembership={currentMembership} />
    </div>
  )
}
