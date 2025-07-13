"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { HamburgerMenuIcon } from "@radix-ui/react-icons"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import Image from "next/image"

export function MobileNav() {
  const pathname = usePathname()

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 lg:hidden"
        >
          <HamburgerMenuIcon className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="pr-0">
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/creekman-logo.png" // Updated logo path
            alt="Creekman Logo"
            width={24}
            height={24}
            className="rounded-full"
          />
          <span className="font-bold">{siteConfig.name}</span>
        </Link>
        <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
          <div className="flex flex-col space-y-3">
            <Link
              href="/"
              className={cn("text-sm font-medium text-muted-foreground", pathname === "/" && "text-foreground")}
            >
              Home
            </Link>
            <Link
              href="/events"
              className={cn(
                "text-sm font-medium text-muted-foreground",
                pathname.startsWith("/events") && "text-foreground",
              )}
            >
              Events
            </Link>
            <Link
              href="/meet-and-greet"
              className={cn(
                "text-sm font-medium text-muted-foreground",
                pathname.startsWith("/meet-and-greet") && "text-foreground",
              )}
            >
              Meet & Greet
            </Link>
            <Link
              href="/store"
              className={cn(
                "text-sm font-medium text-muted-foreground",
                pathname.startsWith("/store") && "text-foreground",
              )}
            >
              Store
            </Link>
            <Link
              href="/community"
              className={cn(
                "text-sm font-medium text-muted-foreground",
                pathname.startsWith("/community") && "text-foreground",
              )}
            >
              Community
            </Link>
            <Link
              href="/content"
              className={cn(
                "text-sm font-medium text-muted-foreground",
                pathname.startsWith("/content") && "text-foreground",
              )}
            >
              Content
            </Link>
            <Link
              href="/join"
              className={cn(
                "text-sm font-medium text-muted-foreground",
                pathname.startsWith("/join") && "text-foreground",
              )}
            >
              Join
            </Link>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}
