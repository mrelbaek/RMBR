"use server"

import { getSupabaseClient } from "../lib/supabase"
import { revalidatePath } from "next/cache"

/**
 * Processes an order by generating a report and updating the order status
 */
export async function processOrder(orderId: string): Promise<{ success: boolean; error?: string }> {
  try {
    const supabase = getSupabaseClient()

    // Get the order details
    const { data: order, error: fetchError } = await supabase.from("orders").select("*").eq("id", orderId).single()

    if (fetchError || !order) {
      console.error("Error fetching order:", fetchError)
      return { success: false, error: "Order not found" }
    }

    // Update order status to processing
    await supabase.from("orders").update({ status: "processing" }).eq("id", orderId)

    try {
      // Dynamically import the server-only module
      // This ensures it's only loaded on the server
      const { generateReportWithAI } = await import("../lib/openai-server.js")

      // Generate the report
      const report = await generateReportWithAI({
        bookTitle: order.book_title,
        author: order.author,
        level: order.grade_level,
        length: order.length,
        sampleText: order.sample_text,
      })

      // Update the order with the generated report and mark as completed
      const { error: updateError } = await supabase
        .from("orders")
        .update({
          report_text: report,
          status: "completed",
          completed_at: new Date().toISOString(),
        })
        .eq("id", orderId)

      if (updateError) {
        console.error("Error updating order:", updateError)
        return { success: false, error: "Failed to update order with report" }
      }

      revalidatePath(`/view-report/${orderId}`)
      revalidatePath("/dashboard")

      return { success: true }
    } catch (error) {
      console.error("Error generating report:", error)

      // If report generation fails, update the order status to failed
      await supabase
        .from("orders")
        .update({
          status: "failed",
        })
        .eq("id", orderId)

      return { success: false, error: "Failed to generate report" }
    }
  } catch (error: any) {
    console.error("Error processing order:", error)
    return { success: false, error: error.message || "Failed to process order" }
  }
}

/**
 * Gets a report for a specific order
 */
export async function getReport(orderId: string): Promise<{ report?: string; error?: string }> {
  try {
    const supabase = getSupabaseClient()

    const { data: order, error } = await supabase
      .from("orders")
      .select("report_text, status")
      .eq("id", orderId)
      .single()

    if (error) {
      console.error("Error fetching report:", error)
      return { error: "Report not found" }
    }

    if (order.status !== "completed" || !order.report_text) {
      return { error: "Report not yet available" }
    }

    return { report: order.report_text }
  } catch (error: any) {
    console.error("Error getting report:", error)
    return { error: error.message || "Failed to get report" }
  }
}
