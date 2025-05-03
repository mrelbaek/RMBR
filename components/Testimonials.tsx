"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0)

  const testimonials = [
    {
      quote: "Saved me during finals week! Got my report in under an hour and it matched my writing style perfectly.",
      name: "Alex Johnson",
      title: "High School Senior",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      quote:
        "The report was exactly what I needed - well researched and at my college level. Really helped me understand the book better.",
      name: "Jamie Thompson",
      title: "College Freshman",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      quote:
        "I was skeptical at first, but the quality of the report exceeded my expectations. It helped me understand themes I had missed.",
      name: "Morgan Lee",
      title: "Middle School Student",
      image: "/placeholder.svg?height=100&width=100",
    },
  ]

  const nextTestimonial = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <div className="py-16" id="testimonials">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="heading-serif text-3xl font-bold text-center mb-2">
          Our <span className="text-green-500">Happy</span> Students Say About Us
        </h2>
        <p className="text-center text-gray-600 mb-12">Don't just take our word for it</p>

        <div className="relative max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="flex flex-col md:flex-row items-center">
              <div className="mb-6 md:mb-0 md:mr-8 flex-shrink-0">
                <div className="relative">
                  <div className="absolute -top-2 -left-2 w-full h-full bg-green-200 rounded-full"></div>
                  <img
                    src={testimonials[activeIndex].image || "/placeholder.svg"}
                    alt={testimonials[activeIndex].name}
                    className="w-24 h-24 rounded-full object-cover relative z-10"
                  />
                </div>
              </div>

              <div>
                <blockquote className="text-lg italic text-gray-700 mb-4">
                  "{testimonials[activeIndex].quote}"
                </blockquote>
                <div>
                  <p className="font-bold text-gray-900">{testimonials[activeIndex].name}</p>
                  <p className="text-gray-600 text-sm">{testimonials[activeIndex].title}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute top-1/2 -left-4 transform -translate-y-1/2">
            <button
              onClick={prevTestimonial}
              className="bg-white rounded-full p-2 shadow-md hover:bg-gray-50"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-5 w-5 text-gray-600" />
            </button>
          </div>

          <div className="absolute top-1/2 -right-4 transform -translate-y-1/2">
            <button
              onClick={nextTestimonial}
              className="bg-white rounded-full p-2 shadow-md hover:bg-gray-50"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-5 w-5 text-gray-600" />
            </button>
          </div>

          <div className="flex justify-center mt-6 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`h-2 w-2 rounded-full ${index === activeIndex ? "bg-green-500" : "bg-gray-300"}`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
