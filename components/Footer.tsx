import type React from "react"
import Link from "next/link"
import { Facebook, Twitter, Instagram } from "lucide-react"

export default function Footer() {
  return (
    <footer className="py-12 px-8 border-t border-gray-100">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold tracking-tight text-gray-900">📚 RushMyBookReport</span>
            </Link>
            <p className="mt-4 text-gray-600 text-sm">Providing students with high-quality book reports since 2024.</p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Links</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <FooterLink href="#how-it-works">How It Works</FooterLink>
              </li>
              <li>
                <FooterLink href="#pricing">Pricing</FooterLink>
              </li>
              <li>
                <FooterLink href="#faq">FAQ</FooterLink>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Legal</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <FooterLink href="/terms">Terms of Service</FooterLink>
              </li>
              <li>
                <FooterLink href="/privacy">Privacy Policy</FooterLink>
              </li>
              <li>
                <FooterLink href="/academic-integrity">Academic Integrity</FooterLink>
              </li>
              <li>
                <FooterLink href="/refund-policy">Refund Policy</FooterLink>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Contact</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="mailto:info@rushmybookreport.com" className="text-gray-600 hover:text-blue-500">
                  info@rushmybookreport.com
                </a>
              </li>
            </ul>

            <div className="mt-8 flex space-x-6">
              <SocialLink href="#" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </SocialLink>
              <SocialLink href="#" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
              </SocialLink>
              <SocialLink href="#" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </SocialLink>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">© {new Date().getFullYear()} RushMyBookReport. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

function SocialLink({ href, children, ...props }: React.ComponentPropsWithoutRef<"a">) {
  return (
    <a
      href={href}
      className="text-gray-400 hover:text-blue-500 transition-colors"
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    >
      {children}
    </a>
  )
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="text-gray-600 hover:text-blue-500 transition-colors">
      {children}
    </Link>
  )
}
