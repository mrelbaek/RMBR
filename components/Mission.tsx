export default function Mission() {
  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="heading-serif text-3xl font-bold mb-4">
              Our <span className="text-green-500">Mission</span> Behind This Platform
            </h2>
            <p className="text-gray-600 mb-6">
              We believe every student deserves access to high-quality educational resources that help them succeed. Our
              AI-powered book report platform is designed to provide insightful analysis and save valuable time.
            </p>
            <p className="text-gray-600 mb-6">
              Whether you're struggling with a difficult text or simply need a reference point to develop your own
              ideas, our custom book reports give you the foundation you need to excel in your academic journey.
            </p>
            <div className="flex items-center space-x-2">
              <span className="h-1 w-12 bg-green-500 rounded-full"></span>
              <span className="text-green-500 font-medium">Learn more about our values</span>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-green-200 rounded-full"></div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-blue-200 rounded-full"></div>
            <div className="relative bg-white p-2 rounded-2xl shadow-lg">
              <img
                src="/placeholder.svg?height=400&width=500"
                alt="Student using our platform"
                className="w-full h-auto rounded-xl"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
