"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { getReport, processOrder } from "../../../actions/report-actions"
import Navbar from "../../../components/Navbar"
import Footer from "../../../components/Footer"
import { AlertTriangle, Download, RefreshCw } from "lucide-react"

export default function ViewReportPage() {
  const params = useParams()
  const router = useRouter()
  const [report, setReport] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [processing, setProcessing] = useState(false)
  const [debugInfo, setDebugInfo] = useState<any>(null)

  const orderId = typeof params.id === "string" ? params.id : Array.isArray(params.id) ? params.id[0] : ""

  useEffect(() => {
    async function fetchReport() {
      if (!orderId) {
        setError("Invalid order ID")
        setLoading(false)
        return
      }

      try {
        console.log("Fetching report for order:", orderId)
        const result = await getReport(orderId)
        console.log("Report fetch result:", result)

        if (result.error) {
          setError(result.error)
        } else if (result.report) {
          setReport(result.report)
        }

        setLoading(false)
      } catch (err: any) {
        console.error("Error fetching report:", err)
        setError(err.message || "Failed to fetch report")
        setLoading(false)
      }
    }

    fetchReport()
  }, [orderId])

  const handleGenerateReport = async () => {
    setProcessing(true)
    setError("")
    setDebugInfo(null)

    try {
      console.log("Generating report for order:", orderId)
      const result = await processOrder(orderId)
      console.log("Report generation result:", result)

      if (result.success) {
        // Fetch the newly generated report
        const reportResult = await getReport(orderId)

        if (reportResult.error) {
          setError(reportResult.error)
        } else if (reportResult.report) {
          setReport(reportResult.report)
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

  const handleDownloadReport = () => {
    if (!report) return

    const element = document.createElement("a")
    const file = new Blob([report], { type: "text/plain" })
    element.href = URL.createObjectURL(file)
    element.download = `book-report-${orderId.substring(0, 8)}.txt`
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
            <p className="text-gray-600">Loading your report...</p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Book Report</h1>
            <div className="flex space-x-4">
              <button
                onClick={() => router.push("/dashboard")}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Back to Dashboard
              </button>

              {report && (
                <button
                  onClick={handleDownloadReport}
                  className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </button>
              )}
            </div>
          </div>

          {error ? (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
              <div className="flex flex-col items-center text-center">
                <div className="rounded-full bg-yellow-100 p-4 mb-4">
                  <AlertTriangle className="h-10 w-10 text-yellow-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Report Not Available</h2>
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
                  onClick={handleGenerateReport}
                  disabled={processing}
                  className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                >
                  {processing && <RefreshCw className="h-4 w-4 mr-2 animate-spin" />}
                  {processing ? "Generating Report..." : "Generate Report Now"}
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
              <div className="prose max-w-none">
                {report?.split("\n").map((paragraph, index) => (
                  <p key={index} className={paragraph.trim() === "" ? "my-4" : ""}>
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
