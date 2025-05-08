"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { trackEvent } from "../lib/analytics"
import { Check } from "lucide-react"
import { createOrder } from "../actions/order-actions"

interface FormData {
  bookTitle: string
  author: string
  educationLevel: string
  wordCount: number
  deliveryOption: "standard" | "rush"
  writingSample: string
  authenticStyle: boolean
  targetGrade: string
  email: string
}

export default function BookReportForm() {
  const router = useRouter()
  const [formData, setFormData] = useState<FormData>({
    bookTitle: "",
    author: "",
    educationLevel: "high-school",
    wordCount: 1000,
    deliveryOption: "standard",
    writingSample: "",
    authenticStyle: false,
    targetGrade: "A",
    email: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [debugInfo, setDebugInfo] = useState<any>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    const checked = type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setDebugInfo(null)

    // Validate form data
    if (!formData.bookTitle.trim()) {
      setError("Book title is required")
      setLoading(false)
      return
    }

    if (!formData.author.trim()) {
      setError("Author name is required")
      setLoading(false)
      return
    }

    if (!formData.email.trim()) {
      setError("Email address is required")
      setLoading(false)
      return
    }

    // Track form submission
    trackEvent("form_submit", {
      bookTitle: formData.bookTitle,
      educationLevel: formData.educationLevel,
      deliveryOption: formData.deliveryOption,
    })

    try {
      console.log("Submitting form data:", {
        customer_email: formData.email,
        book_title: formData.bookTitle,
        author: formData.author,
        grade_level: formData.educationLevel,
        length: formData.wordCount,
        is_rush: formData.deliveryOption === "rush",
        sample_text: formData.writingSample || undefined,
      })

      // Create order in Supabase
      const result = await createOrder({
        customer_email: formData.email,
        book_title: formData.bookTitle,
        author: formData.author,
        grade_level: formData.educationLevel,
        length: formData.wordCount,
        is_rush: formData.deliveryOption === "rush",
        sample_text: formData.writingSample || undefined,
      })

      console.log("Order creation result:", result)

      if (!result.success) {
        setDebugInfo(result)
        throw new Error(result.error || "Failed to create order")
      }

      // Redirect to success page with the session ID
      router.push(`/success?session_id=${result.sessionId}`)
    } catch (err: any) {
      console.error("Form submission error:", err)
      setError(err.message || "Failed to submit your order. Please try again.")
      trackEvent("form_error", { error: "submission_failed" })
    } finally {
      setLoading(false)
    }
  }

  const calculatePrice = () => {
    // Base price
    let price = formData.deliveryOption === "rush" ? 22.99 : 14.99

    // Additional cost for longer reports
    if (formData.wordCount > 1500) {
      price += 5
    }
    if (formData.wordCount > 2500) {
      price += 5
    }

    return price.toFixed(2)
  }

  const estimatedDelivery = () => {
    const now = new Date()
    const deliveryTime = formData.deliveryOption === "rush" ? 1 : 24 // hours
    const deliveryDate = new Date(now.getTime() + deliveryTime * 60 * 60 * 1000)

    return deliveryDate.toLocaleString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6" id="order-form">
      <h3 className="text-2xl font-bold mb-6 text-gray-900">Get Your Book Report Now</h3>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-md">
            <p className="text-sm text-red-700">{error}</p>
            {debugInfo && (
              <details className="mt-2">
                <summary className="text-xs text-red-500 cursor-pointer">Debug Info</summary>
                <pre className="mt-2 text-xs bg-gray-100 p-2 rounded overflow-auto">
                  {JSON.stringify(debugInfo, null, 2)}
                </pre>
              </details>
            )}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label htmlFor="bookTitle" className="block text-sm font-medium text-gray-700 mb-1">
              Book Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="bookTitle"
              name="bookTitle"
              required
              value={formData.bookTitle}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g. To Kill a Mockingbird"
            />
          </div>

          <div>
            <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-1">
              Author <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="author"
              name="author"
              required
              value={formData.author}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g. Harper Lee"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="educationLevel" className="block text-sm font-medium text-gray-700 mb-1">
                Education Level <span className="text-red-500">*</span>
              </label>
              <select
                id="educationLevel"
                name="educationLevel"
                required
                value={formData.educationLevel}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="elementary-school">Elementary School</option>
                <option value="middle-school">Middle School</option>
                <option value="high-school">High School</option>
                <option value="college">College/University</option>
              </select>
            </div>

            <div>
              <label htmlFor="wordCount" className="block text-sm font-medium text-gray-700 mb-1">
                Word Count <span className="text-red-500">*</span>
              </label>
              <select
                id="wordCount"
                name="wordCount"
                required
                value={formData.wordCount}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value={500}>500 words</option>
                <option value={1000}>1000 words</option>
                <option value={1500}>1500 words</option>
                <option value={2000}>2000 words</option>
                <option value={2500}>2500 words</option>
                <option value={3000}>3000 words</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Delivery Option <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div
                className={`border rounded-md p-4 flex items-center cursor-pointer ${
                  formData.deliveryOption === "standard"
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    deliveryOption: "standard",
                  }))
                }
              >
                <div
                  className={`w-5 h-5 rounded-full border ${formData.deliveryOption === "standard" ? "border-blue-500 bg-blue-500 flex items-center justify-center" : "border-gray-300"}`}
                >
                  {formData.deliveryOption === "standard" && <Check className="h-3 w-3 text-white" />}
                </div>
                <div className="ml-3">
                  <span className="block text-gray-900 font-medium">Standard</span>
                  <span className="block text-xs text-gray-500">24 hours - $14.99</span>
                </div>
              </div>

              <div
                className={`border rounded-md p-4 flex items-center cursor-pointer ${
                  formData.deliveryOption === "rush"
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    deliveryOption: "rush",
                  }))
                }
              >
                <div
                  className={`w-5 h-5 rounded-full border ${formData.deliveryOption === "rush" ? "border-blue-500 bg-blue-500 flex items-center justify-center" : "border-gray-300"}`}
                >
                  {formData.deliveryOption === "rush" && <Check className="h-3 w-3 text-white" />}
                </div>
                <div className="ml-3">
                  <span className="block text-gray-900 font-medium">Rush</span>
                  <span className="block text-xs text-gray-500">1 hour - $22.99</span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="writingSample" className="block text-sm font-medium text-gray-700 mb-1">
              Your Writing Sample (Optional)
            </label>
            <textarea
              id="writingSample"
              name="writingSample"
              rows={3}
              value={formData.writingSample}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Paste a sample of your writing to match the style"
            ></textarea>
            <p className="mt-1 text-xs text-gray-500">
              This helps our AI match your writing style for a more authentic report.
            </p>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="authenticStyle"
              name="authenticStyle"
              checked={formData.authenticStyle}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="authenticStyle" className="ml-2 block text-sm text-gray-700">
              Include authentic style (occasional errors for realism)
            </label>
          </div>

          <div>
            <label htmlFor="targetGrade" className="block text-sm font-medium text-gray-700 mb-1">
              Target Grade (Optional)
            </label>
            <select
              id="targetGrade"
              name="targetGrade"
              value={formData.targetGrade}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="A+">A+ (Exceptional)</option>
              <option value="A">A (Excellent)</option>
              <option value="B+">B+ (Very Good)</option>
              <option value="B">B (Good)</option>
              <option value="C+">C+ (Satisfactory)</option>
              <option value="C">C (Adequate)</option>
            </select>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="your@email.com"
            />
            <p className="mt-1 text-xs text-gray-500">We'll send your report to this email address.</p>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-md">
          <div className="flex justify-between items-center">
            <span className="text-gray-700">Price:</span>
            <span className="font-bold text-lg text-gray-900">${calculatePrice()}</span>
          </div>
          <div className="flex justify-between items-center text-sm text-gray-600">
            <span>Estimated delivery:</span>
            <span>{estimatedDelivery()}</span>
          </div>
        </div>

        <div>
          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Processing...
              </>
            ) : (
              "Order Now"
            )}
          </button>
        </div>

        <p className="text-xs text-gray-500 text-center">
          By clicking "Order Now", you agree to our{" "}
          <a href="/terms" className="text-blue-600 hover:underline">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="/privacy" className="text-blue-600 hover:underline">
            Privacy Policy
          </a>
          .
        </p>
      </form>
    </div>
  )
}
