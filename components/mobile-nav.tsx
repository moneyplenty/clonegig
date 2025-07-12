"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"

export function MobileNav() {
  const pathname = usePathname()
  const [open, setOpen] = React.useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
        >
          <svg strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5">
            <path d="M3 5H11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M3 12H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M3 19H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="pr-0">
        <SheetHeader>
          <SheetTitle>
            <Link href="/" className="flex items-center" onClick={() => setOpen(false)}>
              <Icons.logo className="mr-2 h-4 w-4" />
              {siteConfig.name}
            </Link>
          </SheetTitle>
        </SheetHeader>
        <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
          <div className="flex flex-col space-y-3">
            <Link
              href="/store"
              className={cn(
                "transition-colors hover:text-foreground/80",
                pathname === "/store" ? "text-foreground" : "text-foreground/60",
              )}
              onClick={() => setOpen(false)}
            >
              Store
            </Link>
            <Link
              href="/events"
              className={cn(
                "transition-colors hover:text-foreground/80",
                pathname?.startsWith("/events") ? "text-foreground" : "text-foreground/60",
              )}
              onClick={() => setOpen(false)}
            >
              Events
            </Link>
            <Link
              href="/meet-and-greet"
              className={cn(
                "transition-colors hover:text-foreground/80",
                pathname === "/meet-and-greet" ? "text-foreground" : "text-foreground/60",
              )}
              onClick={() => setOpen(false)}
            >
              Meet & Greet
            </Link>
            <Link
              href="/content"
              className={cn(
                "transition-colors hover:text-foreground/80",
                pathname === "/content" ? "text-foreground" : "text-foreground/60",
              )}
              onClick={() => setOpen(false)}
            >
              Content
            </Link>
            <Link
              href="/community"
              className={cn(
                "transition-colors hover:text-foreground/80",
                pathname === "/community" ? "text-foreground" : "text-foreground/60",
              )}
              onClick={() => setOpen(false)}
            >
              Community
            </Link>
            <Link
              href="/dashboard"
              className={cn(
                "transition-colors hover:text-foreground/80",
                pathname === "/dashboard" ? "text-foreground" : "text-foreground/60",
              )}
              onClick={() => setOpen(false)}
            >
              Dashboard
            </Link>
            <Link
              href="/admin"
              className={cn(
                "transition-colors hover:text-foreground/80",
                pathname?.startsWith("/admin") ? "text-foreground" : "text-foreground/60",
              )}
              onClick={() => setOpen(false)}
            >
              Admin <Badge className="ml-1">Pro</Badge>
            </Link>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}
