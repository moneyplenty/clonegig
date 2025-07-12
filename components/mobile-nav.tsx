"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, ShoppingCart, LogOut, Settings } from "lucide-react"
import { useAuth } from "@/components/auth/auth-provider"
import { useCart } from "@/components/store/cart-context"
import { ModeToggle } from "@/components/mode-toggle"

export function MobileNav() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const { user, signOut } = useAuth()
  const { state } = useCart()

  const routes = [
    { href: "/", label: "Home" },
    { href: "/content", label: "Content" },
    { href: "/events", label: "Events" },
    { href: "/store", label: "Store" },
    { href: "/meet-and-greet", label: "Meet & Greet" },
  ]

  const handleSignOut = async () => {
    try {
      await signOut()
      setOpen(false)
    } catch (error) {
      console.error("Error signing out:", error)
    }
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden hover:text-electric-400 transition-colors"
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="pr-0 bg-background/95 backdrop-blur-lg border-electric-700/30 w-80">
        <div className="px-6 py-4">
          <Link href="/" className="flex items-center space-x-3" onClick={() => setOpen(false)}>
            <div className="relative group">
              <Image
                src="/kelvin-logo.png"
                alt="Kelvin Creekman Logo"
                width={40}
                height={40}
                className="rounded-full border-2 border-electric-500/50 shadow-lg shadow-electric-500/20 transition-all duration-300"
                priority
              />
              <div className="absolute inset-0 rounded-full border-2 border-electric-500/30 animate-pulse" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg bg-gradient-to-r from-electric-400 to-frost-400 bg-clip-text text-transparent leading-tight">
                Kelvin Creekman
              </span>
              <span className="text-xs text-muted-foreground/70 font-medium tracking-wider uppercase">
                Official Fan Club
              </span>
            </div>
          </Link>
        </div>
        <div className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
          <div className="flex flex-col space-y-4">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "transition-colors hover:text-electric-400 text-base font-medium py-2 px-2 rounded-md hover:bg-electric-500/10",
                  pathname === route.href ? "text-electric-400 frost-text bg-electric-500/20" : "text-muted-foreground",
                )}
              >
                {route.label}
              </Link>
            ))}
          </div>
          <div className="mt-8 space-y-4">
            <Link href="/store/cart" onClick={() => setOpen(false)}>
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start relative hover:text-electric-400 hover:bg-electric-500/10 py-3"
              >
                <ShoppingCart className="h-5 w-5 mr-3" />
                <span className="text-base">Cart</span>
                {state.items.length > 0 && (
                  <span className="ml-auto bg-electric-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center animate-pulse font-bold">
                    {state.items.reduce((sum, item) => sum + item.quantity, 0)}
                  </span>
                )}
              </Button>
            </Link>
            <div className="flex items-center justify-start px-2">
              <ModeToggle />
              <span className="ml-3 text-sm text-muted-foreground">Theme</span>
            </div>
            {user ? (
              <>
                <Link href="/dashboard" onClick={() => setOpen(false)}>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start hover:text-electric-400 hover:bg-electric-500/10 py-3"
                  >
                    <Settings className="h-5 w-5 mr-3" />
                    <span className="text-base">Dashboard</span>
                  </Button>
                </Link>
                {user.user_metadata?.role === "admin" && (
                  <Link href="/admin" onClick={() => setOpen(false)}>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start hover:text-electric-400 hover:bg-electric-500/10 py-3"
                    >
                      <Settings className="h-5 w-5 mr-3" />
                      <span className="text-base">Admin</span>
                    </Button>
                  </Link>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start hover:text-electric-400 hover:bg-electric-500/10 py-3"
                  onClick={handleSignOut}
                >
                  <LogOut className="h-5 w-5 mr-3" />
                  <span className="text-base">Sign Out</span>
                </Button>
              </>
            ) : (
              <>
                <Link href="/login" onClick={() => setOpen(false)}>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start hover:text-electric-400 hover:bg-electric-500/10 py-3"
                  >
                    <span className="text-base">Sign In</span>
                  </Button>
                </Link>
                <Link href="/signup" onClick={() => setOpen(false)}>
                  <Button
                    size="sm"
                    className="w-full bg-gradient-electric hover:animate-electric-pulse transition-all py-3"
                  >
                    <span className="text-base font-semibold">Join Now</span>
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
