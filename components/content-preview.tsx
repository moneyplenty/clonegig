"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { PlayCircle, Headphones, FileText, ImageIcon, Lock } from "lucide-react"
import { useAuth } from "@/components/auth/auth-provider"
import { toast } from "@/components/ui/use-toast"
import Link from "next/link"

interface ContentItem {
  id: string
  title: string
  description: string
  type: "video" | "audio" | "article" | "image"
  thumbnailUrl: string
  accessTier: "guest" | "frost" | "blizzard" | "avalanche"
  fileUrl?: string
}

interface ContentPreviewProps {
  content: ContentItem[]
}

export function ContentPreview({ content }: ContentPreviewProps) {
  const [selectedContent, setSelectedContent] = useState<ContentItem | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { user } = useAuth()

  const userTier = user?.user_metadata?.role || "guest"

  const tierHierarchy = {
    guest: 0,
    frost: 1,
    blizzard: 2,
    avalanche: 3,
  }

  const canAccess = (requiredTier: ContentItem["accessTier"]) => {
    return tierHierarchy[userTier as keyof typeof tierHierarchy] >= tierHierarchy[requiredTier]
  }

  const handleContentClick = (item: ContentItem) => {
    if (canAccess(item.accessTier)) {
      setSelectedContent(item)
      setIsDialogOpen(true)
    } else {
      toast({
        title: "Access Denied",
        description: `You need to be a ${item.accessTier.toUpperCase()} member to access this content.`,
        variant: "destructive",
        action: (
          <Link href="/join" className="text-white underline">
            Upgrade Now
          </Link>
        ),
      })
    }
  }

  const renderContentPlayer = (item: ContentItem) => {
    if (!item.fileUrl) {
      return <p className="text-muted-foreground">Content file not available.</p>
    }

    switch (item.type) {
      case "video":
        return (
          <video controls className="w-full h-auto max-h-[70vh] rounded-md" src={item.fileUrl}>
            Your browser does not support the video tag.
          </video>
        )
      case "audio":
        return (
          <audio controls className="w-full rounded-md" src={item.fileUrl}>
            Your browser does not support the audio element.
          </audio>
        )
      case "image":
        return (
          <div className="relative w-full h-[70vh]">
            <Image src={item.fileUrl || "/placeholder.svg"} alt={item.title} fill className="object-contain" />
          </div>
        )
      case "article":
        return (
          <div className="prose dark:prose-invert max-h-[70vh] overflow-y-auto p-4 bg-background/50 rounded-md">
            {/* In a real app, you'd fetch and render markdown/HTML content here */}
            <h2 className="text-2xl font-bold mb-4 text-electric-100">{item.title}</h2>
            <p className="text-muted-foreground">{item.description}</p>
            <p className="mt-4 text-electric-200">
              This is a placeholder for the full article content. In a real application, the content from {item.fileUrl}{" "}
              would be loaded and displayed here.
            </p>
          </div>
        )
      default:
        return <p className="text-muted-foreground">Unsupported content type.</p>
    }
  }

  const getIconForType = (type: ContentItem["type"]) => {
    switch (type) {
      case "video":
        return <PlayCircle className="h-5 w-5 text-frost-400" />
      case "audio":
        return <Headphones className="h-5 w-5 text-frost-400" />
      case "article":
        return <FileText className="h-5 w-5 text-frost-400" />
      case "image":
        return <ImageIcon className="h-5 w-5 text-frost-400" />
      default:
        return null
    }
  }

  const getTierBadge = (tier: ContentItem["accessTier"]) => {
    switch (tier) {
      case "guest":
        return <span className="text-xs font-semibold text-green-400">FREE</span>
      case "frost":
        return <span className="text-xs font-semibold text-blue-400">FROST</span>
      case "blizzard":
        return <span className="text-xs font-semibold text-purple-400">BLIZZARD</span>
      case "avalanche":
        return <span className="text-xs font-semibold text-yellow-400">AVALANCHE</span>
      default:
        return null
    }
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {content.map((item) => (
        <Card
          key={item.id}
          className="group bg-background/50 backdrop-blur-lg border-electric-700/30 hover:border-electric-500/50 transition-all duration-300 hover:scale-105 overflow-hidden cursor-pointer"
          onClick={() => handleContentClick(item)}
        >
          <div className="relative aspect-video overflow-hidden">
            <Image
              src={item.thumbnailUrl || "/placeholder.svg"}
              alt={item.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {canAccess(item.accessTier) ? getIconForType(item.type) : <Lock className="h-12 w-12 text-white" />}
            </div>
            <div className="absolute top-2 right-2">{getTierBadge(item.accessTier)}</div>
          </div>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg leading-tight text-electric-100">{item.title}</CardTitle>
            <CardDescription className="line-clamp-2 text-muted-foreground">{item.description}</CardDescription>
          </CardHeader>
          <CardFooter>
            <Button
              onClick={() => handleContentClick(item)}
              className="w-full bg-gradient-electric hover:animate-electric-pulse"
            >
              {canAccess(item.accessTier) ? "View Content" : "Unlock Content"}
            </Button>
          </CardFooter>
        </Card>
      ))}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[80vw] h-[90vh] flex flex-col bg-background border-electric-700">
          <DialogHeader>
            <DialogTitle className="text-electric-100">{selectedContent?.title}</DialogTitle>
          </DialogHeader>
          <div className="flex-1 overflow-auto">{selectedContent && renderContentPlayer(selectedContent)}</div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
