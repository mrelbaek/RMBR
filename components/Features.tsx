import { Laptop, Clock, BookOpen } from "lucide-react"

export default function Features() {
  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1">
            <div className="relative">
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-pink-200 rounded-full"></div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-yellow-200 rounded-full"></div>
              <div className="relative bg-white p-2 rounded-2xl shadow-lg">
                <img
                  src="/placeholder.svg?height=400&width=500"
                  alt="Student using laptop"
                  className="w-full h-auto rounded-xl"
                />
              </div>
            </div>
          </div>

          <div className="order-1 md:order-2">
            <h2 className="heading-serif text-3xl font-bold mb-6">
              One Ultimate Study App For Every Class, Every Test
            </h2>
            <p className="text-gray-600 mb-8">
              Our platform is designed to help students of all levels excel in their studies with AI-powered book
              reports tailored to their specific needs.
            </p>

            <div className="space-y-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-full bg-green-100 text-green-600">
                    <BookOpen className="h-6 w-6" />
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium">Custom Book Reports</h3>
                  <p className="mt-1 text-gray-600">
                    AI-generated reports tailored to your education level and writing style.
                  </p>
                </div>
              </div>

              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 text-blue-600">
                    <Clock className="h-6 w-6" />
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium">Fast Delivery</h3>
                  <p className="mt-1 text-gray-600">Get your report in as little as 1 hour with our rush service.</p>
                </div>
              </div>

              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-full bg-purple-100 text-purple-600">
                    <Laptop className="h-6 w-6" />
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium">Available Everywhere</h3>
                  <p className="mt-1 text-gray-600">Access our platform from any device, anytime, anywhere.</p>
                </div>
              </div>
            </div>

            <div className="mt-8 flex space-x-4">
              <img src="/placeholder.svg?height=40&width=120" alt="App Store" className="h-10" />
              <img src="/placeholder.svg?height=40&width=120" alt="Google Play" className="h-10" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
