import Link from "next/link"
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="mt-auto w-full border-t border-electric-700 bg-background/80 backdrop-blur-lg py-8">
      <div className="container mx-auto flex flex-col items-center justify-between gap-6 px-4 md:flex-row">
        <div className="text-center md:text-left">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Kelvin Creekman Fan Club. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Built with{" "}
            <Link href="https://nextjs.org/" className="underline hover:text-electric-400">
              Next.js
            </Link>{" "}
            and{" "}
            <Link href="https://ui.shadcn.com/" className="underline hover:text-electric-400">
              shadcn/ui
            </Link>
            .
          </p>
        </div>
        <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm font-medium">
          <Link href="/privacy" className="text-electric-200 hover:text-electric-400">
            Privacy Policy
          </Link>
          <Link href="/terms" className="text-electric-200 hover:text-electric-400">
            Terms of Service
          </Link>
          <Link href="/contact" className="text-electric-200 hover:text-electric-400">
            Contact
          </Link>
          <Link href="/faq" className="text-electric-200 hover:text-electric-400">
            FAQ
          </Link>
        </nav>
        <div className="flex gap-4">
          <Link
            href="https://facebook.com/kelvincreekman"
            target="_blank"
            rel="noopener noreferrer"
            className="text-electric-200 hover:text-electric-400"
          >
            <Facebook className="h-6 w-6" />
            <span className="sr-only">Facebook</span>
          </Link>
          <Link
            href="https://instagram.com/kelvincreekman"
            target="_blank"
            rel="noopener noreferrer"
            className="text-electric-200 hover:text-electric-400"
          >
            <Instagram className="h-6 w-6" />
            <span className="sr-only">Instagram</span>
          </Link>
          <Link
            href="https://twitter.com/kelvincreekman"
            target="_blank"
            rel="noopener noreferrer"
            className="text-electric-200 hover:text-electric-400"
          >
            <Twitter className="h-6 w-6" />
            <span className="sr-only">Twitter</span>
          </Link>
          <Link
            href="https://youtube.com/kelvincreekman"
            target="_blank"
            rel="noopener noreferrer"
            className="text-electric-200 hover:text-electric-400"
          >
            <Youtube className="h-6 w-6" />
            <span className="sr-only">YouTube</span>
          </Link>
        </div>
      </div>
    </footer>
  )
}
