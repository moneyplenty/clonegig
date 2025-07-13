"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"

export function MainNav() {
  const pathname = usePathname()

  return (
    <div className="mr-4 hidden md:flex">
      <Link href="/" className="mr-6 flex items-center space-x-2">
        <Icons.logo className="h-6 w-6" />
        <span className="hidden font-bold sm:inline-block">Kelvin Creekman</span>
      </Link>
      <nav className="flex items-center space-x-6 text-sm font-medium">
        <Link
          href="/events"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname === "/events" ? "text-foreground" : "text-foreground/60",
          )}
        >
          Events
        </Link>
        <Link
          href="/content"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname === "/content" ? "text-foreground" : "text-foreground/60",
          )}
        >
          Content
        </Link>
        <Link
          href="/store"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname === "/store" ? "text-foreground" : "text-foreground/60",
          )}
        >
          Store
        </Link>
        <Link
          href="/community"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname === "/community" ? "text-foreground" : "text-foreground/60",
          )}
        >
          Community
        </Link>
        <Link
          href="/meet-and-greet"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname === "/meet-and-greet" ? "text-foreground" : "text-foreground/60",
          )}
        >
          Meet & Greet
        </Link>
      </nav>
    </div>
  )
}
