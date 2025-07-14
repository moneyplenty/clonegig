"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import type { Content } from "@/types/index.d"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { toast } from "@/hooks/use-toast"
import { PlusCircle, Edit, Trash2 } from "lucide-react"

export function AdminContentManagement() {
  const supabase = createClient()
  const [content, setContent] = useState<Content[]>([])
  const [loading, setLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [currentContent, setCurrentContent] = useState<Content | null>(null)
  const [formData, setFormData] = useState({
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
      console.error("Error fetching content:", error.message)
      toast({
        title: "Error",
        description: "Failed to fetch content.",
        variant: "destructive",
      })
    } else {
      setContent(data || [])
    }
    setLoading(false)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleSelectChange = (id: string, value: string) => {
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    if (currentContent) {
      // Update existing content
      const { error } = await supabase.from("content").update(formData).eq("id", currentContent.id)

      if (error) {
        console.error("Error updating content:", error.message)
        toast({
          title: "Error",
          description: "Failed to update content.",
          variant: "destructive",
        })
      } else {
        toast({
          title: "Success",
          description: "Content updated successfully.",
        })
        setIsDialogOpen(false)
        fetchContent()
      }
    } else {
      // Add new content
      const { error } = await supabase.from("content").insert(formData)

      if (error) {
        console.error("Error adding content:", error.message)
        toast({
          title: "Error",
          description: "Failed to add content.",
          variant: "destructive",
        })
      } else {
        toast({
          title: "Success",
          description: "Content added successfully.",
        })
        setIsDialogOpen(false)
        fetchContent()
      }
    }
    setLoading(false)
  }

  const handleDeleteContent = async (id: string) => {
    if (!confirm("Are you sure you want to delete this content?")) return

    setLoading(true)
    const { error } = await supabase.from("content").delete().eq("id", id)

    if (error) {
      console.error("Error deleting content:", error.message)
      toast({
        title: "Error",
        description: "Failed to delete content.",
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

  const openAddDialog = () => {
    setCurrentContent(null)
    setFormData({
      title: "",
      description: "",
      type: "video",
      url: "",
      access_level: "free",
    })
    setIsDialogOpen(true)
  }

  const openEditDialog = (content: Content) => {
    setCurrentContent(content)
    setFormData({
      title: content.title,
      description: content.description || "",
      type: content.type,
      url: content.url,
      access_level: content.access_level,
    })
    setIsDialogOpen(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Content Management</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openAddDialog}>
              <PlusCircle className="mr-2 h-4 w-4" /> Add New Content
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>{currentContent ? "Edit Content" : "Add New Content"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleFormSubmit} className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                  Title
                </Label>
                <Input id="title" value={formData.title} onChange={handleInputChange} className="col-span-3" required />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="type" className="text-right">
                  Type
                </Label>
                <Select value={formData.type} onValueChange={(value) => handleSelectChange("type", value)}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select content type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="video">Video</SelectItem>
                    <SelectItem value="article">Article</SelectItem>
                    <SelectItem value="audio">Audio</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="url" className="text-right">
                  URL
                </Label>
                <Input id="url" value={formData.url} onChange={handleInputChange} className="col-span-3" required />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="access_level" className="text-right">
                  Access Level
                </Label>
                <Select
                  value={formData.access_level}
                  onValueChange={(value) => handleSelectChange("access_level", value)}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select access level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="free">Free</SelectItem>
                    <SelectItem value="fan">Fan</SelectItem>
                    <SelectItem value="super_fan">Super Fan</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Saving..." : currentContent ? "Save Changes" : "Add Content"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {loading ? (
        <p>Loading content...</p>
      ) : (
        <div className="rounded-md border">
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
                  <TableCell className="capitalize">{item.type}</TableCell>
                  <TableCell className="capitalize">{item.access_level.replace("_", " ")}</TableCell>
                  <TableCell className="truncate max-w-[200px]">{item.url}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => openEditDialog(item)}>
                      <Edit className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDeleteContent(item.id)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
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
