"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function SignupForm() {
  const router = useRouter()

  return (
    <Card className="w-full max-w-md mx-auto bg-slate-800/50 border-slate-700">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl text-white">Join the Fan Club</CardTitle>
        <CardDescription className="text-slate-300">Choose a membership tier to get started</CardDescription>
      </CardHeader>
      <CardContent>
        <Button onClick={() => router.push("/signup")} className="w-full bg-blue-600 hover:bg-blue-700">
          Choose Membership Tier
        </Button>
      </CardContent>
    </Card>
  )
}
