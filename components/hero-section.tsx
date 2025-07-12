import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface HeroSectionProps {
  title: string
  description: string
  ctaText: string
  ctaLink: string
  imageSrc?: string
  videoSrc?: string
  videoPoster?: string
}

export function HeroSection({
  title,
  description,
  ctaText,
  ctaLink,
  imageSrc,
  videoSrc,
  videoPoster,
}: HeroSectionProps) {
  const hasMedia = imageSrc || videoSrc

  return (
    <section className="relative w-full h-[calc(100vh-4rem)] flex items-center justify-center text-center overflow-hidden">
      {hasMedia && (
        <div className="absolute inset-0 z-0">
          {videoSrc ? (
            <video
              className="w-full h-full object-cover"
              autoPlay
              loop
              muted
              playsInline
              src={videoSrc || undefined}
              poster={videoPoster || undefined}
            >
              Your browser does not support the video tag.
            </video>
          ) : (
            <Image
              src={imageSrc || "/placeholder.svg"}
              alt="Hero Background"
              layout="fill"
              objectFit="cover"
              priority
            />
          )}
          <div className="absolute inset-0 bg-black/60" />
        </div>
      )}

      <div className="relative z-10 text-white px-4 md:px-8 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6 drop-shadow-lg">
          <span className="bg-gradient-to-r from-electric-400 to-frost-400 bg-clip-text text-transparent">{title}</span>
        </h1>
        <p className="text-lg md:text-xl mb-8 opacity-90 drop-shadow-md">{description}</p>
        <Button size="lg" className="bg-gradient-electric hover:animate-electric-pulse" asChild>
          <Link href={ctaLink}>{ctaText}</Link>
        </Button>
      </div>
    </section>
  )
}
