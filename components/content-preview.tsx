import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { PlayCircle, Headphones, BookOpen } from "lucide-react"

interface Content {
  id: string
  title: string
  description?: string
  type: "video" | "audio" | "blog"
  url?: string
  accessLevel: "guest" | "fan" | "premium"
  createdAt: string
  updatedAt: string
}

interface ContentPreviewProps {
  content: Content
}

export function ContentPreview({ content }: ContentPreviewProps) {
  const getIcon = (type: Content["type"]) => {
    switch (type) {
      case "video":
        return <PlayCircle className="h-5 w-5" />
      case "audio":
        return <Headphones className="h-5 w-5" />
      case "blog":
        return <BookOpen className="h-5 w-5" />
      default:
        return null
    }
  }

  const getAccessBadgeColor = (level: Content["accessLevel"]) => {
    switch (level) {
      case "guest":
        return "bg-gray-200 text-gray-800"
      case "fan":
        return "bg-blue-200 text-blue-800"
      case "premium":
        return "bg-yellow-200 text-yellow-800"
      default:
        return ""
    }
  }

  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <div className="flex items-center justify-between mb-2">
          <CardTitle className="text-xl">{content.title}</CardTitle>
          <Badge className={getAccessBadgeColor(content.accessLevel)}>{content.accessLevel}</Badge>
        </div>
        <CardDescription className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
          {getIcon(content.type)}
          <span>{content.type.charAt(0).toUpperCase() + content.type.slice(1)}</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col justify-between">
        <p className="text-gray-700 dark:text-gray-300 mb-4">{content.description}</p>
        <Link href={`/content/${content.id}`} className="text-blue-600 hover:underline self-end">
          View Content
        </Link>
      </CardContent>
    </Card>
  )
}
