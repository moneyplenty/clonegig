import Image from "next/image"
import Link from "next/link"
import { Play, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const exclusiveContent = [
  {
    id: 1,
    title: "Studio Session: New Album Sneak Peek",
    description: "Watch exclusive footage from the recording of the upcoming album",
    image: "/placeholder.svg?height=400&width=600",
    type: "video",
    duration: "12:34",
    date: "2 days ago",
    locked: true,
  },
  {
    id: 2,
    title: "Behind the Scenes: World Tour Preparation",
    description: "See what goes into preparing for a global tour",
    image: "/placeholder.svg?height=400&width=600",
    type: "video",
    duration: "8:45",
    date: "1 week ago",
    locked: true,
  },
  {
    id: 3,
    title: "Photo Gallery: Summer Festival Highlights",
    description: "Exclusive photos from this summer's festival performances",
    image: "/placeholder.svg?height=400&width=600",
    type: "gallery",
    count: "24 photos",
    date: "2 weeks ago",
    locked: false,
  },
]

export function ContentPreview() {
  return (
    <div className="grid gap-6 pt-8 md:grid-cols-2 lg:grid-cols-3">
      {exclusiveContent.map((content) => (
        <Card key={content.id} className="overflow-hidden group">
          <div className="relative aspect-video">
            <Image
              src={content.image || "/placeholder.svg"}
              alt={content.title}
              fill
              className="object-cover transition-all group-hover:scale-105"
            />
            {content.locked ? (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <Lock className="h-12 w-12 text-white opacity-80" />
              </div>
            ) : content.type === "video" ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <Button size="icon" variant="secondary" className="rounded-full h-12 w-12">
                  <Play className="h-6 w-6" />
                </Button>
              </div>
            ) : null}
            <Badge className="absolute top-2 right-2">
              {content.type === "video" ? content.duration : content.count}
            </Badge>
          </div>
          <CardHeader className="p-4">
            <CardTitle className="text-lg line-clamp-1">{content.title}</CardTitle>
            <CardDescription className="line-clamp-2">{content.description}</CardDescription>
          </CardHeader>
          <CardFooter className="p-4 pt-0 flex justify-between items-center">
            <span className="text-xs text-muted-foreground">{content.date}</span>
            {content.locked ? (
              <Button asChild size="sm" variant="outline" className="rounded-full">
                <Link href="/join">Unlock</Link>
              </Button>
            ) : (
              <Button asChild size="sm" className="rounded-full">
                <Link href={`/content/${content.id}`}>View</Link>
              </Button>
            )}
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
