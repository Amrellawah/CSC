'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { FiSun, FiMoon } from 'react-icons/fi'

export default function DarkModeToggle() {
  const [isDark, setIsDark] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDark(true)
      document.documentElement.classList.add('dark')
    } else {
      setIsDark(false)
      document.documentElement.classList.remove('dark')
    }
  }, [])

  const toggleDarkMode = () => {
    const newTheme = !isDark
    setIsDark(newTheme)
    
    if (newTheme) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }

  if (!mounted) {
    return null
  }

  return (
    <motion.button
      onClick={toggleDarkMode}
      className="relative w-14 h-7 rounded-full p-1 transition-colors duration-300"
      style={{
        backgroundColor: isDark ? '#3E2723' : '#EBE8E1',
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Toggle dark mode"
    >
      <motion.div
        className="absolute top-1 left-1 w-5 h-5 rounded-full flex items-center justify-center"
        style={{
          backgroundColor: isDark ? '#B87333' : '#2C2C2C',
        }}
        animate={{
          x: isDark ? 28 : 0,
        }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 30,
        }}
      >
        {isDark ? (
          <FiMoon size={12} style={{ color: '#F5F1EB' }} />
        ) : (
          <FiSun size={12} style={{ color: '#FAF8F3' }} />
        )}
      </motion.div>
    </motion.button>
  )
}
