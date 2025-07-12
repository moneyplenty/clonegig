"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect, useCallback } from "react"
import { createClient } from "@/lib/supabase/client"
import type { User } from "@supabase/supabase-js"

interface UserWithRole extends User {
  role?: string
}

interface AuthContextType {
  user: UserWithRole | null
  loading: boolean
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserWithRole | null>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  const fetchUser = useCallback(async () => {
    const {
      data: { user: supabaseUser },
      error,
    } = await supabase.auth.getUser()
    if (error) {
      console.error("Error fetching user:", error)
      setUser(null)
    } else if (supabaseUser) {
      // Fetch user metadata or roles from your public.users table if needed
      const { data: profile, error: profileError } = await supabase
        .from("profiles") // Assuming you have a 'profiles' table linked to auth.users
        .select("role")
        .eq("id", supabaseUser.id)
        .single()

      if (profileError) {
        console.error("Error fetching user profile:", profileError)
        setUser(supabaseUser) // Still set user even if role fetch fails
      } else {
        setUser({ ...supabaseUser, role: profile?.role || "fan" }) // Default to 'fan' if no role found
      }
    } else {
      setUser(null)
    }
    setLoading(false)
  }, [supabase])

  useEffect(() => {
    fetchUser()

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" || event === "SIGNED_OUT" || event === "USER_UPDATED") {
        fetchUser()
      }
    })

    return () => {
      authListener.unsubscribe()
    }
  }, [supabase, fetchUser])

  const signOut = async () => {
    setLoading(true)
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.error("Error signing out:", error)
    } else {
      setUser(null)
    }
    setLoading(false)
  }

  return <AuthContext.Provider value={{ user, loading, signOut }}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
