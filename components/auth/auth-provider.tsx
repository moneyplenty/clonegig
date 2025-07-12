"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { useToast } from "@/hooks/use-toast"

interface User {
  id: string
  email: string
  user_metadata?: {
    role?: string
    membership_tier?: string
  }
}

interface AuthContextType {
  user: User | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
  resetPassword: (email: string) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem("kelvin-fan-user")
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (error) {
        localStorage.removeItem("kelvin-fan-user")
      }
    }
    setLoading(false)
  }, [])

  const signIn = async (email: string, password: string) => {
    setLoading(true)

    try {
      // Simulate authentication
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Check admin credentials
      if (email === "cloudyzaddy@gmail.com" && password === "KelvinAdmin2024!") {
        const adminUser: User = {
          id: "admin-1",
          email,
          user_metadata: {
            role: "admin",
            membership_tier: "admin",
          },
        }
        setUser(adminUser)
        localStorage.setItem("kelvin-fan-user", JSON.stringify(adminUser))
        return
      }

      // Regular user login
      if (password.length >= 6) {
        const regularUser: User = {
          id: `user-${Date.now()}`,
          email,
          user_metadata: {
            role: "user",
            membership_tier: "blizzard_vip",
          },
        }
        setUser(regularUser)
        localStorage.setItem("kelvin-fan-user", JSON.stringify(regularUser))
        return
      }

      throw new Error("Invalid credentials")
    } catch (error: any) {
      throw new Error(error.message || "Sign in failed")
    } finally {
      setLoading(false)
    }
  }

  const signUp = async (email: string, password: string) => {
    setLoading(true)

    try {
      // Simulate account creation
      await new Promise((resolve) => setTimeout(resolve, 1000))

      if (password.length < 6) {
        throw new Error("Password must be at least 6 characters")
      }

      // Don't actually sign in, just indicate success
      toast({
        title: "Account created successfully! 🎉",
        description: "Please complete your payment to activate your membership.",
      })
    } catch (error: any) {
      throw new Error(error.message || "Sign up failed")
    } finally {
      setLoading(false)
    }
  }

  const signOut = async () => {
    setUser(null)
    localStorage.removeItem("kelvin-fan-user")
    toast({
      title: "Signed out",
      description: "You have been signed out successfully.",
    })
  }

  const resetPassword = async (email: string) => {
    toast({
      title: "Password reset email sent",
      description: "Check your email for password reset instructions.",
    })
  }

  const value = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
    resetPassword,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
