import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import Link from "next/link"

export function MembershipTiers() {
  return (
    <section className="py-12 bg-kelvin-background text-kelvin-foreground">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-8">Membership Tiers</h2>
        <p className="text-lg text-kelvin-foreground/80 text-center max-w-3xl mx-auto mb-12">
          Choose the perfect level of access to Kelvin Creekman&apos;s world.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="bg-kelvin-card text-kelvin-card-foreground border-kelvin-border shadow-lg flex flex-col">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-3xl font-bold text-electric-400">Guest</CardTitle>
              <CardDescription className="text-kelvin-card-foreground/80">Free</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col items-center justify-center p-6">
              <ul className="space-y-2 text-left w-full">
                <li className="flex items-center gap-2">
                  <Icons.checkCircle className="w-5 h-5 text-green-500" />
                  Basic website access
                </li>
                <li className="flex items-center gap-2">
                  <Icons.checkCircle className="w-5 h-5 text-green-500" />
                  Public news & updates
                </li>
                <li className="flex items-center gap-2">
                  <Icons.minus className="w-5 h-5 text-gray-500" />
                  Limited content access
                </li>
                <li className="flex items-center gap-2">
                  <Icons.minus className="w-5 h-5 text-gray-500" />
                  No merchandise discounts
                </li>
                <li className="flex items-center gap-2">
                  <Icons.minus className="w-5 h-5 text-gray-500" />
                  No meet & greet access
                </li>
              </ul>
            </CardContent>
            <CardFooter className="pt-4">
              <Button asChild className="w-full bg-electric-500 hover:bg-electric-600 text-white">
                <Link href="/signup">Sign Up (Free)</Link>
              </Button>
            </CardFooter>
          </Card>

          <Card className="bg-kelvin-card text-kelvin-card-foreground border-kelvin-border shadow-lg flex flex-col">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-3xl font-bold text-frost-400">Fan</CardTitle>
              <CardDescription className="text-kelvin-card-foreground/80">$9.99 / month</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col items-center justify-center p-6">
              <ul className="space-y-2 text-left w-full">
                <li className="flex items-center gap-2">
                  <Icons.checkCircle className="w-5 h-5 text-green-500" />
                  All Guest features
                </li>
                <li className="flex items-center gap-2">
                  <Icons.checkCircle className="w-5 h-5 text-green-500" />
                  Expanded content library
                </li>
                <li className="flex items-center gap-2">
                  <Icons.checkCircle className="w-5 h-5 text-green-500" />
                  5% merchandise discount
                </li>
                <li className="flex items-center gap-2">
                  <Icons.checkCircle className="w-5 h-5 text-green-500" />
                  Early event ticket access
                </li>
                <li className="flex items-center gap-2">
                  <Icons.minus className="w-5 h-5 text-gray-500" />
                  No meet & greet access
                </li>
              </ul>
            </CardContent>
            <CardFooter className="pt-4">
              <Button asChild className="w-full bg-frost-500 hover:bg-frost-600 text-white">
                <Link href="#">Choose Fan Tier</Link>
              </Button>
            </CardFooter>
          </Card>

          <Card className="bg-kelvin-card text-kelvin-card-foreground border-kelvin-border shadow-lg flex flex-col">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-3xl font-bold text-purple-400">Premium</CardTitle>
              <CardDescription className="text-kelvin-card-foreground/80">$24.99 / month</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col items-center justify-center p-6">
              <ul className="space-y-2 text-left w-full">
                <li className="flex items-center gap-2">
                  <Icons.checkCircle className="w-5 h-5 text-green-500" />
                  All Fan features
                </li>
                <li className="flex items-center gap-2">
                  <Icons.checkCircle className="w-5 h-5 text-green-500" />
                  Full content library access
                </li>
                <li className="flex items-center gap-2">
                  <Icons.checkCircle className="w-5 h-5 text-green-500" />
                  15% merchandise discount
                </li>
                <li className="flex items-center gap-2">
                  <Icons.checkCircle className="w-5 h-5 text-green-500" />
                  Exclusive meet & greet access
                </li>
                <li className="flex items-center gap-2">
                  <Icons.checkCircle className="w-5 h-5 text-green-500" />
                  Priority support
                </li>
              </ul>
            </CardContent>
            <CardFooter className="pt-4">
              <Button asChild className="w-full bg-purple-500 hover:bg-purple-600 text-white">
                <Link href="#">Choose Premium Tier</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  )
}
