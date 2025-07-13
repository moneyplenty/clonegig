"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingBag, Truck, Shield, RotateCcw } from "lucide-react"
import Image from "next/image"

export function StoreBanner() {
  return (
    <div className="space-y-6 mb-8">
      {/* Main Banner */}
      <Card className="overflow-hidden bg-gradient-to-r from-primary/10 to-primary/5">
        <CardContent className="p-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            <div className="p-6 lg:p-8">
              <Badge className="mb-4">Official Merchandise</Badge>
              <h1 className="text-3xl lg:text-4xl font-bold mb-4">Kelvin Creekman Store</h1>
              <p className="text-lg text-muted-foreground mb-6">
                Get exclusive merchandise, limited edition items, and show your support for Kelvin Creekman with our
                official store.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg">
                  <ShoppingBag className="mr-2 h-5 w-5" />
                  Shop Now
                </Button>
                <Button variant="outline" size="lg">
                  View Collections
                </Button>
              </div>
            </div>
            <div className="relative h-64 lg:h-80">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="Kelvin Creekman Merchandise"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Truck className="h-8 w-8 mx-auto mb-2 text-primary" />
            <h3 className="font-semibold mb-1">Free Shipping</h3>
            <p className="text-sm text-muted-foreground">On orders over $50</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <Shield className="h-8 w-8 mx-auto mb-2 text-primary" />
            <h3 className="font-semibold mb-1">Secure Payment</h3>
            <p className="text-sm text-muted-foreground">100% secure checkout</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <RotateCcw className="h-8 w-8 mx-auto mb-2 text-primary" />
            <h3 className="font-semibold mb-1">Easy Returns</h3>
            <p className="text-sm text-muted-foreground">30-day return policy</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
