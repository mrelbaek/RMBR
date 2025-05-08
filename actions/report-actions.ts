"use server"

import { getSupabaseClient } from "../lib/supabase"
import { revalidatePath } from "next/cache"

/**
 * Processes an order by generating a report and updating the order status
 */
export async function processOrder(orderId: string): Promise<{ success: boolean; error?: string }> {
  console.log("Processing order:", orderId)

  try {
    const supabase = getSupabaseClient()

    if (!supabase) {
      console.error("Supabase client is not initialized")
      return { success: false, error: "Database connection error" }
    }

    // Get the order details
    const { data: order, error: fetchError } = await supabase.from("orders").select("*").eq("id", orderId).single()

    if (fetchError || !order) {
      console.error("Error fetching order:", fetchError)
      return { success: false, error: "Order not found" }
    }

    // Update order status to processing
    await supabase.from("orders").update({ status: "processing" }).eq("id", orderId)
    console.log("Order status updated to processing")

    try {
      // Dynamically import the server-only module
      // This ensures it's only loaded on the server
      console.log("Importing OpenAI server module")
      const { generateReportWithAI } = await import("../lib/openai-server.js")
      console.log("OpenAI server module imported successfully")

      // Generate the report
      console.log("Generating report for order:", orderId)
      const report = await generateReportWithAI({
        bookTitle: order.book_title,
        author: order.author,
        level: order.grade_level,
        length: order.length,
        sampleText: order.sample_text,
        errorRate: order.authentic_style ? 5 : 0,
        targetGrade: order.target_grade || "A",
      })
      console.log("Report generated successfully")

      // Update the order with the generated report and mark as completed
      console.log("Updating order with generated report")
      const { error: updateError } = await supabase
        .from("orders")
        .update({
          report_text: report,
          status: "completed",
          completed_at: new Date().toISOString(),
        })
        .eq("id", orderId)

      if (updateError) {
        console.error("Error updating order with report:", updateError)
        return { success: false, error: "Failed to update order with report" }
      }

      console.log("Order updated successfully")
      revalidatePath(`/view-report/${orderId}`)
      revalidatePath("/dashboard")

      return { success: true }
    } catch (error: any) {
      console.error("Error generating report:", error)

      // If report generation fails, update the order status to failed
      await supabase
        .from("orders")
        .update({
          status: "failed",
          completed_at: new Date().toISOString(),
        })
        .eq("id", orderId)

      return { success: false, error: `Failed to generate report: ${error.message}` }
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

    if (!supabase) {
      console.error("Supabase client is not initialized")
      return { error: "Database connection error" }
    }

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
