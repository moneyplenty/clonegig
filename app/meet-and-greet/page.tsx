import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Icons } from "@/components/icons"
import { UpcomingSessions } from "@/components/meet-and-greet/upcoming-sessions"

export default function MeetAndGreetPage() {
  return (
    <div className="flex flex-col min-h-[100dvh] bg-kelvin-background text-kelvin-foreground">
      <main className="flex-1 container mx-auto py-12 px-4 md:px-6">
        <section className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-kelvin-foreground mb-4">
            Meet & Greet with Kelvin Creekman
          </h1>
          <p className="text-lg text-kelvin-foreground/80 max-w-3xl mx-auto">
            Get up close and personal with Kelvin in exclusive virtual meet and greet sessions.
          </p>
        </section>

        <section className="grid md:grid-cols-2 gap-8 mb-12">
          <Card className="bg-kelvin-card text-kelvin-card-foreground border-kelvin-border shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl font-semibold">
                <Icons.video className="w-6 h-6 text-electric-400" />
                Virtual Sessions
              </CardTitle>
              <CardDescription className="text-kelvin-card-foreground/80">
                Join a live video call with Kelvin and other premium fans.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <p className="text-kelvin-card-foreground/90">
                These exclusive sessions are your chance to ask questions, share your favorite moments, and interact
                directly with Kelvin. Limited spots available for each session.
              </p>
              <ul className="space-y-2 text-left text-kelvin-card-foreground/90">
                <li className="flex items-center gap-2">
                  <Icons.checkCircle className="w-5 h-5 text-green-500" />
                  Interactive Q&A
                </li>
                <li className="flex items-center gap-2">
                  <Icons.checkCircle className="w-5 h-5 text-green-500" />
                  Small group setting
                </li>
                <li className="flex items-center gap-2">
                  <Icons.checkCircle className="w-5 h-5 text-green-500" />
                  Exclusive to Premium members
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-kelvin-card text-kelvin-card-foreground border-kelvin-border shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl font-semibold">
                <Icons.crown className="w-6 h-6 text-purple-400" />
                Premium Access
              </CardTitle>
              <CardDescription className="text-kelvin-card-foreground/80">
                Meet & Greet sessions are a benefit of Premium Membership.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <p className="text-kelvin-card-foreground/90">
                To participate in Meet & Greet sessions, you need to be a Premium Fan Club member. Upgrade your
                membership today to unlock this and many other exclusive benefits.
              </p>
              <Button asChild className="w-full bg-purple-500 hover:bg-purple-600 text-white">
                <Link href="/join">Upgrade to Premium</Link>
              </Button>
            </CardContent>
          </Card>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-kelvin-foreground mb-6 text-center">
            Upcoming Meet & Greet Sessions
          </h2>
          <UpcomingSessions />
        </section>

        <section className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-kelvin-foreground mb-4">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8 mt-8">
            <div className="flex flex-col items-center text-center">
              <Icons.star className="w-12 h-12 text-frost-400 mb-4" />
              <h3 className="text-xl font-semibold text-kelvin-foreground mb-2">1. Be a Premium Member</h3>
              <p className="text-kelvin-foreground/80">Ensure your membership is active to gain access to booking.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <Icons.calendar className="w-12 h-12 text-electric-400 mb-4" />
              <h3 className="text-xl font-semibold text-kelvin-foreground mb-2">2. Book Your Slot</h3>
              <p className="text-kelvin-foreground/80">Select an available session and confirm your attendance.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <Icons.video className="w-12 h-12 text-purple-400 mb-4" />
              <h3 className="text-xl font-semibold text-kelvin-foreground mb-2">3. Join the Call</h3>
              <p className="text-kelvin-foreground/80">Receive a unique link to join the virtual meet & greet.</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
