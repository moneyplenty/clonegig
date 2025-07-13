"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

export function MainNav() {
  const pathname = usePathname()

  return (
    <div className="hidden gap-6 lg:flex">
      <Link
        href="/"
        className={cn(
          "flex items-center text-lg font-semibold text-muted-foreground sm:text-sm",
          pathname === "/" && "text-foreground",
        )}
      >
        Home
      </Link>
      <Link
        href="/events"
        className={cn(
          "flex items-center text-lg font-semibold text-muted-foreground sm:text-sm",
          pathname.startsWith("/events") && "text-foreground",
        )}
      >
        Events
      </Link>
      <Link
        href="/meet-and-greet"
        className={cn(
          "flex items-center text-lg font-semibold text-muted-foreground sm:text-sm",
          pathname.startsWith("/meet-and-greet") && "text-foreground",
        )}
      >
        Meet & Greet
      </Link>
      <Link
        href="/store"
        className={cn(
          "flex items-center text-lg font-semibold text-muted-foreground sm:text-sm",
          pathname.startsWith("/store") && "text-foreground",
        )}
      >
        Store
      </Link>
      <Link
        href="/community"
        className={cn(
          "flex items-center text-lg font-semibold text-muted-foreground sm:text-sm",
          pathname.startsWith("/community") && "text-foreground",
        )}
      >
        Community
      </Link>
      <Link
        href="/content"
        className={cn(
          "flex items-center text-lg font-semibold text-muted-foreground sm:text-sm",
          pathname.startsWith("/content") && "text-foreground",
        )}
      >
        Content
      </Link>
      <Link
        href="/join"
        className={cn(
          "flex items-center text-lg font-semibold text-muted-foreground sm:text-sm",
          pathname.startsWith("/join") && "text-foreground",
        )}
      >
        Join
      </Link>
    </div>
  )
}
