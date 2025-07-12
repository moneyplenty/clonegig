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
    <div className="hidden md:flex gap-6">
      <Link href="/" className="flex items-center space-x-2">
        <Icons.logo className="h-6 w-6 text-electric-400" />
        <span className="hidden font-bold sm:inline-block text-electric-100">{siteConfig.name}</span>
      </Link>
      <nav className="flex items-center gap-6 text-sm">
        {siteConfig.mainNav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "transition-colors hover:text-electric-400",
              pathname === item.href ? "text-electric-400" : "text-electric-200",
              item.disabled && "cursor-not-allowed opacity-80",
            )}
          >
            {item.title}
            {item.title === "Store" && (
              <Badge variant="secondary" className="ml-2 bg-frost-500 text-white">
                New
              </Badge>
            )}
          </Link>
        ))}
      </nav>
    </div>
  )
}
