import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Play, ImageIcon, Music, Lock, Filter } from "lucide-react"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function ContentPage() {
  // This would normally be fetched from an API
  const content = [
    {
      id: 1,
      title: "Studio Session: New Album Sneak Peek",
      description: "Watch exclusive footage from the recording of the upcoming album",
      image: "/placeholder.svg?height=400&width=600",
      type: "video",
      duration: "12:34",
      date: "2 days ago",
      locked: false,
      category: "behind-the-scenes",
    },
    {
      id: 2,
      title: "Behind the Scenes: World Tour Preparation",
      description: "See what goes into preparing for a global tour",
      image: "/placeholder.svg?height=400&width=600",
      type: "video",
      duration: "8:45",
      date: "1 week ago",
      locked: false,
      category: "behind-the-scenes",
    },
    {
      id: 3,
      title: "Photo Gallery: Summer Festival Highlights",
      description: "Exclusive photos from this summer's festival performances",
      image: "/placeholder.svg?height=400&width=600",
      type: "gallery",
      count: "24 photos",
      date: "2 weeks ago",
      locked: false,
      category: "photos",
    },
    {
      id: 4,
      title: "Acoustic Performance: Unplugged Session",
      description: "An intimate acoustic performance of fan favorites",
      image: "/placeholder.svg?height=400&width=600",
      type: "video",
      duration: "18:22",
      date: "3 weeks ago",
      locked: true,
      category: "performances",
    },
    {
      id: 5,
      title: "Interview: Creative Process Deep Dive",
      description: "An in-depth conversation about songwriting and inspiration",
      image: "/placeholder.svg?height=400&width=600",
      type: "video",
      duration: "32:10",
      date: "1 month ago",
      locked: true,
      category: "interviews",
    },
    {
      id: 6,
      title: "Unreleased Track: 'Midnight Memories'",
      description: "Listen to this exclusive track that didn't make it to the album",
      image: "/placeholder.svg?height=400&width=600",
      type: "audio",
      duration: "4:17",
      date: "1 month ago",
      locked: true,
      category: "music",
    },
  ]

  return (
    <div className="container py-10">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Exclusive Content</h1>
            <p className="text-muted-foreground">Explore behind-the-scenes videos, unreleased music, and more</p>
          </div>
          <div className="flex w-full md:w-auto gap-2">
            <div className="relative w-full md:w-auto">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search content..." className="w-full md:w-[200px] pl-8 rounded-full" />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="rounded-full">
                  <Filter className="h-4 w-4" />
                  <span className="sr-only">Filter</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuLabel>Filter By</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>All Content</DropdownMenuItem>
                  <DropdownMenuItem>Videos</DropdownMenuItem>
                  <DropdownMenuItem>Music</DropdownMenuItem>
                  <DropdownMenuItem>Photos</DropdownMenuItem>
                  <DropdownMenuItem>Interviews</DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>Most Recent</DropdownMenuItem>
                  <DropdownMenuItem>Most Popular</DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="videos">Videos</TabsTrigger>
            <TabsTrigger value="music">Music</TabsTrigger>
            <TabsTrigger value="photos">Photos</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {content.map((item) => (
                <Card key={item.id} className="overflow-hidden group">
                  <div className="relative aspect-video">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      fill
                      className="object-cover transition-all group-hover:scale-105"
                    />
                    {item.locked ? (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <Lock className="h-12 w-12 text-white opacity-80" />
                      </div>
                    ) : item.type === "video" ? (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Button size="icon" variant="secondary" className="rounded-full h-12 w-12">
                          <Play className="h-6 w-6" />
                        </Button>
                      </div>
                    ) : item.type === "gallery" ? (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Button size="icon" variant="secondary" className="rounded-full h-12 w-12">
                          <ImageIcon className="h-6 w-6" />
                        </Button>
                      </div>
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Button size="icon" variant="secondary" className="rounded-full h-12 w-12">
                          <Music className="h-6 w-6" />
                        </Button>
                      </div>
                    )}
                    <Badge className="absolute top-2 right-2">
                      {item.type === "video" || item.type === "audio" ? item.duration : item.count}
                    </Badge>
                  </div>
                  <CardHeader className="p-4">
                    <CardTitle className="text-lg line-clamp-1">{item.title}</CardTitle>
                    <CardDescription className="line-clamp-2">{item.description}</CardDescription>
                  </CardHeader>
                  <CardFooter className="p-4 pt-0 flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">{item.date}</span>
                    {item.locked ? (
                      <Button asChild size="sm" variant="outline" className="rounded-full">
                        <Link href="/join">Unlock</Link>
                      </Button>
                    ) : (
                      <Button asChild size="sm" className="rounded-full">
                        <Link href={`/content/${item.id}`}>
                          {item.type === "video" ? "Watch" : item.type === "gallery" ? "View" : "Listen"}
                        </Link>
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="videos" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {content
                .filter((item) => item.type === "video")
                .map((item) => (
                  <Card key={item.id} className="overflow-hidden group">
                    <div className="relative aspect-video">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.title}
                        fill
                        className="object-cover transition-all group-hover:scale-105"
                      />
                      {item.locked ? (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                          <Lock className="h-12 w-12 text-white opacity-80" />
                        </div>
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Button size="icon" variant="secondary" className="rounded-full h-12 w-12">
                            <Play className="h-6 w-6" />
                          </Button>
                        </div>
                      )}
                      <Badge className="absolute top-2 right-2">{item.duration}</Badge>
                    </div>
                    <CardHeader className="p-4">
                      <CardTitle className="text-lg line-clamp-1">{item.title}</CardTitle>
                      <CardDescription className="line-clamp-2">{item.description}</CardDescription>
                    </CardHeader>
                    <CardFooter className="p-4 pt-0 flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">{item.date}</span>
                      {item.locked ? (
                        <Button asChild size="sm" variant="outline" className="rounded-full">
                          <Link href="/join">Unlock</Link>
                        </Button>
                      ) : (
                        <Button asChild size="sm" className="rounded-full">
                          <Link href={`/content/${item.id}`}>Watch</Link>
                        </Button>
                      )}
                    </CardFooter>
                  </Card>
                ))}
            </div>
          </TabsContent>
          <TabsContent value="music" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {content
                .filter((item) => item.type === "audio")
                .map((item) => (
                  <Card key={item.id} className="overflow-hidden group">
                    <div className="relative aspect-video">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.title}
                        fill
                        className="object-cover transition-all group-hover:scale-105"
                      />
                      {item.locked ? (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                          <Lock className="h-12 w-12 text-white opacity-80" />
                        </div>
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Button size="icon" variant="secondary" className="rounded-full h-12 w-12">
                            <Music className="h-6 w-6" />
                          </Button>
                        </div>
                      )}
                      <Badge className="absolute top-2 right-2">{item.duration}</Badge>
                    </div>
                    <CardHeader className="p-4">
                      <CardTitle className="text-lg line-clamp-1">{item.title}</CardTitle>
                      <CardDescription className="line-clamp-2">{item.description}</CardDescription>
                    </CardHeader>
                    <CardFooter className="p-4 pt-0 flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">{item.date}</span>
                      {item.locked ? (
                        <Button asChild size="sm" variant="outline" className="rounded-full">
                          <Link href="/join">Unlock</Link>
                        </Button>
                      ) : (
                        <Button asChild size="sm" className="rounded-full">
                          <Link href={`/content/${item.id}`}>Listen</Link>
                        </Button>
                      )}
                    </CardFooter>
                  </Card>
                ))}
            </div>
          </TabsContent>
          <TabsContent value="photos" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {content
                .filter((item) => item.type === "gallery")
                .map((item) => (
                  <Card key={item.id} className="overflow-hidden group">
                    <div className="relative aspect-video">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.title}
                        fill
                        className="object-cover transition-all group-hover:scale-105"
                      />
                      {item.locked ? (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                          <Lock className="h-12 w-12 text-white opacity-80" />
                        </div>
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Button size="icon" variant="secondary" className="rounded-full h-12 w-12">
                            <ImageIcon className="h-6 w-6" />
                          </Button>
                        </div>
                      )}
                      <Badge className="absolute top-2 right-2">{item.count}</Badge>
                    </div>
                    <CardHeader className="p-4">
                      <CardTitle className="text-lg line-clamp-1">{item.title}</CardTitle>
                      <CardDescription className="line-clamp-2">{item.description}</CardDescription>
                    </CardHeader>
                    <CardFooter className="p-4 pt-0 flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">{item.date}</span>
                      {item.locked ? (
                        <Button asChild size="sm" variant="outline" className="rounded-full">
                          <Link href="/join">Unlock</Link>
                        </Button>
                      ) : (
                        <Button asChild size="sm" className="rounded-full">
                          <Link href={`/content/${item.id}`}>View</Link>
                        </Button>
                      )}
                    </CardFooter>
                  </Card>
                ))}
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-center mt-8">
          <Button variant="outline" className="rounded-full">
            Load More
          </Button>
        </div>
      </div>
    </div>
  )
}

function Search(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}
