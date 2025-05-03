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
    const supabase = getSupabaseClient()
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
          stripe_session_id: data.stripe_session_id,
          status: "pending",
        },
      ])
      .select()
      .single()

    if (error) {
      console.error("Error creating order:", error)
      throw new Error("Failed to create order")
    }

    revalidatePath("/success")
    return { success: true, orderId: order.id }
  } catch (error) {
    console.error("Error in createOrder:", error)
    return { success: false, error: "Failed to create order" }
  }
}

export async function getOrderBySessionId(sessionId: string) {
  try {
    const supabase = getSupabaseClient()
    const { data: order, error } = await supabase.from("orders").select("*").eq("stripe_session_id", sessionId).single()

    if (error) {
      console.error("Error fetching order:", error)
      return null
    }

    return order
  } catch (error) {
    console.error("Error in getOrderBySessionId:", error)
    return null
  }
}

export async function getOrderById(id: string) {
  try {
    const supabase = getSupabaseClient()
    const { data: order, error } = await supabase.from("orders").select("*").eq("id", id).single()

    if (error) {
      console.error("Error fetching order:", error)
      return null
    }

    return order
  } catch (error) {
    console.error("Error in getOrderById:", error)
    return null
  }
}

export async function updateOrderStatus(id: string, status: string) {
  try {
    const supabase = getSupabaseClient()
    const updates = {
      status,
      ...(status === "completed" ? { completed_at: new Date().toISOString() } : {}),
    }

    const { error } = await supabase.from("orders").update(updates).eq("id", id)

    if (error) {
      console.error("Error updating order status:", error)
      return { success: false, error: "Failed to update order status" }
    }

    revalidatePath("/success")
    return { success: true }
  } catch (error) {
    console.error("Error in updateOrderStatus:", error)
    return { success: false, error: "Failed to update order status" }
  }
}
