"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import { Badge } from "@/components/ui/badge"

export function MainNav() {
  const pathname = usePathname()

  return (
    <div className="mr-4 hidden md:flex">
      <Link href="/" className="mr-6 flex items-center space-x-2">
        <Icons.logo className="h-6 w-6" />
        <span className="hidden font-bold sm:inline-block">{siteConfig.name}</span>
      </Link>
      <nav className="flex items-center gap-6 text-sm">
        <Link
          href="/content"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname?.startsWith("/content") ? "text-foreground" : "text-foreground/60",
          )}
        >
          Content
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
          href="/meet-and-greet"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname?.startsWith("/meet-and-greet") ? "text-foreground" : "text-foreground/60",
          )}
        >
          Meet & Greet
        </Link>
        <Link
          href="/store"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname?.startsWith("/store") ? "text-foreground" : "text-foreground/60",
          )}
        >
          Store
        </Link>
        <Link
          href="/join"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname?.startsWith("/join") ? "text-foreground" : "text-foreground/60",
          )}
        >
          Join <Badge className="ml-1 px-1 py-0 text-xs">New</Badge>
        </Link>
        <Link
          href="/about"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname?.startsWith("/about") ? "text-foreground" : "text-foreground/60",
          )}
        >
          About
        </Link>
        <Link
          href="/admin"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname?.startsWith("/admin") ? "text-foreground" : "text-foreground/60",
          )}
        >
          Admin
        </Link>
      </nav>
    </div>
  )
}
