"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/hooks/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function SignupForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [role, setRole] = useState("guest") // Default role
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    if (password !== confirmPassword) {
      toast({
        title: "Signup Error",
        description: "Passwords do not match.",
        variant: "destructive",
      })
      setLoading(false)
      return
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          role: role, // Set the user's role
        },
      },
    })

    if (error) {
      toast({
        title: "Signup Error",
        description: error.message,
        variant: "destructive",
      })
    } else {
      toast({
        title: "Signup Successful",
        description: "Please check your email to confirm your account.",
        variant: "default",
      })
      router.push("/login")
    }
    setLoading(false)
  }

  return (
    <form className="space-y-6" onSubmit={handleSignup}>
      <div>
        <Label htmlFor="email">Email address</Label>
        <Input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
        />
      </div>

      <div>
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          autoComplete="new-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
        />
      </div>

      <div>
        <Label htmlFor="confirm-password">Confirm Password</Label>
        <Input
          id="confirm-password"
          name="confirm-password"
          type="password"
          autoComplete="new-password"
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="••••••••"
        />
      </div>

      <div>
        <Label htmlFor="role">Account Type</Label>
        <Select value={role} onValueChange={setRole}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="guest">Guest (Free)</SelectItem>
            <SelectItem value="fan">Fan (Basic Membership)</SelectItem>
            <SelectItem value="premium">Premium (Full Access)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Signing Up..." : "Sign Up"}
        </Button>
      </div>
    </form>
  )
}
