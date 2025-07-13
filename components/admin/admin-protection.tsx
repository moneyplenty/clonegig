"use client"

import type React from "react"

import { useAuth } from "@/components/auth/auth-provider"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { toast } from "sonner"
import { Skeleton } from "@/components/ui/skeleton"

interface AdminProtectionProps {
  children: React.ReactNode
  requiredRole: "admin" | "premium" | "fan" | "guest"
}

export function AdminProtection({ children, requiredRole }: AdminProtectionProps) {
  const { user, userRole, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading) {
      if (!user) {
        toast.error("You must be logged in to access this page.")
        router.push("/login")
      } else if (userRole !== requiredRole) {
        toast.error(`You do not have the required role (${requiredRole}) to access this page.`)
        router.push("/dashboard")
      }
    }
  }, [user, loading, userRole, requiredRole, router])

  if (loading || !user || userRole !== requiredRole) {
    return (
      <div className="flex flex-col min-h-[100dvh] bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-8">
        <Skeleton className="h-10 w-64 mb-8 bg-slate-700" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-48 w-full bg-slate-700" />
          ))}
        </div>
      </div>
    )
  }

  return <>{children}</>
}
