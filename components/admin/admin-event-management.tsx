"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "sonner"
import { createClient } from "@/lib/supabase/client"
import { format } from "date-fns"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Pencil, Trash } from "lucide-react"

const eventSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  date: z.string().min(1, "Date is required"),
  location: z.string().min(1, "Location is required"),
  price: z.preprocess((val) => Number.parseFloat(String(val)), z.number().min(0, "Price must be non-negative")),
  isMeetGreet: z.boolean().default(false),
})

type EventFormValues = z.infer<typeof eventSchema>

interface Event {
  id: string
  title: string
  description: string | null
  date: string
  location: string
  price: number
  isMeetGreet: boolean
}

export function AdminEventManagement() {
  const supabase = createClient()
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(false)
  const [editingEvent, setEditingEvent] = useState<Event | null>(null)

  const form = useForm<EventFormValues>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      title: "",
      description: "",
      date: "",
      location: "",
      price: 0,
      isMeetGreet: false,
    },
  })

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

  const onSubmit = async (values: EventFormValues) => {
    setLoading(true)
    if (editingEvent) {
      // Update event
      const { error } = await supabase
        .from("Event")
        .update({
          title: values.title,
          description: values.description,
          date: values.date,
          location: values.location,
          price: values.price,
          isMeetGreet: values.isMeetGreet,
        })
        .eq("id", editingEvent.id)

      if (error) {
        toast.error("Error updating event: " + error.message)
      } else {
        toast.success("Event updated successfully!")
        setEditingEvent(null)
        form.reset()
        fetchEvents()
      }
    } else {
      // Create new event
      const { error } = await supabase.from("Event").insert([
        {
          title: values.title,
          description: values.description,
          date: values.date,
          location: values.location,
          price: values.price,
          isMeetGreet: values.isMeetGreet,
        },
      ])

      if (error) {
        toast.error("Error creating event: " + error.message)
      } else {
        toast.success("Event created successfully!")
        form.reset()
        fetchEvents()
      }
    }
    setLoading(false)
  }

  const handleEdit = (event: Event) => {
    setEditingEvent(event)
    form.reset({
      id: event.id,
      title: event.title,
      description: event.description || "",
      date: format(new Date(event.date), "yyyy-MM-dd'T'HH:mm"), // Format for datetime-local input
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
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <Card>
        <CardHeader>
          <CardTitle>{editingEvent ? "Edit Event" : "Create New Event"}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input id="title" {...form.register("title")} disabled={loading} />
              {form.formState.errors.title && (
                <p className="text-sm text-red-500">{form.formState.errors.title.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" {...form.register("description")} disabled={loading} />
              {form.formState.errors.description && (
                <p className="text-sm text-red-500">{form.formState.errors.description.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="date">Date & Time</Label>
              <Input id="date" type="datetime-local" {...form.register("date")} disabled={loading} />
              {form.formState.errors.date && (
                <p className="text-sm text-red-500">{form.formState.errors.date.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="location">Location</Label>
              <Input id="location" {...form.register("location")} disabled={loading} />
              {form.formState.errors.location && (
                <p className="text-sm text-red-500">{form.formState.errors.location.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="price">Price</Label>
              <Input id="price" type="number" step="0.01" {...form.register("price")} disabled={loading} />
              {form.formState.errors.price && (
                <p className="text-sm text-red-500">{form.formState.errors.price.message}</p>
              )}
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="isMeetGreet"
                checked={form.watch("isMeetGreet")}
                onCheckedChange={(checked) => form.setValue("isMeetGreet", !!checked)}
                disabled={loading}
              />
              <Label htmlFor="isMeetGreet">Is this a Meet & Greet session?</Label>
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Saving..." : editingEvent ? "Update Event" : "Create Event"}
            </Button>
            {editingEvent && (
              <Button
                variant="outline"
                className="w-full mt-2 bg-transparent"
                onClick={() => {
                  setEditingEvent(null)
                  form.reset()
                }}
                disabled={loading}
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
          {loading ? (
            <p>Loading events...</p>
          ) : events.length === 0 ? (
            <p>No events found.</p>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {events.map((event) => (
                    <TableRow key={event.id}>
                      <TableCell className="font-medium">{event.title}</TableCell>
                      <TableCell>{format(new Date(event.date), "MMM dd, yyyy HH:mm")}</TableCell>
                      <TableCell>{event.location}</TableCell>
                      <TableCell>${event.price.toFixed(2)}</TableCell>
                      <TableCell>{event.isMeetGreet ? "Meet & Greet" : "Concert"}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="icon" onClick={() => handleEdit(event)}>
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button variant="destructive" size="icon" onClick={() => handleDelete(event.id)}>
                            <Trash className="h-4 w-4" />
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
