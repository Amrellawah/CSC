'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion'

const messages = [
  'Discover CSC',
  'Crafting Timeless Spaces',
  'Request a Quote',
]

export default function CustomCursor() {
  const [isDesktop, setIsDesktop] = useState(false)
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0)
  const [isHovering, setIsHovering] = useState(false)

  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  const messageX = useMotionValue(-100)
  const messageY = useMotionValue(-100)

  const springConfig = { damping: 25, stiffness: 700 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)
  const messageXSpring = useSpring(messageX, springConfig)
  const messageYSpring = useSpring(messageY, springConfig)

  useEffect(() => {
    // Check if device is desktop (has mouse and is not a touch device)
    const checkIsDesktop = () => {
      const hasMouse = window.matchMedia('(pointer: fine)').matches
      const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0
      const isLargeScreen = window.innerWidth >= 1024
      return hasMouse && !hasTouch && isLargeScreen
    }

    const desktopStatus = checkIsDesktop()
    setIsDesktop(desktopStatus)

    const handleResize = () => {
      setIsDesktop(checkIsDesktop())
    }

    window.addEventListener('resize', handleResize)

    // Only set up cursor functionality on desktop
    if (!desktopStatus) {
      return () => {
        window.removeEventListener('resize', handleResize)
      }
    }

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16)
      cursorY.set(e.clientY - 16)
      messageX.set(e.clientX + 30)
      messageY.set(e.clientY + 30)
    }

    const handleMouseMove = (e: MouseEvent) => {
      moveCursor(e)
    }

    window.addEventListener('mousemove', handleMouseMove)

    // Rotate messages every 3 seconds
    const messageInterval = setInterval(() => {
      setCurrentMessageIndex((prev) => (prev + 1) % messages.length)
    }, 3000)

    // Detect hover on interactive elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button')
      ) {
        setIsHovering(true)
      } else {
        setIsHovering(false)
      }
    }

    const handleMouseOut = () => {
      setIsHovering(false)
    }

    document.addEventListener('mouseover', handleMouseOver)
    document.addEventListener('mouseout', handleMouseOut)

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseout', handleMouseOut)
      clearInterval(messageInterval)
    }
  }, [cursorX, cursorY, messageX, messageY])

  // Don't render on mobile/tablet devices
  if (!isDesktop) {
    return null
  }

  return (
    <>
      {/* Main cursor circle */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border-2 border-luxury-copper rounded-full pointer-events-none z-50 mix-blend-difference dark:border-luxury-copper"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
      />

      {/* Message follower */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-40"
        style={{
          x: messageXSpring,
          y: messageYSpring,
        }}
        animate={{
          opacity: isHovering ? 0 : 1,
          scale: isHovering ? 0.8 : 1,
        }}
        transition={{
          opacity: { duration: 0.2 },
          scale: { duration: 0.2 },
        }}
      >
        <div className="relative">
          <div className="absolute inset-0 bg-luxury-copper blur-2xl opacity-30" />
          <div className="relative bg-luxury-lightGray dark:bg-luxury-darkCard px-4 py-2 rounded-lg border border-luxury-copper/30">
            <AnimatePresence mode="wait">
              <motion.p
                key={currentMessageIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="text-luxury-copper text-sm font-medium whitespace-nowrap"
              >
                {messages[currentMessageIndex]}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </>
  )
}
