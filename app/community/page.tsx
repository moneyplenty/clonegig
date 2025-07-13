import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Icons } from "@/components/icons"

export default function CommunityPage() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <main className="flex-1 container mx-auto py-12 px-4 md:px-6">
        <section className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-kelvin-foreground mb-4">
            Join the Kelvin Creekman Community
          </h1>
          <p className="text-lg text-kelvin-foreground/80 max-w-3xl mx-auto">
            Connect with fellow fans, share your passion, and get exclusive updates directly from Kelvin.
          </p>
        </section>

        <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="bg-kelvin-card text-kelvin-card-foreground border-kelvin-border shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl font-semibold">
                <Icons.messageCircle className="w-6 h-6 text-electric-400" />
                Discord Server
              </CardTitle>
              <CardDescription className="text-kelvin-card-foreground/80">
                Dive into real-time discussions, voice chats, and fan events.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <p className="text-kelvin-card-foreground/90">
                Our Discord server is the heart of the community. Chat with other fans, participate in Q&A sessions with
                Kelvin, and get early access to news.
              </p>
              <Button asChild className="w-full bg-electric-500 hover:bg-electric-600 text-white">
                <Link href="#" target="_blank" rel="noopener noreferrer">
                  Join Discord <Icons.externalLink className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-kelvin-card text-kelvin-card-foreground border-kelvin-border shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl font-semibold">
                <Icons.users className="w-6 h-6 text-frost-400" />
                Fan Forums
              </CardTitle>
              <CardDescription className="text-kelvin-card-foreground/80">
                Engage in deeper conversations and share your thoughts on Kelvin&apos;s music.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <p className="text-kelvin-card-foreground/90">
                Our dedicated forums are perfect for in-depth discussions, sharing fan art, and connecting with fans who
                share your specific interests.
              </p>
              <Button asChild className="w-full bg-frost-500 hover:bg-frost-600 text-white">
                <Link href="#" target="_blank" rel="noopener noreferrer">
                  Visit Forums <Icons.externalLink className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-kelvin-card text-kelvin-card-foreground border-kelvin-border shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl font-semibold">
                <Icons.star className="w-6 h-6 text-purple-400" />
                Exclusive Content
              </CardTitle>
              <CardDescription className="text-kelvin-card-foreground/80">
                Access behind-the-scenes footage, unreleased tracks, and more.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <p className="text-kelvin-card-foreground/90">
                As a fan club member, you&apos;ll unlock a treasure trove of exclusive content, including early song
                previews and private vlogs.
              </p>
              <Button asChild className="w-full bg-purple-500 hover:bg-purple-600 text-white">
                <Link href="/content">
                  Explore Content <Icons.chevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </section>

        <section className="mt-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-kelvin-foreground mb-4">Stay Connected</h2>
          <p className="text-lg text-kelvin-foreground/80 max-w-2xl mx-auto mb-8">
            Follow Kelvin Creekman on social media for daily updates, tour announcements, and more.
          </p>
          <div className="flex justify-center gap-6">
            <Link
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="text-kelvin-foreground hover:text-electric-400 transition-colors"
            >
              <Icons.tiktok className="w-8 h-8" />
              <span className="sr-only">TikTok</span>
            </Link>
            <Link
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="text-kelvin-foreground hover:text-frost-400 transition-colors"
            >
              <Icons.youtube className="w-8 h-8" />
              <span className="sr-only">YouTube</span>
            </Link>
            <Link
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="text-kelvin-foreground hover:text-purple-400 transition-colors"
            >
              <Icons.instagram className="w-8 h-8" />
              <span className="sr-only">Instagram</span>
            </Link>
            <Link
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="text-kelvin-foreground hover:text-electric-400 transition-colors"
            >
              <Icons.twitter className="w-8 h-8" />
              <span className="sr-only">Twitter</span>
            </Link>
          </div>
        </section>
      </main>
    </div>
  )
}
