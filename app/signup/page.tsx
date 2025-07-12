"use client"

import { SignupForm } from "@/components/auth/signup-form"
import Link from "next/link"

export default function SignupPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-electric-950 to-background p-4">
      <div className="w-full max-w-md rounded-lg border border-electric-700 bg-background/50 p-8 shadow-lg backdrop-blur-lg">
        <h1 className="mb-6 text-center text-3xl font-bold text-electric-100">Sign Up</h1>
        <SignupForm />
        <p className="mt-6 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-electric-400 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  )
}
