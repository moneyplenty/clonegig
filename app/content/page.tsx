import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { ContentPreview } from "@/components/content-preview"
import { createClient } from "@/lib/supabase/server"
import { cookies } from "next/headers"

export const dynamic = "force-dynamic"

export default async function ContentPage() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const { data: content, error } = await supabase.from("Content").select("*")

  if (error) {
    console.error("Error fetching content:", error)
    return <div>Error loading content.</div>
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col items-center justify-center text-center space-y-4 mb-8">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">Exclusive Content</h1>
        <p className="max-w-xl text-lg text-gray-600 dark:text-gray-400">
          Dive deep into Kelvin Creekman&apos;s world with behind-the-scenes footage, unreleased tracks, and exclusive
          interviews.
        </p>
      </div>

      <div className="relative mb-8 max-w-md mx-auto">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <Input type="text" placeholder="Search content..." className="pl-10 pr-4 py-2 rounded-md w-full" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {content.map((item: any) => (
          <ContentPreview key={item.id} content={item} />
        ))}
      </div>
    </div>
  )
}
