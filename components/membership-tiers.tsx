import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, Star, Zap, Crown } from "lucide-react"
import Link from "next/link"

export function MembershipTiers() {
  const tiers = [
    {
      name: "Frost Fan",
      price: "Free",
      description: "Basic access to the fan club.",
      icon: Star,
      features: [
        "Access to public blog posts",
        "Basic event information",
        "Newsletter subscription",
        "Community forum access",
      ],
      buttonText: "Join for Free",
      link: "/signup",
    },
    {
      name: "Blizzard VIP",
      price: "$9.99/month",
      description: "Enhanced access for dedicated fans.",
      icon: Zap,
      features: [
        "All Frost Fan features",
        "Exclusive behind-the-scenes content",
        "Early access to concert tickets",
        "Priority in Q&A sessions",
        "10% merchandise discount",
      ],
      buttonText: "Upgrade to VIP",
      link: "/join",
    },
    {
      name: "Avalanche Elite",
      price: "$24.99/month",
      description: "The ultimate fan experience.",
      icon: Crown,
      features: [
        "All Blizzard VIP features",
        "Private meet & greet lottery entries",
        "Signed merchandise giveaways",
        "Exclusive Discord channel access",
        "20% merchandise discount",
        "Early access to unreleased music",
      ],
      buttonText: "Go Elite",
      link: "/join",
    },
  ]

  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Membership Tiers</h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Choose the membership that best suits your level of fandom.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-start gap-6 py-12 lg:grid-cols-3 lg:gap-12">
          {tiers.map((tier, index) => (
            <Card key={index} className="flex flex-col">
              <CardHeader className="text-center">
                <tier.icon className="h-10 w-10 mx-auto mb-4 text-primary" />
                <CardTitle className="text-2xl font-bold">{tier.name}</CardTitle>
                <CardDescription className="text-lg font-semibold">{tier.price}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 space-y-2">
                <p className="text-center text-gray-600 dark:text-gray-400 mb-4">{tier.description}</p>
                <ul className="space-y-2">
                  {tier.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="pt-4">
                <Link href={tier.link} className="w-full">
                  <Button className="w-full">{tier.buttonText}</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
