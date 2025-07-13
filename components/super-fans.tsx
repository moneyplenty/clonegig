"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ExternalLink } from "lucide-react"

const superFans = [
  {
    id: 1,
    name: "Sarah Ice",
    username: "@sarah_ice_fan",
    avatar: "/placeholder.svg?height=40&width=40",
    tiktokUrl: "https://www.tiktok.com/@lk_larr_?_t=ZS-8xyuzCdnwMk&_r=1",
  },
  {
    id: 2,
    name: "Mike Frost",
    username: "@mike_frost_kc",
    avatar: "/placeholder.svg?height=40&width=40",
    tiktokUrl: "https://www.tiktok.com/@lk_larr_?_t=ZS-8xyuzCdnwMk&_r=1",
  },
  {
    id: 3,
    name: "Luna Storm",
    username: "@luna_storm_fan",
    avatar: "/placeholder.svg?height=40&width=40",
    tiktokUrl: "https://www.tiktok.com/@lk_larr_?_t=ZS-8xyuzCdnwMk&_r=1",
  },
]

export function SuperFans() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold">Super Fans</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {superFans.map((fan) => (
          <div key={fan.id} className="flex items-center justify-between space-x-3">
            <div className="flex items-center space-x-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src={fan.avatar || "/placeholder.svg"} alt={fan.name} />
                <AvatarFallback>
                  {fan.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-sm font-medium">{fan.name}</span>
                <span className="text-xs text-muted-foreground">{fan.username}</span>
              </div>
            </div>
            <Button
              size="sm"
              variant="outline"
              className="h-8 px-2 bg-transparent"
              onClick={() => window.open(fan.tiktokUrl, "_blank")}
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
              </svg>
              <ExternalLink className="h-3 w-3 ml-1" />
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
