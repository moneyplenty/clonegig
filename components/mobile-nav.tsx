"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { siteConfig } from "@/config/site"
import { Icons } from "@/components/icons"
import { MobileLink } from "@/components/mobile-link"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Menu } from "lucide-react"
import { Badge } from "@/components/ui/badge"

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
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="pr-0">
        <SheetHeader>
          <SheetTitle>
            <Link href="/" className="flex items-center" onClick={() => setOpen(false)}>
              <Icons.logo className="mr-2 h-4 w-4" />
              <span className="font-bold">{siteConfig.name}</span>
            </Link>
          </SheetTitle>
          <SheetDescription className="sr-only">Navigation menu for Creekman Official Website</SheetDescription>
        </SheetHeader>
        <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
          <div className="flex flex-col space-y-3">
            <MobileLink href="/content" pathname={pathname} setOpen={setOpen}>
              Content
            </MobileLink>
            <MobileLink href="/events" pathname={pathname} setOpen={setOpen}>
              Events
            </MobileLink>
            <MobileLink href="/meet-and-greet" pathname={pathname} setOpen={setOpen}>
              Meet & Greet
            </MobileLink>
            <MobileLink href="/store" pathname={pathname} setOpen={setOpen}>
              Store
            </MobileLink>
            <MobileLink href="/join" pathname={pathname} setOpen={setOpen}>
              Join <Badge className="ml-1 px-1 py-0 text-xs">New</Badge>
            </MobileLink>
            <MobileLink href="/about" pathname={pathname} setOpen={setOpen}>
              About
            </MobileLink>
            <MobileLink href="/admin" pathname={pathname} setOpen={setOpen}>
              Admin
            </MobileLink>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}
