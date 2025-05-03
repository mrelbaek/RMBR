"use client"

import { useSearchParams } from "next/navigation"
import OrderStatus from "../../components/OrderStatus"
import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"

export default function SuccessPage() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get("session_id")

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <Navbar />

      <main className="py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="max-w-md w-full">
          <OrderStatus sessionId={sessionId || ""} />
        </div>
      </main>

      <Footer />
    </div>
  )
}
