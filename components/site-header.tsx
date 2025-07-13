import Link from "next/link"
import { MainNav } from "@/components/main-nav"
import { MobileNav } from "@/components/mobile-nav"
import { ModeToggle } from "@/components/mode-toggle"
import { buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { siteConfig } from "@/config/site"
import { createClient } from "@/lib/supabase/server"
import { cookies } from "next/headers"
import { UserNav } from "./user-nav"
import { CartSheet } from "./store/cart-sheet"

export async function SiteHeader() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <header className="sticky top-0 z-40 w-full border-b border-kelvin-border bg-kelvin-background/80 backdrop-blur-md">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <MainNav items={siteConfig.mainNav} />
        <MobileNav mainNavItems={siteConfig.mainNav} />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            <CartSheet />
            <ModeToggle />
            {user ? (
              <UserNav user={user} />
            ) : (
              <Link href="/login" className={buttonVariants({ variant: "ghost", size: "sm" })}>
                <Icons.user className="h-5 w-5" />
                <span className="sr-only">Login</span>
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}

interface UserNavProps {
  user: any // Replace 'any' with a proper user type if available
}

// UserNav function is already defined above, so it should not be redeclared here
