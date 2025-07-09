import Link from "next/link"
import { Instagram, Twitter, Youtube, Facebook } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="w-full border-t bg-background">
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © 2025 Stellar Fan Club. All rights reserved.
          </p>
        </div>
        <div className="flex gap-4">
          <Link href="#" className="text-muted-foreground hover:text-foreground">
            <Instagram className="h-5 w-5" />
            <span className="sr-only">Instagram</span>
          </Link>
          <Link href="#" className="text-muted-foreground hover:text-foreground">
            <Twitter className="h-5 w-5" />
            <span className="sr-only">Twitter</span>
          </Link>
          <Link href="#" className="text-muted-foreground hover:text-foreground">
            <Youtube className="h-5 w-5" />
            <span className="sr-only">YouTube</span>
          </Link>
          <Link href="#" className="text-muted-foreground hover:text-foreground">
            <Facebook className="h-5 w-5" />
            <span className="sr-only">Facebook</span>
          </Link>
        </div>
        <nav className="flex gap-4 md:gap-6">
          <Link href="/terms" className="text-sm font-medium text-muted-foreground underline-offset-4 hover:underline">
            Terms
          </Link>
          <Link
            href="/privacy"
            className="text-sm font-medium text-muted-foreground underline-offset-4 hover:underline"
          >
            Privacy
          </Link>
          <Link
            href="/contact"
            className="text-sm font-medium text-muted-foreground underline-offset-4 hover:underline"
          >
            Contact
          </Link>
        </nav>
      </div>
    </footer>
  )
}
