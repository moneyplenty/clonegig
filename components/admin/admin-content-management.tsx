
"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { toast } from "@/components/ui/use-toast"
import { Edit, Trash, FileText, Eye } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

interface Content {
  id: string
  title: string
  type: "article" | "video" | "music" | "image"
  content: string
  excerpt: string
  author: string
  publishDate: string
  status: "published" | "draft" | "archived"
  isPremium: boolean
  tags: string[]
}

export function AdminContentManagement() {
  const [contents, setContents] = useState<Content[]>([
    {
      id: "1",
      title: "Behind the Scenes: Electric Dreams Recording",
      type: "article",
      content: "An exclusive look at the recording process of the Electric Dreams album...",
      excerpt: "Exclusive behind-the-scenes content from the studio.",
      author: "Kelvin Creekman",
      publishDate: "2024-12-15T10:00:00Z",
      status: "published",
      isPremium: true,
      tags: ["studio", "recording", "electric-dreams"]
    },
    {
      id: "2",
      title: "Acoustic Session #1",
      type: "video",
      content: "https://example.com/video/acoustic-session-1",
      excerpt: "Intimate acoustic performance of fan favorites.",
      author: "Kelvin Creekman",
      publishDate: "2024-12-10T18:00:00Z",
      status: "published",
      isPremium: false,
      tags: ["acoustic", "live", "performance"]
    },
    {
      id: "3",
      title: "New Song Demo: Thunder Road",
      type: "music",
      content: "https://example.com/audio/thunder-road-demo",
      excerpt: "First listen to an upcoming track.",
      author: "Kelvin Creekman",
      publishDate: "2024-12-20T12:00:00Z",
      status: "draft",
      isPremium: true,
      tags: ["demo", "new-music", "thunder-road"]
    }
  ])
  
  const [form, setForm] = useState<Omit<Content, "id" | "tags"> & { id?: string; tagsString: string }>({
    title: "",
    type: "article",
    content: "",
    excerpt: "",
    author: "",
    publishDate: "",
    status: "draft",
    isPremium: false,
    tagsString: ""
  })
  const [isEditing, setIsEditing] = useState(false)

  const handleChange = (field: string, value: any) => {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const tags = form.tagsString.split(",").map(tag => tag.trim()).filter(Boolean)
    
    if (isEditing && form.id) {
      setContents(prev => prev.map(content => 
        content.id === form.id 
          ? { ...form, id: content.id, tags } as Content 
          : content
      ))
      toast({ title: "Content Updated", description: `${form.title} has been updated.` })
    } else {
      const newContent: Content = {
        ...form,
        id: String(Date.now()),
        tags,
        publishDate: form.publishDate || new Date().toISOString()
      } as Content
      setContents(prev => [...prev, newContent])
      toast({ title: "Content Created", description: `${form.title} has been created.` })
    }
    resetForm()
  }

  const handleEdit = (content: Content) => {
    setForm({
      ...content,
      tagsString: content.tags.join(", ")
    })
    setIsEditing(true)
  }

  const handleDelete = (id: string) => {
    setContents(prev => prev.filter(content => content.id !== id))
    toast({ title: "Content Deleted", description: "Content has been removed." })
  }

  const resetForm = () => {
    setForm({
      title: "",
      type: "article",
      content: "",
      excerpt: "",
      author: "",
      publishDate: "",
      status: "draft",
      isPremium: false,
      tagsString: ""
    })
    setIsEditing(false)
  }

  const publishedCount = contents.filter(c => c.status === "published").length
  const premiumCount = contents.filter(c => c.isPremium).length

  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-card/50 backdrop-blur-sm border-kelvin-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Content</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{contents.length}</div>
          </CardContent>
        </Card>
        
        <Card className="bg-card/50 backdrop-blur-sm border-kelvin-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Published</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{publishedCount}</div>
          </CardContent>
        </Card>
        
        <Card className="bg-card/50 backdrop-blur-sm border-kelvin-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Premium Content</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{premiumCount}</div>
          </CardContent>
        </Card>
        
        <Card className="bg-card/50 backdrop-blur-sm border-kelvin-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Drafts</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{contents.filter(c => c.status === "draft").length}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-1 bg-card/50 backdrop-blur-sm border-kelvin-border">
          <CardHeader>
            <CardTitle>{isEditing ? "Edit Content" : "Create New Content"}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input 
                  id="title" 
                  value={form.title} 
                  onChange={(e) => handleChange("title", e.target.value)} 
                  required 
                />
              </div>
              <div>
                <Label htmlFor="type">Content Type</Label>
                <Select value={form.type} onValueChange={(value) => handleChange("type", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="article">Article</SelectItem>
                    <SelectItem value="video">Video</SelectItem>
                    <SelectItem value="music">Music</SelectItem>
                    <SelectItem value="image">Image</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="author">Author</Label>
                <Input 
                  id="author" 
                  value={form.author} 
                  onChange={(e) => handleChange("author", e.target.value)} 
                  required 
                />
              </div>
              <div>
                <Label htmlFor="excerpt">Excerpt</Label>
                <Textarea 
                  id="excerpt" 
                  value={form.excerpt} 
                  onChange={(e) => handleChange("excerpt", e.target.value)} 
                  required 
                />
              </div>
              <div>
                <Label htmlFor="content">Content</Label>
                <Textarea 
                  id="content" 
                  value={form.content} 
                  onChange={(e) => handleChange("content", e.target.value)} 
                  rows={6}
                  required 
                />
              </div>
              <div>
                <Label htmlFor="tagsString">Tags (comma-separated)</Label>
                <Input 
                  id="tagsString" 
                  value={form.tagsString} 
                  onChange={(e) => handleChange("tagsString", e.target.value)} 
                  placeholder="tag1, tag2, tag3"
                />
              </div>
              <div>
                <Label htmlFor="status">Status</Label>
                <Select value={form.status} onValueChange={(value) => handleChange("status", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="archived">Archived</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="isPremium"
                  checked={form.isPremium}
                  onCheckedChange={(checked) => handleChange("isPremium", checked)}
                />
                <Label htmlFor="isPremium">Premium Content</Label>
              </div>
              <div className="flex gap-2">
                <Button type="submit" className="flex-1">
                  {isEditing ? "Update Content" : "Create Content"}
                </Button>
                <Button type="button" variant="outline" onClick={resetForm} className="flex-1">
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2 bg-card/50 backdrop-blur-sm border-kelvin-border">
          <CardHeader>
            <CardTitle>Content Library</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Author</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Premium</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {contents.map((content) => (
                    <TableRow key={content.id}>
                      <TableCell className="font-medium">{content.title}</TableCell>
                      <TableCell className="capitalize">{content.type}</TableCell>
                      <TableCell>{content.author}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded text-xs ${
                          content.status === 'published' 
                            ? 'bg-green-100 text-green-800' 
                            : content.status === 'draft'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {content.status}
                        </span>
                      </TableCell>
                      <TableCell>{content.isPremium ? "Yes" : "No"}</TableCell>
                      <TableCell>{new Date(content.publishDate).toLocaleDateString()}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="icon" onClick={() => handleEdit(content)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="destructive" size="icon" onClick={() => handleDelete(content.id)}>
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
