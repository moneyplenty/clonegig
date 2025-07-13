export interface User {
  id: string
  email: string
  full_name?: string
  avatar_url?: string
  role: "user" | "admin"
  membership_tier: "free" | "premium" | "vip"
  created_at: string
  updated_at: string
}

export interface Event {
  id: string
  title: string
  description: string
  date: string
  location: string
  image: string
  ticket_price: number
  is_premium: boolean
  max_attendees?: number
  current_attendees: number
  created_at: string
  updated_at: string
}

export interface Product {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: string
  stock_quantity: number
  is_featured: boolean
  created_at: string
  updated_at: string
}

export interface Content {
  id: string
  title: string
  description: string
  type: "video" | "audio" | "blog" | "gallery" | "text"
  category: string
  image: string
  content_url?: string
  is_premium: boolean
  created_at: string
  updated_at: string
}

export interface CartItem {
  id: string
  name: string
  price: number
  image: string
  quantity: number
}

export interface MeetAndGreet {
  id: string
  title: string
  description: string
  date: string
  duration: number
  price: number
  max_participants: number
  current_participants: number
  is_premium: boolean
  room_url?: string
  created_at: string
  updated_at: string
}

export interface Testimonial {
  id: string
  name: string
  content: string
  avatar: string
  rating: number
  membership_tier: string
}

export interface MembershipTier {
  id: string
  name: string
  price: number
  features: string[]
  is_popular: boolean
  stripe_price_id: string
}
