"use client"

import * as React from "react"
import { useSelectedLayoutSegment } from "next/navigation"
import { Menu } from "lucide-react"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { MobileLink } from "@/components/mobile-link"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import Image from "next/image"

export function MobileNav() {
  const segment = useSelectedLayoutSegment()
  const [open, setOpen] = React.useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Menu className="h-6 w-6 md:hidden" />
      </SheetTrigger>
      <SheetContent side="left" className="pr-0">
        <MobileLink href="/" className="flex items-center" onOpenChange={setOpen}>
          <Image
            src="/kelvin-logo.png"
            alt="Kelvin Creekman Logo"
            width={24}
            height={24}
            className="mr-2 rounded-full"
          />
          <span className="font-bold">{siteConfig.name}</span>
        </MobileLink>
        <div className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
          <div className="flex flex-col space-y-3">
            {siteConfig.mainNav?.map(
              (item) =>
                item.href && (
                  <MobileLink
                    key={item.href}
                    href={item.href}
                    onOpenChange={setOpen}
                    className={cn(
                      "transition-colors hover:text-foreground/80",
                      item.href.startsWith(`/${segment}`) ? "text-foreground" : "text-foreground/60",
                    )}
                  >
                    {item.title}
                  </MobileLink>
                ),
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
