"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Calendar, Plus, Edit, Trash2, Users, MapPin, DollarSign, Eye } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Event {
  id: string
  title: string
  description: string
  date: string
  time: string
  location: string
  price: number
  memberPrice: number
  maxAttendees: number
  currentAttendees: number
  category: string
  tierRequired: string
  status: "upcoming" | "live" | "completed" | "cancelled"
}

export function AdminEventManagement() {
  const [events, setEvents] = useState<Event[]>([
    {
      id: "1",
      title: "Exclusive Album Release Party",
      description: "Be the first to hear Kelvin's new album 'Fire & Ice' in an intimate setting.",
      date: "2025-02-15",
      time: "19:00",
      location: "The Diamond Club, New York",
      price: 89.99,
      memberPrice: 69.99,
      maxAttendees: 150,
      currentAttendees: 87,
      category: "concert",
      tierRequired: "frost",
      status: "upcoming",
    },
    {
      id: "2",
      title: "Virtual Meet & Greet Session",
      description: "Personal video chat session with Kelvin Creekman - limited to 20 fans only.",
      date: "2025-02-08",
      time: "15:00",
      location: "Online Video Call",
      price: 49.99,
      memberPrice: 29.99,
      maxAttendees: 20,
      currentAttendees: 12,
      category: "meet-greet",
      tierRequired: "frost",
      status: "upcoming",
    },
  ])

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [editingEvent, setEditingEvent] = useState<Event | null>(null)
  const [newEvent, setNewEvent] = useState<Partial<Event>>({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    price: 0,
    memberPrice: 0,
    maxAttendees: 0,
    category: "concert",
    tierRequired: "frost",
    status: "upcoming",
  })

  const { toast } = useToast()

  const handleCreateEvent = () => {
    if (!newEvent.title || !newEvent.date || !newEvent.time) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    const event: Event = {
      id: Date.now().toString(),
      title: newEvent.title!,
      description: newEvent.description || "",
      date: newEvent.date!,
      time: newEvent.time!,
      location: newEvent.location || "",
      price: newEvent.price || 0,
      memberPrice: newEvent.memberPrice || 0,
      maxAttendees: newEvent.maxAttendees || 0,
      currentAttendees: 0,
      category: newEvent.category || "concert",
      tierRequired: newEvent.tierRequired || "frost",
      status: "upcoming",
    }

    setEvents([...events, event])
    setNewEvent({
      title: "",
      description: "",
      date: "",
      time: "",
      location: "",
      price: 0,
      memberPrice: 0,
      maxAttendees: 0,
      category: "concert",
      tierRequired: "frost",
      status: "upcoming",
    })
    setIsCreateDialogOpen(false)

    toast({
      title: "Event Created! 🎉",
      description: `${event.title} has been successfully created.`,
    })
  }

  const handleUpdateEvent = () => {
    if (!editingEvent) return

    setEvents(events.map((event) => (event.id === editingEvent.id ? editingEvent : event)))
    setEditingEvent(null)

    toast({
      title: "Event Updated! ✅",
      description: `${editingEvent.title} has been successfully updated.`,
    })
  }

  const handleDeleteEvent = (eventId: string) => {
    const event = events.find((e) => e.id === eventId)
    setEvents(events.filter((e) => e.id !== eventId))

    toast({
      title: "Event Deleted",
      description: `${event?.title} has been removed.`,
      variant: "destructive",
    })
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "upcoming":
        return <Badge className="bg-blue-500/20 text-blue-400">Upcoming</Badge>
      case "live":
        return <Badge className="bg-red-500/20 text-red-400">Live</Badge>
      case "completed":
        return <Badge className="bg-green-500/20 text-green-400">Completed</Badge>
      case "cancelled":
        return <Badge className="bg-gray-500/20 text-gray-400">Cancelled</Badge>
      default:
        return null
    }
  }

  const getTierBadge = (tier: string) => {
    switch (tier) {
      case "frost":
        return (
          <Badge variant="outline" className="text-blue-400 border-blue-400/50">
            Frost
          </Badge>
        )
      case "blizzard":
        return (
          <Badge variant="outline" className="text-purple-400 border-purple-400/50">
            Blizzard
          </Badge>
        )
      case "avalanche":
        return (
          <Badge variant="outline" className="text-gold-400 border-gold-400/50">
            Avalanche
          </Badge>
        )
      default:
        return null
    }
  }

  const totalRevenue = events.reduce((sum, event) => sum + event.memberPrice * event.currentAttendees, 0)
  const totalAttendees = events.reduce((sum, event) => sum + event.currentAttendees, 0)
  const upcomingEvents = events.filter((e) => e.status === "upcoming").length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-fire dark:bg-gradient-ice bg-clip-text text-transparent flex items-center gap-2">
            <Calendar className="h-8 w-8 text-electric-500" />
            Event Management
          </h1>
          <p className="text-muted-foreground">Create and manage fan club events</p>
        </div>

        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-electric hover:animate-electric-pulse">
              <Plus className="h-4 w-4 mr-2" />
              Create Event
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Event</DialogTitle>
              <DialogDescription>Set up a new event for your fan club members</DialogDescription>
            </DialogHeader>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Event Title *</Label>
                <Input
                  id="title"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                  placeholder="Enter event title"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={newEvent.category}
                  onValueChange={(value) => setNewEvent({ ...newEvent, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="concert">Concert</SelectItem>
                    <SelectItem value="meet-greet">Meet & Greet</SelectItem>
                    <SelectItem value="workshop">Workshop</SelectItem>
                    <SelectItem value="exclusive">VIP Exclusive</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="date">Date *</Label>
                <Input
                  id="date"
                  type="date"
                  value={newEvent.date}
                  onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="time">Time *</Label>
                <Input
                  id="time"
                  type="time"
                  value={newEvent.time}
                  onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={newEvent.location}
                  onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                  placeholder="Event location or 'Online'"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">Regular Price ($)</Label>
                <Input
                  id="price"
                  type="number"
                  value={newEvent.price}
                  onChange={(e) => setNewEvent({ ...newEvent, price: Number.parseFloat(e.target.value) || 0 })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="memberPrice">Member Price ($)</Label>
                <Input
                  id="memberPrice"
                  type="number"
                  value={newEvent.memberPrice}
                  onChange={(e) => setNewEvent({ ...newEvent, memberPrice: Number.parseFloat(e.target.value) || 0 })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="maxAttendees">Max Attendees</Label>
                <Input
                  id="maxAttendees"
                  type="number"
                  value={newEvent.maxAttendees}
                  onChange={(e) => setNewEvent({ ...newEvent, maxAttendees: Number.parseInt(e.target.value) || 0 })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tierRequired">Required Tier</Label>
                <Select
                  value={newEvent.tierRequired}
                  onValueChange={(value) => setNewEvent({ ...newEvent, tierRequired: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="frost">Frost Fan</SelectItem>
                    <SelectItem value="blizzard">Blizzard VIP</SelectItem>
                    <SelectItem value="avalanche">Avalanche</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newEvent.description}
                  onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                  placeholder="Event description..."
                  className="min-h-[100px]"
                />
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateEvent} className="bg-gradient-electric">
                Create Event
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-electric-700/30">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-electric-400">${totalRevenue.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">From all events</p>
          </CardContent>
        </Card>

        <Card className="border-electric-700/30">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Attendees</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-electric-400">{totalAttendees}</div>
            <p className="text-xs text-muted-foreground">Across all events</p>
          </CardContent>
        </Card>

        <Card className="border-electric-700/30">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Events</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-electric-400">{upcomingEvents}</div>
            <p className="text-xs text-muted-foreground">Scheduled events</p>
          </CardContent>
        </Card>
      </div>

      {/* Events List */}
      <Card className="border-electric-700/30">
        <CardHeader>
          <CardTitle className="text-electric-400">All Events</CardTitle>
          <CardDescription>Manage your fan club events</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {events.map((event) => (
              <div
                key={event.id}
                className="flex items-center justify-between p-4 border border-electric-700/30 rounded-lg"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold">{event.title}</h3>
                    {getStatusBadge(event.status)}
                    {getTierBadge(event.tierRequired)}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {event.date} at {event.time}
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {event.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {event.currentAttendees}/{event.maxAttendees}
                    </div>
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-3 w-3" />${event.memberPrice}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" asChild>
                    <a href={`/events/${event.id}`} target="_blank" rel="noreferrer">
                      <Eye className="h-4 w-4" />
                    </a>
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => setEditingEvent(event)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleDeleteEvent(event.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Edit Event Dialog */}
      <Dialog open={!!editingEvent} onOpenChange={() => setEditingEvent(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Event</DialogTitle>
            <DialogDescription>Update event details and settings</DialogDescription>
          </DialogHeader>

          {editingEvent && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-title">Event Title</Label>
                <Input
                  id="edit-title"
                  value={editingEvent.title}
                  onChange={(e) => setEditingEvent({ ...editingEvent, title: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-status">Status</Label>
                <Select
                  value={editingEvent.status}
                  onValueChange={(value: any) => setEditingEvent({ ...editingEvent, status: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="upcoming">Upcoming</SelectItem>
                    <SelectItem value="live">Live</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-date">Date</Label>
                <Input
                  id="edit-date"
                  type="date"
                  value={editingEvent.date}
                  onChange={(e) => setEditingEvent({ ...editingEvent, date: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-time">Time</Label>
                <Input
                  id="edit-time"
                  type="time"
                  value={editingEvent.time}
                  onChange={(e) => setEditingEvent({ ...editingEvent, time: e.target.value })}
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="edit-location">Location</Label>
                <Input
                  id="edit-location"
                  value={editingEvent.location}
                  onChange={(e) => setEditingEvent({ ...editingEvent, location: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-price">Regular Price ($)</Label>
                <Input
                  id="edit-price"
                  type="number"
                  value={editingEvent.price}
                  onChange={(e) => setEditingEvent({ ...editingEvent, price: Number.parseFloat(e.target.value) || 0 })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-memberPrice">Member Price ($)</Label>
                <Input
                  id="edit-memberPrice"
                  type="number"
                  value={editingEvent.memberPrice}
                  onChange={(e) =>
                    setEditingEvent({ ...editingEvent, memberPrice: Number.parseFloat(e.target.value) || 0 })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-maxAttendees">Max Attendees</Label>
                <Input
                  id="edit-maxAttendees"
                  type="number"
                  value={editingEvent.maxAttendees}
                  onChange={(e) =>
                    setEditingEvent({ ...editingEvent, maxAttendees: Number.parseInt(e.target.value) || 0 })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-currentAttendees">Current Attendees</Label>
                <Input
                  id="edit-currentAttendees"
                  type="number"
                  value={editingEvent.currentAttendees}
                  onChange={(e) =>
                    setEditingEvent({ ...editingEvent, currentAttendees: Number.parseInt(e.target.value) || 0 })
                  }
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="edit-description">Description</Label>
                <Textarea
                  id="edit-description"
                  value={editingEvent.description}
                  onChange={(e) => setEditingEvent({ ...editingEvent, description: e.target.value })}
                  className="min-h-[100px]"
                />
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingEvent(null)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateEvent} className="bg-gradient-electric">
              Update Event
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
