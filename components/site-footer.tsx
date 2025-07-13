import Link from "next/link"
import { Icons } from "@/components/icons"

export function SiteFooter() {
  return (
    <footer className="bg-kelvin-card text-kelvin-card-foreground py-8 px-4 md:px-6 border-t border-kelvin-border">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="flex flex-col items-center md:items-start">
          <Link href="/" className="flex items-center gap-2 mb-4">
            <Icons.logo className="h-8 w-8 text-electric-400" />
            <span className="text-2xl font-bold text-kelvin-card-foreground">Kelvin Creekman</span>
          </Link>
          <p className="text-sm text-kelvin-card-foreground/80 text-center md:text-left">
            &copy; {new Date().getFullYear()} Kelvin Creekman Fan Club. All rights reserved.
          </p>
        </div>

        <nav className="flex flex-col items-center md:items-start gap-2">
          <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
          <Link href="/content" className="text-kelvin-card-foreground/90 hover:text-electric-400 transition-colors">
            Content
          </Link>
          <Link href="/events" className="text-kelvin-card-foreground/90 hover:text-electric-400 transition-colors">
            Events
          </Link>
          <Link href="/store" className="text-kelvin-card-foreground/90 hover:text-electric-400 transition-colors">
            Store
          </Link>
          <Link href="/community" className="text-kelvin-card-foreground/90 hover:text-electric-400 transition-colors">
            Community
          </Link>
          <Link
            href="/meet-and-greet"
            className="text-kelvin-card-foreground/90 hover:text-electric-400 transition-colors"
          >
            Meet & Greet
          </Link>
        </nav>

        <div className="flex flex-col items-center md:items-start">
          <h3 className="text-lg font-semibold mb-2">Connect</h3>
          <div className="flex gap-4 mb-4">
            <Link
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="text-kelvin-card-foreground/90 hover:text-electric-400 transition-colors"
            >
              <Icons.tiktok className="h-6 w-6" />
              <span className="sr-only">TikTok</span>
            </Link>
            <Link
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="text-kelvin-card-foreground/90 hover:text-frost-400 transition-colors"
            >
              <Icons.youtube className="h-6 w-6" />
              <span className="sr-only">YouTube</span>
            </Link>
            <Link
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="text-kelvin-card-foreground/90 hover:text-purple-400 transition-colors"
            >
              <Icons.instagram className="h-6 w-6" />
              <span className="sr-only">Instagram</span>
            </Link>
            <Link
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="text-kelvin-card-foreground/90 hover:text-electric-400 transition-colors"
            >
              <Icons.twitter className="h-6 w-6" />
              <span className="sr-only">Twitter</span>
            </Link>
          </div>
          <p className="text-sm text-kelvin-card-foreground/80 text-center md:text-left">
            Stay updated with the latest news and releases.
          </p>
        </div>
      </div>
    </footer>
  )
}
