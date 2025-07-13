"use client"

import Link from "next/link"
import type { User } from "@supabase/supabase-js"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Icons } from "@/components/icons"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

interface UserNavProps {
  user: User
}

export function UserNav({ user }: UserNavProps) {
  const router = useRouter()
  const supabase = createClient()

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) {
        toast.error("Error signing out")
        return
      }
      toast.success("Signed out successfully")
      router.push("/")
      router.refresh()
    } catch (error) {
      toast.error("Error signing out")
    }
  }

  const userInitials = user.email
    ? user.email
        .split("@")[0]
        .split(".")
        .map((name) => name.charAt(0).toUpperCase())
        .join("")
        .slice(0, 2)
    : "U"

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.user_metadata?.avatar_url || "/placeholder.svg"} alt={user.email || ""} />
            <AvatarFallback className="bg-kelvin-accent text-kelvin-accent-foreground">{userInitials}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {user.user_metadata?.full_name || user.email?.split("@")[0]}
            </p>
            <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/dashboard" className="cursor-pointer">
            <Icons.user className="mr-2 h-4 w-4" />
            Dashboard
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/content" className="cursor-pointer">
            <Icons.video className="mr-2 h-4 w-4" />
            Content
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/store" className="cursor-pointer">
            <Icons.shoppingCart className="mr-2 h-4 w-4" />
            Store
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/events" className="cursor-pointer">
            <Icons.calendar className="mr-2 h-4 w-4" />
            Events
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/meet-and-greet" className="cursor-pointer">
            <Icons.users className="mr-2 h-4 w-4" />
            Meet & Greet
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer text-red-600 focus:text-red-600" onClick={handleSignOut}>
          <Icons.logOut className="mr-2 h-4 w-4" />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
