import { LoginForm } from "@/components/auth/login-form"
import Link from "next/link"

export default function LoginPage() {
  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-slate-800/50 p-8 shadow-lg border border-slate-700">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-white">Welcome back</h2>
          <p className="mt-2 text-center text-sm text-slate-300">
            Or{" "}
            <Link href="/signup" className="font-medium text-blue-400 hover:text-blue-300">
              join the fan club today
            </Link>
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}
