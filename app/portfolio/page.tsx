'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi'

const categories = ['All', 'Villas', 'Palaces', 'Restaurants', 'Hotels', 'Commercial']

interface Project {
  id: number
  category: string
  title: string
  description: string
  images: string[]
}

export default function Portfolio() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedProject, setSelectedProject] = useState<number | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      const response = await fetch('/api/projects')
      if (response.ok) {
        const data = await response.json()
        setProjects(data)
      }
    } catch (error) {
      console.error('Error fetching projects:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredProjects =
    selectedCategory === 'All'
      ? projects
      : projects.filter((project) => project.category === selectedCategory)

  const selectedProjectData =
    selectedProject !== null ? projects.find((p) => p.id === selectedProject) : null

  const nextImage = () => {
    if (selectedProjectData) {
      setCurrentImageIndex((prev) => (prev + 1) % selectedProjectData.images.length)
    }
  }

  const prevImage = () => {
    if (selectedProjectData) {
      setCurrentImageIndex(
        (prev) => (prev - 1 + selectedProjectData.images.length) % selectedProjectData.images.length
      )
    }
  }

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-luxury-beige via-luxury-lightGray to-luxury-beige dark:from-[#1B0E0A] dark:via-[#3E2723] dark:to-[#B87333]">
          <div className="absolute inset-0 opacity-20 bg-[url('/placeholder-portfolio.jpg')] bg-cover bg-center" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-luxury-beige via-transparent to-transparent dark:from-[#1B0E0A]/80 dark:via-transparent dark:to-transparent" />

        <motion.div
          className="relative z-10 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="luxury-heading text-5xl md:text-7xl font-bold mb-4 text-luxury-charcoal dark:text-luxury-darkText">
            Our <span className="text-luxury-copper">Portfolio</span>
          </h1>
          <p className="text-xl text-luxury-textLight dark:text-luxury-darkTextSecondary max-w-2xl mx-auto">
            Showcasing our finest work in luxury interior design and furniture
          </p>
        </motion.div>
      </section>

      {/* Category Filter */}
      <section className="bg-luxury-cream dark:bg-luxury-darkBg border-b border-luxury-copper/20 dark:border-luxury-copper/20 py-8 sticky top-20 z-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 text-sm font-medium uppercase tracking-wider transition-all duration-300 ${selectedCategory === category
                  ? 'bg-luxury-copper text-luxury-cream dark:text-luxury-darkText'
                  : 'text-luxury-charcoal dark:text-luxury-darkTextSecondary hover:text-luxury-copper border border-luxury-charcoal/20 dark:border-luxury-copper/20 hover:border-luxury-copper/50'
                  }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="section-padding bg-luxury-cream dark:bg-luxury-darkBg">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          {loading ? (
            <div className="text-center py-20">
              <p className="text-luxury-textLight dark:text-luxury-darkTextSecondary text-lg">
                Loading projects...
              </p>
            </div>
          ) : filteredProjects.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-luxury-textLight dark:text-luxury-darkTextSecondary text-lg">
                No projects found.
              </p>
            </div>
          ) : (
            <motion.div
              layout
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              <AnimatePresence mode="wait">
                {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group cursor-pointer"
                  onClick={() => {
                    setSelectedProject(project.id)
                    setCurrentImageIndex(0)
                  }}
                >
                  <div className="relative h-[500px] overflow-hidden rounded-2xl border border-luxury-copper/30 dark:border-luxury-copper/30 hover:border-luxury-copper transition-all duration-500 shadow-2xl hover:shadow-luxury-copper/20 dark:hover:shadow-luxury-copper/20">
                    {/* Image with zoom effect */}
                    <div className="absolute inset-0 overflow-hidden">
                      <img
                        src={project.images[0]}
                        alt={`${project.title} - ${project.category} luxury interior design project by Creative Sparking Contracting`}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        loading="lazy"
                      />
                    </div>

                    {/* Gradient Overlay - always visible but intensifies on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-luxury-beige/80 dark:from-[#1B0E0A]/80 via-luxury-beige/40 dark:via-[#3E2723]/40 to-transparent opacity-60 dark:opacity-60 group-hover:opacity-90 dark:group-hover:opacity-90 transition-opacity duration-500" />

                    {/* Decorative corner accent */}
                    <div className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-luxury-copper/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute bottom-0 left-0 w-20 h-20 border-b-2 border-l-2 border-luxury-copper/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Category Badge */}
                    <div className="absolute top-6 left-6 z-10">
                      <span className="inline-block px-4 py-2 bg-luxury-copper/90 backdrop-blur-sm text-luxury-cream dark:text-luxury-darkText text-xs font-bold uppercase tracking-widest rounded-full">
                        {project.category}
                      </span>
                    </div>

                    {/* Info - always visible at bottom */}
                    <div className="absolute bottom-0 left-0 right-0 p-8 transform transition-all duration-500">
                      <h3 className="luxury-heading text-3xl mb-3 text-luxury-charcoal dark:text-luxury-darkText drop-shadow-lg">
                        {project.title}
                      </h3>
                      <p className="text-luxury-textLight dark:text-luxury-darkTextSecondary text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 max-w-md">
                        {project.description.substring(0, 100)}...
                      </p>
                      <div className="mt-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <span className="text-luxury-copper text-sm font-semibold">View Project</span>
                        <svg className="w-4 h-4 text-luxury-copper transform group-hover:translate-x-2 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </section>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject !== null && selectedProjectData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-luxury-beige/95 dark:bg-[#1B0E0A]/95 backdrop-blur-sm flex items-center justify-center p-6"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="max-w-6xl w-full max-h-[90vh] overflow-y-auto bg-luxury-cream dark:bg-luxury-darkBg rounded-lg border border-luxury-copper/30 dark:border-luxury-copper/30"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center bg-luxury-beige/80 dark:bg-luxury-darkSecondary/80 hover:bg-luxury-beige dark:hover:bg-luxury-darkSecondary text-luxury-charcoal dark:text-luxury-darkText rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-luxury-copper focus:ring-offset-2"
                aria-label="Close project modal"
              >
                <FiX size={24} aria-hidden="true" />
              </button>

              {/* Image Gallery */}
              <div className="relative h-[60vh] bg-luxury-lightGray dark:bg-luxury-darkBg">
                <img
                  src={selectedProjectData.images[currentImageIndex]}
                  alt={`${selectedProjectData.title} - ${selectedProjectData.category} project image ${currentImageIndex + 1} of ${selectedProjectData.images.length} by Creative Sparking Contracting`}
                  className="w-full h-full object-contain"
                />

                {/* Navigation Arrows */}
                {selectedProjectData.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-luxury-beige/80 dark:bg-luxury-darkSecondary/80 hover:bg-luxury-copper text-luxury-charcoal dark:text-luxury-darkText rounded-full transition-colors z-10 focus:outline-none focus:ring-2 focus:ring-luxury-copper focus:ring-offset-2"
                      aria-label="View previous image"
                    >
                      <FiChevronLeft size={24} aria-hidden="true" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-luxury-beige/80 dark:bg-luxury-darkSecondary/80 hover:bg-luxury-copper text-luxury-charcoal dark:text-luxury-darkText rounded-full transition-colors z-10 focus:outline-none focus:ring-2 focus:ring-luxury-copper focus:ring-offset-2"
                      aria-label="View next image"
                    >
                      <FiChevronRight size={24} aria-hidden="true" />
                    </button>
                  </>
                )}

                {/* Image Indicators */}
                {selectedProjectData.images.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                    {selectedProjectData.images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-2 h-2 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-luxury-copper focus:ring-offset-2 ${index === currentImageIndex
                          ? 'bg-luxury-copper'
                          : 'bg-luxury-charcoal/30 dark:bg-luxury-darkTextSecondary/30 hover:bg-luxury-charcoal/50 dark:hover:bg-luxury-darkTextSecondary/50'
                          }`}
                        aria-label={`Go to image ${index + 1}`}
                        aria-current={index === currentImageIndex ? 'true' : 'false'}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Project Details */}
              <div className="p-8 md:p-12">
                <div className="mb-4">
                  <span className="inline-block px-4 py-1 bg-luxury-copper/20 dark:bg-luxury-copper/20 text-luxury-copper text-sm uppercase tracking-wider">
                    {selectedProjectData.category}
                  </span>
                </div>
                <h2 className="luxury-heading text-4xl md:text-5xl mb-6 text-luxury-charcoal dark:text-luxury-darkText">
                  {selectedProjectData.title}
                </h2>
                <p className="text-luxury-textLight dark:text-luxury-darkTextSecondary text-lg leading-relaxed">
                  {selectedProjectData.description}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
