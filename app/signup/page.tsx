import { MembershipSelection } from "@/components/auth/membership-selection"

export default function SignupPage() {
  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-4xl space-y-8">
        <div className="text-center">
          <h2 className="text-4xl font-bold tracking-tight text-white mb-4">Join the Kelvin Creekman Fan Club</h2>
          <p className="text-lg text-blue-200">
            Choose your membership tier and start your journey with exclusive content, merchandise, and experiences.
          </p>
        </div>
        <MembershipSelection />
      </div>
    </div>
  )
}
