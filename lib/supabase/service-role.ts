import { createClient } from "@supabase/supabase-js"
import type { Database } from "@/types/database.types"

let supabaseServiceRole: ReturnType<typeof createClient> | undefined

export function createServiceRoleClient() {
  if (!supabaseServiceRole) {
    supabaseServiceRole = createClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      },
    )
  }
  return supabaseServiceRole
}
