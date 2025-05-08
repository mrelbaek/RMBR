"use server"

import { getSupabaseClient } from "../lib/supabase"
import { revalidatePath } from "next/cache"

interface CreateOrderData {
  customer_email: string
  book_title: string
  author: string
  grade_level: string
  length: number
  is_rush: boolean
  sample_text?: string
  stripe_session_id?: string
}

export async function createOrder(data: CreateOrderData) {
  try {
    console.log("Creating order with data:", data)

    const supabase = getSupabaseClient()

    // Check if Supabase client is properly initialized
    if (!supabase) {
      console.error("Supabase client is not initialized")
      return { success: false, error: "Database connection error" }
    }

    // Validate required fields
    if (!data.customer_email || !data.book_title || !data.author || !data.grade_level) {
      console.error("Missing required fields:", {
        hasEmail: !!data.customer_email,
        hasTitle: !!data.book_title,
        hasAuthor: !!data.author,
        hasGradeLevel: !!data.grade_level,
      })
      return { success: false, error: "Missing required fields" }
    }

    // Create the order
    const { data: order, error } = await supabase
      .from("orders")
      .insert([
        {
          customer_email: data.customer_email,
          book_title: data.book_title,
          author: data.author,
          grade_level: data.grade_level,
          length: data.length,
          is_rush: data.is_rush,
          sample_text: data.sample_text,
          stripe_session_id: data.stripe_session_id || `sess_${Math.random().toString(36).substring(2, 15)}`,
          status: "pending",
        },
      ])
      .select()
      .single()

    if (error) {
      console.error("Error creating order in Supabase:", error)
      return { success: false, error: `Database error: ${error.message}` }
    }

    if (!order) {
      console.error("No order returned from Supabase")
      return { success: false, error: "Failed to create order record" }
    }

    console.log("Order created successfully:", order.id)
    revalidatePath("/success")
    return { success: true, orderId: order.id, sessionId: order.stripe_session_id }
  } catch (error: any) {
    console.error("Unexpected error in createOrder:", error)
    return { success: false, error: `Unexpected error: ${error.message}` }
  }
}

export async function getOrderBySessionId(sessionId: string) {
  try {
    if (!sessionId) {
      console.error("No session ID provided")
      return null
    }

    const supabase = getSupabaseClient()

    if (!supabase) {
      console.error("Supabase client is not initialized")
      return null
    }

    const { data: order, error } = await supabase.from("orders").select("*").eq("stripe_session_id", sessionId).single()

    if (error) {
      console.error("Error fetching order by session ID:", error)
      return null
    }

    return order
  } catch (error) {
    console.error("Unexpected error in getOrderBySessionId:", error)
    return null
  }
}

export async function getOrderById(id: string) {
  try {
    if (!id) {
      console.error("No order ID provided")
      return null
    }

    const supabase = getSupabaseClient()

    if (!supabase) {
      console.error("Supabase client is not initialized")
      return null
    }

    const { data: order, error } = await supabase.from("orders").select("*").eq("id", id).single()

    if (error) {
      console.error("Error fetching order by ID:", error)
      return null
    }

    return order
  } catch (error) {
    console.error("Unexpected error in getOrderById:", error)
    return null
  }
}

export async function updateOrderStatus(id: string, status: string) {
  try {
    if (!id || !status) {
      console.error("Missing required parameters:", { hasId: !!id, hasStatus: !!status })
      return { success: false, error: "Missing required parameters" }
    }

    const supabase = getSupabaseClient()

    if (!supabase) {
      console.error("Supabase client is not initialized")
      return { success: false, error: "Database connection error" }
    }

    const updates = {
      status,
      ...(status === "completed" ? { completed_at: new Date().toISOString() } : {}),
    }

    const { error } = await supabase.from("orders").update(updates).eq("id", id)

    if (error) {
      console.error("Error updating order status:", error)
      return { success: false, error: `Database error: ${error.message}` }
    }

    revalidatePath("/success")
    return { success: true }
  } catch (error: any) {
    console.error("Unexpected error in updateOrderStatus:", error)
    return { success: false, error: `Unexpected error: ${error.message}` }
  }
}
