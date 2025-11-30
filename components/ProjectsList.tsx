'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { FiEdit, FiTrash2, FiImage, FiStar } from 'react-icons/fi'

interface Project {
  id: number
  title: string
  description: string
  category: string
  images: string[]
  featured: boolean
}

interface ProjectsListProps {
  projects: Project[]
}

export default function ProjectsList({ projects }: ProjectsListProps) {
  const router = useRouter()
  const [deletingId, setDeletingId] = useState<number | null>(null)

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this project? This action cannot be undone.')) {
      return
    }

    setDeletingId(id)
    try {
      const response = await fetch(`/api/projects/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        router.refresh()
      } else {
        alert('Failed to delete project')
      }
    } catch (error) {
      console.error('Delete error:', error)
      alert('An error occurred while deleting the project')
    } finally {
      setDeletingId(null)
    }
  }

  if (projects.length === 0) {
    return (
      <div className="bg-white dark:bg-luxury-darkSecondary rounded-lg border border-luxury-copper/20 p-12 text-center">
        <p className="text-luxury-textLight dark:text-luxury-darkTextSecondary mb-4">
          No projects yet
        </p>
        <Link
          href="/admin/projects/new"
          className="luxury-button luxury-button-secondary inline-block"
        >
          Add Your First Project
        </Link>
      </div>
    )
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project, index) => (
        <motion.div
          key={project.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
          className="bg-white dark:bg-luxury-darkSecondary rounded-lg border border-luxury-copper/20 overflow-hidden hover:shadow-xl transition-shadow"
        >
          {/* Image */}
          <div className="relative h-48 bg-luxury-lightGray dark:bg-luxury-darkBg overflow-hidden">
            {project.images && project.images.length > 0 ? (
              <img
                src={project.images[0]}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <FiImage className="text-4xl text-luxury-charcoal/30 dark:text-luxury-darkText/30" />
              </div>
            )}
            {project.featured && (
              <div className="absolute top-2 right-2 bg-luxury-copper text-luxury-cream px-2 py-1 rounded text-xs flex items-center gap-1">
                <FiStar className="text-xs" />
                Featured
              </div>
            )}
            <div className="absolute top-2 left-2 bg-luxury-beige/90 dark:bg-luxury-darkSecondary/90 backdrop-blur-sm px-2 py-1 rounded text-xs text-luxury-charcoal dark:text-luxury-darkText">
              {project.category}
            </div>
          </div>

          {/* Content */}
          <div className="p-4">
            <h3 className="luxury-heading text-lg text-luxury-charcoal dark:text-luxury-darkText mb-2 line-clamp-1">
              {project.title}
            </h3>
            <p className="text-sm text-luxury-textLight dark:text-luxury-darkTextSecondary mb-4 line-clamp-2">
              {project.description}
            </p>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <Link
                href={`/admin/projects/${project.id}`}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-luxury-copper text-luxury-cream rounded-lg hover:bg-luxury-copper/90 transition-colors"
              >
                <FiEdit />
                Edit
              </Link>
              <button
                onClick={() => handleDelete(project.id)}
                disabled={deletingId === project.id}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <FiTrash2 />
                {deletingId === project.id ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}


