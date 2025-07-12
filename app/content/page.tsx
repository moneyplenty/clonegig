import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { ContentPreview } from "@/components/content-preview"

interface ContentItem {
  id: string
  title: string
  description: string
  type: "video" | "audio" | "article" | "image"
  thumbnailUrl: string
  accessTier: "guest" | "frost" | "blizzard" | "avalanche"
  fileUrl?: string // For video/audio playback or full image/article view
}

const mockContent: ContentItem[] = [
  {
    id: "1",
    title: "Behind the Scenes: Ice Storm Music Video",
    description: "Go behind the scenes of the making of the 'Ice Storm' music video. Exclusive footage and interviews.",
    type: "video",
    thumbnailUrl: "/placeholder.svg?height=200&width=300",
    accessTier: "blizzard",
    fileUrl: "https://www.w3schools.com/html/mov_bbb.mp4", // Example video URL
  },
  {
    id: "2",
    title: "Unreleased Demo: 'Frozen Heart'",
    description: "Listen to an early demo version of the track 'Frozen Heart' before its final production.",
    type: "audio",
    thumbnailUrl: "/placeholder.svg?height=200&width=300",
    accessTier: "avalanche",
    fileUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", // Example audio URL
  },
  {
    id: "3",
    title: "The Making of 'Electric Dreams' Album",
    description: "A deep dive into the creative process and inspiration behind Kelvin's debut album.",
    type: "article",
    thumbnailUrl: "/placeholder.svg?height=200&width=300",
    accessTier: "frost",
    fileUrl: "/content/articles/electric-dreams.md", // Placeholder for markdown article
  },
  {
    id: "4",
    title: "Live Performance: 'Shattered Reflection' (Rare Footage)",
    description: "Experience a raw, energetic live performance of 'Shattered Reflection' from an early show.",
    type: "video",
    thumbnailUrl: "/placeholder.svg?height=200&width=300",
    accessTier: "blizzard",
    fileUrl: "https://www.w3schools.com/html/mov_bbb.mp4", // Example video URL
  },
  {
    id: "5",
    title: "Photo Gallery: Winter's Embrace Tour",
    description: "Exclusive photo collection from the recent 'Winter's Embrace' tour.",
    type: "image",
    thumbnailUrl: "/placeholder.svg?height=200&width=300",
    accessTier: "frost",
    fileUrl: "/placeholder.svg?height=800&width=1200", // Example large image URL
  },
  {
    id: "6",
    title: "Kelvin's Gear Rundown: Guitars & Amps",
    description: "Kelvin shares insights into his favorite guitars, amps, and effects pedals.",
    type: "article",
    thumbnailUrl: "/placeholder.svg?height=200&width=300",
    accessTier: "avalanche",
    fileUrl: "/content/articles/gear-rundown.md", // Placeholder for markdown article
  },
  {
    id: "7",
    title: "Fan Q&A Session Highlights",
    description: "A compilation of the best moments and answers from recent fan Q&A sessions.",
    type: "video",
    thumbnailUrl: "/placeholder.svg?height=200&width=300",
    accessTier: "guest", // Accessible to all
    fileUrl: "https://www.w3schools.com/html/mov_bbb.mp4", // Example video URL
  },
  {
    id: "8",
    title: "Podcast: The Metal Mindset with Kelvin",
    description: "Kelvin discusses his influences, songwriting process, and the future of metal music.",
    type: "audio",
    thumbnailUrl: "/placeholder.svg?height=200&width=300",
    accessTier: "frost",
    fileUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3", // Example audio URL
  },
]

export default function ContentPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-24">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-center md:text-left">
          <span className="bg-gradient-to-r from-electric-400 to-frost-400 bg-clip-text text-transparent">
            Exclusive Content
          </span>
        </h1>
        <div className="relative w-full md:w-auto">
          <Input
            type="search"
            placeholder="Search content..."
            className="w-full md:w-64 pr-10 bg-background/50 border-electric-700 text-electric-100"
          />
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        </div>
      </div>

      <ContentPreview content={mockContent} />
    </div>
  )
}
