import Link from "next/link"
import { Clock, Users, Star } from "lucide-react"

interface CourseCardProps {
  title: string
  image: string
  author: string
  price: string
  rating: number
  students: number
  duration: string
}

export default function CourseCard({ title, image, author, price, rating, students, duration }: CourseCardProps) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
      <div className="relative">
        <img src={image || "/placeholder.svg"} alt={title} className="w-full h-48 object-cover" />
      </div>
      <div className="p-5">
        <h3 className="font-bold text-lg mb-2 line-clamp-2">{title}</h3>
        <p className="text-gray-600 text-sm mb-3">{author}</p>

        <div className="flex items-center text-sm text-gray-500 mb-3">
          <div className="flex items-center mr-3">
            <Star className="h-4 w-4 text-yellow-400 mr-1 fill-current" />
            <span>{rating.toFixed(1)}</span>
          </div>
          <div className="flex items-center mr-3">
            <Users className="h-4 w-4 mr-1" />
            <span>{students}</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            <span>{duration}</span>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <span className="font-bold text-green-600">{price}</span>
          <Link
            href="#"
            className="text-xs px-3 py-1 bg-green-100 text-green-700 rounded-full hover:bg-green-200 transition-colors"
          >
            Learn More
          </Link>
        </div>
      </div>
    </div>
  )
}
