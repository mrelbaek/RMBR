import { Check } from "lucide-react"
import Link from "next/link"

export default function PricingSection() {
  const plans = [
    {
      name: "Standard",
      price: "$14.99",
      description: "Perfect for regular assignments",
      features: [
        "Delivery within 24 hours",
        "Custom-written book report",
        "Tailored to your education level",
        "Optional writing style matching",
        "Satisfaction guarantee",
      ],
      highlight: false,
      buttonText: "Choose Standard",
    },
    {
      name: "Rush",
      price: "$22.99",
      description: "For urgent deadlines",
      features: [
        "Delivery within 1 hour",
        "Custom-written book report",
        "Tailored to your education level",
        "Optional writing style matching",
        "Satisfaction guarantee",
        "Priority processing",
      ],
      highlight: true,
      buttonText: "Choose Rush",
    },
  ]

  return (
    <div className="py-16 px-8" id="pricing">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-4 text-gray-900">Pricing</h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Choose the plan that fits your deadline. Both options provide the same high-quality book reports.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan, i) => (
            <div
              key={i}
              className={`bg-white rounded-lg shadow-sm overflow-hidden border ${
                plan.highlight ? "border-blue-500" : "border-gray-200"
              }`}
            >
              {plan.highlight && (
                <div className="bg-blue-500 text-white text-center py-1.5 text-sm font-medium">Most Popular</div>
              )}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
                <div className="mt-4 flex items-baseline">
                  <span className="text-3xl font-bold text-gray-900">{plan.price}</span>
                  <span className="ml-1 text-gray-500">/report</span>
                </div>
                <p className="mt-2 text-gray-600">{plan.description}</p>

                <ul className="mt-6 space-y-4">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-start">
                      <div className="flex-shrink-0">
                        <Check className="h-5 w-5 text-blue-500" />
                      </div>
                      <p className="ml-3 text-gray-600">{feature}</p>
                    </li>
                  ))}
                </ul>

                <Link
                  href="#order-form"
                  className={`mt-8 block w-full py-3 px-4 rounded-md text-center font-medium ${
                    plan.highlight
                      ? "bg-blue-500 text-white hover:bg-blue-600"
                      : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                  } transition-colors`}
                >
                  {plan.buttonText}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
