"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Play, FileText, ImageIcon, Music, Lock } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const mockContent = [
  {
    id: 1,
    title: "Behind the Scenes: Recording 'Electric Dreams'",
    type: "video",
    category: "Exclusive",
    image: "/placeholder.svg?height=200&width=300",
    description: "Go behind the scenes of Kelvin's latest album recording.",
    isPremium: true,
    duration: "12:34",
    publishedAt: "2024-01-15",
  },
  {
    id: 2,
    title: "Kelvin's Top 5 Guitar Riffs",
    type: "blog",
    category: "Public",
    image: "/placeholder.svg?height=200&width=300",
    description: "Kelvin shares his favorite guitar riffs and how they influenced him.",
    isPremium: false,
    readTime: "5 min read",
    publishedAt: "2024-01-10",
  },
  {
    id: 3,
    title: "Fan Art Showcase: January 2024",
    type: "gallery",
    category: "Public",
    image: "/placeholder.svg?height=200&width=300",
    description: "A collection of amazing fan art submitted by the community.",
    isPremium: false,
    imageCount: 24,
    publishedAt: "2024-01-08",
  },
  {
    id: 4,
    title: "Unreleased Demo: 'Frozen Fire'",
    type: "audio",
    category: "Exclusive",
    image: "/placeholder.svg?height=200&width=300",
    description: "Listen to an exclusive unreleased demo track.",
    isPremium: true,
    duration: "3:45",
    publishedAt: "2024-01-05",
  },
  {
    id: 5,
    title: "Live Q&A Transcript with Kelvin",
    type: "text",
    category: "Exclusive",
    image: "/placeholder.svg?height=200&width=300",
    description: "Read the full transcript from the latest live Q&A session.",
    isPremium: true,
    readTime: "15 min read",
    publishedAt: "2024-01-03",
  },
  {
    id: 6,
    title: "Tour Diary: Road to Electrify",
    type: "blog",
    category: "Public",
    image: "/placeholder.svg?height=200&width=300",
    description: "Follow Kelvin's journey on his latest tour.",
    isPremium: false,
    readTime: "8 min read",
    publishedAt: "2024-01-01",
  },
]

const getContentIcon = (type: string) => {
  switch (type) {
    case "video":
      return Play
    case "audio":
      return Music
    case "blog":
    case "text":
      return FileText
    case "gallery":
      return ImageIcon
    default:
      return FileText
  }
}

const getContentMeta = (content: any) => {
  if (content.duration) return content.duration
  if (content.readTime) return content.readTime
  if (content.imageCount) return `${content.imageCount} images`
  return ""
}

export function ContentPreview() {
  return (
    <>
      {mockContent.slice(0, 3).map((content) => {
        const Icon = getContentIcon(content.type)
        return (
          <Card key={content.id} className="flex flex-col">
            <div className="relative aspect-video overflow-hidden rounded-t-lg">
              <Image
                src={content.image || "/placeholder.svg"}
                alt={content.title}
                fill
                className="object-cover transition-transform hover:scale-105"
              />
              <div className="absolute top-2 left-2">
                <Badge variant={content.isPremium ? "default" : "secondary"}>{content.category}</Badge>
              </div>
              {content.isPremium && (
                <div className="absolute top-2 right-2">
                  <div className="bg-black/50 rounded-full p-1">
                    <Lock className="h-4 w-4 text-white" />
                  </div>
                </div>
              )}
              <div className="absolute bottom-2 left-2">
                <div className="bg-black/50 rounded-full p-1.5">
                  <Icon className="h-4 w-4 text-white" />
                </div>
              </div>
              {getContentMeta(content) && (
                <div className="absolute bottom-2 right-2">
                  <Badge variant="secondary" className="bg-black/50 text-white">
                    {getContentMeta(content)}
                  </Badge>
                </div>
              )}
            </div>
            <CardHeader>
              <CardTitle className="line-clamp-2">{content.title}</CardTitle>
              <CardDescription className="line-clamp-2">{content.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="text-sm text-muted-foreground">
                Published {new Date(content.publishedAt).toLocaleDateString()}
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" variant={content.isPremium ? "default" : "outline"} asChild>
                <Link href={`/content/${content.id}`}>
                  {content.isPremium ? (
                    <>
                      <Lock className="mr-2 h-4 w-4" />
                      Premium Content
                    </>
                  ) : (
                    <>
                      <Icon className="mr-2 h-4 w-4" />
                      View Content
                    </>
                  )}
                </Link>
              </Button>
            </CardFooter>
          </Card>
        )
      })}
    </>
  )
}
