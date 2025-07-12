"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { toast } from "@/components/ui/use-toast"
import { Loader2 } from "lucide-react"

interface AdminProtectionProps {
  children: React.ReactNode
}

export function AdminProtection({ children }: AdminProtectionProps) {
  const router = useRouter()
  const supabase = createClient()
  const [isLoading, setIsLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    const checkUserRole = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser()

      if (error || !user) {
        toast({
          title: "Access Denied",
          description: "You must be logged in to access this page.",
          variant: "destructive",
        })
        router.push("/login")
        return
      }

      // Fetch user's role from public.users table or user_metadata
      // For simplicity, we'll use user_metadata here as set during signup
      const userRole = user.user_metadata?.role

      if (userRole === "admin") {
        setIsAdmin(true)
      } else {
        toast({
          title: "Access Denied",
          description: "You do not have administrative privileges.",
          variant: "destructive",
        })
        router.push("/dashboard") // Redirect non-admins to dashboard
      }
      setIsLoading(false)
    }

    checkUserRole()
  }, [router, supabase])

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-12 w-12 animate-spin text-electric-500" />
        <p className="ml-4 text-electric-200">Loading admin panel...</p>
      </div>
    )
  }

  if (!isAdmin) {
    return null // Or a custom unauthorized message/component
  }

  return <>{children}</>
}
