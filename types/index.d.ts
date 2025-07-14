import type { User } from "@supabase/supabase-js"
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

export type Tables<T extends keyof DB["public"]["Tables"]> = DB["public"]["Tables"][T]["Row"]
export type Enums<T extends keyof DB["public"]["Enums"]> = DB["public"]["Enums"][T]

export type Product = DB["public"]["Tables"]["products"]["Row"]
export type Event = DB["public"]["Tables"]["events"]["Row"]
export type Testimonial = DB["public"]["Tables"]["testimonials"]["Row"]
export type Profile = DB["public"]["Tables"]["profiles"]["Row"] & {
  is_admin?: boolean
}
export type Content = DB["public"]["Tables"]["content"]["Row"]
export type Order = Tables<"orders">
export type OrderItem = Tables<"order_items">
export type MembershipTier = "free" | "fan" | "super_fan" | "admin"

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

export type CartItem = Product & {
  quantity: number
}

export type CheckoutSession = {
  id: string
  url: string
}

export type DailyRoom = {
  url: string
  name: string
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
  type GlobalDatabase = DB
}
