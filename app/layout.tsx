import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "../contexts/AuthContext"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "RushMyBookReport - AI-Powered Book Reports",
  description:
    "Get your custom book report in as little as 1 hour. AI-generated reports tailored to your education level.",
  keywords: ["book report", "AI book report", "student help", "rush book report", "homework help"],
  authors: [{ name: "RushMyBookReport Team" }],
  openGraph: {
    title: "RushMyBookReport - AI-Powered Book Reports",
    description:
      "Get your custom book report in as little as 1 hour. AI-generated reports tailored to your education level.",
    url: "https://rushmybookreport.com",
    siteName: "RushMyBookReport",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "RushMyBookReport",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "RushMyBookReport - AI-Powered Book Reports",
    description:
      "Get your custom book report in as little as 1 hour. AI-generated reports tailored to your education level.",
    images: ["/og-image.png"],
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased">
        <AuthProvider>
          <div className="max-w-7xl mx-auto p-4 md:p-8">
            <div className="container-frame">{children}</div>
          </div>
        </AuthProvider>
      </body>
    </html>
  )
}
