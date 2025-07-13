"use client"

import Image from "next/image"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import type { Content } from "@/types"
import { useAuth } from "@/components/auth/auth-provider"
import { toast } from "sonner"

interface ContentPreviewProps {
  content: Content
  userRole: string
  isLocked?: boolean
}

export function ContentPreview({ content, userRole, isLocked = false }: ContentPreviewProps) {
  const { user, loading: authLoading } = useAuth()

  const handleAccessContent = () => {
    if (isLocked) {
      if (!user) {
        toast.error("You need to be logged in to access this content.")
      } else {
        toast.error(`This content requires a higher membership tier (${content.accessLevel}). Please upgrade.`)
      }
    } else {
      // In a real app, you'd navigate to the content's full page or open a modal
      toast.info(`Accessing: ${content.title}`)
      if (content.url) {
        window.open(content.url, "_blank")
      }
    }
  }

  const getIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Icons.playCircle className="w-5 h-5 text-electric-400" />
      case "audio":
        return <Icons.headphones className="w-5 h-5 text-frost-400" />
      case "blog":
        return <Icons.bookOpen className="w-5 h-5 text-purple-400" />
      default:
        return <Icons.fileText className="w-5 h-5 text-gray-400" />
    }
  }

  return (
    <Card
      className={`bg-kelvin-card text-kelvin-card-foreground border-kelvin-border shadow-lg relative ${isLocked ? "opacity-50 grayscale" : ""}`}
    >
      {isLocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/60 z-10 rounded-lg">
          <Icons.lock className="w-12 h-12 text-white" />
        </div>
      )}
      <CardHeader className="p-0">
        <div className="relative w-full h-48">
          <Image
            src={content.url || "/placeholder.png"} // Use content.url as image if it's an image, otherwise placeholder
            alt={content.title}
            layout="fill"
            objectFit="cover"
            className="rounded-t-lg"
          />
        </div>
      </CardHeader>
      <CardContent className="flex-1 p-4">
        <CardTitle className="text-xl font-semibold mb-2">{content.title}</CardTitle>
        <CardDescription className="text-kelvin-card-foreground/80 line-clamp-3">{content.description}</CardDescription>
        <div className="flex items-center gap-2 mt-4 text-sm text-kelvin-card-foreground/70">
          {getIcon(content.type)}
          <span>{content.type.charAt(0).toUpperCase() + content.type.slice(1)}</span>
          <span className="ml-auto capitalize">Access: {content.accessLevel}</span>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button
          className="w-full bg-electric-500 hover:bg-electric-600 text-white"
          onClick={handleAccessContent}
          disabled={isLocked}
        >
          {isLocked ? "Locked" : "View Content"}
        </Button>
      </CardFooter>
    </Card>
  )
}
