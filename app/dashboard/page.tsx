import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CalendarDays, Gift, Music, Star, Trophy, Video } from "lucide-react"

export default function DashboardPage() {
  // This would normally be fetched from an API
  const user = {
    name: "Sarah",
    membershipTier: "VIP",
    points: 1250,
    nextLevel: 2000,
    level: 3,
    badges: [
      { name: "Early Supporter", icon: Star },
      { name: "Concert Goer", icon: Music },
      { name: "Content Creator", icon: Video },
    ],
    upcomingEvents: [
      {
        id: 1,
        title: "Album Release Party",
        date: "June 15, 2025",
      },
      {
        id: 2,
        title: "Virtual Acoustic Session",
        date: "July 3, 2025",
      },
    ],
    recentContent: [
      {
        id: 1,
        title: "Studio Session: New Album Sneak Peek",
        type: "video",
        date: "2 days ago",
        image: "/placeholder.svg?height=400&width=600",
      },
      {
        id: 2,
        title: "Behind the Scenes: World Tour Preparation",
        type: "video",
        date: "1 week ago",
        image: "/placeholder.svg?height=400&width=600",
      },
    ],
  }

  return (
    <div className="container py-10">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Welcome back, {user.name}!</h1>
            <p className="text-muted-foreground">
              Your {user.membershipTier} membership is active. Here's what's new for you.
            </p>
          </div>
          <div className="flex gap-2">
            <Button asChild variant="outline" className="rounded-full">
              <Link href="/account">Manage Account</Link>
            </Button>
            <Button asChild className="rounded-full">
              <Link href="/content">Browse Content</Link>
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Membership Status</CardTitle>
              <CardDescription>Your current membership benefits</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <Badge className="bg-primary px-3 py-1 text-lg">{user.membershipTier}</Badge>
                <Link href="/tiers" className="text-sm text-primary underline-offset-4 hover:underline">
                  View all tiers
                </Link>
              </div>
              <div className="mt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Fan Level {user.level}</span>
                  <span>
                    {user.points} / {user.nextLevel} points
                  </span>
                </div>
                <Progress value={(user.points / user.nextLevel) * 100} className="h-2" />
                <p className="text-xs text-muted-foreground">
                  Earn {user.nextLevel - user.points} more points to reach Level {user.level + 1}
                </p>
              </div>
            </CardContent>
            <CardFooter className="border-t pt-4">
              <div className="flex flex-wrap gap-2">
                {user.badges.map((badge, index) => (
                  <div key={index} className="flex items-center gap-1 rounded-full bg-muted px-2 py-1 text-xs">
                    <badge.icon className="h-3 w-3" />
                    <span>{badge.name}</span>
                  </div>
                ))}
              </div>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Upcoming Events</CardTitle>
              <CardDescription>Events you're registered for</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {user.upcomingEvents.map((event) => (
                <div key={event.id} className="flex items-start gap-3">
                  <CalendarDays className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-medium">{event.title}</h4>
                    <p className="text-sm text-muted-foreground">{event.date}</p>
                  </div>
                </div>
              ))}
            </CardContent>
            <CardFooter className="border-t pt-4">
              <Button asChild variant="outline" className="w-full rounded-full">
                <Link href="/events">View All Events</Link>
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Fan Rewards</CardTitle>
              <CardDescription>Redeem your points for exclusive rewards</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <Gift className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h4 className="font-medium">Signed Poster</h4>
                  <p className="text-sm text-muted-foreground">500 points</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Trophy className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h4 className="font-medium">Virtual Meet & Greet</h4>
                  <p className="text-sm text-muted-foreground">1,500 points</p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t pt-4">
              <Button asChild className="w-full rounded-full">
                <Link href="/rewards">View All Rewards</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>

        <Tabs defaultValue="recent" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="recent">Recent Content</TabsTrigger>
            <TabsTrigger value="recommended">Recommended</TabsTrigger>
          </TabsList>
          <TabsContent value="recent" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {user.recentContent.map((content) => (
                <Card key={content.id} className="overflow-hidden group">
                  <div className="relative aspect-video">
                    <Image
                      src={content.image || "/placeholder.svg"}
                      alt={content.title}
                      fill
                      className="object-cover transition-all group-hover:scale-105"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Button size="icon" variant="secondary" className="rounded-full h-12 w-12">
                        <Video className="h-6 w-6" />
                      </Button>
                    </div>
                  </div>
                  <CardHeader className="p-4">
                    <CardTitle className="text-lg line-clamp-1">{content.title}</CardTitle>
                    <CardDescription>{content.date}</CardDescription>
                  </CardHeader>
                  <CardFooter className="p-4 pt-0">
                    <Button asChild size="sm" className="w-full rounded-full">
                      <Link href={`/content/${content.id}`}>Watch Now</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
              <Card className="flex flex-col items-center justify-center p-6 border-dashed">
                <Button asChild variant="outline" className="rounded-full">
                  <Link href="/content">View All Content</Link>
                </Button>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="recommended" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card className="overflow-hidden group">
                <div className="relative aspect-video">
                  <Image
                    src="/placeholder.svg?height=400&width=600"
                    alt="Recommended content"
                    fill
                    className="object-cover transition-all group-hover:scale-105"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Button size="icon" variant="secondary" className="rounded-full h-12 w-12">
                      <Video className="h-6 w-6" />
                    </Button>
                  </div>
                </div>
                <CardHeader className="p-4">
                  <CardTitle className="text-lg line-clamp-1">Acoustic Performance: Unplugged</CardTitle>
                  <CardDescription>Based on your interests</CardDescription>
                </CardHeader>
                <CardFooter className="p-4 pt-0">
                  <Button asChild size="sm" className="w-full rounded-full">
                    <Link href="/content/recommended/1">Watch Now</Link>
                  </Button>
                </CardFooter>
              </Card>
              <Card className="overflow-hidden group">
                <div className="relative aspect-video">
                  <Image
                    src="/placeholder.svg?height=400&width=600"
                    alt="Recommended content"
                    fill
                    className="object-cover transition-all group-hover:scale-105"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Button size="icon" variant="secondary" className="rounded-full h-12 w-12">
                      <Music className="h-6 w-6" />
                    </Button>
                  </div>
                </div>
                <CardHeader className="p-4">
                  <CardTitle className="text-lg line-clamp-1">Exclusive Track: Early Demo</CardTitle>
                  <CardDescription>New release for VIP members</CardDescription>
                </CardHeader>
                <CardFooter className="p-4 pt-0">
                  <Button asChild size="sm" className="w-full rounded-full">
                    <Link href="/content/recommended/2">Listen Now</Link>
                  </Button>
                </CardFooter>
              </Card>
              <Card className="flex flex-col items-center justify-center p-6 border-dashed">
                <Button asChild variant="outline" className="rounded-full">
                  <Link href="/recommendations">View All Recommendations</Link>
                </Button>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
