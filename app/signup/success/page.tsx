"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Icons } from "@/components/icons"
import { toast } from "sonner"
import { createClient } from "@/lib/supabase/client"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

const formSchema = z
  .object({
    email: z.string().email({ message: "Enter a valid email address." }),
    password: z.string().min(6, { message: "Password must be at least 6 characters." }),
    confirmPassword: z.string().min(6, { message: "Password must be at least 6 characters." }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })

type FormValues = z.infer<typeof formSchema>

export default function SignupSuccessPage() {
  const [loading, setLoading] = useState(false)
  const [sessionData, setSessionData] = useState<any>(null)
  const router = useRouter()
  const searchParams = useSearchParams()
  const sessionId = searchParams.get("session_id")
  const supabase = createClient()

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  })

  useEffect(() => {
    if (sessionId) {
      // Verify the session and get customer details
      fetch(`/api/verify-membership-session?session_id=${sessionId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.session) {
            setSessionData(data.session)
            // Pre-fill email if available
            if (data.session.customer_details?.email) {
              form.setValue("email", data.session.customer_details.email)
            }
          }
        })
        .catch((error) => {
          console.error("Error verifying session:", error)
          toast.error("Failed to verify payment session")
        })
    }
  }, [sessionId, form])

  const onSubmit = async (values: FormValues) => {
    if (!sessionData) {
      toast.error("Payment session not found. Please try again.")
      return
    }

    setLoading(true)

    try {
      // Create user account
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
        options: {
          data: {
            role: sessionData.metadata?.tierName?.toLowerCase() || "fan",
            stripeCustomerId: sessionData.customer,
            stripeSubscriptionId: sessionData.subscription,
          },
        },
      })

      if (authError) {
        throw new Error(authError.message)
      }

      if (authData.user) {
        // Insert user into database
        const { error: dbError } = await supabase.from("User").insert({
          id: authData.user.id,
          email: authData.user.email!,
          role: sessionData.metadata?.tierName?.toLowerCase() || "fan",
          stripeCustomerId: sessionData.customer,
        })

        if (dbError) {
          console.error("Database error:", dbError)
          toast.error("Account created but failed to save user data. Please contact support.")
        } else {
          toast.success("Account created successfully! Welcome to the Kelvin Creekman Fan Club!")
          router.push("/dashboard")
        }
      }
    } catch (error: any) {
      console.error("Signup error:", error)
      toast.error(error.message || "Failed to create account")
    } finally {
      setLoading(false)
    }
  }

  if (!sessionId) {
    return (
      <div className="flex min-h-[100dvh] items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 px-4">
        <Card className="w-full max-w-md bg-slate-800/50 border-slate-700">
          <CardHeader className="text-center">
            <CardTitle className="text-red-400">Invalid Session</CardTitle>
            <CardDescription className="text-slate-300">
              No payment session found. Please try signing up again.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => router.push("/signup")} className="w-full">
              Back to Signup
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 px-4 py-12">
      <Card className="w-full max-w-md bg-slate-800/50 border-slate-700">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-500/20">
            <Icons.checkCircle className="h-6 w-6 text-green-400" />
          </div>
          <CardTitle className="text-2xl text-white">Payment Successful!</CardTitle>
          <CardDescription className="text-slate-300">
            Complete your account setup to access your membership benefits.
          </CardDescription>
        </CardHeader>

        <CardContent>
          {sessionData && (
            <div className="mb-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
              <h3 className="font-semibold text-blue-400 mb-2">Membership Details</h3>
              <p className="text-sm text-slate-300">
                Tier: <span className="font-medium text-white">{sessionData.metadata?.tierName}</span>
              </p>
              <p className="text-sm text-slate-300">
                Amount: <span className="font-medium text-white">${sessionData.amount_total / 100}</span>
              </p>
            </div>
          )}

          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="email" className="text-slate-200">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                {...form.register("email")}
                disabled={loading}
                className="bg-slate-700/50 border-slate-600 text-white"
              />
              {form.formState.errors.email && (
                <p className="text-sm text-red-400 mt-1">{form.formState.errors.email.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="password" className="text-slate-200">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                {...form.register("password")}
                disabled={loading}
                className="bg-slate-700/50 border-slate-600 text-white"
              />
              {form.formState.errors.password && (
                <p className="text-sm text-red-400 mt-1">{form.formState.errors.password.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="confirmPassword" className="text-slate-200">
                Confirm Password
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                {...form.register("confirmPassword")}
                disabled={loading}
                className="bg-slate-700/50 border-slate-600 text-white"
              />
              {form.formState.errors.confirmPassword && (
                <p className="text-sm text-red-400 mt-1">{form.formState.errors.confirmPassword.message}</p>
              )}
            </div>

            <Button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700">
              {loading ? (
                <>
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  Creating Account...
                </>
              ) : (
                "Complete Account Setup"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
