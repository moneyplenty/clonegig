"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/auth/auth-provider"
import { Loader2 } from "lucide-react"
import { toast } from "@/hooks/use-toast"

interface AdminProtectionProps {
  children: React.ReactNode
}

export function AdminProtection({ children }: AdminProtectionProps) {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading) {
      if (!user) {
        toast({
          title: "Access Denied",
          description: "You must be logged in to access this page.",
          variant: "destructive",
        })
        router.push("/login")
      } else if (user.role !== "admin") {
        toast({
          title: "Access Denied",
          description: "You do not have permission to view this page.",
          variant: "destructive",
        })
        router.push("/dashboard")
      }
    }
  }, [user, loading, router])

  if (loading || !user || user.role !== "admin") {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="sr-only">Loading...</span>
      </div>
    )
  }

  return <>{children}</>
}
