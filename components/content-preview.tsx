import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { createClient } from "@/lib/supabase/server"
import { cookies } from "next/headers"

interface Content {
  id: string
  title: string
  description: string
  type: string
  url: string
  access_level: string
  image_url?: string // Assuming some content might have an image
}

export async function ContentPreview() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const { data: content, error } = await supabase
    .from("content")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(3)

  if (error) {
    console.error("Error fetching content:", error)
    return <div>Error loading content.</div>
  }

  return (
    <section className="py-12 md:py-20 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-gray-900 dark:text-white">
          Exclusive Content
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {content.map((item) => (
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
                <CardTitle className="text-xl font-semibold">{item.title}</CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400">
                  {item.type.charAt(0).toUpperCase() + item.type.slice(1)} - Access: {item.access_level.toUpperCase()}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <p className="text-gray-700 dark:text-gray-300 line-clamp-3">{item.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-primary">
                    {item.access_level === "free" ? "Free Access" : `Requires ${item.access_level} Membership`}
                  </span>
                  <Link href={`/content?id=${item.id}`}>
                    <Button variant="outline">View Content</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link href="/content">
            <Button
              size="lg"
              className="bg-purple-600 hover:bg-purple-700 text-white text-lg px-8 py-3 rounded-full shadow-md"
            >
              View All Content
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
