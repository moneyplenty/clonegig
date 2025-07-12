"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import Image from "next/image"
import { Menu } from "lucide-react"

import { cn } from "@/lib/utils"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { ModeToggle } from "@/components/mode-toggle"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { createClient } from "@/lib/supabase/client"
import { toast } from "@/components/ui/use-toast"

export function MobileNav() {
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()
  const [user, setUser] = React.useState<any>(null)
  const [isOpen, setIsOpen] = React.useState(false)

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
    setIsOpen(false) // Close sheet after sign out
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
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden text-electric-400 hover:text-electric-300">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-3/4 bg-background border-electric-700">
        <SheetHeader>
          <SheetTitle className="flex items-center space-x-2">
            <Image src="/kelvin-logo.png" alt="Kelvin Creekman Logo" width={32} height={32} className="rounded-full" />
            <span className="font-bold text-electric-100">Kelvin Creekman</span>
          </SheetTitle>
          <SheetDescription className="text-muted-foreground">Navigate the fan club website.</SheetDescription>
        </SheetHeader>
        <nav className="flex flex-col gap-4 py-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-lg font-medium transition-colors hover:text-electric-300",
                pathname === item.href ? "text-electric-100" : "text-electric-400",
              )}
              onClick={() => setIsOpen(false)} // Close sheet on navigation
            >
              {item.label}
            </Link>
          ))}
          <div className="mt-4 pt-4 border-t border-electric-800">
            {user ? (
              <>
                <div className="flex items-center gap-2 mb-4">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.user_metadata?.avatar_url || "/placeholder-user.jpg"} alt={user.email} />
                    <AvatarFallback>{user.email ? user.email[0].toUpperCase() : "U"}</AvatarFallback>
                  </Avatar>
                  <span className="text-electric-100">{user.user_metadata?.full_name || user.email}</span>
                </div>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-electric-200 hover:bg-electric-900 hover:text-electric-100"
                  asChild
                >
                  <Link href="/dashboard" onClick={() => setIsOpen(false)}>
                    Dashboard
                  </Link>
                </Button>
                {user.user_metadata?.role === "admin" && (
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-electric-200 hover:bg-electric-900 hover:text-electric-100"
                    asChild
                  >
                    <Link href="/admin" onClick={() => setIsOpen(false)}>
                      Admin
                    </Link>
                  </Button>
                )}
                <Button
                  variant="ghost"
                  className="w-full justify-start text-electric-200 hover:bg-electric-900 hover:text-electric-100"
                  onClick={handleSignOut}
                >
                  Log out
                </Button>
              </>
            ) : (
              <Button
                asChild
                className="w-full bg-gradient-electric hover:animate-electric-pulse"
                onClick={() => setIsOpen(false)}
              >
                <Link href="/login">Login</Link>
              </Button>
            )}
            <div className="mt-4">
              <ModeToggle />
            </div>
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  )
}
