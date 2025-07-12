"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { HamburgerMenuIcon } from "@radix-ui/react-icons"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"

export function MobileNav() {
  const pathname = usePathname()

  return (
    <Sheet>
      <SheetTrigger asChild>
        <HamburgerMenuIcon className="h-6 w-6 md:hidden text-electric-400" />
      </SheetTrigger>
      <SheetContent
        side="left"
        className="w-[300px] sm:w-[400px] bg-background/90 backdrop-blur-lg border-electric-700/30"
      >
        <SheetHeader>
          <SheetTitle className="text-electric-100">
            <Link href="/" className="flex items-center space-x-2">
              <Icons.logo className="h-6 w-6 text-electric-400" />
              <span className="font-bold">{siteConfig.name}</span>
            </Link>
          </SheetTitle>
          <SheetDescription className="text-muted-foreground">Explore the world of Kelvin Creekman.</SheetDescription>
        </SheetHeader>
        <nav className="flex flex-col gap-4 mt-6">
          {siteConfig.mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-lg font-medium transition-colors hover:text-electric-400",
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
      </SheetContent>
    </Sheet>
  )
}
