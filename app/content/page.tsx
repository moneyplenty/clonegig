import { Button } from "@/components/ui/button"
import { ContentPreview } from "@/components/content-preview"
import { createClient } from "@/lib/supabase/server"
import { cookies } from "next/headers"
import type { Content } from "@/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Icons } from "@/components/icons"
import Link from "next/link"

export const dynamic = "force-dynamic"

export default async function ContentPage() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { data: profile, error: profileError } = await supabase.from("User").select("role").eq("id", user?.id).single()

  const userRole = profile?.role || "guest"

  const { data: content, error } = await supabase.from("Content").select("*").order("createdAt", { ascending: false })

  if (error) {
    console.error("Error fetching content:", error)
    return <div>Error loading content.</div>
  }

  const filterContentByAccess = (contentItem: Content) => {
    if (contentItem.accessLevel === "guest") {
      return true
    }
    if (contentItem.accessLevel === "fan" && (userRole === "fan" || userRole === "premium" || userRole === "admin")) {
      return true
    }
    if (contentItem.accessLevel === "premium" && (userRole === "premium" || userRole === "admin")) {
      return true
    }
    if (contentItem.accessLevel === "admin" && userRole === "admin") {
      return true
    }
    return false
  }

  const accessibleContent = content?.filter(filterContentByAccess) || []
  const inaccessibleContent = content?.filter((item) => !filterContentByAccess(item)) || []

  return (
    <div className="flex flex-col min-h-[100dvh] bg-kelvin-background text-kelvin-foreground">
      <main className="flex-1 container mx-auto py-12 px-4 md:px-6">
        <section className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-kelvin-foreground mb-4">Exclusive Content</h1>
          <p className="text-lg text-kelvin-foreground/80 max-w-3xl mx-auto">
            Dive deep into Kelvin Creekman&apos;s world with behind-the-scenes videos, unreleased tracks, and more.
          </p>
        </section>

        {userRole !== "premium" && userRole !== "admin" && (
          <Card className="bg-kelvin-card text-kelvin-card-foreground border-kelvin-border shadow-lg mb-12">
            <CardHeader>
              <CardTitle className="text-2xl font-bold flex items-center gap-2">
                <Icons.crown className="w-6 h-6 text-purple-400" />
                Unlock More Content
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-kelvin-card-foreground/90">
                Upgrade to a Fan or Premium membership to access a wider range of exclusive content, including full
                concert videos, private vlogs, and early song demos.
              </p>
              <Button asChild className="w-full bg-purple-500 hover:bg-purple-600 text-white">
                <Link href="/join">Upgrade Your Membership</Link>
              </Button>
            </CardContent>
          </Card>
        )}

        <section className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-kelvin-foreground mb-6 text-center">
            Your Accessible Content
          </h2>
          {accessibleContent.length === 0 ? (
            <div className="text-center text-kelvin-foreground/80">No accessible content found.</div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {accessibleContent.map((item) => (
                <ContentPreview key={item.id} content={item} userRole={userRole} />
              ))}
            </div>
          )}
        </section>

        {inaccessibleContent.length > 0 && (
          <section>
            <h2 className="text-3xl md:text-4xl font-bold text-kelvin-foreground mb-6 text-center">
              Locked Content (Upgrade to Access)
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {inaccessibleContent.map((item) => (
                <ContentPreview key={item.id} content={item} userRole={userRole} isLocked={true} />
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  )
}
