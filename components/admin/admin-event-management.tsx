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
import { format } from "date-fns"
import { CalendarIcon, Edit, Trash } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Checkbox } from "@/components/ui/checkbox"

interface Event {
  id: string
  title: string
  date: string // ISO string
  location: string
  description: string
  image: string
  ticketPrice: number
  isPremium: boolean
}

export function AdminEventManagement() {
  const [events, setEvents] = useState<Event[]>([
    {
      id: "1",
      title: "Kelvin Creekman Live in Concert",
      date: "2024-10-26T20:00:00Z",
      location: "The Electric Venue, New York, NY",
      description: "An electrifying live performance.",
      image: "/placeholder.svg?height=200&width=300",
      ticketPrice: 75.0,
      isPremium: false,
    },
    {
      id: "2",
      title: "Acoustic Set & Storytelling",
      date: "2024-11-10T18:00:00Z",
      location: "The Blue Note, Chicago, IL",
      description: "An intimate acoustic evening.",
      image: "/placeholder.svg?height=200&width=300",
      ticketPrice: 50.0,
      isPremium: true,
    },
  ])
  const [form, setForm] = useState<Omit<Event, "id"> & { id?: string }>({
    title: "",
    date: "",
    location: "",
    description: "",
    image: "",
    ticketPrice: 0,
    isPremium: false,
  })
  const [isEditing, setIsEditing] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleDateChange = (date: Date | undefined) => {
    setForm((prev) => ({
      ...prev,
      date: date ? date.toISOString() : "",
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (isEditing && form.id) {
      setEvents((prev) => prev.map((event) => (event.id === form.id ? ({ ...form, id: event.id } as Event) : event)))
      toast({ title: "Event Updated", description: `${form.title} has been updated.` })
    } else {
      const newEvent: Event = { ...form, id: String(Date.now()) } as Event
      setEvents((prev) => [...prev, newEvent])
      toast({ title: "Event Added", description: `${form.title} has been added.` })
    }
    resetForm()
  }

  const handleEdit = (event: Event) => {
    setForm(event)
    setIsEditing(true)
  }

  const handleDelete = (id: string) => {
    setEvents((prev) => prev.filter((event) => event.id !== id))
    toast({ title: "Event Deleted", description: "Event has been removed." })
  }

  const resetForm = () => {
    setForm({
      title: "",
      date: "",
      location: "",
      description: "",
      image: "",
      ticketPrice: 0,
      isPremium: false,
    })
    setIsEditing(false)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <Card className="lg:col-span-1 bg-card/50 backdrop-blur-sm border-kelvin-border">
        <CardHeader>
          <CardTitle>{isEditing ? "Edit Event" : "Add New Event"}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input id="title" name="title" value={form.title} onChange={handleChange} required />
            </div>
            <div>
              <Label htmlFor="date">Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant={"outline"} className="w-full justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {form.date ? format(new Date(form.date), "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={form.date ? new Date(form.date) : undefined}
                    onSelect={handleDateChange}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div>
              <Label htmlFor="location">Location</Label>
              <Input id="location" name="location" value={form.location} onChange={handleChange} required />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" name="description" value={form.description} onChange={handleChange} required />
            </div>
            <div>
              <Label htmlFor="image">Image URL</Label>
              <Input
                id="image"
                name="image"
                value={form.image}
                onChange={handleChange}
                placeholder="/placeholder.svg"
              />
            </div>
            <div>
              <Label htmlFor="ticketPrice">Ticket Price</Label>
              <Input
                id="ticketPrice"
                name="ticketPrice"
                type="number"
                value={form.ticketPrice}
                onChange={handleChange}
                step="0.01"
                required
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="isPremium"
                name="isPremium"
                checked={form.isPremium}
                onCheckedChange={(checked) =>
                  handleChange({
                    target: { name: "isPremium", type: "checkbox", checked },
                  } as React.ChangeEvent<HTMLInputElement>)
                }
              />
              <Label htmlFor="isPremium">Premium Event</Label>
            </div>
            <div className="flex gap-2">
              <Button type="submit" className="flex-1">
                {isEditing ? "Update Event" : "Add Event"}
              </Button>
              <Button type="button" variant="outline" onClick={resetForm} className="flex-1 bg-transparent">
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card className="lg:col-span-2 bg-card/50 backdrop-blur-sm border-kelvin-border">
        <CardHeader>
          <CardTitle>Existing Events</CardTitle>
        </CardHeader>
        <CardContent>
          {events.length === 0 ? (
            <p className="text-muted-foreground">No events added yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Date</TableHead>
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
                      <TableCell>{format(new Date(event.date), "MMM dd, yyyy")}</TableCell>
                      <TableCell>{event.location}</TableCell>
                      <TableCell>${event.ticketPrice.toFixed(2)}</TableCell>
                      <TableCell>{event.isPremium ? "Yes" : "No"}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="icon" onClick={() => handleEdit(event)}>
                            <Edit className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                          </Button>
                          <Button variant="destructive" size="icon" onClick={() => handleDelete(event.id)}>
                            <Trash className="h-4 w-4" />
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
