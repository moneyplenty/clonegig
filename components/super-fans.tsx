"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Crown } from "lucide-react"
import type { Profile } from "@/types"

interface SuperFansProps {
  initialSuperFans: Profile[]
}

export function SuperFans({ initialSuperFans }: SuperFansProps) {
  const superFans = initialSuperFans.filter((fan) => fan.membership_tier === "super_fan")

  return (
    <section className="container mx-auto px-4 py-12 md:py-20">
      <div className="mb-12 text-center">
        <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">Our Super Fans</h2>
        <p className="mt-4 text-lg text-muted-foreground">
          A special shoutout to our most dedicated community members!
        </p>
      </div>

      {superFans.length === 0 ? (
        <p className="text-center text-muted-foreground">No Super Fans yet. Become one today!</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {superFans.map((fan) => (
            <Card key={fan.id} className="flex flex-col items-center text-center">
              <CardHeader>
                <Avatar className="h-24 w-24 border-4 border-gold-400">
                  <AvatarImage
                    src={fan.avatar_url || "/placeholder-user.jpg"}
                    alt={fan.username || fan.full_name || "Super Fan"}
                  />
                  <AvatarFallback>{(fan.username || fan.full_name || "SF").charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
              </CardHeader>
              <CardContent className="flex flex-col items-center">
                <Crown className="h-6 w-6 text-gold-400 mb-2" />
                <CardTitle className="text-lg font-semibold">{fan.username || fan.full_name || "Super Fan"}</CardTitle>
                <p className="text-sm text-muted-foreground">Super Fan</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </section>
  )
}
