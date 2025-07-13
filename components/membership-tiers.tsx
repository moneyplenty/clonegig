import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"
import Link from "next/link"

export function MembershipTiers() {
  const tiers = [
    {
      name: "Guest",
      price: "Free",
      description: "Basic access to public content and store.",
      features: ["Access to public blog posts", "Browse merchandise store", "Receive general newsletters"],
      buttonText: "Sign Up Free",
      link: "/signup",
    },
    {
      name: "Fan",
      price: "$5/month",
      description: "Enhanced access for dedicated fans.",
      features: [
        "All Guest features",
        "Early access to concert tickets",
        "Exclusive fan-only polls",
        "Digital fan badge",
      ],
      buttonText: "Join Fan Tier",
      link: "/join?tier=fan",
    },
    {
      name: "Premium",
      price: "$15/month",
      description: "Full access to all exclusive content and perks.",
      features: [
        "All Fan features",
        "Exclusive video content",
        "Monthly live Q&A with Kelvin",
        "Priority access to meet & greets",
        "Premium digital badge",
      ],
      buttonText: "Go Premium",
      link: "/join?tier=premium",
    },
  ]

  return (
    <section className="py-12 md:py-24 lg:py-32 bg-kelvin-background">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Membership Tiers</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Choose the perfect membership to unlock exclusive content and perks.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-start gap-6 py-12 lg:grid-cols-3 lg:gap-12">
          {tiers.map((tier) => (
            <Card key={tier.name} className="flex flex-col bg-card/50 backdrop-blur-sm border-kelvin-border">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold text-kelvin-foreground">{tier.name}</CardTitle>
                <CardDescription className="text-kelvin-muted-foreground">{tier.description}</CardDescription>
                <p className="text-4xl font-bold text-kelvin-primary mt-4">{tier.price}</p>
              </CardHeader>
              <CardContent className="flex-grow space-y-2 p-6">
                {tier.features.map((feature) => (
                  <div key={feature} className="flex items-center text-kelvin-foreground">
                    <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                    <span>{feature}</span>
                  </div>
                ))}
              </CardContent>
              <CardFooter className="p-6 pt-0">
                <Button
                  className="w-full bg-kelvin-secondary text-kelvin-secondary-foreground hover:bg-kelvin-secondary/90"
                  asChild
                >
                  <Link href={tier.link}>{tier.buttonText}</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
