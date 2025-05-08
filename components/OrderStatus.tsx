"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { CheckCircle, Clock, AlertTriangle, RefreshCw } from "lucide-react"
import { getOrderBySessionId } from "../actions/order-actions"
import { processOrder } from "../actions/report-actions"
import type { Order } from "../lib/supabase"

interface OrderStatusProps {
  sessionId: string
}

export default function OrderStatus({ sessionId }: OrderStatusProps) {
  const router = useRouter()
  const [orderDetails, setOrderDetails] = useState<Order | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [processing, setProcessing] = useState(false)
  const [debugInfo, setDebugInfo] = useState<any>(null)

  useEffect(() => {
    async function fetchOrderDetails() {
      if (!sessionId) {
        setError("No order information found.")
        setLoading(false)
        return
      }

      try {
        const order = await getOrderBySessionId(sessionId)

        if (!order) {
          setError("Order not found.")
          setLoading(false)
          return
        }

        setOrderDetails(order as Order)
        setLoading(false)
      } catch (err) {
        console.error("Error fetching order details:", err)
        setError("Failed to fetch order details. Please contact support.")
        setLoading(false)
      }
    }

    fetchOrderDetails()
  }, [sessionId])

  const handleGenerateReport = async () => {
    if (!orderDetails) return

    setProcessing(true)
    setError("")
    setDebugInfo(null)

    try {
      console.log("Generating report for order:", orderDetails.id)
      const result = await processOrder(orderDetails.id)
      console.log("Report generation result:", result)

      if (result.success) {
        // Refresh order details to show updated status
        const order = await getOrderBySessionId(sessionId)
        if (order) {
          setOrderDetails(order as Order)
        }
      } else {
        setError(result.error || "Failed to generate report")
        setDebugInfo(result)
      }
    } catch (err: any) {
      console.error("Error generating report:", err)
      setError(err.message || "Failed to generate report")
    } finally {
      setProcessing(false)
    }
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
        <p className="text-gray-600">Loading order details...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center text-center p-8 bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="rounded-full bg-red-100 p-4 mb-4">
          <AlertTriangle className="h-10 w-10 text-red-500" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Something went wrong</h2>
        <p className="text-gray-600 mb-4">{error}</p>

        {debugInfo && (
          <details className="mb-8 w-full max-w-md">
            <summary className="text-sm text-blue-600 cursor-pointer">Debug Information</summary>
            <pre className="mt-2 text-xs bg-gray-100 p-4 rounded overflow-auto max-h-60 text-left">
              {JSON.stringify(debugInfo, null, 2)}
            </pre>
          </details>
        )}

        <button
          onClick={() => router.push("/")}
          className="bg-blue-500 text-white py-3 px-6 rounded-md font-medium hover:bg-blue-600 transition-colors"
        >
          Return to Homepage
        </button>
      </div>
    )
  }

  if (!orderDetails) {
    return (
      <div className="flex flex-col items-center text-center p-8 bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="rounded-full bg-yellow-100 p-4 mb-4">
          <AlertTriangle className="h-10 w-10 text-yellow-500" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Not Found</h2>
        <p className="text-gray-600 mb-8">We couldn't find any order with the provided information.</p>
        <button
          onClick={() => router.push("/")}
          className="bg-blue-500 text-white py-3 px-6 rounded-md font-medium hover:bg-blue-600 transition-colors"
        >
          Return to Homepage
        </button>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="bg-blue-500 py-4">
        <div className="flex justify-center">
          <div className="rounded-full bg-white p-3">
            {orderDetails.status === "completed" ? (
              <CheckCircle className="h-10 w-10 text-green-600" />
            ) : orderDetails.status === "failed" ? (
              <AlertTriangle className="h-10 w-10 text-red-500" />
            ) : (
              <Clock className="h-10 w-10 text-blue-500" />
            )}
          </div>
        </div>
      </div>

      <div className="p-6 sm:p-8">
        <h2 className="text-center text-2xl font-bold text-gray-900 mb-2">
          {orderDetails.status === "completed"
            ? "Order Completed!"
            : orderDetails.status === "failed"
              ? "Order Failed"
              : orderDetails.status === "processing"
                ? "Order Processing"
                : "Order Pending"}
        </h2>
        <p className="text-center text-gray-600 mb-8">
          {orderDetails.status === "completed"
            ? "Your book report is ready."
            : orderDetails.status === "failed"
              ? "There was an issue generating your report."
              : orderDetails.status === "processing"
                ? "Your book report is being generated."
                : "Your book report is waiting to be processed."}
        </p>

        <div className="bg-gray-50 p-4 mb-8 rounded-md border border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Order Details</h3>

          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-500">Order ID:</span>
              <span className="font-medium text-gray-900">{orderDetails.id.substring(0, 8)}...</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">Book:</span>
              <span className="font-medium text-gray-900">{orderDetails.book_title}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">Author:</span>
              <span className="font-medium text-gray-900">{orderDetails.author}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">Delivery:</span>
              <span className="font-medium text-gray-900">
                {orderDetails.is_rush ? "Rush (1 hour)" : "Standard (24 hours)"}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">Email:</span>
              <span className="font-medium text-gray-900">{orderDetails.customer_email}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">Status:</span>
              <span
                className={`font-medium ${
                  orderDetails.status === "completed"
                    ? "text-green-600"
                    : orderDetails.status === "failed"
                      ? "text-red-600"
                      : orderDetails.status === "processing"
                        ? "text-blue-600"
                        : "text-yellow-600"
                }`}
              >
                {orderDetails.status.charAt(0).toUpperCase() + orderDetails.status.slice(1)}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-4 mb-8 rounded-md border border-gray-200">
          <div className="flex">
            <div className="flex-shrink-0">
              <Clock className="h-5 w-5 text-blue-500" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-gray-900">Delivery Time</h3>
              <div className="mt-2 text-sm text-gray-600">
                <p>
                  {orderDetails.is_rush
                    ? "Your rush book report will be delivered to your email within 1 hour."
                    : "Your book report will be delivered to your email within 24 hours."}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col space-y-4">
          {orderDetails.status === "pending" && (
            <button
              onClick={handleGenerateReport}
              disabled={processing}
              className="w-full flex justify-center items-center py-3 px-4 rounded-md text-base font-medium text-white bg-green-500 hover:bg-green-600 transition-colors disabled:opacity-50"
            >
              {processing && <RefreshCw className="h-4 w-4 mr-2 animate-spin" />}
              {processing ? "Generating Report..." : "Generate Report Now"}
            </button>
          )}

          {orderDetails.status === "failed" && (
            <button
              onClick={handleGenerateReport}
              disabled={processing}
              className="w-full flex justify-center items-center py-3 px-4 rounded-md text-base font-medium text-white bg-yellow-500 hover:bg-yellow-600 transition-colors disabled:opacity-50"
            >
              {processing && <RefreshCw className="h-4 w-4 mr-2 animate-spin" />}
              {processing ? "Retrying..." : "Retry Generation"}
            </button>
          )}

          <button
            onClick={() => router.push("/")}
            className="w-full flex justify-center py-3 px-4 rounded-md text-base font-medium text-white bg-blue-500 hover:bg-blue-600 transition-colors"
          >
            Return to Homepage
          </button>

          {orderDetails.status === "completed" && (
            <button
              onClick={() => router.push(`/view-report/${orderDetails.id}`)}
              className="w-full flex justify-center py-3 px-4 rounded-md text-base font-medium text-gray-900 bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              View Your Report
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
