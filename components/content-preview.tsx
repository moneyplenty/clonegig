"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Play, Lock, FileText, ImageIcon, Headphones } from "lucide-react"
import { useAuth } from "@/components/auth/auth-provider"
import Link from "next/link"

interface ContentItem {
  id: string
  title: string
  description: string
  type: string
  url: string
  access_level: string
  image_url: string
  created_at: string
}

interface ContentPreviewProps {
  content: ContentItem[]
}

export function ContentPreview({ content }: ContentPreviewProps) {
  const { user } = useAuth()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState("all")
  const [selectedAccessLevel, setSelectedAccessLevel] = useState("all")

  const types = ["all", ...Array.from(new Set(content.map((c) => c.type)))]
  const accessLevels = ["all", "free", "premium", "vip"]

  const filteredContent = content.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = selectedType === "all" || item.type === selectedType
    const matchesAccessLevel = selectedAccessLevel === "all" || item.access_level === selectedAccessLevel
    return matchesSearch && matchesType && matchesAccessLevel
  })

  const getContentIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Play className="h-5 w-5" />
      case "audio":
        return <Headphones className="h-5 w-5" />
      case "image":
        return <ImageIcon className="h-5 w-5" />
      case "blog":
        return <FileText className="h-5 w-5" />
      default:
        return <FileText className="h-5 w-5" />
    }
  }

  const getAccessBadgeVariant = (accessLevel: string) => {
    switch (accessLevel) {
      case "free":
        return "secondary"
      case "premium":
        return "default"
      case "vip":
        return "destructive"
      default:
        return "secondary"
    }
  }

  const canAccessContent = (accessLevel: string) => {
    if (!user) return accessLevel === "free"
    // This would check user's membership level from their profile
    return true // For now, allow access to all content for authenticated users
  }

  return (
    <div className="space-y-8">
      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search content..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              {types.map((type) => (
                <SelectItem key={type} value={type}>
                  {type === "all" ? "All Types" : type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={selectedAccessLevel} onValueChange={setSelectedAccessLevel}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Access" />
            </SelectTrigger>
            <SelectContent>
              {accessLevels.map((level) => (
                <SelectItem key={level} value={level}>
                  {level === "all" ? "All Access" : level}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Content Grid */}
      {filteredContent.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No content found matching your criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredContent.map((item) => {
            const hasAccess = canAccessContent(item.access_level)
            return (
              <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <div className="relative h-48 w-full">
                    <Image
                      src={item.image_url || "/placeholder.svg?height=200&width=300"}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                    {!hasAccess && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <Lock className="h-8 w-8 text-white" />
                      </div>
                    )}
                  </div>
                  <div className="absolute top-2 left-2 flex gap-2">
                    <Badge variant="outline" className="bg-background/80">
                      {getContentIcon(item.type)}
                      <span className="ml-1 capitalize">{item.type}</span>
                    </Badge>
                  </div>
                  <div className="absolute top-2 right-2">
                    <Badge variant={getAccessBadgeVariant(item.access_level)} className="capitalize">
                      {item.access_level}
                    </Badge>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                  <CardDescription className="text-sm">
                    {new Date(item.created_at).toLocaleDateString()}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground line-clamp-3">{item.description}</p>
                  {hasAccess ? (
                    <Button asChild className="w-full">
                      <a href={item.url} target="_blank" rel="noopener noreferrer">
                        View Content
                      </a>
                    </Button>
                  ) : (
                    <div className="space-y-2">
                      <p className="text-xs text-muted-foreground text-center">
                        {item.access_level === "premium" ? "Premium" : "VIP"} membership required
                      </p>
                      <Button asChild className="w-full bg-transparent" variant="outline">
                        <Link href="/join">Upgrade Membership</Link>
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
