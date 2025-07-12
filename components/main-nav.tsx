"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Image from "next/image"

import { cn } from "@/lib/utils"
import { ModeToggle } from "@/components/mode-toggle"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { toast } from "@/components/ui/use-toast"

export function MainNav() {
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()
  const [user, setUser] = React.useState<any>(null)

  React.useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      setUser(user)
    }
    getUser()
  }, [])

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      })
    } else {
      setUser(null)
      router.push("/login")
      toast({
        title: "Signed Out",
        description: "You have been successfully signed out.",
        variant: "success",
      })
    }
  }

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/content", label: "Content" },
    { href: "/store", label: "Store" },
    { href: "/events", label: "Events" },
    { href: "/meet-and-greet", label: "Meet & Greet" },
    { href: "/community", label: "Community" },
  ]

  return (
    <div className="mr-4 hidden md:flex">
      <Link href="/" className="mr-6 flex items-center space-x-2">
        <Image src="/kelvin-logo.png" alt="Kelvin Creekman Logo" width={32} height={32} className="rounded-full" />
        <span className="hidden font-bold sm:inline-block text-electric-100">Kelvin Creekman</span>
      </Link>
      <nav className="flex items-center gap-6 text-sm">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "transition-colors hover:text-electric-300",
              pathname === item.href ? "text-electric-100" : "text-electric-400",
            )}
          >
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="flex flex-1 items-center justify-end space-x-4">
        <ModeToggle />
        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user.user_metadata?.avatar_url || "/placeholder-user.jpg"} alt={user.email} />
                  <AvatarFallback>{user.email ? user.email[0].toUpperCase() : "U"}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-background border-electric-700" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none text-electric-100">
                    {user.user_metadata?.full_name || user.email}
                  </p>
                  <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-electric-700" />
              <DropdownMenuGroup>
                <DropdownMenuItem className="focus:bg-electric-900 focus:text-electric-100" asChild>
                  <Link href="/dashboard">Dashboard</Link>
                </DropdownMenuItem>
                {user.user_metadata?.role === "admin" && (
                  <DropdownMenuItem className="focus:bg-electric-900 focus:text-electric-100" asChild>
                    <Link href="/admin">Admin</Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem className="focus:bg-electric-900 focus:text-electric-100">
                  Settings
                  <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator className="bg-electric-700" />
              <DropdownMenuItem onClick={handleSignOut} className="focus:bg-electric-900 focus:text-electric-100">
                Log out
                <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button asChild className="bg-gradient-electric hover:animate-electric-pulse">
            <Link href="/login">Login</Link>
          </Button>
        )}
      </div>
    </div>
  )
}
