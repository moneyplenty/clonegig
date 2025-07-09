"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"

export function MainNav() {
  const pathname = usePathname()

  return (
    <div className="mr-4 hidden md:flex">
      <Link href="/" className="mr-6 flex items-center space-x-2">
        <span className="hidden font-bold sm:inline-block">STELLAR</span>
      </Link>
      <nav className="flex items-center gap-6 text-sm">
        <Link
          href="/"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname === "/" ? "text-foreground" : "text-foreground/60",
          )}
        >
          Home
        </Link>
        <Link
          href="/content"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname?.startsWith("/content") ? "text-foreground" : "text-foreground/60",
          )}
        >
          Exclusive Content
        </Link>
        <Link
          href="/store"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname?.startsWith("/store") ? "text-foreground" : "text-foreground/60",
          )}
        >
          Merch Store
        </Link>
        <Link
          href="/events"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname?.startsWith("/events") ? "text-foreground" : "text-foreground/60",
          )}
        >
          Events
        </Link>
        <Link
          href="/community"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname?.startsWith("/community") ? "text-foreground" : "text-foreground/60",
          )}
        >
          Community
        </Link>
        <Link
          href="/contact"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname?.startsWith("/contact") ? "text-foreground" : "text-foreground/60",
          )}
        >
          Contact
        </Link>
      </nav>
      <div className="ml-auto flex items-center gap-2">
        <ModeToggle />
        <Button asChild size="sm" variant="outline" className="rounded-full">
          <Link href="/login">Login</Link>
        </Button>
        <Button asChild size="sm" className="rounded-full">
          <Link href="/join">Join</Link>
        </Button>
      </div>
    </div>
  )
}
