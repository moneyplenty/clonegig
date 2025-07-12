"use client"

import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { PlayCircle, BookOpen, Headphones, ImageIcon } from "lucide-react"
import { useAuth } from "./auth/auth-provider"

interface ContentItem {
  id: number
  title: string
  type: "video" | "blog" | "audio" | "gallery" | "text"
  category: string
  image: string
  description: string
  isPremium: boolean
}

interface ContentPreviewProps {
  content: ContentItem[]
}

export function ContentPreview({ content }: ContentPreviewProps) {
  const { user } = useAuth()

  const getIcon = (type: ContentItem["type"]) => {
    switch (type) {
      case "video":
        return <PlayCircle className="h-5 w-5" />
      case "blog":
      case "text":
        return <BookOpen className="h-5 w-5" />
      case "audio":
        return <Headphones className="h-5 w-5" />
      case "gallery":
        return <ImageIcon className="h-5 w-5" />
      default:
        return null
    }
  }

  const canAccess = (item: ContentItem) => {
    if (!item.isPremium) {
      return true // Public content is always accessible
    }
    // Premium content requires 'premium' or 'admin' role
    return user?.user_metadata?.role === "premium" || user?.user_metadata?.role === "admin"
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 flex-1">
      {content.map((item) => (
        <Card key={item.id} className="flex flex-col">
          <CardHeader className="p-0">
            <div className="relative w-full h-48">
              <Image
                src={item.image || "/placeholder.svg"}
                alt={item.title}
                layout="fill"
                objectFit="cover"
                className="rounded-t-lg"
              />
              {item.isPremium && (
                <Badge className="absolute top-2 left-2 bg-primary text-primary-foreground">Premium</Badge>
              )}
              <div className="absolute bottom-2 right-2 bg-background/70 backdrop-blur-sm text-foreground px-2 py-1 rounded-md text-sm flex items-center gap-1">
                {getIcon(item.type)}
                {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex-grow p-4">
            <CardTitle className="text-lg font-semibold mb-2">{item.title}</CardTitle>
            <p className="text-muted-foreground text-sm line-clamp-2">{item.description}</p>
          </CardContent>
          <CardFooter className="p-4 pt-0">
            <Button className="w-full" asChild disabled={!canAccess(item)}>
              {canAccess(item) ? (
                <Link href={`/content/${item.id}`}>View Content</Link>
              ) : (
                <Link href="/join">Unlock with Premium</Link>
              )}
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
