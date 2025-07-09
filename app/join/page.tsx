import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Check } from "lucide-react"
import { MembershipTiers } from "@/components/membership-tiers"

export default function JoinPage() {
  return (
    <div className="container py-10">
      <div className="flex flex-col gap-8">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">Join the Stellar Experience</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Choose the membership tier that's right for you and unlock exclusive content, experiences, and merchandise
            that brings you closer to the music and the artist.
          </p>
        </div>

        <MembershipTiers />

        <div className="mt-12 bg-muted/50 rounded-lg p-8">
          <div className="grid gap-8 md:grid-cols-2 items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Membership Benefits</h2>
              <p className="mt-4 text-muted-foreground">
                All memberships include these core benefits, with higher tiers unlocking even more exclusive perks.
              </p>
              <ul className="mt-6 space-y-4">
                <li className="flex items-start">
                  <Check className="mr-2 h-5 w-5 text-primary mt-0.5" />
                  <span>Access to exclusive content including videos, photos, and music</span>
                </li>
                <li className="flex items-start">
                  <Check className="mr-2 h-5 w-5 text-primary mt-0.5" />
                  <span>Member-only community access with direct artist interaction</span>
                </li>
                <li className="flex items-start">
                  <Check className="mr-2 h-5 w-5 text-primary mt-0.5" />
                  <span>Early access to concert tickets and special events</span>
                </li>
                <li className="flex items-start">
                  <Check className="mr-2 h-5 w-5 text-primary mt-0.5" />
                  <span>Exclusive merchandise only available to members</span>
                </li>
                <li className="flex items-start">
                  <Check className="mr-2 h-5 w-5 text-primary mt-0.5" />
                  <span>Points system to earn rewards and level up your membership</span>
                </li>
              </ul>
            </div>
            <div className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden">
              <Image
                src="/placeholder.svg?height=800&width=600"
                alt="Fan club benefits"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-3xl font-bold tracking-tight text-center">Frequently Asked Questions</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>How do I cancel my membership?</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  You can cancel your membership at any time from your account settings. Your benefits will continue
                  until the end of your current billing period.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Can I upgrade my membership tier?</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Yes! You can upgrade your membership at any time. The price difference will be prorated for the
                  remainder of your billing period.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>How often is new content added?</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  New exclusive content is added weekly, with major content drops announced in advance through our
                  newsletter and notifications.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Are there any discounts for annual memberships?</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Yes, we offer a 20% discount when you choose annual billing for any membership tier. This option is
                  available during checkout.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mt-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight">Ready to Join?</h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Join thousands of fans who are already enjoying exclusive content and experiences. Choose your membership
            tier and start your journey today.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="rounded-full">
              <Link href="/join/checkout">Join Now</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full">
              <Link href="/contact">Contact Support</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
