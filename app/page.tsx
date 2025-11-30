'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { FiArrowRight, FiHome, FiTool, FiBox, FiSliders, FiChevronLeft, FiChevronRight } from 'react-icons/fi'

// Animated Counter Component
function AnimatedCounter({ value, duration = 2000 }: { value: string; duration?: number }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView) return

    // Extract number from value (e.g., "500+" -> 500)
    const numericValue = parseInt(value.replace(/\D/g, ''))
    if (isNaN(numericValue)) {
      setCount(0)
      return
    }

    const startTime = Date.now()
    const startValue = 0

    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      const currentCount = Math.floor(startValue + (numericValue - startValue) * easeOutQuart)

      setCount(currentCount)

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        setCount(numericValue)
      }
    }

    animate()
  }, [isInView, value, duration])

  // Check if value contains special characters (like "+" or "%")
  const suffix = value.replace(/\d/g, '')

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  )
}

// Featured Projects Carousel Component
function FeaturedProjectsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const featuredProjects = [
    {
      image: '/Luna1.png',
      title: 'Luna Restaurant',
      category: 'Restaurant',
    },
    {
      image: '/hotelSHURA1.png',
      title: 'Hotel Shura Island',
      category: 'Hotel (RSG)',
    },
    {
      image: '/Redsea1.png',
      title: 'Red Sea Global Project',
      category: 'Hotels & Restaurants',
    },
    {
      image: '/hotels-restaurants1.png',
      title: 'Luxury Hospitality',
      category: 'Hotels & Restaurants',
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredProjects.length)
    }, 6000) // Auto-rotate every 6 seconds

    return () => clearInterval(interval)
  }, [featuredProjects.length])

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + featuredProjects.length) % featuredProjects.length)
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % featuredProjects.length)
  }

  return (
    <section className="relative h-[85vh] md:h-screen flex items-center justify-center overflow-hidden">
      {/* Background Images with transition */}
      <div className="absolute inset-0">
        {featuredProjects.map((project, index) => (
          <motion.div
            key={index}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: index === currentIndex ? 1 : 0 }}
            transition={{ duration: 1 }}
          >
            <img
              src={project.image}
              alt={`${project.title} - ${project.category} luxury interior design project by Creative Sparking Contracting`}
              className="w-full h-full object-cover scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-luxury-black/85 via-luxury-black/50 to-luxury-black/25 dark:from-luxury-black/90 dark:via-luxury-black/65 dark:to-luxury-black/35" />
          </motion.div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-20 p-4 bg-luxury-beige/80 hover:bg-luxury-beige text-luxury-charcoal rounded-full transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-luxury-copper focus:ring-offset-2"
        aria-label="View previous featured project"
      >
        <FiChevronLeft className="text-2xl" aria-hidden="true" />
      </button>
      <button
        onClick={goToNext}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-20 p-4 bg-luxury-beige/80 hover:bg-luxury-beige text-luxury-charcoal rounded-full transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-luxury-copper focus:ring-offset-2"
        aria-label="View next featured project"
      >
        <FiChevronRight className="text-2xl" aria-hidden="true" />
      </button>

      {/* Content Overlay */}
      <div className="relative z-10 w-full h-full flex flex-col justify-between p-6 sm:p-8 lg:p-12">
        <div></div>

        <div className="flex flex-col md:flex-row justify-between items-end md:items-center gap-6 md:gap-8">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: -40, y: 20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            className="text-left"
          >
            <h2 className="luxury-heading text-5xl md:text-6xl lg:text-8xl font-bold text-luxury-white mb-3 drop-shadow-2xl">
              {featuredProjects[currentIndex].title}
            </h2>
            <p className="text-luxury-white/95 text-base md:text-lg lg:text-xl uppercase tracking-[0.15em] font-light">
              {featuredProjects[currentIndex].category}
            </p>
          </motion.div>

          <motion.div
            key={`button-${currentIndex}`}
            initial={{ opacity: 0, x: 40, y: 20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: 'easeOut' }}
          >
            <Link
              href="/portfolio"
              className="group relative inline-flex items-center px-10 py-5 bg-luxury-beige/98 hover:bg-luxury-cream text-luxury-charcoal font-semibold uppercase tracking-[0.1em] transition-all duration-300 rounded-sm shadow-2xl hover:shadow-3xl hover:scale-105 active:scale-100"
            >
              <span className="relative z-10">Discover CSC</span>
              <FiArrowRight className="ml-3 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
              <div className="absolute inset-0 bg-gradient-to-r from-luxury-copper/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-sm" />
            </Link>
          </motion.div>
        </div>

        {/* Dot Indicators */}
        <div className="flex justify-center gap-3 mt-6">
          {featuredProjects.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-luxury-copper focus:ring-offset-2 ${
                index === currentIndex
                  ? 'w-8 bg-luxury-beige'
                  : 'w-2 bg-luxury-white/50 hover:bg-luxury-white/75'
              }`}
              aria-label={`View ${featuredProjects[index].title} project`}
              aria-current={index === currentIndex ? 'true' : 'false'}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-luxury-cream dark:bg-luxury-darkBg">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="/hotelSHURA1.png"
            alt="Luxury hotel interior design showcasing premium furniture and elegant space design by Creative Sparking Contracting"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-luxury-cream/95 via-luxury-beige/90 to-luxury-lightGray/95 dark:from-luxury-darkBg/95 dark:via-luxury-darkSecondary/90 dark:to-luxury-darkCard/95" />
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-luxury-cream via-transparent to-transparent dark:from-luxury-darkBg" />

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.h1
              className="luxury-heading text-5xl md:text-7xl lg:text-8xl font-bold mb-6 text-luxury-charcoal dark:text-luxury-darkText"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Crafting Timeless
              <br />
              <span className="text-luxury-copper">Luxury Spaces</span>
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-luxury-textLight dark:text-luxury-darkTextSecondary mb-12 max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Where elegance meets functionality. Transforming visions into reality
              through exceptional furniture and interior design.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <Link 
                href="/portfolio" 
                className="luxury-button group"
                aria-label="View our portfolio of luxury interior design projects"
              >
                View Portfolio
                <FiArrowRight className="inline-block ml-2 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </Link>
              <Link 
                href="/contact" 
                className="luxury-button luxury-button-secondary"
                aria-label="Contact us to discuss your project"
              >
                Contact Us
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, repeat: Infinity, repeatType: 'reverse', duration: 2 }}
        >
          <div className="w-6 h-10 border-2 border-luxury-copper/50 rounded-full flex justify-center">
            <motion.div
              className="w-1 h-3 bg-luxury-copper rounded-full mt-2"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </section>

      {/* Quick Intro Section */}
      <section className="section-padding bg-luxury-cream dark:bg-luxury-darkBg">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="luxury-heading text-4xl md:text-5xl mb-6 text-luxury-charcoal dark:text-luxury-darkText">
                Excellence in Every
                <br />
                <span className="text-luxury-copper">Detail</span>
              </h2>
              <p className="text-luxury-textLight dark:text-luxury-darkTextSecondary text-lg leading-relaxed mb-6">
                At CSC, we believe that exceptional interior design goes beyond aesthetics.
                We create spaces that reflect your personality, enhance your lifestyle, and
                stand the test of time.
              </p>
              <p className="text-luxury-textLight dark:text-luxury-darkTextSecondary text-lg leading-relaxed mb-8">
                With decades of combined experience in luxury furniture manufacturing and
                interior design, we bring unmatched expertise to every project, from
                private residences to commercial spaces.
              </p>
              <Link href="/about" className="luxury-button luxury-button-secondary inline-block">
                Learn More About Us
                <FiArrowRight className="inline-block ml-2" />
              </Link>
            </motion.div>

            <motion.div
              className="relative h-[400px] md:h-[500px]"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="absolute inset-0 rounded-lg overflow-hidden border border-luxury-charcoal/10 dark:border-luxury-copper/20 shadow-2xl">
                <img
                  src="/Luna1.png"
                  alt="Luxury restaurant interior design featuring custom furniture and elegant dining space by Creative Sparking Contracting"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-luxury-copper/10 to-transparent" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Preview Section */}
      <section className="section-padding bg-luxury-beige dark:bg-luxury-darkSecondary">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="luxury-heading text-4xl md:text-5xl mb-4 text-luxury-charcoal dark:text-luxury-darkText">
              Our <span className="text-luxury-copper">Services</span>
            </h2>
            <p className="text-luxury-textLight dark:text-luxury-darkTextSecondary text-lg max-w-2xl mx-auto">
              Comprehensive solutions for luxury interior design and furniture
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: FiHome,
                title: 'Interior Design',
                description: 'Transform your spaces with comprehensive interior design services that reflect your unique style.',
              },
              {
                icon: FiTool,
                title: 'Implementation',
                description: 'Expert project management from concept to completion with precision and care.',
              },
              {
                icon: FiBox,
                title: 'Custom Furniture',
                description: 'Bespoke furniture pieces handcrafted by master artisans using premium materials.',
              },
              {
                icon: FiSliders,
                title: 'Wood Manufacturing',
                description: 'State-of-the-art facility producing high-quality furniture and architectural elements.',
              },
            ].map((service, index) => (
              <motion.div
                key={index}
                className="group relative p-8 bg-white/80 dark:bg-luxury-darkBg rounded-lg border border-luxury-copper/20 hover:border-luxury-copper/60 transition-all duration-300 hover:shadow-xl"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <service.icon className="text-luxury-copper text-4xl mb-4" />
                <h3 className="luxury-heading text-2xl mb-3 text-luxury-charcoal dark:text-luxury-darkText">
                  {service.title}
                </h3>
                <p className="text-luxury-textLight dark:text-luxury-darkTextSecondary leading-relaxed mb-6">
                  {service.description}
                </p>
                <Link
                  href="/services"
                  className="text-luxury-copper font-semibold inline-flex items-center group-hover:gap-2 gap-1 transition-all"
                >
                  Learn More
                  <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects Carousel */}
      <FeaturedProjectsCarousel />

      {/* Featured Stats */}
      <section className="section-padding bg-luxury-beige dark:bg-luxury-darkSecondary border-y border-luxury-charcoal/10 dark:border-luxury-copper/20">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {[
              { number: '500+', label: 'Projects Completed' },
              { number: '20+', label: 'Years Experience' },
              { number: '100%', label: 'Client Satisfaction' },
              { number: '50+', label: 'Expert Craftsmen' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="luxury-heading text-4xl md:text-5xl text-luxury-copper mb-2">
                  <AnimatedCounter value={stat.number} />
                </div>
                <div className="text-luxury-textLight dark:text-luxury-darkTextSecondary text-sm md:text-base uppercase tracking-wider">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Preview Grid */}
      <section className="section-padding bg-luxury-cream dark:bg-luxury-darkBg">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="luxury-heading text-4xl md:text-5xl mb-4 text-luxury-charcoal dark:text-luxury-darkText">
              Featured <span className="text-luxury-copper">Projects</span>
            </h2>
            <p className="text-luxury-textLight dark:text-luxury-darkTextSecondary text-lg max-w-2xl mx-auto mb-8">
              Explore a selection of our most exceptional work
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {[
              { image: '/Luna1.png', title: 'Luna Restaurant', category: 'Restaurant' },
              { image: '/hotelSHURA1.png', title: 'Hotel Shura Island', category: 'Hotel' },
              { image: '/Redsea1.png', title: 'Red Sea Global', category: 'Commercial' },
              { image: '/hotels-restaurants1.png', title: 'Luxury Hospitality', category: 'Hotels' },
              { image: '/hotelSHURA2.png', title: 'Shura Island Resort', category: 'Hotel' },
              { image: '/Redsea2.png', title: 'Red Sea Project', category: 'Commercial' },
            ].map((project, index) => (
              <Link
                key={index}
                href="/portfolio"
                className="group relative overflow-hidden rounded-lg aspect-square"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="absolute inset-0"
                >
                  <img
                    src={project.image}
                    alt={`${project.title} - ${project.category} luxury interior design project showcasing premium furniture and elegant design by Creative Sparking Contracting`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-luxury-black/80 via-luxury-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <h3 className="luxury-heading text-xl md:text-2xl text-luxury-white mb-1">
                      {project.title}
                    </h3>
                    <p className="text-luxury-white/80 text-sm uppercase tracking-wider">
                      {project.category}
                    </p>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>

          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Link href="/portfolio" className="luxury-button luxury-button-secondary inline-block">
              View Full Portfolio
              <FiArrowRight className="inline-block ml-2" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="section-padding bg-luxury-beige dark:bg-luxury-darkSecondary border-y border-luxury-charcoal/10 dark:border-luxury-copper/20">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="luxury-heading text-4xl md:text-5xl lg:text-6xl mb-6 text-luxury-charcoal dark:text-luxury-darkText">
              Ready to Transform
              <br />
              <span className="text-luxury-copper">Your Space?</span>
            </h2>
            <p className="text-luxury-textLight dark:text-luxury-darkTextSecondary text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
              Let's discuss your project and bring your vision to life. Contact us today for a
              personalized consultation and discover how we can create something extraordinary
              together.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link href="/contact" className="luxury-button group">
                Start Your Project
                <FiArrowRight className="inline-block ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/portfolio" className="luxury-button luxury-button-secondary">
                View Our Work
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

