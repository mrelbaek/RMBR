export default function Stats() {
  const stats = [
    { value: "500+", label: "Books Covered" },
    { value: "450+", label: "Happy Students" },
    { value: "2.5M+", label: "Words Written" },
    { value: "100%", label: "Satisfaction" },
  ]

  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <div key={index} className="p-6">
              <p className="text-4xl font-bold text-green-500">{stat.value}</p>
              <p className="mt-2 text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
