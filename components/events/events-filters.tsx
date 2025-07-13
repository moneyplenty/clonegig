"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

export function EventsFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentType = searchParams.get("type") || "all"

  const handleFilterChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value === "all") {
      params.delete("type")
    } else {
      params.set("type", value)
    }
    router.push(`/events?${params.toString()}`)
  }

  return (
    <Card className="bg-kelvin-card text-kelvin-card-foreground border-kelvin-border shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Filter Events</CardTitle>
      </CardHeader>
      <CardContent>
        <RadioGroup value={currentType} onValueChange={handleFilterChange} className="space-y-4">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="all" id="type-all" />
            <Label htmlFor="type-all">All Events</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="concert" id="type-concert" />
            <Label htmlFor="type-concert">Concerts</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="meet-and-greet" id="type-meet-and-greet" />
            <Label htmlFor="type-meet-and-greet">Meet & Greets</Label>
          </div>
        </RadioGroup>
      </CardContent>
    </Card>
  )
}
