'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { FiMenu, FiX } from 'react-icons/fi'
import DarkModeToggle from './DarkModeToggle'

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'Contact', href: '/contact' },
  ]

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-30 transition-all duration-300 ${
          isScrolled
            ? 'bg-luxury-cream/95 dark:bg-luxury-darkBg/95 backdrop-blur-md border-b border-luxury-charcoal/10 dark:border-luxury-copper/20'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 md:-ml-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-3"
              >
                <img
                  src="/Logo.jpeg"
                  alt="Creative Sparking Contracting"
                  className="h-12 w-auto object-contain dark:hidden transition-opacity duration-300"
                />
                <img
                  src="/darkmodeLogo.png"
                  alt="Creative Sparking Contracting Dark Logo"
                  className="h-12 w-auto object-contain hidden dark:block transition-opacity duration-300"
                />
                <span className="luxury-heading text-2xl text-luxury-copper hidden sm:block">
                  CSC
                </span>
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative text-sm font-medium uppercase tracking-wider transition-colors duration-300 ${
                    pathname === item.href
                      ? 'text-luxury-copper'
                      : 'text-luxury-charcoal dark:text-luxury-darkText hover:text-luxury-copper'
                  }`}
                >
                  {item.name}
                  {pathname === item.href && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-luxury-copper"
                    />
                  )}
                </Link>
              ))}
              <DarkModeToggle />
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-4 md:hidden">
              <DarkModeToggle />
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-luxury-charcoal dark:text-luxury-darkText hover:text-luxury-copper transition-colors"
              >
              {isMobileMenuOpen ? (
                <FiX size={28} />
              ) : (
                <FiMenu size={28} />
              )}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 left-0 right-0 z-30 bg-luxury-cream/98 dark:bg-luxury-darkBg/98 backdrop-blur-md border-b border-luxury-charcoal/10 dark:border-luxury-copper/20 md:hidden"
          >
            <div className="flex flex-col py-6 px-6 space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-lg font-medium uppercase tracking-wider transition-colors duration-300 ${
                    pathname === item.href
                      ? 'text-luxury-copper'
                      : 'text-luxury-charcoal dark:text-luxury-darkText hover:text-luxury-copper'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

