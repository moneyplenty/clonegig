// /lib/supabase/supabase-server.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY! // Backend only, not exposed to client!

export const supabaseServer = createClient(supabaseUrl, supabaseServiceKey)
