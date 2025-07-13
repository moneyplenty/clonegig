"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { toast } from "@/components/ui/use-toast"
import { Edit, Trash, UserPlus, Users, CheckCircle, ExternalLink } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface User {
  id: string
  email: string
  name: string
  role: "guest" | "fan" | "premium" | "admin"
  created_at: string
  last_sign_in: string
  status: "active" | "suspended"
  avatar?: string
  hasTikTok?: boolean
}

export function AdminUserManagement() {
  const [users, setUsers] = useState<User[]>([
    {
      id: "1",
      email: "alexis.rivera@example.com",
      name: "Alexis Rivera",
      role: "fan",
      created_at: "2024-01-15T10:30:00Z",
      last_sign_in: "2024-12-20T08:15:00Z",
      status: "active",
      hasTikTok: true
    },
    {
      id: "2",
      email: "jordan.martinez@example.com",
      name: "Jordan Martinez",
      role: "premium",
      created_at: "2024-02-20T14:45:00Z",
      last_sign_in: "2024-12-19T19:22:00Z",
      status: "active",
      hasTikTok: true
    },
    {
      id: "3",
      email: "casey.thompson@example.com",
      name: "Casey Thompson",
      role: "premium",
      created_at: "2024-03-10T09:15:00Z",
      last_sign_in: "2024-12-18T16:30:00Z",
      status: "active",
      hasTikTok: true
    },
    {
      id: "4",
      email: "taylor.johnson@example.com",
      name: "Taylor Johnson",
      role: "fan",
      created_at: "2024-04-05T12:20:00Z",
      last_sign_in: "2024-12-17T14:45:00Z",
      status: "active"
    },
    {
      id: "5",
      email: "morgan.davis@example.com",
      name: "Morgan Davis",
      role: "guest",
      created_at: "2024-05-18T16:10:00Z",
      last_sign_in: "2024-12-16T11:20:00Z",
      status: "active"
    },
    {
      id: "6",
      email: "riley.wilson@example.com",
      name: "Riley Wilson",
      role: "premium",
      created_at: "2024-06-22T08:45:00Z",
      last_sign_in: "2024-12-15T09:30:00Z",
      status: "active"
    },
    {
      id: "7",
      email: "admin@kelvincreekman.com",
      name: "Kelvin Creekman",
      role: "admin",
      created_at: "2024-01-01T00:00:00Z",
      last_sign_in: "2024-12-20T09:00:00Z",
      status: "active"
    }
  ])
  const [form, setForm] = useState<Partial<User> & { password?: string }>({
    email: "",
    name: "",
    role: "guest",
    password: ""
  })
  const [isEditing, setIsEditing] = useState(false)
  const [filter, setFilter] = useState<string>("all")
  const [searchTerm, setSearchTerm] = useState("")

  const handleChange = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (isEditing && form.id) {
      setUsers(prev => prev.map(user => 
        user.id === form.id 
          ? { ...user, ...form, id: user.id } as User
          : user
      ))
      toast({ title: "User Updated", description: `${form.name} has been updated successfully.` })
    } else {
      const newUser: User = {
        ...form,
        id: String(Date.now()),
        created_at: new Date().toISOString(),
        last_sign_in: new Date().toISOString(),
        status: "active"
      } as User
      setUsers(prev => [...prev, newUser])
      toast({ title: "User Created", description: `${form.name} has been added to the system.` })
    }
    resetForm()
  }

  const handleEdit = (user: User) => {
    setForm(user)
    setIsEditing(true)
  }

  const handleDelete = (id: string) => {
    const user = users.find(u => u.id === id)
    setUsers(prev => prev.filter(user => user.id !== id))
    toast({ title: "User Deleted", description: `${user?.name} has been removed from the system.` })
  }

  const handleRoleChange = (userId: string, newRole: string) => {
    const user = users.find(u => u.id === userId)
    setUsers(prev => prev.map(user => 
      user.id === userId ? { ...user, role: newRole as User['role'] } : user
    ))
    toast({ title: "Role Updated", description: `${user?.name}'s role has been updated to ${newRole}.` })
  }

  const resetForm = () => {
    setForm({ email: "", name: "", role: "guest", password: "" })
    setIsEditing(false)
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin": return "bg-red-100 text-red-800 border-red-200"
      case "premium": return "bg-purple-100 text-purple-800 border-purple-200"
      case "fan": return "bg-blue-100 text-blue-800 border-blue-200"
      default: return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase()
  }

  const handleTikTokRedirect = () => {
    window.open("https://www.tiktok.com/@lk_larr_?_t=ZS-8xyuzCdnwMk&_r=1", "_blank")
  }

  const filteredUsers = users.filter(user => {
    const matchesFilter = filter === "all" || user.role === filter
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const totalUsers = users.length
  const activeUsers = users.filter(u => u.status === "active").length
  const premiumUsers = users.filter(u => u.role === "premium").length

  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">Total Users</p>
                <p className="text-3xl font-bold text-blue-900">{totalUsers}</p>
              </div>
              <Users className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600">Active Users</p>
                <p className="text-3xl font-bold text-green-900">{activeUsers}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600">Premium Users</p>
                <p className="text-3xl font-bold text-purple-900">{premiumUsers}</p>
              </div>
              <Badge className="h-8 w-8 bg-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* User Form */}
        <Card className="lg:col-span-1 bg-white/80 backdrop-blur-sm border-gray-200 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-t-lg">
            <CardTitle className="flex items-center gap-2">
              <UserPlus className="h-5 w-5" />
              {isEditing ? "Edit User" : "Add New User"}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name" className="text-sm font-semibold text-gray-700">Full Name</Label>
                <Input 
                  id="name" 
                  value={form.name || ""} 
                  onChange={(e) => handleChange("name", e.target.value)} 
                  required 
                  className="mt-1"
                  placeholder="Enter full name"
                />
              </div>
              <div>
                <Label htmlFor="email" className="text-sm font-semibold text-gray-700">Email Address</Label>
                <Input 
                  id="email" 
                  type="email"
                  value={form.email || ""} 
                  onChange={(e) => handleChange("email", e.target.value)} 
                  required 
                  className="mt-1"
                  placeholder="Enter email address"
                />
              </div>
              {!isEditing && (
                <div>
                  <Label htmlFor="password" className="text-sm font-semibold text-gray-700">Password</Label>
                  <Input 
                    id="password" 
                    type="password"
                    value={form.password || ""} 
                    onChange={(e) => handleChange("password", e.target.value)} 
                    required 
                    className="mt-1"
                    placeholder="Enter password"
                  />
                </div>
              )}
              <div>
                <Label htmlFor="role" className="text-sm font-semibold text-gray-700">Role</Label>
                <Select value={form.role} onValueChange={(value) => handleChange("role", value)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="guest">Guest</SelectItem>
                    <SelectItem value="fan">Fan</SelectItem>
                    <SelectItem value="premium">Premium</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-2 pt-4">
                <Button type="submit" className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                  {isEditing ? "Update User" : "Create User"}
                </Button>
                {isEditing && (
                  <Button type="button" variant="outline" onClick={resetForm} className="flex-1">
                    Cancel
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Users Table */}
        <Card className="lg:col-span-3 bg-white/80 backdrop-blur-sm border-gray-200 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 border-b">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <CardTitle className="text-2xl font-bold text-gray-800">User Management</CardTitle>
              <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
                <Input
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="md:w-64"
                />
                <Select value={filter} onValueChange={setFilter}>
                  <SelectTrigger className="md:w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Users</SelectItem>
                    <SelectItem value="guest">Guests</SelectItem>
                    <SelectItem value="fan">Fans</SelectItem>
                    <SelectItem value="premium">Premium</SelectItem>
                    <SelectItem value="admin">Admins</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead className="font-semibold">User</TableHead>
                    <TableHead className="font-semibold">Email</TableHead>
                    <TableHead className="font-semibold">Role</TableHead>
                    <TableHead className="font-semibold">Status</TableHead>
                    <TableHead className="font-semibold">Last Sign In</TableHead>
                    <TableHead className="font-semibold text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow key={user.id} className="hover:bg-gray-50/50 transition-colors">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={user.avatar} />
                            <AvatarFallback className="bg-gradient-to-br from-blue-400 to-purple-500 text-white font-semibold">
                              {getInitials(user.name)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium text-gray-900">{user.name}</div>
                            <div className="text-sm text-gray-500">ID: {user.id}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-gray-700">{user.email}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Select 
                            value={user.role} 
                            onValueChange={(value) => handleRoleChange(user.id, value)}
                          >
                            <SelectTrigger className="w-28">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="guest">Guest</SelectItem>
                              <SelectItem value="fan">Fan</SelectItem>
                              <SelectItem value="premium">Premium</SelectItem>
                              <SelectItem value="admin">Admin</SelectItem>
                            </SelectContent>
                          </Select>
                          {user.hasTikTok && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={handleTikTokRedirect}
                              className="bg-black text-white hover:bg-gray-800 border-black"
                            >
                              TikTok
                              <ExternalLink className="h-3 w-3 ml-1" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={`${
                          user.status === 'active' 
                            ? 'bg-green-100 text-green-800 border-green-200' 
                            : 'bg-red-100 text-red-800 border-red-200'
                        } border`}>
                          {user.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-gray-600">
                        {new Date(user.last_sign_in).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button 
                            variant="outline" 
                            size="icon" 
                            onClick={() => handleEdit(user)}
                            className="hover:bg-blue-50 hover:border-blue-300"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="destructive" 
                            size="icon" 
                            onClick={() => handleDelete(user.id)}
                            className="hover:bg-red-600"
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
