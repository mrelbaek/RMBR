"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { useAuth } from "../contexts/AuthContext"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user, logout } = useAuth()

  return (
    <nav className="py-6 px-8 border-b border-gray-100">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-xl font-bold tracking-tight text-gray-900">📚 RushMyBookReport</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink href="#how-it-works">How It Works</NavLink>
            <NavLink href="#pricing">Pricing</NavLink>
            <NavLink href="#faq">FAQ</NavLink>
            <NavLink href="/contact">Contact</NavLink>

            {user ? (
              <div className="flex items-center space-x-4">
                <NavLink href="/dashboard">Dashboard</NavLink>
                <button
                  onClick={logout}
                  className="px-4 py-2 rounded-md bg-gray-100 text-gray-800 hover:bg-gray-200 transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="px-5 py-2 rounded-md bg-gray-900 text-white hover:bg-gray-800 transition-colors"
              >
                Sign up
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-blue-500 focus:outline-none"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 right-0 bg-white mt-2 py-4 px-4 z-50 shadow-lg">
          <div className="flex flex-col space-y-4">
            <MobileNavLink href="#how-it-works" onClick={() => setIsMenuOpen(false)}>
              How It Works
            </MobileNavLink>
            <MobileNavLink href="#pricing" onClick={() => setIsMenuOpen(false)}>
              Pricing
            </MobileNavLink>
            <MobileNavLink href="#faq" onClick={() => setIsMenuOpen(false)}>
              FAQ
            </MobileNavLink>
            <MobileNavLink href="/contact" onClick={() => setIsMenuOpen(false)}>
              Contact
            </MobileNavLink>

            {user ? (
              <>
                <MobileNavLink href="/dashboard" onClick={() => setIsMenuOpen(false)}>
                  Dashboard
                </MobileNavLink>
                <button
                  onClick={() => {
                    logout()
                    setIsMenuOpen(false)
                  }}
                  className="text-left py-2 text-gray-700 hover:text-blue-500"
                >
                  Logout
                </button>
              </>
            ) : (
              <MobileNavLink href="/login" onClick={() => setIsMenuOpen(false)}>
                Login
              </MobileNavLink>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="text-gray-700 hover:text-blue-500 transition-colors">
      {children}
    </Link>
  )
}

function MobileNavLink({ href, children, onClick }: { href: string; children: React.ReactNode; onClick: () => void }) {
  return (
    <Link href={href} onClick={onClick} className="text-gray-700 hover:text-blue-500 py-2">
      {children}
    </Link>
  )
}
