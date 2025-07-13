
"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { toast } from "@/components/ui/use-toast"
import { Edit, Trash, UserPlus } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface User {
  id: string
  email: string
  name: string
  role: "guest" | "fan" | "premium" | "admin"
  created_at: string
  last_sign_in: string
  status: "active" | "suspended"
}

export function AdminUserManagement() {
  const [users, setUsers] = useState<User[]>([
    {
      id: "1",
      email: "john.doe@example.com",
      name: "John Doe",
      role: "fan",
      created_at: "2024-01-15T10:30:00Z",
      last_sign_in: "2024-12-20T08:15:00Z",
      status: "active"
    },
    {
      id: "2",
      email: "jane.smith@example.com",
      name: "Jane Smith",
      role: "premium",
      created_at: "2024-02-20T14:45:00Z",
      last_sign_in: "2024-12-19T19:22:00Z",
      status: "active"
    },
    {
      id: "3",
      email: "admin@kelvincreekman.com",
      name: "Admin User",
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
      toast({ title: "User Updated", description: `${form.name} has been updated.` })
    } else {
      const newUser: User = {
        ...form,
        id: String(Date.now()),
        created_at: new Date().toISOString(),
        last_sign_in: new Date().toISOString(),
        status: "active"
      } as User
      setUsers(prev => [...prev, newUser])
      toast({ title: "User Created", description: `${form.name} has been created.` })
    }
    resetForm()
  }

  const handleEdit = (user: User) => {
    setForm(user)
    setIsEditing(true)
  }

  const handleDelete = (id: string) => {
    setUsers(prev => prev.filter(user => user.id !== id))
    toast({ title: "User Deleted", description: "User has been removed." })
  }

  const handleRoleChange = (userId: string, newRole: string) => {
    setUsers(prev => prev.map(user => 
      user.id === userId ? { ...user, role: newRole as User['role'] } : user
    ))
    toast({ title: "Role Updated", description: "User role has been updated." })
  }

  const resetForm = () => {
    setForm({ email: "", name: "", role: "guest", password: "" })
    setIsEditing(false)
  }

  const filteredUsers = users.filter(user => 
    filter === "all" || user.role === filter
  )

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <Card className="lg:col-span-1 bg-card/50 backdrop-blur-sm border-kelvin-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserPlus className="h-5 w-5" />
            {isEditing ? "Edit User" : "Add New User"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input 
                id="name" 
                value={form.name || ""} 
                onChange={(e) => handleChange("name", e.target.value)} 
                required 
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email"
                value={form.email || ""} 
                onChange={(e) => handleChange("email", e.target.value)} 
                required 
              />
            </div>
            {!isEditing && (
              <div>
                <Label htmlFor="password">Password</Label>
                <Input 
                  id="password" 
                  type="password"
                  value={form.password || ""} 
                  onChange={(e) => handleChange("password", e.target.value)} 
                  required 
                />
              </div>
            )}
            <div>
              <Label htmlFor="role">Role</Label>
              <Select value={form.role} onValueChange={(value) => handleChange("role", value)}>
                <SelectTrigger>
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
            <div className="flex gap-2">
              <Button type="submit" className="flex-1">
                {isEditing ? "Update User" : "Create User"}
              </Button>
              <Button type="button" variant="outline" onClick={resetForm} className="flex-1">
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card className="lg:col-span-2 bg-card/50 backdrop-blur-sm border-kelvin-border">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>User Management</CardTitle>
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-40">
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
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Sign In</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Select 
                        value={user.role} 
                        onValueChange={(value) => handleRoleChange(user.id, value)}
                      >
                        <SelectTrigger className="w-24">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="guest">Guest</SelectItem>
                          <SelectItem value="fan">Fan</SelectItem>
                          <SelectItem value="premium">Premium</SelectItem>
                          <SelectItem value="admin">Admin</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded text-xs ${
                        user.status === 'active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {user.status}
                      </span>
                    </TableCell>
                    <TableCell>{new Date(user.last_sign_in).toLocaleDateString()}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="icon" onClick={() => handleEdit(user)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="destructive" size="icon" onClick={() => handleDelete(user.id)}>
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
  )
}
