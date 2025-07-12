import type { Metadata } from "next"
import { SignupForm } from "@/components/auth/signup-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Sign Up | Kelvin Creekman Fan Club",
  description: "Join the exclusive Kelvin Creekman Fan Club",
}

export default function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted/20 p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold bg-gradient-fire dark:bg-gradient-ice bg-clip-text text-transparent">
            Join the Club
          </h1>
          <p className="text-muted-foreground">Become a member of the exclusive Kelvin Creekman Fan Club</p>
        </div>

        <Card className="border-fire-500/20 dark:border-ice-500/20 bg-background/50 backdrop-blur-lg">
          <CardHeader>
            <CardTitle className="text-fire-600 dark:text-ice-400">Create Account</CardTitle>
            <CardDescription>Choose your membership tier and create your account</CardDescription>
          </CardHeader>
          <CardContent>
            <SignupForm />
          </CardContent>
        </Card>

        <div className="text-center text-sm">
          <span className="text-muted-foreground">Already have an account? </span>
          <Link
            href="/login"
            className="text-fire-600 dark:text-ice-400 hover:text-fire-700 dark:hover:text-ice-300 font-medium"
          >
            Sign in here
          </Link>
        </div>
      </div>
    </div>
  )
}
