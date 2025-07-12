import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MessageCircle, Users, ExternalLink } from "lucide-react"
import Link from "next/link"

export default function CommunityPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-24">
      <section className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="bg-gradient-to-r from-electric-400 to-frost-400 bg-clip-text text-transparent">
            Join the Ice Legion Community
          </span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Connect with fellow Kelvin Creekman fans, share your passion, and get exclusive updates in our private
          community spaces.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <Card className="bg-background/50 backdrop-blur-lg border-electric-700/30 p-6 text-center">
          <CardHeader>
            <MessageCircle className="h-16 w-16 text-electric-400 mx-auto mb-4" />
            <CardTitle className="text-2xl font-bold text-electric-100">Discord Server</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-6">
              Dive into real-time discussions, participate in fan events, and chat directly with Kelvin's team.
            </p>
            <Button asChild size="lg" className="bg-gradient-electric hover:animate-electric-pulse">
              <Link href="https://discord.com/invite/your-discord-invite" target="_blank" rel="noopener noreferrer">
                Join Discord <ExternalLink className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-background/50 backdrop-blur-lg border-electric-700/30 p-6 text-center">
          <CardHeader>
            <Users className="h-16 w-16 text-frost-400 mx-auto mb-4" />
            <CardTitle className="text-2xl font-bold text-electric-100">Private Forum</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-6">
              Engage in deeper conversations, share fan art, and access exclusive forum-only content.
            </p>
            <Button asChild size="lg" className="bg-gradient-electric hover:animate-electric-pulse">
              <Link href="https://community.circle.so/your-community-link" target="_blank" rel="noopener noreferrer">
                Access Forum <ExternalLink className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <section className="mt-24 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          <span className="bg-gradient-to-r from-frost-400 to-electric-400 bg-clip-text text-transparent">
            Community Guidelines
          </span>
        </h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          To ensure a positive and respectful environment for all fans, please adhere to our community guidelines. Let's
          keep the Ice Legion a welcoming place for everyone!
        </p>
        <Button variant="link" className="mt-4 text-electric-400 hover:text-electric-300" asChild>
          <Link href="/community/guidelines">Read Guidelines</Link>
        </Button>
      </section>
    </div>
  )
}
