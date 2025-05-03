import Link from "next/link"

export default function CallToAction() {
  return (
    <div className="py-16 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-green-200 rounded-full opacity-50 -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-40 h-40 bg-blue-200 rounded-full opacity-50 translate-x-1/2 translate-y-1/2"></div>
      <div className="absolute top-1/2 right-10 w-16 h-16 bg-yellow-200 rounded-full opacity-50"></div>
      <div className="absolute bottom-10 left-1/4 w-24 h-24 bg-pink-200 rounded-full opacity-50"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="bg-green-50 rounded-2xl p-8 md:p-12 shadow-sm">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="heading-serif text-3xl font-bold mb-4">
              Start Learning Today and Make <span className="text-green-500">Real Income</span>
            </h2>
            <p className="text-gray-600 mb-8">
              Join thousands of students who are already benefiting from our custom book reports. Get started today and
              see the difference in your academic performance.
            </p>
            <Link
              href="#order-form"
              className="px-8 py-3 bg-green-500 text-white font-medium rounded-full hover:bg-green-600 transition-colors inline-block"
            >
              Get Started Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
