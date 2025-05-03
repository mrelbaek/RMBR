import Navbar from "../components/Navbar"
import Hero from "../components/Hero"
import PricingSection from "../components/PricingSection"
import FaqAccordion from "../components/FaqAccordion"
import Footer from "../components/Footer"
import BookReportForm from "../components/BookReportForm"
import HowItWorks from "../components/HowItWorks"

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <Hero />

      {/* Form Card - Moved up to be right after the hero */}
      <div className="py-16 px-8" id="order-form">
        <div className="max-w-3xl mx-auto">
          <BookReportForm />
        </div>
      </div>

      {/* How It Works - Now after the form */}
      <div id="how-it-works">
        <HowItWorks />
      </div>

      {/* Pricing Section */}
      <div id="pricing">
        <PricingSection />
      </div>

      {/* FAQ Section */}
      <FaqAccordion />

      {/* Footer */}
      <Footer />
    </div>
  )
}
