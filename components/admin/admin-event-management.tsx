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
import { toast } from "@/hooks/use-toast"
import { Loader2, PlusCircle, Edit, Trash2 } from "lucide-react"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"

interface EventItem {
  id: string
  name: string
  description: string | null
  date: string
  location: string
  ticket_price: number | null
  image_url: string | null
  created_at: string
  updated_at: string
}

export function AdminEventManagement() {
  const supabase = createClient()
  const [events, setEvents] = useState<EventItem[]>([])
  const [loading, setLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [currentEvent, setCurrentEvent] = useState<EventItem | null>(null)
  const [form, setForm] = useState({
    name: "",
    description: "",
    date: new Date(),
    location: "",
    ticket_price: 0,
    image_url: "",
  })

  useEffect(() => {
    fetchEvents()
  }, [])

  const fetchEvents = async () => {
    setLoading(true)
    const { data, error } = await supabase.from("events").select("*").order("date", { ascending: false })
    if (error) {
      console.error("Error fetching events:", error)
      toast({
        title: "Error",
        description: "Failed to load events.",
        variant: "destructive",
      })
    } else {
      setEvents(data || [])
    }
    setLoading(false)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: name === "ticket_price" ? Number.parseFloat(value) : value }))
  }

  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      setForm((prev) => ({ ...prev, date }))
    }
  }

  const handleAddEditEvent = async () => {
    if (!form.name || !form.date || !form.location) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields (Name, Date, Location).",
        variant: "destructive",
      })
      return
    }

    setLoading(true)
    let error = null
    const eventData = {
      name: form.name,
      description: form.description,
      date: form.date.toISOString(),
      location: form.location,
      ticket_price: form.ticket_price,
      image_url: form.image_url,
      updated_at: new Date().toISOString(),
    }

    if (currentEvent) {
      // Update existing event
      const { error: updateError } = await supabase.from("events").update(eventData).eq("id", currentEvent.id)
      error = updateError
    } else {
      // Add new event
      const { error: insertError } = await supabase.from("events").insert(eventData)
      error = insertError
    }

    if (error) {
      console.error("Error saving event:", error)
      toast({
        title: "Error",
        description: `Failed to save event: ${error.message}`,
        variant: "destructive",
      })
    } else {
      toast({
        title: "Success",
        description: `Event ${currentEvent ? "updated" : "added"} successfully.`,
      })
      setIsDialogOpen(false)
      fetchEvents()
    }
    setLoading(false)
  }

  const handleDeleteEvent = async (id: string) => {
    if (!confirm("Are you sure you want to delete this event?")) return

    setLoading(true)
    const { error } = await supabase.from("events").delete().eq("id", id)
    if (error) {
      console.error("Error deleting event:", error)
      toast({
        title: "Error",
        description: `Failed to delete event: ${error.message}`,
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

  const openEditDialog = (eventItem: EventItem) => {
    setCurrentEvent(eventItem)
    setForm({
      name: eventItem.name,
      description: eventItem.description || "",
      date: new Date(eventItem.date),
      location: eventItem.location,
      ticket_price: eventItem.ticket_price || 0,
      image_url: eventItem.image_url || "",
    })
    setIsDialogOpen(true)
  }

  const openAddDialog = () => {
    setCurrentEvent(null)
    setForm({
      name: "",
      description: "",
      date: new Date(),
      location: "",
      ticket_price: 0,
      image_url: "",
    })
    setIsDialogOpen(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Event Management</h1>
        <Button onClick={openAddDialog}>
          <PlusCircle className="mr-2 h-4 w-4" /> Add New Event
        </Button>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{currentEvent ? "Edit Event" : "Add New Event"}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                name="name"
                value={form.name}
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
              <Label htmlFor="date" className="text-right">
                Date
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "col-span-3 justify-start text-left font-normal",
                      !form.date && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {form.date ? format(form.date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={form.date} onSelect={handleDateChange} initialFocus />
                </PopoverContent>
              </Popover>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="location" className="text-right">
                Location
              </Label>
              <Input
                id="location"
                name="location"
                value={form.location}
                onChange={handleInputChange}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="ticket_price" className="text-right">
                Ticket Price
              </Label>
              <Input
                id="ticket_price"
                name="ticket_price"
                type="number"
                step="0.01"
                value={form.ticket_price}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="image_url" className="text-right">
                Image URL
              </Label>
              <Input
                id="image_url"
                name="image_url"
                value={form.image_url}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => setIsDialogOpen(false)} variant="outline">
              Cancel
            </Button>
            <Button onClick={handleAddEditEvent} disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {currentEvent ? "Save Changes" : "Add Event"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : events.length === 0 ? (
        <p className="text-center text-muted-foreground">No events found. Add some above!</p>
      ) : (
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Price</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {events.map((event) => (
                <TableRow key={event.id}>
                  <TableCell className="font-medium">{event.name}</TableCell>
                  <TableCell>{format(new Date(event.date), "PPP")}</TableCell>
                  <TableCell>{event.location}</TableCell>
                  <TableCell>${event.ticket_price?.toFixed(2) || "0.00"}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => openEditDialog(event)}>
                      <Edit className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDeleteEvent(event.id)}>
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
