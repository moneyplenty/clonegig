import { CardDescription } from "@/components/ui/card"
import { createServerClient } from "@/lib/supabase/server"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MessageSquare, ThumbsUp, Share2, MessageCircle, Users, Sparkles } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import type { Post } from "@/types" // Assuming you have these types defined
import Link from "next/link"

export default async function CommunityPage() {
  const cookieStore = cookies()
  const supabase = createServerClient(cookieStore)

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login?redirect=/community")
  }

  const { data: postsFromDB, error } = await supabase
    .from("community_posts")
    .select("*, users(email), community_comments(*, users(email))")
    .order("created_at", { ascending: false })
    .order("created_at", { foreignTable: "community_comments", ascending: true })

  if (error) {
    console.error("Error fetching community posts:", error)
  }

  const createPost = async (formData: FormData) => {
    "use server"
    const cookieStore = cookies()
    const supabase = createServerClient(cookieStore)

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return { error: "User not authenticated." }
    }

    const title = formData.get("title") as string
    const content = formData.get("content") as string

    if (!title || !content) {
      return { error: "Title and content are required." }
    }

    const { error: insertError } = await supabase.from("community_posts").insert({
      user_id: user.id,
      title,
      content,
    })

    if (insertError) {
      console.error("Error creating post:", insertError)
      return { error: "Failed to create post." }
    }

    // Revalidate path to show new post
    redirect("/community")
  }

  const addComment = async (formData: FormData) => {
    "use server"
    const cookieStore = cookies()
    const supabase = createServerClient(cookieStore)

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return { error: "User not authenticated." }
    }

    const postId = formData.get("postId") as string
    const content = formData.get("content") as string

    if (!postId || !content) {
      return { error: "Post ID and content are required." }
    }

    const { error: insertError } = await supabase.from("community_comments").insert({
      post_id: postId,
      user_id: user.id,
      content,
    })

    if (insertError) {
      console.error("Error adding comment:", insertError)
      return { error: "Failed to add comment." }
    }

    // Revalidate path to show new comment
    redirect("/community")
  }

  // Mock data for demonstration. In a real app, this would come from a database.
  const mockPosts: Post[] = [
    {
      id: "1",
      user_id: "user1",
      user_name: "FanaticFan",
      user_avatar: "/placeholder-user.jpg",
      content: "Just re-watched the latest concert footage! Kelvin was on fire! 🔥 What was your favorite moment?",
      created_at: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), // 5 hours ago
      likes: 15,
      community_comments: [
        {
          id: "c1",
          post_id: "1",
          user_id: "user2",
          user_name: "MusicLover",
          user_avatar: "/placeholder-user.jpg",
          content: 'Definitely the guitar solo on "Electric Dreams"! Pure magic!',
          created_at: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(), // 4 hours ago
        },
        {
          id: "c2",
          post_id: "1",
          user_id: "user3",
          user_name: "CreekmanCrew",
          user_avatar: "/placeholder-user.jpg",
          content: "The crowd interaction was amazing too! He really connects with us.",
          created_at: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
        },
      ],
    },
    {
      id: "2",
      user_id: "user4",
      user_name: "TrueBeliever",
      user_avatar: "/placeholder-user.jpg",
      content: "Anyone else excited for the new album? The snippets sound incredible!",
      created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(), // 2 days ago
      likes: 28,
      community_comments: [],
    },
  ]

  const posts = postsFromDB || mockPosts

  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
      <h1 className="text-4xl font-bold text-center mb-8">Join Our Community</h1>
      <p className="text-lg text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
        Connect with fellow fans, share your passion, and engage in discussions.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="text-center shadow-lg">
          <CardHeader>
            <MessageCircle className="mx-auto h-12 w-12 text-primary mb-4" />
            <CardTitle className="text-2xl">Fan Forums</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Dive into discussions, ask questions, and share your thoughts with other fans.
            </p>
            <Link href="#">
              <Button size="lg">Go to Forums</Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="text-center shadow-lg">
          <CardHeader>
            <Users className="mx-auto h-12 w-12 text-primary mb-4" />
            <CardTitle className="text-2xl">Fan Meetups</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">Organize or join local fan meetups and connect in person.</p>
            <Link href="#">
              <Button size="lg">Find Meetups</Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="text-center shadow-lg md:col-span-2">
          <CardHeader>
            <Sparkles className="mx-auto h-12 w-12 text-primary mb-4" />
            <CardTitle className="text-2xl">Exclusive Fan Groups</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Premium and VIP members get access to private groups and direct interactions.
            </p>
            <Link href="/join">
              <Button size="lg" variant="outline">
                Learn About Membership
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      <section className="text-center space-y-4 mt-12">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">Kelvin Creekman Community Forum</h1>
        <p className="max-w-[700px] mx-auto text-muted-foreground md:text-xl">
          Connect with fellow fans, share your thoughts, and discuss all things Kelvin Creekman!
        </p>
      </section>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Create a New Post</CardTitle>
          <CardDescription>Share your thoughts with the community.</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={createPost} className="space-y-4">
            <div>
              <input type="text" name="title" placeholder="Post Title" required className="w-full p-2 border rounded" />
            </div>
            <div>
              <Textarea
                name="content"
                placeholder="What's on your mind?"
                rows={4}
                required
                className="w-full p-2 border rounded"
              />
            </div>
            <Button type="submit" className="w-full">
              Create Post
            </Button>
          </form>
        </CardContent>
      </Card>

      <h2 className="text-2xl font-bold mb-4">Recent Posts</h2>
      <div className="space-y-8">
        {posts.map((post) => (
          <Card key={post.id}>
            <CardHeader className="flex flex-row items-center space-x-4 pb-4">
              <Avatar className="h-10 w-10">
                <AvatarImage src={post.user_avatar || "/placeholder-user.jpg"} alt={post.user_name} />
                <AvatarFallback>{post.user_name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold">{post.user_name}</p>
                <p className="text-sm text-muted-foreground">
                  {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}
                </p>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="mb-4">{post.content}</p>
              <div className="flex items-center space-x-4 text-muted-foreground text-sm">
                <Button variant="ghost" size="sm" className="flex items-center gap-1">
                  <ThumbsUp className="h-4 w-4" /> {post.likes} Likes
                </Button>
                <Button variant="ghost" size="sm" className="flex items-center gap-1">
                  <MessageSquare className="h-4 w-4" /> {post.community_comments.length} Comments
                </Button>
                <Button variant="ghost" size="sm" className="flex items-center gap-1">
                  <Share2 className="h-4 w-4" /> Share
                </Button>
              </div>

              {/* Comments Section */}
              {post.community_comments.length > 0 && (
                <div className="mt-6 border-t pt-4 space-y-4">
                  {post.community_comments.map((comment) => (
                    <div key={comment.id} className="flex items-start space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={comment.user_avatar || "/placeholder-user.jpg"} alt={comment.user_name} />
                        <AvatarFallback>{comment.user_name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 bg-muted p-3 rounded-lg">
                        <div className="flex items-baseline justify-between mb-1">
                          <p className="font-semibold text-sm">{comment.user_name}</p>
                          <span className="text-xs text-muted-foreground ml-2">
                            {formatDistanceToNow(new Date(comment.created_at), { addSuffix: true })}
                          </span>
                        </div>
                        <p className="text-sm">{comment.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Add Comment Form */}
              <form action={addComment} className="mt-4 flex gap-2">
                <input type="hidden" name="postId" value={post.id} />
                <Textarea
                  name="content"
                  placeholder="Write a comment..."
                  rows={1}
                  className="flex-1 p-2 border rounded"
                />
                <Button type="submit">Comment</Button>
              </form>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
