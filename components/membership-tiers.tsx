import { Check } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

const tiers = [
  {
    name: "Fan",
    price: "$9.99",
    description: "Perfect for casual fans who want a taste of the experience",
    features: [
      "Access to select exclusive content",
      "Fan community access",
      "Monthly newsletter",
      "Early access to ticket sales",
    ],
    cta: "Join Now",
    href: "/join?tier=fan",
    popular: false,
  },
  {
    name: "VIP",
    price: "$19.99",
    description: "For dedicated fans who want the full experience",
    features: [
      "All Fan tier benefits",
      "Full access to exclusive content",
      "Exclusive merchandise discounts",
      "Monthly virtual meetups",
      "Birthday message from the artist",
    ],
    cta: "Become a VIP",
    href: "/join?tier=vip",
    popular: true,
  },
  {
    name: "Backstage",
    price: "$49.99",
    description: "The ultimate fan experience with premium perks",
    features: [
      "All VIP tier benefits",
      "Backstage pass for one concert per year",
      "Personalized video messages",
      "Limited edition merchandise",
      "Priority access to all events",
      "Quarterly private livestream",
    ],
    cta: "Go Backstage",
    href: "/join?tier=backstage",
    popular: false,
  },
]

export function MembershipTiers() {
  return (
    <div className="grid gap-6 pt-8 lg:grid-cols-3 lg:gap-8">
      {tiers.map((tier) => (
        <Card
          key={tier.name}
          className={`flex flex-col ${tier.popular ? "border-primary shadow-lg scale-105 relative" : ""}`}
        >
          {tier.popular && (
            <div className="absolute -top-4 left-0 right-0 flex justify-center">
              <span className="bg-primary text-primary-foreground text-sm font-medium py-1 px-3 rounded-full">
                Most Popular
              </span>
            </div>
          )}
          <CardHeader>
            <CardTitle className="text-xl">{tier.name}</CardTitle>
            <div className="flex items-baseline text-2xl font-bold">
              {tier.price}
              <span className="ml-1 text-sm font-normal text-muted-foreground">/month</span>
            </div>
            <CardDescription>{tier.description}</CardDescription>
          </CardHeader>
          <CardContent className="flex-1">
            <ul className="space-y-2 text-sm">
              {tier.features.map((feature) => (
                <li key={feature} className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-primary" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Button
              asChild
              className={`w-full rounded-full ${
                tier.popular ? "" : "bg-muted-foreground/80 hover:bg-muted-foreground"
              }`}
            >
              <Link href={tier.href}>{tier.cta}</Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
