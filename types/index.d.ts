import type { Icons } from "path-to-icons" // Assuming Icons is imported from a module
import type { User } from "path-to-user" // Assuming User is imported from a module

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
  mainNav: MainNavItem[]
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
  price: number
}

export type UserSubscriptionPlan = SubscriptionPlan &
  Pick<User, "stripeCustomerId" | "stripeSubscriptionId"> & {
    stripeCurrentPeriodEnd: number
    isPro: boolean
  }

export interface Product {
  id: string
  name: string
  description?: string
  price: number
  image: string
  category?: string
  stock: number
}

export interface CartItem extends Product {
  quantity: number
}

export interface Order {
  id: string
  userId: string
  stripeSessionId: string
  totalAmount: number
  status: string
  createdAt: Date
  updatedAt: Date
  orderItems: OrderItem[]
}

export interface OrderItem {
  id: string
  orderId: string
  productId: string
  quantity: number
  price: number
  name: string
  image: string
  createdAt: Date
  updatedAt: Date
}

export interface Event {
  id: string
  title: string
  description?: string
  date: Date
  location: string
  price: number
  isMeetGreet: boolean
}

export interface Content {
  id: string
  title: string
  description?: string
  type: string // e.g., "blog", "video", "audio"
  url?: string // URL to external content or file path
  accessLevel: string // guest, fan, premium
}

export interface SuperFan {
  name: string
  tiktokUrl: string
}
