"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/hooks/use-toast"
import { Loader2, PlusCircle, Edit, Trash2 } from "lucide-react"

interface ContentItem {
  id: string
  title: string
  description: string | null
  type: string
  url: string
  access_level: string
  created_at: string
  updated_at: string
}

export function AdminContentManagement() {
  const supabase = createClient()
  const [content, setContent] = useState<ContentItem[]>([])
  const [loading, setLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [currentContent, setCurrentContent] = useState<ContentItem | null>(null)
  const [form, setForm] = useState({
    title: "",
    description: "",
    type: "video",
    url: "",
    access_level: "free",
  })

  useEffect(() => {
    fetchContent()
  }, [])

  const fetchContent = async () => {
    setLoading(true)
    const { data, error } = await supabase.from("content").select("*").order("created_at", { ascending: false })
    if (error) {
      console.error("Error fetching content:", error)
      toast({
        title: "Error",
        description: "Failed to load content.",
        variant: "destructive",
      })
    } else {
      setContent(data || [])
    }
    setLoading(false)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleAddEditContent = async () => {
    if (!form.title || !form.url || !form.type || !form.access_level) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    setLoading(true)
    let error = null
    if (currentContent) {
      // Update existing content
      const { error: updateError } = await supabase
        .from("content")
        .update({
          title: form.title,
          description: form.description,
          type: form.type,
          url: form.url,
          access_level: form.access_level,
          updated_at: new Date().toISOString(),
        })
        .eq("id", currentContent.id)
      error = updateError
    } else {
      // Add new content
      const { error: insertError } = await supabase.from("content").insert({
        title: form.title,
        description: form.description,
        type: form.type,
        url: form.url,
        access_level: form.access_level,
      })
      error = insertError
    }

    if (error) {
      console.error("Error saving content:", error)
      toast({
        title: "Error",
        description: `Failed to save content: ${error.message}`,
        variant: "destructive",
      })
    } else {
      toast({
        title: "Success",
        description: `Content ${currentContent ? "updated" : "added"} successfully.`,
      })
      setIsDialogOpen(false)
      fetchContent()
    }
    setLoading(false)
  }

  const handleDeleteContent = async (id: string) => {
    if (!confirm("Are you sure you want to delete this content?")) return

    setLoading(true)
    const { error } = await supabase.from("content").delete().eq("id", id)
    if (error) {
      console.error("Error deleting content:", error)
      toast({
        title: "Error",
        description: `Failed to delete content: ${error.message}`,
        variant: "destructive",
      })
    } else {
      toast({
        title: "Success",
        description: "Content deleted successfully.",
      })
      fetchContent()
    }
    setLoading(false)
  }

  const openEditDialog = (contentItem: ContentItem) => {
    setCurrentContent(contentItem)
    setForm({
      title: contentItem.title,
      description: contentItem.description || "",
      type: contentItem.type,
      url: contentItem.url,
      access_level: contentItem.access_level,
    })
    setIsDialogOpen(true)
  }

  const openAddDialog = () => {
    setCurrentContent(null)
    setForm({
      title: "",
      description: "",
      type: "video",
      url: "",
      access_level: "free",
    })
    setIsDialogOpen(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Content Management</h1>
        <Button onClick={openAddDialog}>
          <PlusCircle className="mr-2 h-4 w-4" /> Add New Content
        </Button>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{currentContent ? "Edit Content" : "Add New Content"}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input
                id="title"
                name="title"
                value={form.title}
                onChange={handleInputChange}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Textarea
                id="description"
                name="description"
                value={form.description}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="type" className="text-right">
                Type
              </Label>
              <Select value={form.type} onValueChange={(value) => handleSelectChange("type", value)}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select content type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="video">Video</SelectItem>
                  <SelectItem value="audio">Audio</SelectItem>
                  <SelectItem value="blog">Blog</SelectItem>
                  <SelectItem value="image">Image</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="url" className="text-right">
                URL
              </Label>
              <Input
                id="url"
                name="url"
                value={form.url}
                onChange={handleInputChange}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="access_level" className="text-right">
                Access Level
              </Label>
              <Select value={form.access_level} onValueChange={(value) => handleSelectChange("access_level", value)}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select access level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="free">Free</SelectItem>
                  <SelectItem value="premium">Premium</SelectItem>
                  <SelectItem value="vip">VIP</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => setIsDialogOpen(false)} variant="outline">
              Cancel
            </Button>
            <Button onClick={handleAddEditContent} disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {currentContent ? "Save Changes" : "Add Content"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : content.length === 0 ? (
        <p className="text-center text-muted-foreground">No content found. Add some above!</p>
      ) : (
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Access Level</TableHead>
                <TableHead>URL</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {content.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.title}</TableCell>
                  <TableCell>{item.type}</TableCell>
                  <TableCell>{item.access_level}</TableCell>
                  <TableCell className="truncate max-w-[200px]">{item.url}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => openEditDialog(item)}>
                      <Edit className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDeleteContent(item.id)}>
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  )
}
