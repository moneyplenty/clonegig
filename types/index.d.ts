import type { Icons } from "path-to-icons" // Assuming Icons is imported from a module

export type SiteConfig = {
  name: string
  description: string
  mainNav: MainNavItem[]
  links: {
    twitter: string
    github: string
    docs: string
  }
}

export type NavItem = {
  title: string
  href: string
  disabled?: boolean
}

export type MainNavItem = NavItem

export type SidebarNavItem = {
  title: string
  disabled?: boolean
  external?: boolean
  icon?: keyof typeof Icons
} & (
  | {
      href: string
      items?: never
    }
  | {
      href?: string
      items: NavItem[]
    }
)

export type UserRole = "guest" | "fan" | "premium" | "admin"

declare module "@supabase/supabase-js" {
  interface UserMetadata {
    role?: UserRole
  }
}
