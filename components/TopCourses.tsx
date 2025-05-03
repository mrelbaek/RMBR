import CourseCard from "./CourseCard"
import Link from "next/link"

export default function TopCourses() {
  const courses = [
    {
      id: 1,
      title: "How to Write Perfect Book Reports: A Complete Guide",
      image: "/placeholder.svg?height=300&width=400",
      author: "Prof. Sarah Johnson",
      price: "$19.99",
      rating: 4.8,
      students: 1245,
      duration: "3h 20m",
    },
    {
      id: 2,
      title: "Literary Analysis Techniques for Students",
      image: "/placeholder.svg?height=300&width=400",
      author: "Dr. Michael Chen",
      price: "$24.99",
      rating: 4.7,
      students: 987,
      duration: "4h 15m",
    },
    {
      id: 3,
      title: "Understanding Classic Literature: Key Themes and Symbols",
      image: "/placeholder.svg?height=300&width=400",
      author: "Emma Rodriguez, PhD",
      price: "$18.99",
      rating: 4.9,
      students: 1532,
      duration: "5h 45m",
    },
    {
      id: 4,
      title: "Academic Writing: From Good to Great",
      image: "/placeholder.svg?height=300&width=400",
      author: "Prof. James Wilson",
      price: "$22.99",
      rating: 4.6,
      students: 876,
      duration: "4h 30m",
    },
  ]

  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Browse Our <span className="text-green-500">Top Courses</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {courses.map((course) => (
            <CourseCard key={course.id} {...course} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="#"
            className="px-6 py-3 bg-green-500 text-white font-medium rounded-full hover:bg-green-600 transition-colors inline-block"
          >
            View All Courses
          </Link>
        </div>
      </div>
    </div>
  )
}
