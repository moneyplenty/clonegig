import { createClient } from "@/lib/supabase/server"
import { cookies } from "next/headers"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { Suspense } from "react"
import ContentLoading from "./loading"
import { PlayCircle, BookOpen, ImageIcon, Music } from "lucide-react"

interface ContentItem {
  id: string
  title: string
  description: string
  type: string
  url: string
  access_level: string
  image_url?: string
}

export default async function ContentPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const { data: user } = await supabase.auth.getUser()
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("membership_tier")
    .eq("id", user.user?.id)
    .single()

  const userMembershipTier = profile?.membership_tier || "free"

  const { data: content, error } = await supabase.from("content").select("*").order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching content:", error)
    return <div>Error loading content.</div>
  }

  const filterType = searchParams.type as string | undefined
  const filteredContent = content.filter((item) => {
    if (!filterType) return true
    return item.type === filterType
  })

  const getAccessLevelOrder = (level: string) => {
    if (level === "vip") return 3
    if (level === "premium") return 2
    return 1
  }

  const canAccess = (itemAccessLevel: string) => {
    return getAccessLevelOrder(userMembershipTier) >= getAccessLevelOrder(itemAccessLevel)
  }

  const getIcon = (type: string) => {
    switch (type) {
      case "video":
        return <PlayCircle className="h-5 w-5 text-primary" />
      case "audio":
        return <Music className="h-5 w-5 text-primary" />
      case "blog":
        return <BookOpen className="h-5 w-5 text-primary" />
      case "image":
        return <ImageIcon className="h-5 w-5 text-primary" />
      default:
        return null
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <h1 className="text-4xl font-bold text-center mb-8">Exclusive Content</h1>
      <p className="text-lg text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
        Access a library of exclusive videos, audio, blogs, and more, available only to our members.
      </p>

      <div className="flex justify-center gap-4 mb-8">
        <Link href="/content">
          <Button variant={!filterType ? "default" : "outline"}>All</Button>
        </Link>
        <Link href="/content?type=video">
          <Button variant={filterType === "video" ? "default" : "outline"}>Videos</Button>
        </Link>
        <Link href="/content?type=audio">
          <Button variant={filterType === "audio" ? "default" : "outline"}>Audio</Button>
        </Link>
        <Link href="/content?type=blog">
          <Button variant={filterType === "blog" ? "default" : "outline"}>Blogs</Button>
        </Link>
        <Link href="/content?type=image">
          <Button variant={filterType === "image" ? "default" : "outline"}>Images</Button>
        </Link>
      </div>

      <Suspense fallback={<ContentLoading />}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredContent.map((item) => (
            <Card key={item.id} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="relative w-full h-48">
                <Image
                  src={item.image_url || "/placeholder.svg"}
                  alt={item.title}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-t-lg"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-xl font-semibold flex items-center gap-2">
                  {getIcon(item.type)} {item.title}
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400">
                  Access Level: {item.access_level.toUpperCase()}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <p className="text-gray-700 dark:text-gray-300 line-clamp-3">{item.description}</p>
                <div className="flex items-center justify-between">
                  {canAccess(item.access_level) ? (
                    <Link href={item.url} target="_blank" rel="noopener noreferrer">
                      <Button>View Content</Button>
                    </Link>
                  ) : (
                    <Link href="/join">
                      <Button variant="outline">Unlock Access</Button>
                    </Link>
                  )}
                  <span
                    className={`text-sm font-medium ${canAccess(item.access_level) ? "text-green-600" : "text-red-500"}`}
                  >
                    {canAccess(item.access_level) ? "Accessible" : "Locked"}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        {filteredContent.length === 0 && (
          <div className="text-center text-muted-foreground py-10">No content found for this category.</div>
        )}
      </Suspense>
    </div>
  )
}
