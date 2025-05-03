export default function Instructors() {
  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="heading-serif text-3xl font-bold text-center mb-4">
          Education Which Promotes <span className="text-green-500">Skill</span>
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Our platform is powered by expert educators and advanced AI to deliver the highest quality book reports
        </p>

        <div className="relative">
          {/* Instructor bubbles */}
          <div className="flex flex-wrap justify-center gap-4">
            <div className="bg-blue-100 rounded-full px-6 py-3 text-blue-800 font-medium">45K+ Instructor</div>
            <div className="bg-green-100 rounded-full px-6 py-3 text-green-800 font-medium">2.5M Courses</div>
            <div className="bg-pink-100 rounded-full px-6 py-3 text-pink-800 font-medium">English Teacher</div>
            <div className="bg-purple-100 rounded-full px-6 py-3 text-purple-800 font-medium">Literature Expert</div>
            <div className="bg-yellow-100 rounded-full px-6 py-3 text-yellow-800 font-medium">PhD Professors</div>
            <div className="bg-red-100 rounded-full px-6 py-3 text-red-800 font-medium">Academic Writers</div>
            <div className="bg-indigo-100 rounded-full px-6 py-3 text-indigo-800 font-medium">Research Specialists</div>
            <div className="bg-teal-100 rounded-full px-6 py-3 text-teal-800 font-medium">Content Creators</div>
          </div>

          {/* Decorative elements */}
          <div className="absolute top-0 left-10 w-8 h-8 bg-blue-200 rounded-full"></div>
          <div className="absolute bottom-0 right-10 w-12 h-12 bg-green-200 rounded-full"></div>
          <div className="absolute top-1/2 right-0 w-6 h-6 bg-pink-200 rounded-full"></div>
          <div className="absolute bottom-1/4 left-1/4 w-10 h-10 bg-yellow-200 rounded-full"></div>
        </div>

        <div className="mt-12 text-center">
          <button className="px-6 py-3 bg-green-500 text-white font-medium rounded-full hover:bg-green-600 transition-colors">
            Join Our Team
          </button>
        </div>
      </div>
    </div>
  )
}
