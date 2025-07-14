import { Button } from "@/components/ui/button"
import { createServerSupabaseClient } from "@/lib/supabase/server"
import type { Content } from "@/types"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Video, FileText, Music, Lock } from "lucide-react"
import { getMembershipLevel } from "@/lib/utils"

export const revalidate = 60

export default async function ContentPage() {
  const supabase = createServerSupabaseClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  let userMembershipTier = "free"
  if (user) {
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("membership_tier")
      .eq("id", user.id)
      .single()

    if (profileError) {
      console.error("Error fetching user profile:", profileError.message)
    } else if (profile) {
      userMembershipTier = profile.membership_tier || "free"
    }
  }

  const { data: content, error } = await supabase.from("content").select("*").order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching content:", error.message)
    return <div className="container py-12 text-center">Failed to load content.</div>
  }

  const canAccess = (accessLevel: string) => {
    const userLevel = getMembershipLevel(userMembershipTier)
    const requiredLevel = getMembershipLevel(accessLevel)
    return userLevel >= requiredLevel
  }

  const getIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Video className="h-5 w-5" />
      case "article":
        return <FileText className="h-5 w-5" />
      case "audio":
        return <Music className="h-5 w-5" />
      default:
        return null
    }
  }

  return (
    <main className="container py-12 md:py-24">
      <section className="mb-8 text-center">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">Exclusive Content</h1>
        <p className="mx-auto mt-4 max-w-[700px] text-lg text-muted-foreground md:text-xl">
          Dive into a world of exclusive videos, articles, and audio tracks available only to our members.
        </p>
      </section>

      <div className="mb-8 flex flex-wrap justify-center gap-2">
        <Badge variant="secondary">Your Access: {userMembershipTier.replace("_", " ")}</Badge>
        {/* Add filter buttons here if needed */}
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {content.map((item: Content) => {
          const hasAccess = canAccess(item.access_level)
          return (
            <Card key={item.id} className="flex flex-col overflow-hidden">
              <CardHeader className="relative p-0">
                {item.type === "video" && (
                  <div className="relative aspect-video w-full bg-muted">
                    {hasAccess ? (
                      <video controls className="h-full w-full object-cover">
                        <source src={item.url} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-black/50 text-white">
                        <Lock className="h-12 w-12" />
                      </div>
                    )}
                  </div>
                )}
                {item.type === "article" && (
                  <div className="relative aspect-video w-full bg-muted flex items-center justify-center">
                    <FileText className="h-24 w-24 text-muted-foreground" />
                  </div>
                )}
                {item.type === "audio" && (
                  <div className="relative aspect-video w-full bg-muted flex items-center justify-center">
                    <Music className="h-24 w-24 text-muted-foreground" />
                  </div>
                )}
              </CardHeader>
              <CardContent className="flex-1 p-4">
                <CardTitle className="text-xl font-semibold">{item.title}</CardTitle>
                <p className="mt-2 text-muted-foreground line-clamp-3">{item.description}</p>
              </CardContent>
              <CardFooter className="flex items-center justify-between p-4 pt-0">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  {getIcon(item.type)}
                  <span>{item.type}</span>
                  <Badge variant="outline">{item.access_level.replace("_", " ")}</Badge>
                </div>
                {hasAccess ? (
                  <Button asChild>
                    <Link href={item.url} target={item.type === "article" ? "_blank" : "_self"}>
                      View Content
                    </Link>
                  </Button>
                ) : (
                  <Button asChild variant="secondary">
                    <Link href="/join">Unlock Access</Link>
                  </Button>
                )}
              </CardFooter>
            </Card>
          )
        })}
      </div>
    </main>
  )
}
