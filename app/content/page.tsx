import { ContentPreview } from "@/components/content-preview"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function ContentPage() {
  const mockContent = [
    {
      id: 1,
      title: "Behind the Scenes: Recording 'Electric Dreams'",
      type: "video",
      category: "Exclusive",
      image: "/placeholder.svg?height=200&width=300",
      description: "Go behind the scenes of Kelvin's latest album recording.",
      isPremium: true,
    },
    {
      id: 2,
      title: "Kelvin's Top 5 Guitar Riffs",
      type: "blog",
      category: "Public",
      image: "/placeholder.svg?height=200&width=300",
      description: "Kelvin shares his favorite guitar riffs and how they influenced him.",
      isPremium: false,
    },
    {
      id: 3,
      title: "Fan Art Showcase: August 2024",
      type: "gallery",
      category: "Public",
      image: "/placeholder.svg?height=200&width=300",
      description: "A collection of amazing fan art submitted by the community.",
      isPremium: false,
    },
    {
      id: 4,
      title: "Unreleased Demo: 'Frozen Fire'",
      type: "audio",
      category: "Exclusive",
      image: "/placeholder.svg?height=200&width=300",
      description: "Listen to an exclusive unreleased demo track.",
      isPremium: true,
    },
    {
      id: 5,
      title: "Live Q&A Transcript with Kelvin",
      type: "text",
      category: "Exclusive",
      image: "/placeholder.svg?height=200&width=300",
      description: "Read the full transcript from the latest live Q&A session.",
      isPremium: true,
    },
    {
      id: 6,
      title: "Tour Diary: Road to Electrify",
      type: "blog",
      category: "Public",
      image: "/placeholder.svg?height=200&width=300",
      description: "Follow Kelvin's journey on his latest tour.",
      isPremium: false,
    },
  ]

  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
        <h1 className="text-4xl font-bold">Fan Content</h1>
        <div className="relative flex-1 md:flex-grow-0 md:w-1/3">
          <Input placeholder="Search content..." className="pl-8" />
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <Card className="w-full md:w-1/4 shrink-0">
          <CardHeader>
            <CardTitle>Filter Content</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="font-semibold mb-2">Content Type</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="videos" />
                  <Label htmlFor="videos">Videos</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="blogs" />
                  <Label htmlFor="blogs">Blog Posts</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="audio" />
                  <Label htmlFor="audio">Audio</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="galleries" />
                  <Label htmlFor="galleries">Galleries</Label>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Access Level</h3>
              <RadioGroup defaultValue="all" className="space-y-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="all" id="access-all" />
                  <Label htmlFor="access-all">All Content</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="premium" id="access-premium" />
                  <Label htmlFor="access-premium">Premium Only</Label>
                </div>
              </RadioGroup>
            </div>
          </CardContent>
        </Card>

        <ContentPreview content={mockContent} />
      </div>
    </div>
  )
}
