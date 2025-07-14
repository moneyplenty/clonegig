"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import type { Event } from "@/types/index.d"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { toast } from "@/hooks/use-toast"
import { PlusCircle, Edit, Trash2 } from "lucide-react"
import { format } from "date-fns"

const formatPrice = (price: number) => `$${price.toFixed(2)}`

export function AdminEventManagement() {
  const supabase = createClient()
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [currentEvent, setCurrentEvent] = useState<Event | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    date: "", // ISO string for datetime-local input
    location: "",
    price: 0,
    max_attendees: 0,
  })

  useEffect(() => {
    fetchEvents()
  }, [])

  const fetchEvents = async () => {
    setLoading(true)
    const { data, error } = await supabase.from("events").select("*").order("date", { ascending: false })
    if (error) {
      console.error("Error fetching events:", error.message)
      toast({
        title: "Error",
        description: "Failed to fetch events.",
        variant: "destructive",
      })
    } else {
      setEvents(data || [])
    }
    setLoading(false)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleNumberInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: Number.parseFloat(value) || 0 }))
  }

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const eventData = {
      ...formData,
      date: new Date(formData.date).toISOString(), // Ensure date is ISO string for Supabase
    }

    if (currentEvent) {
      // Update existing event
      const { error } = await supabase.from("events").update(eventData).eq("id", currentEvent.id)

      if (error) {
        console.error("Error updating event:", error.message)
        toast({
          title: "Error",
          description: "Failed to update event.",
          variant: "destructive",
        })
      } else {
        toast({
          title: "Success",
          description: "Event updated successfully.",
        })
        setIsDialogOpen(false)
        fetchEvents()
      }
    } else {
      // Add new event
      const { error } = await supabase.from("events").insert(eventData)

      if (error) {
        console.error("Error adding event:", error.message)
        toast({
          title: "Error",
          description: "Failed to add event.",
          variant: "destructive",
        })
      } else {
        toast({
          title: "Success",
          description: "Event added successfully.",
        })
        setIsDialogOpen(false)
        fetchEvents()
      }
    }
    setLoading(false)
  }

  const handleDeleteEvent = async (id: string) => {
    if (!confirm("Are you sure you want to delete this event?")) return

    setLoading(true)
    const { error } = await supabase.from("events").delete().eq("id", id)

    if (error) {
      console.error("Error deleting event:", error.message)
      toast({
        title: "Error",
        description: "Failed to delete event.",
        variant: "destructive",
      })
    } else {
      toast({
        title: "Success",
        description: "Event deleted successfully.",
      })
      fetchEvents()
    }
    setLoading(false)
  }

  const openAddDialog = () => {
    setCurrentEvent(null)
    setFormData({
      name: "",
      description: "",
      date: "",
      location: "",
      price: 0,
      max_attendees: 0,
    })
    setIsDialogOpen(true)
  }

  const openEditDialog = (event: Event) => {
    setCurrentEvent(event)
    setFormData({
      name: event.name,
      description: event.description || "",
      date: event.date ? format(new Date(event.date), "yyyy-MM-dd'T'HH:mm") : "", // Format for datetime-local
      location: event.location || "",
      price: event.price || 0,
      max_attendees: event.max_attendees || 0,
    })
    setIsDialogOpen(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Event Management</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openAddDialog}>
              <PlusCircle className="mr-2 h-4 w-4" /> Add New Event
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>{currentEvent ? "Edit Event" : "Add New Event"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleFormSubmit} className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input id="name" value={formData.name} onChange={handleInputChange} className="col-span-3" required />
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
                <Label htmlFor="date" className="text-right">
                  Date & Time
                </Label>
                <Input
                  id="date"
                  type="datetime-local"
                  value={formData.date}
                  onChange={handleInputChange}
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="location" className="text-right">
                  Location
                </Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="price" className="text-right">
                  Price
                </Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={handleNumberInputChange}
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="max_attendees" className="text-right">
                  Max Attendees
                </Label>
                <Input
                  id="max_attendees"
                  type="number"
                  value={formData.max_attendees}
                  onChange={handleNumberInputChange}
                  className="col-span-3"
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Saving..." : currentEvent ? "Save Changes" : "Add Event"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {loading ? (
        <p>Loading events...</p>
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Max Attendees</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {events.map((event) => (
                <TableRow key={event.id}>
                  <TableCell className="font-medium">{event.name}</TableCell>
                  <TableCell>{format(new Date(event.date), "PPP p")}</TableCell>
                  <TableCell>{event.location}</TableCell>
                  <TableCell>{event.price ? formatPrice(event.price) : "Free"}</TableCell>
                  <TableCell>{event.max_attendees}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => openEditDialog(event)}>
                      <Edit className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDeleteEvent(event.id)}>
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
