'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { FiLock, FiUser, FiArrowRight } from 'react-icons/fi'
import Link from 'next/link'

export default function AdminLogin() {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })

      const data = await response.json()

      if (response.ok) {
        router.push('/admin/dashboard')
        router.refresh()
      } else {
        setError(data.error || 'Login failed')
      }
    } catch (err) {
      setError('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-luxury-cream dark:bg-luxury-darkBg px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <div className="bg-white dark:bg-luxury-darkSecondary rounded-lg shadow-2xl border border-luxury-copper/20 p-8 md:p-10">
          {/* Logo/Brand */}
          <div className="text-center mb-8">
            <Link href="/" className="inline-block">
              <img
                src="/Logo.jpeg"
                alt="CSC Logo"
                className="h-12 mx-auto mb-4 dark:hidden"
              />
              <img
                src="/darkmodeLogo.png"
                alt="CSC Logo"
                className="h-12 mx-auto mb-4 hidden dark:block"
              />
            </Link>
            <h1 className="luxury-heading text-3xl md:text-4xl text-luxury-charcoal dark:text-luxury-darkText">
              Admin <span className="text-luxury-copper">Login</span>
            </h1>
            <p className="text-luxury-textLight dark:text-luxury-darkTextSecondary mt-2">
              Access the admin panel
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 px-4 py-3 rounded-lg text-sm"
              >
                {error}
              </motion.div>
            )}

            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-luxury-charcoal dark:text-luxury-darkText mb-2"
              >
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiUser className="text-luxury-copper" />
                </div>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="block w-full pl-10 pr-3 py-3 border border-luxury-charcoal/20 dark:border-luxury-copper/20 rounded-lg bg-white dark:bg-luxury-darkBg text-luxury-charcoal dark:text-luxury-darkText focus:ring-2 focus:ring-luxury-copper focus:border-luxury-copper transition-colors"
                  placeholder="Enter your username"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-luxury-charcoal dark:text-luxury-darkText mb-2"
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiLock className="text-luxury-copper" />
                </div>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="block w-full pl-10 pr-3 py-3 border border-luxury-charcoal/20 dark:border-luxury-copper/20 rounded-lg bg-white dark:bg-luxury-darkBg text-luxury-charcoal dark:text-luxury-darkText focus:ring-2 focus:ring-luxury-copper focus:border-luxury-copper transition-colors"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full luxury-button flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                'Logging in...'
              ) : (
                <>
                  Login
                  <FiArrowRight />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link
              href="/"
              className="text-sm text-luxury-copper hover:text-luxury-copper/80 transition-colors"
            >
              ← Back to website
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  )
}



