import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { MessageCircle, Users, ExternalLink } from "lucide-react"

export default function CommunityPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Join the Kelvin Creekman Community</h1>

      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="h-6 w-6" />
              Official Discord Server
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Connect with fellow fans, discuss Kelvin's music, share fan art, and get the latest updates directly from
              the community managers.
            </p>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>Live chat with other fans</li>
              <li>Exclusive announcements</li>
              <li>Fan events and game nights</li>
              <li>Dedicated channels for different topics</li>
            </ul>
            <Button asChild className="w-full">
              <Link href="https://discord.com/" target="_blank" rel="noopener noreferrer">
                Join Discord <ExternalLink className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-6 w-6" />
              Private Fan Forum
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Our private forum is a dedicated space for in-depth discussions, sharing thoughts, and connecting with the
              most passionate Kelvin Creekman fans.
            </p>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>Long-form discussions and theories</li>
              <li>Archive of fan content and discussions</li>
              <li>Direct feedback channels to the team</li>
              <li>Moderated and safe environment</li>
            </ul>
            <Button asChild className="w-full">
              <Link href="/forum" target="_blank" rel="noopener noreferrer">
                Access Forum <ExternalLink className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="mt-12 text-center">
        <h2 className="text-3xl font-bold mb-4">Why Join Our Community?</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Being part of the official Kelvin Creekman community means more than just being a fan – it means being part of
          the family. Get closer to the music, the artist, and other dedicated fans.
        </p>
      </div>
    </div>
  )
}
