import { Card, CardDescription, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { MessageCircle, Users, ExternalLink } from "lucide-react"

export default function CommunityPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col items-center justify-center text-center space-y-4 mb-8">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          Join the Kelvin Creekman Community
        </h1>
        <p className="max-w-xl text-lg text-gray-600 dark:text-gray-400">
          Connect with fellow fans, share your passion, and get the latest updates directly from Kelvin.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="flex flex-col items-center text-center p-6">
          <MessageCircle className="h-12 w-12 text-primary mb-4" />
          <CardTitle className="text-2xl font-bold mb-2">Official Discord Server</CardTitle>
          <CardDescription className="mb-4">
            Join our vibrant Discord community for live chats, Q&A sessions, and exclusive announcements.
          </CardDescription>
          <Button asChild size="lg">
            <Link href="https://discord.com/" target="_blank" rel="noopener noreferrer">
              Join Discord <ExternalLink className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </Card>

        <Card className="flex flex-col items-center text-center p-6">
          <Users className="h-12 w-12 text-primary mb-4" />
          <CardTitle className="text-2xl font-bold mb-2">Fan Forum</CardTitle>
          <CardDescription className="mb-4">
            Discuss theories, share fan art, and connect with other dedicated Kelvin Creekman enthusiasts.
          </CardDescription>
          <Button asChild size="lg">
            <Link href="/community/forum">Go to Forum</Link>
          </Button>
        </Card>
      </div>

      <div className="mt-12 text-center">
        <h2 className="text-3xl font-bold mb-4">Why Join Our Community?</h2>
        <ul className="list-disc list-inside space-y-2 max-w-2xl mx-auto text-lg text-gray-700 dark:text-gray-300">
          <li>Direct interaction with Kelvin Creekman during special events.</li>
          <li>Be the first to know about new music, tours, and merchandise.</li>
          <li>Participate in fan-exclusive polls and content decisions.</li>
          <li>Connect with a global network of like-minded fans.</li>
          <li>Access to private channels for premium members.</li>
        </ul>
      </div>
    </div>
  )
}
