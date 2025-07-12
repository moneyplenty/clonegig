"use client"

import { useEffect, useState, type ReactNode } from "react"
import { useRouter } from "next/navigation"
import type { User } from "@supabase/supabase-js"
import { createClient } from "@/lib/supabase/client"
import { toast } from "sonner"
import { Skeleton } from "@/components/ui/skeleton"

interface AdminProtectionProps {
  children: ReactNode
  user: User | null
}

export function AdminProtection({ children, user }: AdminProtectionProps) {
  const router = useRouter()
  const supabase = createClient()
  const [loading, setLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    const checkUserRole = async () => {
      if (!user) {
        toast.error("You must be logged in to access this page.")
        router.push("/login")
        return
      }

      const { data: profile, error } = await supabase.from("User").select("role").eq("id", user.id).single()

      if (error || profile?.role !== "admin") {
        toast.error("You do not have administrative privileges to access this page.")
        router.push("/dashboard") // Redirect to a non-admin page
      } else {
        setIsAdmin(true)
      }
      setLoading(false)
    }

    checkUserRole()
  }, [user, router, supabase])

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <Skeleton className="h-12 w-80 mb-8" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl">
          <Skeleton className="h-48 w-full" />
          <Skeleton className="h-48 w-full" />
          <Skeleton className="h-48 w-full" />
        </div>
      </div>
    )
  }

  if (!isAdmin) {
    return null // Or a message indicating no access
  }

  return <>{children}</>
}
