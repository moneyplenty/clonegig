"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Icons } from "@/components/icons"
import { cn } from "@/lib/utils"

export function MobileNav() {
  const [open, setOpen] = React.useState(false)
  const pathname = usePathname()

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
        >
          <Icons.menu className="h-6 w-6" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="pr-0">
        <Link href="/" className="flex items-center space-x-2" onClick={() => setOpen(false)}>
          <Icons.logo className="h-6 w-6" />
          <span className="font-bold">Kelvin Creekman</span>
        </Link>
        <div className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
          <div className="flex flex-col space-y-3">
            <Link
              href="/events"
              className={cn(
                "transition-colors hover:text-foreground/80",
                pathname === "/events" ? "text-foreground" : "text-foreground/60",
              )}
              onClick={() => setOpen(false)}
            >
              Events
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
              href="/meet-and-greet"
              className={cn(
                "transition-colors hover:text-foreground/80",
                pathname === "/meet-and-greet" ? "text-foreground" : "text-foreground/60",
              )}
              onClick={() => setOpen(false)}
            >
              Meet & Greet
            </Link>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
