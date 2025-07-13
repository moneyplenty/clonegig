import type { User } from "./user" // Assuming User type is defined in a separate file
import type { Icons } from "./icons" // Assuming Icons object is defined in a separate file
import type { Database as DB } from "./database.types"

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

export type SiteConfig = {
  name: string
  description: string
  url: string
  ogImage: string
  links: {
    twitter: string
    github: string
  }
}

export type DocsConfig = {
  mainNav: MainNavItem[]
  sidebarNav: SidebarNavItem[]
}

export type MarketingConfig = {
  mainNav: MainNavItem[]
}

export type DashboardConfig = {
  mainNav: MainNavItem[]
  sidebarNav: SidebarNavItem[]
}

export type SubscriptionPlan = {
  name: string
  description: string
  stripePriceId: string
}

export type UserSubscriptionPlan = SubscriptionPlan &
  Pick<User, "stripeCustomerId" | "stripeSubscriptionId"> & {
    stripeCurrentPeriodEnd: number
    isPro: boolean
  }

export type Product = {
  id: string
  name: string
  price: number
  image: string
  description: string
}

export type Event = {
  id: string
  title: string
  date: string
  time: string
  location: string
  description: string
  image: string
}

export type Content = {
  id: string
  title: string
  description: string
  type: "video" | "audio" | "blog" | "image" | "text"
  url: string
  access_level: "free" | "premium" | "vip"
  image_url?: string
  created_at: string
  updated_at: string
}

export type MeetAndGreetBooking = {
  id: string
  user_id: string
  session_time: string
  session_type: string
  status: "pending" | "confirmed" | "cancelled" | "completed"
  room_url?: string | null
  price: number
  created_at: string
  updated_at: string
}

export type UserProfile = {
  id: string
  email: string
  role: "user" | "admin"
  // Add other profile fields as needed
}

declare module "@supabase/supabase-js" {
  interface UserMetadata {
    role?: "user" | "admin"
    // Add other custom user metadata fields here
  }
  interface User {
    user_metadata: UserMetadata
  }
}

declare global {
  type Database = DB
}
