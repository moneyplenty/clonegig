import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckIcon } from "@radix-ui/react-icons"
import Link from "next/link"

export function MembershipTiers() {
  const tiers = [
    {
      name: "Basic",
      price: "$19/month",
      features: ["Access to core features", "5GB storage", "Email support", "Community forum access"],
      buttonText: "Choose Basic",
    },
    {
      name: "Pro",
      price: "$49/month",
      features: [
        "All Basic features",
        "50GB storage",
        "Priority email support",
        "Advanced analytics",
        "Customizable dashboards",
      ],
      buttonText: "Choose Pro",
      highlight: true,
    },
    {
      name: "Enterprise",
      price: "Contact Us",
      features: [
        "All Pro features",
        "Unlimited storage",
        "24/7 dedicated support",
        "Single Sign-On (SSO)",
        "Custom integrations",
        "On-premise deployment options",
      ],
      buttonText: "Contact Sales",
    },
  ]

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Flexible Membership Tiers</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Choose the plan that best fits your needs and scale as you grow.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-start gap-6 py-12 lg:grid-cols-3 lg:gap-12">
          {tiers.map((tier, index) => (
            <Card key={index} className={`flex flex-col ${tier.highlight ? "border-primary shadow-lg" : ""}`}>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold">{tier.name}</CardTitle>
                <CardDescription className="text-3xl font-extrabold mt-2">{tier.price}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-2 text-left">
                  {tier.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <CheckIcon className="mr-2 h-4 w-4 text-green-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="p-6 pt-0">
                <Link href={tier.name === "Enterprise" ? "/contact" : "/signup"} passHref className="w-full">
                  <Button className="w-full" variant={tier.highlight ? "default" : "outline"}>
                    {tier.buttonText}
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
