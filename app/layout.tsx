import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Toaster } from "@/components/ui/sonner"
import { AuthProvider } from "@/components/auth/auth-provider"
import { CartProvider } from "@/components/store/cart-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Kelvin Creekman Fan Club - Official Rock & Metal Experience",
  description:
    "Join the official Kelvin Creekman fan club for exclusive content, merchandise, meet & greets, and the ultimate rock and metal experience.",
  keywords: "Kelvin Creekman, fan club, rock music, metal music, exclusive content, merchandise, meet and greet",
  authors: [{ name: "Kelvin Creekman Fan Club" }],
  creator: "Kelvin Creekman",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://kelvincreekman.com",
    title: "Kelvin Creekman Fan Club",
    description: "Official fan club for rock and metal musician Kelvin Creekman",
    siteName: "Kelvin Creekman Fan Club",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kelvin Creekman Fan Club",
    description: "Official fan club for rock and metal musician Kelvin Creekman",
    creator: "@kelvincreekman",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          <AuthProvider>
            <CartProvider>
              <div className="flex min-h-screen flex-col bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
                <SiteHeader />
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
