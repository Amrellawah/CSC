'use client'

import { useState, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { FiHome, FiBriefcase, FiLogOut, FiMenu, FiX } from 'react-icons/fi'

export default function AdminNav() {
  const pathname = usePathname()
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
      router.push('/admin/login')
      router.refresh()
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  const navItems = [
    { href: '/admin/dashboard', label: 'Dashboard', icon: FiHome },
    { href: '/admin/projects', label: 'Projects', icon: FiBriefcase },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-luxury-cream/95 dark:bg-luxury-darkBg/95 backdrop-blur-md border-b border-luxury-charcoal/10 dark:border-luxury-copper/20">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-20">
          <Link href="/admin/dashboard" className="flex items-center space-x-3">
            <img
              src="/Logo.jpeg"
              alt="CSC Logo"
              className="h-10 w-auto object-contain dark:hidden"
            />
            <img
              src="/darkmodeLogo.png"
              alt="CSC Logo"
              className="h-10 w-auto object-contain hidden dark:block"
            />
            <span className="luxury-heading text-xl text-luxury-copper hidden sm:block">
              Admin Panel
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-luxury-copper text-luxury-cream dark:text-luxury-darkText'
                      : 'text-luxury-charcoal dark:text-luxury-darkTextSecondary hover:bg-luxury-beige dark:hover:bg-luxury-darkSecondary'
                  }`}
                >
                  <Icon className="text-lg" />
                  {item.label}
                </Link>
              )
            })}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-luxury-charcoal dark:text-luxury-darkTextSecondary hover:bg-luxury-beige dark:hover:bg-luxury-darkSecondary transition-colors"
            >
              <FiLogOut className="text-lg" />
              Logout
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-luxury-charcoal dark:text-luxury-darkText"
          >
            {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden border-t border-luxury-charcoal/10 dark:border-luxury-copper/20 bg-luxury-cream dark:bg-luxury-darkBg"
        >
          <div className="px-6 py-4 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-2 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-luxury-copper text-luxury-cream dark:text-luxury-darkText'
                      : 'text-luxury-charcoal dark:text-luxury-darkTextSecondary hover:bg-luxury-beige dark:hover:bg-luxury-darkSecondary'
                  }`}
                >
                  <Icon className="text-lg" />
                  {item.label}
                </Link>
              )
            })}
            <button
              onClick={() => {
                handleLogout()
                setMobileMenuOpen(false)
              }}
              className="w-full flex items-center gap-2 px-4 py-3 rounded-lg text-luxury-charcoal dark:text-luxury-darkTextSecondary hover:bg-luxury-beige dark:hover:bg-luxury-darkSecondary transition-colors"
            >
              <FiLogOut className="text-lg" />
              Logout
            </button>
          </div>
        </motion.div>
      )}
    </nav>
  )
}



