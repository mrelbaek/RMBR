import { createClient } from "@supabase/supabase-js"

// Check if environment variables are defined
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Create a singleton instance of the Supabase client
let supabase: ReturnType<typeof createClient> | null = null

// Initialize the Supabase client only if the environment variables are available
export function getSupabaseClient() {
  if (!supabaseUrl || !supabaseAnonKey) {
    console.error("Supabase URL or Anon Key is missing")
    // Return a mock client during build time or when env vars are missing
    return {
      from: () => ({
        select: () => ({ data: [], error: null }),
        insert: () => ({ data: null, error: null }),
        update: () => ({ data: null, error: null }),
        eq: () => ({ data: null, error: null }),
        single: () => ({ data: null, error: null }),
        order: () => ({ data: [], error: null }),
      }),
    } as any
  }

  if (!supabase) {
    supabase = createClient(supabaseUrl, supabaseAnonKey)
  }

  return supabase
}

// Types based on your database schema
export type Order = {
  id: string
  customer_email: string
  book_title: string
  author: string
  grade_level: string
  length: number
  is_rush: boolean
  sample_text?: string
  status: "pending" | "processing" | "completed" | "failed"
  stripe_session_id?: string
  created_at: string
  completed_at?: string
  report_text?: string
}
