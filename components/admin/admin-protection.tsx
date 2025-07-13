"use client"

import type React from "react"

import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Loader2 } from "lucide-react"

export function AdminProtection({ children }: { children: React.ReactNode }) {
  const supabase = createClient()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    async function checkAdminStatus() {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        router.push("/login")
        return
      }

      const { data: profile, error } = await supabase.from("profiles").select("role").eq("id", user.id).single()

      if (error || profile?.role !== "admin") {
        router.push("/") // Redirect non-admins to home
      } else {
        setIsAdmin(true)
      }
      setLoading(false)
    }

    checkAdminStatus()
  }, [supabase, router])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-14rem)]">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        <p className="ml-2 text-lg">Loading admin panel...</p>
      </div>
    )
  }

  if (!isAdmin) {
    return null // Or a message like "Access Denied"
  }

  return <>{children}</>
}
