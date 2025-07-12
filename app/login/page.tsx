import type { Metadata } from "next"
import { LoginForm } from "@/components/auth/login-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Sign In | Kelvin Creekman Fan Club",
  description: "Sign in to access exclusive content and features",
}

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted/20 p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold bg-gradient-fire dark:bg-gradient-ice bg-clip-text text-transparent">
            Welcome Back
          </h1>
          <p className="text-muted-foreground">Sign in to your Kelvin Creekman Fan Club account</p>
        </div>

        <Card className="border-fire-500/20 dark:border-ice-500/20 bg-background/50 backdrop-blur-lg">
          <CardHeader>
            <CardTitle className="text-fire-600 dark:text-ice-400">Sign In</CardTitle>
            <CardDescription>Enter your email and password to access your account</CardDescription>
          </CardHeader>
          <CardContent>
            <LoginForm />
          </CardContent>
        </Card>

        <div className="text-center text-sm">
          <span className="text-muted-foreground">Don't have an account? </span>
          <Link
            href="/signup"
            className="text-fire-600 dark:text-ice-400 hover:text-fire-700 dark:hover:text-ice-300 font-medium"
          >
            Sign up here
          </Link>
        </div>

        <div className="text-center text-xs text-muted-foreground">
          <p>Admin Login: cloudyzaddy@gmail.com</p>
          <p>Password: KelvinAdmin2024!</p>
        </div>
      </div>
    </div>
  )
}
