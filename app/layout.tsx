import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { MainNav } from "@/components/main-nav"
import { MobileNav } from "@/components/mobile-nav"
import { SiteFooter } from "@/components/site-footer"
import { Toaster } from "@/components/ui/toaster"
import { AuthProvider } from "@/components/auth/auth-provider"
import { CartProvider } from "@/components/store/cart-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Kelvin Creekman Fan Club",
  description:
    "The official fan club website for rock and metal musician Kelvin Creekman. Exclusive content, merchandise, events, and community.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <AuthProvider>
            <CartProvider>
              <div className="flex min-h-screen flex-col">
                <header className="sticky top-0 z-40 w-full border-b border-electric-700 bg-background/80 backdrop-blur-lg">
                  <div className="container flex h-16 items-center">
                    <MainNav />
                    <MobileNav />
                  </div>
                </header>
                <main className="flex-1">{children}</main>
                <SiteFooter />
              </div>
              <Toaster />
            </CartProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
