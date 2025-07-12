import { Check } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

const tiers = [
  {
    name: "Frost Fan",
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
    theme: "frost",
  },
  {
    name: "Blizzard VIP",
    price: "$19.99",
    description: "For dedicated fans who want the full experience",
    features: [
      "All Frost Fan benefits",
      "Full access to exclusive content",
      "Exclusive merchandise discounts",
      "Monthly virtual meetups",
      "Birthday message from the artist",
    ],
    cta: "Become a VIP",
    href: "/join?tier=vip",
    popular: true,
    theme: "electric",
  },
  {
    name: "Avalanche",
    price: "$49.99",
    description: "The ultimate fan experience with premium perks",
    features: [
      "All Blizzard VIP benefits",
      "Backstage pass for one concert per year",
      "Personalized video messages",
      "Limited edition merchandise",
      "Priority access to all events",
      "Quarterly private livestream",
    ],
    cta: "Go Backstage",
    href: "/join?tier=backstage",
    popular: false,
    theme: "metal",
  },
]

export function MembershipTiers() {
  return (
    <div className="grid gap-6 pt-8 lg:grid-cols-3 lg:gap-8">
      {tiers.map((tier, index) => (
        <Card
          key={tier.name}
          className={`flex flex-col relative overflow-hidden ${
            tier.popular
              ? "border-primary shadow-lg shadow-primary/20 scale-105 fire-card dark:ice-card"
              : index === 0
                ? "ember-card dark:metal-card"
                : "fire-card dark:ice-card"
          }`}
        >
          {tier.popular && (
            <div className="absolute -top-4 left-0 right-0 flex justify-center">
              <span className="bg-gradient-fire dark:bg-gradient-electric text-white text-sm font-medium py-1 px-3 rounded-full animate-fire-pulse dark:animate-electric-pulse">
                Most Popular
              </span>
            </div>
          )}

          {/* Theme effects */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div
              className={`absolute inset-0 blur-[50px] animate-pulse ${
                index === 0
                  ? "bg-ember-500 dark:bg-frost-700"
                  : index === 1
                    ? "bg-fire-500 dark:bg-electric-500"
                    : "bg-fire-700 dark:bg-electric-700"
              }`}
              style={{
                animationDelay: `${index * 0.7}s`,
              }}
            />
          </div>

          <CardHeader className="relative z-10">
            <CardTitle
              className={`text-2xl ${
                index === 0
                  ? "ember-text dark:frost-text"
                  : index === 1
                    ? "fire-text dark:electric-text"
                    : "fire-text dark:metal-text"
              }`}
            >
              {tier.name}
            </CardTitle>
            <div className="flex items-baseline text-2xl font-bold mt-2">
              <span className="text-primary">{tier.price}</span>
              <span className="ml-1 text-sm font-normal text-muted-foreground">/month</span>
            </div>
            <CardDescription>{tier.description}</CardDescription>
          </CardHeader>

          <CardContent className="flex-1 relative z-10">
            <ul className="space-y-2 text-sm">
              {tier.features.map((feature) => (
                <li key={feature} className="flex items-center">
                  <Check
                    className={`mr-2 h-4 w-4 ${
                      index === 0
                        ? "text-ember-400 dark:text-frost-400"
                        : index === 1
                          ? "text-fire-400 dark:text-electric-400"
                          : "text-fire-300 dark:text-electric-300"
                    }`}
                  />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>

          <CardFooter className="relative z-10">
            <Button
              asChild
              className={`w-full rounded-full ${
                tier.popular
                  ? "bg-gradient-fire dark:bg-gradient-electric hover:animate-fire-pulse dark:hover:animate-electric-pulse"
                  : "bg-background hover:bg-fire-900/50 dark:hover:bg-electric-900/50 border border-fire-500/40 dark:border-electric-500/40 hover:border-fire-400/70 dark:hover:border-electric-400/70"
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
