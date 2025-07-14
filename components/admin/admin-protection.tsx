"use client"

import type React from "react"

import { useAuth } from "@/components/auth/auth-provider"
import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { Skeleton } from "@/components/ui/skeleton"

interface AdminProtectionProps {
  children: React.ReactNode
}

export function AdminProtection({ children }: AdminProtectionProps) {
  const { user, loading: authLoading } = useAuth()
  const [isAdmin, setIsAdmin] = useState(false)
  const [profileLoading, setProfileLoading] = useState(true)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (authLoading) return // Wait for auth status to be determined

      if (!user) {
        router.push("/login") // Redirect to login if not authenticated
        return
      }

      setProfileLoading(true)
      const { data: profile, error } = await supabase
        .from("profiles")
        .select("membership_tier")
        .eq("id", user.id)
        .single()

      if (error) {
        console.error("Error fetching profile for admin check:", error.message)
        setIsAdmin(false)
        router.push("/dashboard") // Redirect if profile fetch fails or user is not admin
      } else if (profile?.membership_tier === "admin") {
        setIsAdmin(true)
      } else {
        setIsAdmin(false)
        router.push("/dashboard") // Redirect if not admin
      }
      setProfileLoading(false)
    }

    checkAdminStatus()
  }, [user, authLoading, router, supabase])

  if (authLoading || profileLoading) {
    return (
      <div className="container py-12 md:py-24">
        <div className="space-y-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-40 w-full" />
        </div>
      </div>
    )
  }

  if (isAdmin) {
    return <>{children}</>
  }

  return null // Or a message like "You do not have access to this page."
}
