import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart, MessageSquare, Share2, ThumbsUp } from "lucide-react"

export default function CommunityPage() {
  // This would normally be fetched from an API
  const discussions = [
    {
      id: 1,
      title: "What's your favorite song from the new album?",
      author: {
        name: "Alex Johnson",
        avatar: "/placeholder.svg?height=100&width=100",
      },
      replies: 24,
      likes: 42,
      date: "2 hours ago",
      pinned: true,
    },
    {
      id: 2,
      title: "Concert meetup in New York - who's going?",
      author: {
        name: "Samantha Lee",
        avatar: "/placeholder.svg?height=100&width=100",
      },
      replies: 18,
      likes: 15,
      date: "1 day ago",
      pinned: false,
    },
    {
      id: 3,
      title: "Lyrics interpretation: 'Midnight Memories'",
      author: {
        name: "Marcus Chen",
        avatar: "/placeholder.svg?height=100&width=100",
      },
      replies: 32,
      likes: 28,
      date: "3 days ago",
      pinned: false,
    },
  ]

  const posts = [
    {
      id: 1,
      content: "Just got my VIP merch package in the mail! The quality is amazing! 🤩",
      author: {
        name: "Jamie Smith",
        avatar: "/placeholder.svg?height=100&width=100",
      },
      image: "/placeholder.svg?height=400&width=600",
      likes: 87,
      comments: 12,
      shares: 5,
      date: "4 hours ago",
    },
    {
      id: 2,
      content: "That acoustic version of 'Midnight Memories' has been on repeat all day. Anyone else obsessed?",
      author: {
        name: "Taylor Wong",
        avatar: "/placeholder.svg?height=100&width=100",
      },
      likes: 45,
      comments: 8,
      shares: 2,
      date: "1 day ago",
    },
    {
      id: 3,
      content: "My view from last night's show! Still can't believe how amazing it was!",
      author: {
        name: "Jordan Miller",
        avatar: "/placeholder.svg?height=100&width=100",
      },
      image: "/placeholder.svg?height=400&width=600",
      likes: 124,
      comments: 28,
      shares: 15,
      date: "2 days ago",
    },
  ]

  return (
    <div className="container py-10">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Fan Community</h1>
            <p className="text-muted-foreground">
              Connect with other fans, share your experiences, and join the conversation
            </p>
          </div>
          <div className="flex gap-2">
            <Button asChild variant="outline" className="rounded-full">
              <Link href="/community/guidelines">Community Guidelines</Link>
            </Button>
            <Button asChild className="rounded-full">
              <Link href="/community/new-post">Create Post</Link>
            </Button>
          </div>
        </div>

        <Tabs defaultValue="feed" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="feed">Social Feed</TabsTrigger>
            <TabsTrigger value="discussions">Discussions</TabsTrigger>
            <TabsTrigger value="challenges">Fan Challenges</TabsTrigger>
          </TabsList>

          <TabsContent value="feed" className="mt-6">
            <div className="flex flex-col gap-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex gap-4">
                    <Avatar>
                      <AvatarImage src="/placeholder.svg?height=100&width=100" alt="Your avatar" />
                      <AvatarFallback>YA</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <Textarea placeholder="Share your thoughts with the community..." className="resize-none" />
                      <div className="flex justify-between items-center mt-4">
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="rounded-full">
                            Add Photo
                          </Button>
                          <Button variant="outline" size="sm" className="rounded-full">
                            Add Video
                          </Button>
                        </div>
                        <Button size="sm" className="rounded-full">
                          Post
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {posts.map((post) => (
                <Card key={post.id}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarImage src={post.author.avatar || "/placeholder.svg"} alt={post.author.name} />
                        <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-base">{post.author.name}</CardTitle>
                        <CardDescription>{post.date}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-2">
                    <p className="mb-4">{post.content}</p>
                    {post.image && (
                      <div className="relative aspect-video rounded-lg overflow-hidden mb-4">
                        <Image src={post.image || "/placeholder.svg"} alt="Post image" fill className="object-cover" />
                      </div>
                    )}
                    <div className="flex gap-6 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <ThumbsUp className="h-4 w-4" /> {post.likes}
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageSquare className="h-4 w-4" /> {post.comments}
                      </span>
                      <span className="flex items-center gap-1">
                        <Share2 className="h-4 w-4" /> {post.shares}
                      </span>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t pt-4">
                    <div className="flex w-full gap-4">
                      <Button variant="ghost" size="sm" className="flex-1">
                        <ThumbsUp className="mr-2 h-4 w-4" /> Like
                      </Button>
                      <Button variant="ghost" size="sm" className="flex-1">
                        <MessageSquare className="mr-2 h-4 w-4" /> Comment
                      </Button>
                      <Button variant="ghost" size="sm" className="flex-1">
                        <Share2 className="mr-2 h-4 w-4" /> Share
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="discussions" className="mt-6">
            <div className="flex flex-col gap-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Forum Discussions</h2>
                <Button asChild className="rounded-full">
                  <Link href="/community/new-topic">New Topic</Link>
                </Button>
              </div>

              <div className="grid gap-4">
                {discussions.map((discussion) => (
                  <Card key={discussion.id} className="group">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between">
                        <CardTitle className="text-lg group-hover:text-primary">
                          <Link href={`/community/discussions/${discussion.id}`}>{discussion.title}</Link>
                        </CardTitle>
                        {discussion.pinned && <Badge variant="outline">Pinned</Badge>}
                      </div>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage
                            src={discussion.author.avatar || "/placeholder.svg"}
                            alt={discussion.author.name}
                          />
                          <AvatarFallback>{discussion.author.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span className="text-sm">{discussion.author.name}</span>
                        <span className="text-xs text-muted-foreground">• {discussion.date}</span>
                      </div>
                    </CardContent>
                    <CardFooter className="pt-0">
                      <div className="flex gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MessageSquare className="h-4 w-4" /> {discussion.replies} replies
                        </span>
                        <span className="flex items-center gap-1">
                          <Heart className="h-4 w-4" /> {discussion.likes} likes
                        </span>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="challenges" className="mt-6">
            <div className="flex flex-col gap-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Current Fan Challenges</h2>
                <Button variant="outline" className="rounded-full">
                  View Past Challenges
                </Button>
              </div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Card className="overflow-hidden">
                  <div className="relative aspect-video">
                    <Image
                      src="/placeholder.svg?height=400&width=600"
                      alt="Cover Challenge"
                      fill
                      className="object-cover"
                    />
                    <Badge className="absolute top-2 right-2 bg-primary">Active</Badge>
                  </div>
                  <CardHeader>
                    <CardTitle>Cover Challenge</CardTitle>
                    <CardDescription>
                      Record your cover of "Midnight Memories" and share it with the community
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between text-sm">
                      <span>Ends in: 5 days</span>
                      <span>32 submissions</span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button asChild className="w-full rounded-full">
                      <Link href="/community/challenges/1">Join Challenge</Link>
                    </Button>
                  </CardFooter>
                </Card>

                <Card className="overflow-hidden">
                  <div className="relative aspect-video">
                    <Image
                      src="/placeholder.svg?height=400&width=600"
                      alt="Photo Contest"
                      fill
                      className="object-cover"
                    />
                    <Badge className="absolute top-2 right-2 bg-primary">Active</Badge>
                  </div>
                  <CardHeader>
                    <CardTitle>Concert Memory Photo Contest</CardTitle>
                    <CardDescription>Share your favorite concert photo and tell us the story behind it</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between text-sm">
                      <span>Ends in: 2 days</span>
                      <span>48 submissions</span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button asChild className="w-full rounded-full">
                      <Link href="/community/challenges/2">Join Challenge</Link>
                    </Button>
                  </CardFooter>
                </Card>

                <Card className="overflow-hidden">
                  <div className="relative aspect-video">
                    <Image
                      src="/placeholder.svg?height=400&width=600"
                      alt="Remix Contest"
                      fill
                      className="object-cover"
                    />
                    <Badge className="absolute top-2 right-2 bg-primary">Active</Badge>
                  </div>
                  <CardHeader>
                    <CardTitle>Remix Contest</CardTitle>
                    <CardDescription>
                      Create your own remix of the latest single and win exclusive prizes
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between text-sm">
                      <span>Ends in: 10 days</span>
                      <span>15 submissions</span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button asChild className="w-full rounded-full">
                      <Link href="/community/challenges/3">Join Challenge</Link>
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
