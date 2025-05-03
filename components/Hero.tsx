import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function Hero() {
  return (
    <div className="py-16 px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 leading-tight">
              AI-Powered
              <br />
              Book Reports
              <br />
              In Hours
            </h1>
            <p className="mt-6 text-lg text-gray-600 max-w-md">
              A service where AI insights shape academic success, offering the help students need in their pursuit of
              better grades.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="#order-form"
                className="px-8 py-3 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600 transition-colors flex items-center justify-center"
              >
                Get Started
              </Link>
              <Link
                href="#how-it-works"
                className="px-8 py-3 flex items-center justify-center text-gray-700 hover:text-blue-500"
              >
                How We Work <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="relative">
            <img
              src="/placeholder.svg?height=400&width=500"
              alt="Students working on book reports"
              className="w-full h-auto rounded-lg"
            />
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="bg-gray-900 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Custom Book Reports</h3>
            <p className="text-gray-600">
              Get custom-written book reports tailored to your education level, with optional writing style matching for
              authenticity.
            </p>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="bg-gray-900 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Fast Delivery</h3>
            <p className="text-gray-600">
              Choose between standard (24 hours) or rush (1 hour) delivery options to meet your deadline requirements.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
