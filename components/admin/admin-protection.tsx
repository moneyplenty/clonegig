"use client"

import { Button } from "@/components/ui/button"

import type React from "react"

import { useAuth } from "@/components/auth/auth-provider"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ShieldOff } from "lucide-react"

interface AdminProtectionProps {
  children: React.ReactNode
  requiredRole: "admin" | "fan" | "premium" | "guest"
}

export function AdminProtection({ children, requiredRole }: AdminProtectionProps) {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading) {
      if (!user) {
        // Not logged in, redirect to login
        router.push("/login")
      } else if (user.user_metadata?.role !== requiredRole) {
        // Logged in but doesn't have the required role
        // You might want to show an access denied message or redirect to a different page
        console.warn(
          `Access Denied: User role '${user.user_metadata?.role}' does not meet required role '${requiredRole}'.`,
        )
        // Optionally redirect to a general dashboard or home page
        // router.push("/dashboard");
      }
    }
  }, [user, loading, router, requiredRole])

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle>Loading User Data...</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!user || user.user_metadata?.role !== requiredRole) {
    // Render access denied message if not loading and user doesn't have access
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] p-4">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <ShieldOff className="mx-auto h-12 w-12 text-destructive mb-4" />
            <CardTitle>Access Denied</CardTitle>
            <p className="text-muted-foreground">You do not have the necessary permissions to view this page.</p>
          </CardHeader>
          <CardContent>
            <Button onClick={() => router.push("/dashboard")}>Go to Dashboard</Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return <>{children}</>
}
