"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import { ModeToggle } from "@/components/mode-toggle"

export function MobileNav() {
  const [open, setOpen] = React.useState(false)
  const pathname = usePathname()

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/content", label: "Exclusive Content" },
    { href: "/store", label: "Merch Store" },
    { href: "/events", label: "Events" },
    { href: "/community", label: "Community" },
    { href: "/contact", label: "Contact" },
  ]

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="pr-0">
        <div className="px-7">
          <Link href="/" className="flex items-center" onClick={() => setOpen(false)}>
            <span className="font-bold">STELLAR</span>
          </Link>
        </div>
        <nav className="mt-6 flex flex-col gap-4 px-7">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-foreground/70 transition-colors hover:text-foreground",
                pathname === item.href && "text-foreground",
              )}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <div className="mt-4 flex flex-col gap-2">
            <Button asChild variant="outline" className="w-full rounded-full">
              <Link href="/login" onClick={() => setOpen(false)}>
                Login
              </Link>
            </Button>
            <Button asChild className="w-full rounded-full">
              <Link href="/join" onClick={() => setOpen(false)}>
                Join Now
              </Link>
            </Button>
          </div>
          <div className="mt-4 flex justify-start">
            <ModeToggle />
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  )
}
