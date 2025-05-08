import { createClient } from "@supabase/supabase-js"

// Check if environment variables are defined
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Create a singleton instance of the Supabase client
let supabase: ReturnType<typeof createClient> | null = null

// Initialize the Supabase client only if the environment variables are available
export function getSupabaseClient() {
  if (!supabaseUrl || !supabaseAnonKey) {
    console.error("Supabase URL or Anon Key is missing", {
      hasUrl: !!supabaseUrl,
      hasKey: !!supabaseAnonKey,
    })

    if (typeof window !== "undefined") {
      // In browser, show more detailed error
      console.log("Environment variables:", {
        NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL || "missing",
        NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? "set but hidden" : "missing",
      })
    }

    // Return a mock client during build time or when env vars are missing
    return null
  }

  if (!supabase) {
    try {
      console.log("Initializing Supabase client with URL:", supabaseUrl)
      supabase = createClient(supabaseUrl, supabaseAnonKey)
      console.log("Supabase client initialized successfully")
    } catch (error) {
      console.error("Error initializing Supabase client:", error)
      return null
    }
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
