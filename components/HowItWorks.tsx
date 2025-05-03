import { BookOpen, Clock, FileText, Mail } from "lucide-react"

export default function HowItWorks() {
  const steps = [
    {
      icon: <BookOpen className="h-6 w-6 text-white" />,
      title: "Enter Book Details",
      description: "Tell us the book title, author, and your education level.",
    },
    {
      icon: <Clock className="h-6 w-6 text-white" />,
      title: "Choose Delivery Time",
      description: "Select standard (24 hours) or rush (1 hour) delivery.",
    },
    {
      icon: <FileText className="h-6 w-6 text-white" />,
      title: "We Generate Your Report",
      description: "Our AI creates a custom book report matching your requirements.",
    },
    {
      icon: <Mail className="h-6 w-6 text-white" />,
      title: "Receive Your Report",
      description: "Get your completed book report delivered to your email.",
    },
  ]

  return (
    <div className="py-16 px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <div key={i} className="bg-white p-6 rounded-lg shadow-sm">
              <div className="bg-gray-900 w-12 h-12 rounded-lg flex items-center justify-center mb-4">{step.icon}</div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
