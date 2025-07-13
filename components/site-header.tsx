import Link from "next/link"
import { MainNav } from "@/components/main-nav"
import { MobileNav } from "@/components/mobile-nav"
import { ModeToggle } from "@/components/mode-toggle"
import { buttonVariants } from "@/components/ui/button"
import { siteConfig } from "@/config/site"
import { createClient } from "@/lib/supabase/server"
import { cookies } from "next/headers"
import { ShoppingCart } from "lucide-react"

export async function SiteHeader() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <MainNav items={siteConfig.mainNav} />
        <MobileNav />
        <div className="flex flex-1 items-center justify-end space-x-2">
          <nav className="flex items-center space-x-2">
            <Link href="/store/cart" className={buttonVariants({ variant: "ghost", size: "icon" })}>
              <ShoppingCart className="h-5 w-5" />
              <span className="sr-only">Shopping Cart</span>
            </Link>
            <ModeToggle />
            {user ? (
              <div className="flex items-center space-x-2">
                <Link href="/dashboard" className={buttonVariants({ variant: "ghost" })}>
                  Dashboard
                </Link>
                {user.user_metadata?.avatar_url ? (
                  <img
                    src={user.user_metadata.avatar_url || "/placeholder.svg"}
                    alt="User Avatar"
                    className="h-8 w-8 rounded-full"
                  />
                ) : (
                  <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-sm font-semibold">
                    {user.email ? user.email[0].toUpperCase() : "U"}
                  </div>
                )}
              </div>
            ) : (
              <Link href="/login" className={buttonVariants({ variant: "ghost" })}>
                Login
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}
