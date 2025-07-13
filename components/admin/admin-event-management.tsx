"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Icons } from "@/components/icons"
import { toast } from "sonner"
import { createClient } from "@/lib/supabase/client"
import type { Event } from "@/types"

export function AdminEventManagement() {
  const supabase = createClient()
  const [events, setEvents] = useState<Event[]>([])
  const [newEvent, setNewEvent] = useState<Partial<Event>>({
    title: "",
    description: "",
    date: new Date(),
    location: "",
    price: 0,
    isMeetGreet: false,
  })
  const [editingEventId, setEditingEventId] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchEvents()
  }, [])

  const fetchEvents = async () => {
    setLoading(true)
    const { data, error } = await supabase.from("Event").select("*").order("date", { ascending: true })
    if (error) {
      toast.error("Error fetching events: " + error.message)
    } else {
      setEvents(data || [])
    }
    setLoading(false)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setNewEvent((prev) => ({ ...prev, [id]: value }))
  }

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewEvent((prev) => ({ ...prev, date: new Date(e.target.value) }))
  }

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewEvent((prev) => ({ ...prev, price: Number.parseFloat(e.target.value) || 0 }))
  }

  const handleCheckboxChange = (checked: boolean) => {
    setNewEvent((prev) => ({ ...prev, isMeetGreet: checked }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    if (editingEventId) {
      // Update event
      const { error } = await supabase
        .from("Event")
        .update({
          title: newEvent.title,
          description: newEvent.description,
          date: newEvent.date?.toISOString(),
          location: newEvent.location,
          price: newEvent.price,
          isMeetGreet: newEvent.isMeetGreet,
        })
        .eq("id", editingEventId)

      if (error) {
        toast.error("Error updating event: " + error.message)
      } else {
        toast.success("Event updated successfully!")
        setEditingEventId(null)
        setNewEvent({
          title: "",
          description: "",
          date: new Date(),
          location: "",
          price: 0,
          isMeetGreet: false,
        })
        fetchEvents()
      }
    } else {
      // Add new event
      const { error } = await supabase.from("Event").insert({
        title: newEvent.title!,
        description: newEvent.description,
        date: newEvent.date!.toISOString(),
        location: newEvent.location!,
        price: newEvent.price!,
        isMeetGreet: newEvent.isMeetGreet!,
      })

      if (error) {
        toast.error("Error adding event: " + error.message)
      } else {
        toast.success("Event added successfully!")
        setNewEvent({
          title: "",
          description: "",
          date: new Date(),
          location: "",
          price: 0,
          isMeetGreet: false,
        })
        fetchEvents()
      }
    }
    setLoading(false)
  }

  const handleEdit = (event: Event) => {
    setEditingEventId(event.id)
    setNewEvent({
      title: event.title,
      description: event.description || "",
      date: new Date(event.date),
      location: event.location,
      price: event.price,
      isMeetGreet: event.isMeetGreet,
    })
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this event?")) return

    setLoading(true)
    const { error } = await supabase.from("Event").delete().eq("id", id)
    if (error) {
      toast.error("Error deleting event: " + error.message)
    } else {
      toast.success("Event deleted successfully!")
      fetchEvents()
    }
    setLoading(false)
  }

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <Card className="bg-kelvin-card text-kelvin-card-foreground border-kelvin-border shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">{editingEventId ? "Edit Event" : "Add New Event"}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="title">Event Title</Label>
              <Input
                id="title"
                value={newEvent.title || ""}
                onChange={handleInputChange}
                required
                className="bg-kelvin-input text-kelvin-foreground border-kelvin-border"
                disabled={loading}
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={newEvent.description || ""}
                onChange={handleInputChange}
                className="bg-kelvin-input text-kelvin-foreground border-kelvin-border"
                disabled={loading}
              />
            </div>
            <div>
              <Label htmlFor="date">Date & Time</Label>
              <Input
                id="date"
                type="datetime-local"
                value={newEvent.date ? new Date(newEvent.date).toISOString().slice(0, 16) : ""}
                onChange={handleDateChange}
                required
                className="bg-kelvin-input text-kelvin-foreground border-kelvin-border"
                disabled={loading}
              />
            </div>
            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={newEvent.location || ""}
                onChange={handleInputChange}
                required
                className="bg-kelvin-input text-kelvin-foreground border-kelvin-border"
                disabled={loading}
              />
            </div>
            <div>
              <Label htmlFor="price">Price ($)</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                value={newEvent.price || 0}
                onChange={handlePriceChange}
                className="bg-kelvin-input text-kelvin-foreground border-kelvin-border"
                disabled={loading}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="isMeetGreet"
                checked={newEvent.isMeetGreet}
                onCheckedChange={handleCheckboxChange}
                disabled={loading}
              />
              <Label htmlFor="isMeetGreet">Is Meet & Greet?</Label>
            </div>
            <Button
              type="submit"
              className="w-full bg-electric-500 hover:bg-electric-600 text-white"
              disabled={loading}
            >
              {loading ? (editingEventId ? "Updating..." : "Adding...") : editingEventId ? "Update Event" : "Add Event"}
            </Button>
            {editingEventId && (
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setEditingEventId(null)
                  setNewEvent({
                    title: "",
                    description: "",
                    date: new Date(),
                    location: "",
                    price: 0,
                    isMeetGreet: false,
                  })
                }}
                className="w-full mt-2 border-kelvin-border text-kelvin-foreground hover:bg-kelvin-card hover:text-kelvin-card-foreground"
                disabled={loading}
              >
                Cancel Edit
              </Button>
            )}
          </form>
        </CardContent>
      </Card>

      <Card className="bg-kelvin-card text-kelvin-card-foreground border-kelvin-border shadow-lg lg:col-span-1">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Existing Events</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center text-kelvin-foreground/80">Loading events...</div>
          ) : events.length === 0 ? (
            <div className="text-center text-kelvin-foreground/80">No events found.</div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>M&G</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {events.map((event) => (
                    <TableRow key={event.id}>
                      <TableCell className="font-medium">{event.title}</TableCell>
                      <TableCell>
                        {new Date(event.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </TableCell>
                      <TableCell>{event.location}</TableCell>
                      <TableCell>{event.isMeetGreet ? "Yes" : "No"}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="icon" onClick={() => handleEdit(event)} disabled={loading}>
                            <Icons.pencil className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                          </Button>
                          <Button
                            variant="destructive"
                            size="icon"
                            onClick={() => handleDelete(event.id)}
                            disabled={loading}
                          >
                            <Icons.trash className="h-4 w-4" />
                            <span className="sr-only">Delete</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
