"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { toast } from "@/hooks/use-toast"
import { Loader2, Edit, Trash } from "lucide-react"

interface Event {
  id: number
  title: string
  date: string
  time: string
  location: string
  description: string
  price: number
  isPremium: boolean
}

export function AdminEventManagement() {
  const [events, setEvents] = useState<Event[]>([
    {
      id: 1,
      title: "Electrifying Live Show 1",
      date: "2024-10-26",
      time: "20:00",
      location: "The Electric Venue, Los Angeles, CA",
      description: "Join Kelvin Creekman for an unforgettable live performance!",
      price: 50.0,
      isPremium: false,
    },
    {
      id: 2,
      title: "Premium Fan Meetup",
      date: "2024-11-15",
      time: "18:00",
      location: "Online (Zoom)",
      description: "Exclusive Q&A session for Premium Fans.",
      price: 0.0,
      isPremium: true,
    },
  ])
  const [newEvent, setNewEvent] = useState<Omit<Event, "id">>({
    title: "",
    date: "",
    time: "",
    location: "",
    description: "",
    price: 0,
    isPremium: false,
  })
  const [editingEventId, setEditingEventId] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement
    setNewEvent((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    if (editingEventId) {
      // Update existing event
      setEvents((prev) =>
        prev.map((event) => (event.id === editingEventId ? { ...newEvent, id: editingEventId } : event)),
      )
      toast({
        title: "Event Updated",
        description: `${newEvent.title} has been updated.`,
        variant: "success",
      })
    } else {
      // Add new event
      const id = events.length > 0 ? Math.max(...events.map((e) => e.id)) + 1 : 1
      setEvents((prev) => [...prev, { ...newEvent, id }])
      toast({
        title: "Event Added",
        description: `${newEvent.title} has been added.`,
        variant: "success",
      })
    }

    setNewEvent({
      title: "",
      date: "",
      time: "",
      location: "",
      description: "",
      price: 0,
      isPremium: false,
    })
    setEditingEventId(null)
    setLoading(false)
  }

  const handleEdit = (event: Event) => {
    setNewEvent(event)
    setEditingEventId(event.id)
  }

  const handleDelete = (id: number) => {
    setEvents((prev) => prev.filter((event) => event.id !== id))
    toast({
      title: "Event Deleted",
      description: "The event has been removed.",
      variant: "destructive",
    })
  }

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>{editingEventId ? "Edit Event" : "Add New Event"}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="title">Event Title</Label>
              <Input id="title" name="title" value={newEvent.title} onChange={handleInputChange} required />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="date">Date</Label>
                <Input id="date" name="date" type="date" value={newEvent.date} onChange={handleInputChange} required />
              </div>
              <div>
                <Label htmlFor="time">Time</Label>
                <Input id="time" name="time" type="time" value={newEvent.time} onChange={handleInputChange} required />
              </div>
            </div>
            <div>
              <Label htmlFor="location">Location</Label>
              <Input id="location" name="location" value={newEvent.location} onChange={handleInputChange} required />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={newEvent.description}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                name="price"
                type="number"
                step="0.01"
                value={newEvent.price}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="flex items-center space-x-2">
              <Input
                id="isPremium"
                name="isPremium"
                type="checkbox"
                checked={newEvent.isPremium}
                onChange={handleInputChange}
                className="h-4 w-4"
              />
              <Label htmlFor="isPremium">Premium Event</Label>
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : editingEventId ? (
                "Update Event"
              ) : (
                "Add Event"
              )}
            </Button>
            {editingEventId && (
              <Button
                variant="outline"
                className="w-full mt-2 bg-transparent"
                onClick={() => {
                  setEditingEventId(null)
                  setNewEvent({
                    title: "",
                    date: "",
                    time: "",
                    location: "",
                    description: "",
                    price: 0,
                    isPremium: false,
                  })
                }}
              >
                Cancel Edit
              </Button>
            )}
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Existing Events</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Premium</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {events.map((event) => (
                <TableRow key={event.id}>
                  <TableCell className="font-medium">{event.title}</TableCell>
                  <TableCell>{event.date}</TableCell>
                  <TableCell>{event.time}</TableCell>
                  <TableCell>{event.location}</TableCell>
                  <TableCell>${event.price.toFixed(2)}</TableCell>
                  <TableCell>{event.isPremium ? "Yes" : "No"}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(event)} className="mr-2">
                      <Edit className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button variant="destructive" size="icon" onClick={() => handleDelete(event.id)}>
                      <Trash className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
