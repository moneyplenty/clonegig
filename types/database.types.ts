export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      content: {
        Row: {
          content_data: Json | null
          created_at: string
          id: string
          slug: string | null
          title: string
          type: string
          updated_at: string | null
        }
        Insert: {
          content_data?: Json | null
          created_at?: string
          id?: string
          slug?: string | null
          title: string
          type: string
          updated_at?: string | null
        }
        Update: {
          content_data?: Json | null
          created_at?: string
          id?: string
          slug?: string | null
          title?: string
          type?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      events: {
        Row: {
          created_at: string
          date: string
          description: string | null
          id: string
          image_url: string | null
          location: string | null
          name: string
          price: number
          ticket_count: number | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string
          date: string
          description?: string | null
          id?: string
          image_url?: string | null
          location?: string | null
          name: string
          price?: number
          ticket_count?: number | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string
          date?: string
          description?: string | null
          id?: string
          image_url?: string | null
          location?: string | null
          name?: string
          price?: number
          ticket_count?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      meet_and_greet_bookings: {
        Row: {
          created_at: string
          id: string
          price: number
          room_url: string | null
          session_time: string
          session_type: string
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          price: number
          room_url?: string | null
          session_time: string
          session_type: string
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          price?: number
          room_url?: string | null
          session_time?: string
          session_type?: string
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "meet_and_greet_bookings_user_id_fkey"
            columns: ["user_id"]
            references: ["users"]
            onDelete: "CASCADE"
            onUpdate: "CASCADE"
          },
        ]
      }
      products: {
        Row: {
          created_at: string
          description: string | null
          id: string
          image_url: string | null
          name: string
          price: number
          stock: number | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          name: string
          price?: number
          stock?: number | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          name?: string
          price?: number
          stock?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          email: string | null
          full_name: string | null
          id: string
          membership_tier: string | null
          role: string | null
          updated_at: string | null
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id: string
          membership_tier?: string | null
          role?: string | null
          updated_at?: string | null
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          membership_tier?: string | null
          role?: string | null
          updated_at?: string | null
          username?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      testimonials: {
        Row: {
          author: string
          content: string
          created_at: string
          id: string
          rating: number | null
          updated_at: string | null
        }
        Insert: {
          author: string
          content: string
          created_at?: string
          id?: string
          rating?: number | null
          updated_at?: string | null
        }
        Update: {
          author?: string
          content?: string
          created_at?: string
          id?: string
          rating?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      users: {
        Row: {
          created_at: string
          email: string
          id: string
          role: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          role?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          role?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<PublicTableName extends keyof PublicSchema["Tables"]> = PublicSchema["Tables"][PublicTableName]

export type Enums<PublicEnumName extends keyof PublicSchema["Enums"]> = PublicSchema["Enums"][PublicEnumName]

export type TablesInsert<PublicTableName extends keyof PublicSchema["Tables"]> =
  PublicSchema["Tables"][PublicTableName]["Insert"]

export type TablesUpdate<PublicTableName extends keyof PublicSchema["Tables"]> =
  PublicSchema["Tables"][PublicTableName]["Update"]

export type Functions<PublicFunctionName extends keyof PublicSchema["Functions"]> =
  PublicSchema["Functions"][PublicFunctionName]

export type EnumsInsert<PublicEnumName extends keyof PublicSchema["Enums"]> =
  PublicSchema["Enums"][PublicEnumName]["Insert"]

export type EnumsUpdate<PublicEnumName extends keyof PublicSchema["Enums"]> =
  PublicSchema["Enums"][PublicEnumName]["Update"]
