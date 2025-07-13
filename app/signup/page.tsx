import { SignupForm } from "@/components/auth/signup-form"
import Link from "next/link"

export default function SignupPage() {
  return (
    <div className="flex min-h-[calc(100vh-64px)] items-center justify-center bg-kelvin-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-kelvin-card p-8 shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-kelvin-foreground">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-kelvin-muted-foreground">
            Or{" "}
            <Link href="/login" className="font-medium text-kelvin-primary hover:text-kelvin-primary/80">
              sign in to your existing account
            </Link>
          </p>
        </div>
        <SignupForm />
      </div>
    </div>
  )
}
