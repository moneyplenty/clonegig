"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Calendar, Clock, MapPin, Users, DollarSign, Plus, Edit, Trash2 } from "lucide-react"
import { toast } from "sonner"

// Mock events data
const mockEvents = [
  {
    id: "1",
    title: "Kelvin Creekman Live Concert",
    description: "Experience the electrifying performance in an intimate venue setting.",
    date: "2024-02-15",
    time: "20:00",
    location: "The Electric Theater, Los Angeles",
    price: 75,
    memberPrice: 60,
    category: "Concert",
    tier: "Frost",
    maxAttendees: 500,
    currentAttendees: 342,
    status: "upcoming",
    revenue: 20520,
  },
  {
    id: "2",
    title: "VIP Meet & Greet Session",
    description: "Personal meet and greet with photo opportunities.",
    date: "2024-02-20",
    time: "18:00",
    location: "Studio City, Los Angeles",
    price: 150,
    memberPrice: 120,
    category: "Meet & Greet",
    tier: "Blizzard",
    maxAttendees: 20,
    currentAttendees: 18,
    status: "upcoming",
    revenue: 2160,
  },
  {
    id: "3",
    title: "Acoustic Session & Q&A",
    description: "Intimate acoustic performance with fan Q&A session.",
    date: "2024-03-01",
    time: "19:00",
    location: "The Lounge, Nashville",
    price: 45,
    memberPrice: 35,
    category: "Concert",
    tier: "Frost",
    maxAttendees: 100,
    currentAttendees: 67,
    status: "upcoming",
    revenue: 2345,
  },
]

export function AdminEventManagement() {
  const [events, setEvents] = useState(mockEvents)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [editingEvent, setEditingEvent] = useState<any>(null)
  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    price: 0,
    memberPrice: 0,
    category: "Concert",
    tier: "Frost",
    maxAttendees: 0,
  })

  const totalRevenue = events.reduce((sum, event) => sum + event.revenue, 0)
  const totalAttendees = events.reduce((sum, event) => sum + event.currentAttendees, 0)
  const upcomingEvents = events.filter((event) => event.status === "upcoming").length

  const handleCreateEvent = () => {
    if (!newEvent.title || !newEvent.date || !newEvent.location) {
      toast.error("Please fill in all required fields")
      return
    }

    const event = {
      ...newEvent,
      id: Date.now().toString(),
      currentAttendees: 0,
      status: "upcoming",
      revenue: 0,
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
      category: "Concert",
      tier: "Frost",
      maxAttendees: 0,
    })
    setIsCreateDialogOpen(false)
    toast.success("Event created successfully!")
  }

  const handleEditEvent = (event: any) => {
    setEditingEvent(event)
    setNewEvent(event)
    setIsCreateDialogOpen(true)
  }

  const handleUpdateEvent = () => {
    if (!newEvent.title || !newEvent.date || !newEvent.location) {
      toast.error("Please fill in all required fields")
      return
    }

    setEvents(events.map((event) => (event.id === editingEvent.id ? { ...newEvent, id: editingEvent.id } : event)))
    setEditingEvent(null)
    setNewEvent({
      title: "",
      description: "",
      date: "",
      time: "",
      location: "",
      price: 0,
      memberPrice: 0,
      category: "Concert",
      tier: "Frost",
      maxAttendees: 0,
    })
    setIsCreateDialogOpen(false)
    toast.success("Event updated successfully!")
  }

  const handleDeleteEvent = (eventId: string) => {
    setEvents(events.filter((event) => event.id !== eventId))
    toast.success("Event deleted successfully!")
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcoming":
        return "bg-blue-500/20 text-blue-300 border-blue-500/30"
      case "live":
        return "bg-green-500/20 text-green-300 border-green-500/30"
      case "completed":
        return "bg-gray-500/20 text-gray-300 border-gray-500/30"
      case "cancelled":
        return "bg-red-500/20 text-red-300 border-red-500/30"
      default:
        return "bg-slate-500/20 text-slate-300 border-slate-500/30"
    }
  }

  const getTierColor = (tier: string) => {
    switch (tier) {
      case "Frost":
        return "bg-blue-500/20 text-blue-300 border-blue-500/30"
      case "Blizzard":
        return "bg-cyan-500/20 text-cyan-300 border-cyan-500/30"
      case "Avalanche":
        return "bg-purple-500/20 text-purple-300 border-purple-500/30"
      default:
        return "bg-slate-500/20 text-slate-300 border-slate-500/30"
    }
  }

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-500/20 rounded-lg">
                <Calendar className="h-6 w-6 text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-slate-400">Total Events</p>
                <p className="text-2xl font-bold text-white">{events.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-500/20 rounded-lg">
                <Users className="h-6 w-6 text-green-400" />
              </div>
              <div>
                <p className="text-sm text-slate-400">Total Attendees</p>
                <p className="text-2xl font-bold text-white">{totalAttendees}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-yellow-500/20 rounded-lg">
                <Clock className="h-6 w-6 text-yellow-400" />
              </div>
              <div>
                <p className="text-sm text-slate-400">Upcoming Events</p>
                <p className="text-2xl font-bold text-white">{upcomingEvents}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-500/20 rounded-lg">
                <DollarSign className="h-6 w-6 text-purple-400" />
              </div>
              <div>
                <p className="text-sm text-slate-400">Total Revenue</p>
                <p className="text-2xl font-bold text-white">${totalRevenue.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="events" className="space-y-6">
        <div className="flex items-center justify-between">
          <TabsList className="bg-slate-800/50 border-slate-700">
            <TabsTrigger value="events" className="data-[state=active]:bg-blue-600">
              Events
            </TabsTrigger>
            <TabsTrigger value="bookings" className="data-[state=active]:bg-blue-600">
              Bookings
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-blue-600">
              Analytics
            </TabsTrigger>
          </TabsList>

          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700">
                <Plus className="h-4 w-4 mr-2" />
                Create Event
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-slate-800 border-slate-700 max-w-2xl">
              <DialogHeader>
                <DialogTitle className="text-white">{editingEvent ? "Edit Event" : "Create New Event"}</DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-slate-300">
                    Event Title *
                  </Label>
                  <Input
                    id="title"
                    value={newEvent.title}
                    onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                    className="bg-slate-700/50 border-slate-600 text-white"
                    placeholder="Enter event title"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category" className="text-slate-300">
                    Category
                  </Label>
                  <Select
                    value={newEvent.category}
                    onValueChange={(value) => setNewEvent({ ...newEvent, category: value })}
                  >
                    <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700">
                      <SelectItem value="Concert">Concert</SelectItem>
                      <SelectItem value="Meet & Greet">Meet & Greet</SelectItem>
                      <SelectItem value="VIP Only">VIP Only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="date" className="text-slate-300">
                    Date *
                  </Label>
                  <Input
                    id="date"
                    type="date"
                    value={newEvent.date}
                    onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                    className="bg-slate-700/50 border-slate-600 text-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="time" className="text-slate-300">
                    Time *
                  </Label>
                  <Input
                    id="time"
                    type="time"
                    value={newEvent.time}
                    onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                    className="bg-slate-700/50 border-slate-600 text-white"
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="location" className="text-slate-300">
                    Location *
                  </Label>
                  <Input
                    id="location"
                    value={newEvent.location}
                    onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                    className="bg-slate-700/50 border-slate-600 text-white"
                    placeholder="Enter event location"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="price" className="text-slate-300">
                    Regular Price
                  </Label>
                  <Input
                    id="price"
                    type="number"
                    value={newEvent.price}
                    onChange={(e) => setNewEvent({ ...newEvent, price: Number(e.target.value) })}
                    className="bg-slate-700/50 border-slate-600 text-white"
                    placeholder="0"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="memberPrice" className="text-slate-300">
                    Member Price
                  </Label>
                  <Input
                    id="memberPrice"
                    type="number"
                    value={newEvent.memberPrice}
                    onChange={(e) => setNewEvent({ ...newEvent, memberPrice: Number(e.target.value) })}
                    className="bg-slate-700/50 border-slate-600 text-white"
                    placeholder="0"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tier" className="text-slate-300">
                    Required Tier
                  </Label>
                  <Select value={newEvent.tier} onValueChange={(value) => setNewEvent({ ...newEvent, tier: value })}>
                    <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700">
                      <SelectItem value="Frost">Frost</SelectItem>
                      <SelectItem value="Blizzard">Blizzard</SelectItem>
                      <SelectItem value="Avalanche">Avalanche</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="maxAttendees" className="text-slate-300">
                    Max Attendees
                  </Label>
                  <Input
                    id="maxAttendees"
                    type="number"
                    value={newEvent.maxAttendees}
                    onChange={(e) => setNewEvent({ ...newEvent, maxAttendees: Number(e.target.value) })}
                    className="bg-slate-700/50 border-slate-600 text-white"
                    placeholder="0"
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="description" className="text-slate-300">
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    value={newEvent.description}
                    onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                    className="bg-slate-700/50 border-slate-600 text-white"
                    placeholder="Enter event description"
                    rows={3}
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsCreateDialogOpen(false)
                    setEditingEvent(null)
                    setNewEvent({
                      title: "",
                      description: "",
                      date: "",
                      time: "",
                      location: "",
                      price: 0,
                      memberPrice: 0,
                      category: "Concert",
                      tier: "Frost",
                      maxAttendees: 0,
                    })
                  }}
                  className="border-slate-600 text-slate-300 hover:bg-slate-700"
                >
                  Cancel
                </Button>
                <Button
                  onClick={editingEvent ? handleUpdateEvent : handleCreateEvent}
                  className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
                >
                  {editingEvent ? "Update Event" : "Create Event"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <TabsContent value="events" className="space-y-6">
          <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">All Events</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="border-slate-700">
                    <TableHead className="text-slate-300">Event</TableHead>
                    <TableHead className="text-slate-300">Date & Time</TableHead>
                    <TableHead className="text-slate-300">Location</TableHead>
                    <TableHead className="text-slate-300">Attendees</TableHead>
                    <TableHead className="text-slate-300">Revenue</TableHead>
                    <TableHead className="text-slate-300">Status</TableHead>
                    <TableHead className="text-slate-300">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {events.map((event) => (
                    <TableRow key={event.id} className="border-slate-700">
                      <TableCell>
                        <div className="space-y-1">
                          <div className="font-medium text-white">{event.title}</div>
                          <div className="flex gap-2">
                            <Badge className={getTierColor(event.tier)} variant="outline">
                              {event.tier}
                            </Badge>
                            <Badge variant="outline" className="border-slate-600 text-slate-300">
                              {event.category}
                            </Badge>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-slate-300">
                        <div className="space-y-1">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {new Date(event.date).toLocaleDateString()}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {event.time}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-slate-300">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {event.location.split(",")[0]}
                        </div>
                      </TableCell>
                      <TableCell className="text-slate-300">
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          {event.currentAttendees}/{event.maxAttendees}
                        </div>
                      </TableCell>
                      <TableCell className="text-slate-300">
                        <div className="flex items-center gap-1">
                          <DollarSign className="h-4 w-4" />${event.revenue.toLocaleString()}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(event.status)} variant="outline">
                          {event.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEditEvent(event)}
                            className="border-slate-600 text-slate-300 hover:bg-slate-700"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDeleteEvent(event.id)}
                            className="border-red-600 text-red-400 hover:bg-red-900/20"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bookings" className="space-y-6">
          <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Recent Bookings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-slate-400">
                <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Booking management coming soon...</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Event Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-slate-400">
                <DollarSign className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Advanced analytics coming soon...</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
