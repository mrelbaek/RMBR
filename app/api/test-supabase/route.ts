import { NextResponse } from "next/server"
import { getSupabaseClient } from "../../../lib/supabase"

export async function GET() {
  try {
    // Get Supabase client
    const supabase = getSupabaseClient()

    if (!supabase) {
      return NextResponse.json(
        {
          error: "Supabase client initialization failed",
          env: {
            hasUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
            hasKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
          },
        },
        { status: 500 },
      )
    }

    // Test a simple query
    const { data, error } = await supabase.from("orders").select("count").limit(1)

    if (error) {
      return NextResponse.json({ error: "Supabase query failed", details: error }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: "Supabase connection successful",
      data,
    })
  } catch (error: any) {
    return NextResponse.json({ error: "Unexpected error", message: error.message }, { status: 500 })
  }
}
