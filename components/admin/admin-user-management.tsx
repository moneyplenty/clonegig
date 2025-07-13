"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/hooks/use-toast"
import { Loader2, Edit, Trash2 } from "lucide-react"

interface Profile {
  id: string
  full_name: string | null
  email: string
  avatar_url: string | null
  role: string
  membership_tier: string
  created_at: string
  updated_at: string
}

export function AdminUserManagement() {
  const supabase = createClient()
  const [profiles, setProfiles] = useState<Profile[]>([])
  const [loading, setLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [currentProfile, setCurrentProfile] = useState<Profile | null>(null)
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    role: "user",
    membership_tier: "free",
  })

  useEffect(() => {
    fetchProfiles()
  }, [])

  const fetchProfiles = async () => {
    setLoading(true)
    const { data, error } = await supabase.from("profiles").select("*").order("created_at", { ascending: false })
    if (error) {
      console.error("Error fetching profiles:", error)
      toast({
        title: "Error",
        description: "Failed to load user profiles.",
        variant: "destructive",
      })
    } else {
      setProfiles(data || [])
    }
    setLoading(false)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleUpdateProfile = async () => {
    if (!currentProfile) return

    setLoading(true)
    const { error } = await supabase
      .from("profiles")
      .update({
        full_name: form.full_name,
        email: form.email,
        role: form.role,
        membership_tier: form.membership_tier,
        updated_at: new Date().toISOString(),
      })
      .eq("id", currentProfile.id)

    if (error) {
      console.error("Error updating profile:", error)
      toast({
        title: "Error",
        description: `Failed to update profile: ${error.message}`,
        variant: "destructive",
      })
    } else {
      toast({
        title: "Success",
        description: "Profile updated successfully.",
      })
      setIsDialogOpen(false)
      fetchProfiles()
    }
    setLoading(false)
  }

  const handleDeleteProfile = async (id: string) => {
    if (
      !confirm("Are you sure you want to delete this user profile and associated user? This action cannot be undone.")
    )
      return

    setLoading(true)
    // Supabase RLS should handle cascading delete from auth.users to public.profiles
    const { error } = await supabase.rpc("delete_user_and_profile", { user_id_to_delete: id })

    if (error) {
      console.error("Error deleting profile and user:", error)
      toast({
        title: "Error",
        description: `Failed to delete user: ${error.message}`,
        variant: "destructive",
      })
    } else {
      toast({
        title: "Success",
        description: "User and profile deleted successfully.",
      })
      fetchProfiles()
    }
    setLoading(false)
  }

  const openEditDialog = (profile: Profile) => {
    setCurrentProfile(profile)
    setForm({
      full_name: profile.full_name || "",
      email: profile.email,
      role: profile.role,
      membership_tier: profile.membership_tier,
    })
    setIsDialogOpen(true)
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">User Management</h1>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit User Profile</DialogTitle>
          </DialogHeader>
          {currentProfile && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="full_name" className="text-right">
                  Full Name
                </Label>
                <Input
                  id="full_name"
                  name="full_name"
                  value={form.full_name}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  value={form.email}
                  onChange={handleInputChange}
                  className="col-span-3"
                  type="email"
                  disabled // Email usually shouldn't be changed directly here
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="role" className="text-right">
                  Role
                </Label>
                <Select value={form.role} onValueChange={(value) => handleSelectChange("role", value)}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="user">User</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="membership_tier" className="text-right">
                  Membership Tier
                </Label>
                <Select
                  value={form.membership_tier}
                  onValueChange={(value) => handleSelectChange("membership_tier", value)}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select tier" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="free">Free</SelectItem>
                    <SelectItem value="premium">Premium</SelectItem>
                    <SelectItem value="vip">VIP</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setIsDialogOpen(false)} variant="outline">
              Cancel
            </Button>
            <Button onClick={handleUpdateProfile} disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : profiles.length === 0 ? (
        <p className="text-center text-muted-foreground">No user profiles found.</p>
      ) : (
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Full Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Membership Tier</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {profiles.map((profile) => (
                <TableRow key={profile.id}>
                  <TableCell className="font-medium">{profile.full_name || "N/A"}</TableCell>
                  <TableCell>{profile.email}</TableCell>
                  <TableCell>{profile.role}</TableCell>
                  <TableCell>{profile.membership_tier}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => openEditDialog(profile)}>
                      <Edit className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDeleteProfile(profile.id)}>
                      <Trash2 className="h-4 w-4" />
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
