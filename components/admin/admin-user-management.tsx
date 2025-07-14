"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import type { Profile } from "@/types/index.d"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { toast } from "@/hooks/use-toast"
import { Edit, Trash2 } from "lucide-react"

export function AdminUserManagement() {
  const supabase = createClient()
  const [users, setUsers] = useState<Profile[]>([])
  const [loading, setLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [currentUser, setCurrentUser] = useState<Profile | null>(null)
  const [formData, setFormData] = useState({
    username: "",
    membership_tier: "free",
  })

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    setLoading(true)
    const { data, error } = await supabase.from("profiles").select("*").order("created_at", { ascending: false })
    if (error) {
      console.error("Error fetching users:", error.message)
      toast({
        title: "Error",
        description: "Failed to fetch users.",
        variant: "destructive",
      })
    } else {
      setUsers(data || [])
    }
    setLoading(false)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleSelectChange = (id: string, value: string) => {
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    if (currentUser) {
      // Update existing user
      const { error } = await supabase.from("profiles").update(formData).eq("id", currentUser.id)

      if (error) {
        console.error("Error updating user:", error.message)
        toast({
          title: "Error",
          description: "Failed to update user.",
          variant: "destructive",
        })
      } else {
        toast({
          title: "Success",
          description: "User updated successfully.",
        })
        setIsDialogOpen(false)
        fetchUsers()
      }
    }
    setLoading(false)
  }

  const handleDeleteUser = async (id: string) => {
    if (!confirm("Are you sure you want to delete this user? This will delete their profile and associated auth user."))
      return

    setLoading(true)
    // Note: Deleting from auth.users will cascade delete from profiles due to RLS.
    // This operation requires service_role key on the backend or admin privileges.
    // For client-side, you might need a server action/route handler.
    // For simplicity, this example assumes admin can delete directly if RLS allows.
    const { error } = await supabase.rpc("delete_user_by_id", { user_id_to_delete: id })

    if (error) {
      console.error("Error deleting user:", error.message)
      toast({
        title: "Error",
        description: `Failed to delete user: ${error.message}. Ensure you have a 'delete_user_by_id' function in Supabase.`,
        variant: "destructive",
      })
    } else {
      toast({
        title: "Success",
        description: "User deleted successfully.",
      })
      fetchUsers()
    }
    setLoading(false)
  }

  const openEditDialog = (user: Profile) => {
    setCurrentUser(user)
    setFormData({
      username: user.username || "",
      membership_tier: user.membership_tier || "free",
    })
    setIsDialogOpen(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">User Management</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit User</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleFormSubmit} className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Username
                </Label>
                <Input
                  id="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="membership_tier" className="text-right">
                  Membership Tier
                </Label>
                <Select
                  value={formData.membership_tier}
                  onValueChange={(value) => handleSelectChange("membership_tier", value)}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select tier" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="free">Free</SelectItem>
                    <SelectItem value="fan">Fan</SelectItem>
                    <SelectItem value="super_fan">Super Fan</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Saving..." : "Save Changes"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {loading ? (
        <p>Loading users...</p>
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Username</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Membership Tier</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.username}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell className="capitalize">{user.membership_tier?.replace("_", " ")}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => openEditDialog(user)}>
                      <Edit className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDeleteUser(user.id)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
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
