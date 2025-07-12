"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { toast } from "@/components/ui/use-toast"
import { Loader2, Plus, Edit, Trash } from "lucide-react"
import { format } from "date-fns"

interface Event {
  id: string
  title: string
  date: string
  time: string
  location: string
  description: string
  imageUrl: string
  price: number
  ticketsAvailable: number
}

const initialEvents: Event[] = [
  {
    id: "1",
    title: "Ice Storm Album Launch Party",
    date: "2025-08-15",
    time: "19:00",
    location: "The Electric Venue, New York",
    description: "Join Kelvin Creekman for an electrifying night celebrating the launch of his new album, 'Ice Storm'.",
    imageUrl: "/placeholder.svg?height=400&width=600",
    price: 50.0,
    ticketsAvailable: 150,
  },
  {
    id: "2",
    title: "Acoustic Set & Q&A",
    date: "2025-09-01",
    time: "15:00",
    location: "The Frosty Lounge, Los Angeles",
    description: "An intimate acoustic performance followed by a Q&A session with Kelvin.",
    imageUrl: "/placeholder.svg?height=400&width=600",
    price: 35.0,
    ticketsAvailable: 50,
  },
]

export function AdminEventManagement() {
  const [events, setEvents] = useState<Event[]>(initialEvents)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [currentEvent, setCurrentEvent] = useState<Event | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setCurrentEvent((prev) => ({ ...prev!, [name]: value }))
  }

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseFloat(e.target.value)
    setCurrentEvent((prev) => ({ ...prev!, price: isNaN(value) ? 0 : value }))
  }

  const handleTicketsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseInt(e.target.value)
    setCurrentEvent((prev) => ({ ...prev!, ticketsAvailable: isNaN(value) ? 0 : value }))
  }

  const handleSaveEvent = async () => {
    if (
      !currentEvent ||
      !currentEvent.title ||
      !currentEvent.date ||
      !currentEvent.time ||
      !currentEvent.location ||
      !currentEvent.description
    ) {
      toast({
        title: "Missing Fields",
        description: "Please fill in all required event details.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate API call

    if (currentEvent.id) {
      // Update existing event
      setEvents((prev) => prev.map((event) => (event.id === currentEvent.id ? currentEvent : event)))
      toast({
        title: "Event Updated",
        description: `${currentEvent.title} has been updated.`,
        variant: "success",
      })
    } else {
      // Add new event
      const newEvent = {
        ...currentEvent,
        id: String(events.length + 1),
        imageUrl: currentEvent.imageUrl || "/placeholder.svg?height=400&width=600",
      }
      setEvents((prev) => [...prev, newEvent])
      toast({
        title: "Event Added",
        description: `${newEvent.title} has been added.`,
        variant: "success",
      })
    }
    setIsLoading(false)
    setIsDialogOpen(false)
    setCurrentEvent(null)
  }

  const handleDeleteEvent = async (id: string) => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 500)) // Simulate API call
    setEvents((prev) => prev.filter((event) => event.id !== id))
    toast({
      title: "Event Deleted",
      description: "The event has been successfully deleted.",
      variant: "success",
    })
    setIsLoading(false)
  }

  const openCreateDialog = () => {
    setCurrentEvent({
      id: "",
      title: "",
      date: "",
      time: "",
      location: "",
      description: "",
      imageUrl: "",
      price: 0,
      ticketsAvailable: 0,
    })
    setIsDialogOpen(true)
  }

  const openEditDialog = (event: Event) => {
    setCurrentEvent({ ...event })
    setIsDialogOpen(true)
  }

  return (
    <Card className="bg-background/50 backdrop-blur-lg border-electric-700/30">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-electric-200">All Events</CardTitle>
        <Button onClick={openCreateDialog} className="bg-gradient-electric hover:animate-electric-pulse">
          <Plus className="mr-2 h-4 w-4" /> Add New Event
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="border-electric-700">
              <TableHead className="text-electric-200">Title</TableHead>
              <TableHead className="text-electric-200">Date</TableHead>
              <TableHead className="text-electric-200">Time</TableHead>
              <TableHead className="text-electric-200">Location</TableHead>
              <TableHead className="text-electric-200">Price</TableHead>
              <TableHead className="text-electric-200">Tickets</TableHead>
              <TableHead className="text-electric-200 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {events.map((event) => (
              <TableRow key={event.id} className="border-electric-800 hover:bg-electric-900/20">
                <TableCell className="font-medium text-electric-100">{event.title}</TableCell>
                <TableCell className="text-muted-foreground">{format(new Date(event.date), "MMM dd, yyyy")}</TableCell>
                <TableCell className="text-muted-foreground">{event.time}</TableCell>
                <TableCell className="text-muted-foreground">{event.location}</TableCell>
                <TableCell className="text-electric-200">${event.price.toFixed(2)}</TableCell>
                <TableCell className="text-electric-200">{event.ticketsAvailable}</TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => openEditDialog(event)}
                    className="text-electric-400 hover:text-electric-300"
                  >
                    <Edit className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteEvent(event.id)}
                    className="text-destructive hover:text-red-400"
                  >
                    <Trash className="h-4 w-4" />
                    <span className="sr-only">Delete</span>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-[600px] bg-background border-electric-700">
            <DialogHeader>
              <DialogTitle className="text-electric-100">
                {currentEvent?.id ? "Edit Event" : "Add New Event"}
              </DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right text-electric-200">
                  Title
                </Label>
                <Input
                  id="title"
                  name="title"
                  value={currentEvent?.title || ""}
                  onChange={handleInputChange}
                  className="col-span-3 bg-background/50 border-electric-700 text-electric-100"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="date" className="text-right text-electric-200">
                  Date
                </Label>
                <Input
                  id="date"
                  name="date"
                  type="date"
                  value={currentEvent?.date || ""}
                  onChange={handleInputChange}
                  className="col-span-3 bg-background/50 border-electric-700 text-electric-100"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="time" className="text-right text-electric-200">
                  Time
                </Label>
                <Input
                  id="time"
                  name="time"
                  type="time"
                  value={currentEvent?.time || ""}
                  onChange={handleInputChange}
                  className="col-span-3 bg-background/50 border-electric-700 text-electric-100"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="location" className="text-right text-electric-200">
                  Location
                </Label>
                <Input
                  id="location"
                  name="location"
                  value={currentEvent?.location || ""}
                  onChange={handleInputChange}
                  className="col-span-3 bg-background/50 border-electric-700 text-electric-100"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right text-electric-200">
                  Description
                </Label>
                <Textarea
                  id="description"
                  name="description"
                  value={currentEvent?.description || ""}
                  onChange={handleInputChange}
                  className="col-span-3 bg-background/50 border-electric-700 text-electric-100"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="imageUrl" className="text-right text-electric-200">
                  Image URL
                </Label>
                <Input
                  id="imageUrl"
                  name="imageUrl"
                  value={currentEvent?.imageUrl || ""}
                  onChange={handleInputChange}
                  placeholder="/placeholder.svg"
                  className="col-span-3 bg-background/50 border-electric-700 text-electric-100"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="price" className="text-right text-electric-200">
                  Price ($)
                </Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  step="0.01"
                  value={currentEvent?.price || 0}
                  onChange={handlePriceChange}
                  className="col-span-3 bg-background/50 border-electric-700 text-electric-100"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="ticketsAvailable" className="text-right text-electric-200">
                  Tickets Available
                </Label>
                <Input
                  id="ticketsAvailable"
                  name="ticketsAvailable"
                  type="number"
                  value={currentEvent?.ticketsAvailable || 0}
                  onChange={handleTicketsChange}
                  className="col-span-3 bg-background/50 border-electric-700 text-electric-100"
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
                className="border-electric-700 text-electric-200 hover:bg-electric-900 hover:text-electric-100"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSaveEvent}
                disabled={isLoading}
                className="bg-gradient-electric hover:animate-electric-pulse"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save Event"
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  )
}
