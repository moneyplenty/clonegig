"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { useAuth } from "@/components/auth/auth-provider"
import { useCart } from "@/components/store/cart-context"
import { ShoppingCart, User, LogOut, Settings } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function MainNav() {
  const pathname = usePathname()
  const { user, signOut } = useAuth()
  const { state } = useCart()

  const routes = [
    {
      href: "/",
      label: "Home",
      active: pathname === "/",
    },
    {
      href: "/content",
      label: "Content",
      active: pathname === "/content",
    },
    {
      href: "/events",
      label: "Events",
      active: pathname === "/events",
    },
    {
      href: "/store",
      label: "Store",
      active: pathname === "/store",
    },
    {
      href: "/meet-and-greet",
      label: "Meet & Greet",
      active: pathname === "/meet-and-greet",
    },
  ]

  const handleSignOut = async () => {
    try {
      await signOut()
    } catch (error) {
      console.error("Error signing out:", error)
    }
  }

  return (
    <div className="mr-4 hidden md:flex">
      <Link href="/" className="mr-6 flex items-center space-x-3">
        <div className="relative group">
          <Image
            src="/kelvin-logo.png"
            alt="Kelvin Creekman Logo"
            width={48}
            height={48}
            className="rounded-full border-2 border-electric-500/50 shadow-lg shadow-electric-500/20 transition-all duration-300 group-hover:border-electric-400 group-hover:shadow-electric-400/30"
            priority
          />
          <div className="absolute inset-0 rounded-full border-2 border-electric-500/30 animate-pulse group-hover:border-electric-400/50" />
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-xl bg-gradient-to-r from-electric-400 to-frost-400 bg-clip-text text-transparent leading-tight">
            Kelvin Creekman
          </span>
          <span className="text-xs text-muted-foreground/70 font-medium tracking-wider uppercase">
            Official Fan Club
          </span>
        </div>
      </Link>
      <nav className="flex items-center space-x-6 text-sm font-medium">
        {routes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className={cn(
              "transition-colors hover:text-electric-400 relative group py-2",
              route.active ? "text-electric-400 frost-text" : "text-muted-foreground",
            )}
          >
            {route.label}
            {route.active && (
              <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-electric rounded-full" />
            )}
            <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-electric rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-200" />
          </Link>
        ))}
      </nav>
      <div className="flex items-center space-x-4 ml-auto">
        <Link href="/store/cart">
          <Button variant="ghost" size="sm" className="relative hover:text-electric-400 transition-colors">
            <ShoppingCart className="h-4 w-4" />
            {state.items.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-electric-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse font-bold">
                {state.items.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            )}
          </Button>
        </Link>
        <ModeToggle />
        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="hover:text-electric-400 transition-colors">
                <User className="h-4 w-4 mr-2" />
                <span className="max-w-24 truncate">{user.email?.split("@")[0]}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="border-electric-700/30 bg-background/95 backdrop-blur-lg">
              <DropdownMenuItem asChild>
                <Link href="/dashboard" className="hover:text-electric-400 cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  Dashboard
                </Link>
              </DropdownMenuItem>
              {user.user_metadata?.role === "admin" && (
                <DropdownMenuItem asChild>
                  <Link href="/admin" className="hover:text-electric-400 cursor-pointer">
                    <Settings className="mr-2 h-4 w-4" />
                    Admin
                  </Link>
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator className="bg-electric-700/30" />
              <DropdownMenuItem onClick={handleSignOut} className="hover:text-electric-400 cursor-pointer">
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" asChild className="hover:text-electric-400 transition-colors">
              <Link href="/login">Sign In</Link>
            </Button>
            <Button size="sm" asChild className="bg-gradient-electric hover:animate-electric-pulse transition-all">
              <Link href="/signup">Join Now</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
