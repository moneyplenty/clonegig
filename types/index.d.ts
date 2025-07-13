import type { User as SupabaseUser } from "@supabase/supabase-js"

export interface User extends SupabaseUser {
  id: string
  full_name: string | null
  avatar_url: string | null
  role: "user" | "admin"
  membership_tier: "free" | "premium" | "vip"
  created_at: string
  updated_at: string
}

export interface Product {
  id: string
  name: string
  description: string
  price: number
  image_url: string
  category: string
  stock: number
  created_at: string
}

export interface CartItem extends Product {
  quantity: number
}

export interface Event {
  id: string
  title: string
  description: string
  date: string
  time: string
  location: string
  image_url: string
  ticket_price: number
  is_premium: boolean
  created_at: string
}

export interface MeetAndGreetSession {
  id: string
  type: "group" | "private"
  date: string
  time: string
  duration: number // in minutes
  price: number | null // for private sessions
  max_attendees: number | null // for group sessions
  attendees_count: number // current attendees for group sessions
  created_at: string
}

export interface MeetAndGreetBooking {
  id: string
  user_id: string
  session_id: string
  session_type: "group" | "private"
  payment_status: "pending" | "completed" | "failed"
  room_url: string | null // URL for the video call
  created_at: string
}

export interface Content {
  id: string
  title: string
  description: string
  type: "video" | "audio" | "blog" | "gallery"
  url: string
  is_premium: boolean
  created_at: string
}
