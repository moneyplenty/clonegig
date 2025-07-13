"use client"
import Link from "next/link"
import { useSelectedLayoutSegment } from "next/navigation"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import Image from "next/image"

export function MainNav() {
  const segment = useSelectedLayoutSegment()

  return (
    <div className="flex gap-6 md:gap-10">
      <Link href="/" className="hidden items-center space-x-2 md:flex">
        <Image src="/kelvin-logo.png" alt="Kelvin Creekman Logo" width={32} height={32} className="rounded-full" />
        <span className="hidden font-bold sm:inline-block">{siteConfig.name}</span>
      </Link>
      <nav className="hidden gap-6 md:flex">
        {siteConfig.mainNav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm",
              item.href.startsWith(`/${segment}`) ? "text-foreground" : "text-foreground/60",
            )}
          >
            {item.title}
          </Link>
        ))}
      </nav>
    </div>
  )
}
