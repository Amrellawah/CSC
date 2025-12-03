'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { FiUpload, FiX, FiImage } from 'react-icons/fi'

interface Project {
  id?: number
  title: string
  description: string
  category: string
  images: string[]
  featured: boolean
  order: number
}

interface ProjectFormProps {
  project?: Project | null
  isEdit?: boolean
}

const CATEGORIES = ['Villas', 'Palaces', 'Restaurants', 'Hotels', 'Commercial']

export default function ProjectForm({ project, isEdit = false }: ProjectFormProps) {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  const [formData, setFormData] = useState<Project>({
    title: project?.title || '',
    description: project?.description || '',
    category: project?.category || 'Villas',
    images: project?.images || [],
    featured: project?.featured || false,
    order: project?.order || 0,
  })

  const [uploading, setUploading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    setUploading(true)
    setError('')

    try {
      const uploadPromises = Array.from(files).map(async (file) => {
        const formData = new FormData()
        formData.append('file', file)

        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        })

        if (!response.ok) {
          throw new Error('Upload failed')
        }

        const data = await response.json()
        return data.url
      })

      const urls = await Promise.all(uploadPromises)
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...urls],
      }))
      setSuccess(`Successfully uploaded ${urls.length} image(s)`)
      setTimeout(() => setSuccess(''), 3000)
    } catch (err) {
      setError('Failed to upload images. Please try again.')
    } finally {
      setUploading(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  const removeImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSaving(true)

    try {
      const url = isEdit ? `/api/projects/${project?.id}` : '/api/projects'
      const method = isEdit ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to save project')
      }

      router.push('/admin/projects')
      router.refresh()
    } catch (err: any) {
      setError(err.message || 'Failed to save project')
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-600 dark:text-green-400 px-4 py-3 rounded-lg">
          {success}
        </div>
      )}

      {/* Title */}
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-luxury-charcoal dark:text-luxury-darkText mb-2">
          Project Title *
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          required
          className="w-full px-4 py-3 border border-luxury-charcoal/20 dark:border-luxury-copper/20 rounded-lg bg-white dark:bg-luxury-darkBg text-luxury-charcoal dark:text-luxury-darkText focus:ring-2 focus:ring-luxury-copper focus:border-luxury-copper transition-colors"
        />
      </div>

      {/* Category */}
      <div>
        <label htmlFor="category" className="block text-sm font-medium text-luxury-charcoal dark:text-luxury-darkText mb-2">
          Category *
        </label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleInputChange}
          required
          className="w-full px-4 py-3 border border-luxury-charcoal/20 dark:border-luxury-copper/20 rounded-lg bg-white dark:bg-luxury-darkBg text-luxury-charcoal dark:text-luxury-darkText focus:ring-2 focus:ring-luxury-copper focus:border-luxury-copper transition-colors"
        >
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Description */}
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-luxury-charcoal dark:text-luxury-darkText mb-2">
          Description *
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          required
          rows={6}
          className="w-full px-4 py-3 border border-luxury-charcoal/20 dark:border-luxury-copper/20 rounded-lg bg-white dark:bg-luxury-darkBg text-luxury-charcoal dark:text-luxury-darkText focus:ring-2 focus:ring-luxury-copper focus:border-luxury-copper transition-colors resize-none"
        />
      </div>

      {/* Images */}
      <div>
        <label className="block text-sm font-medium text-luxury-charcoal dark:text-luxury-darkText mb-2">
          Project Images
        </label>
        
        {/* Image Upload */}
        <div className="mb-4">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileUpload}
            className="hidden"
            id="image-upload"
          />
          <label
            htmlFor="image-upload"
            className={`inline-flex items-center gap-2 px-4 py-2 bg-luxury-copper text-luxury-cream rounded-lg cursor-pointer hover:bg-luxury-copper/90 transition-colors ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <FiUpload />
            {uploading ? 'Uploading...' : 'Upload Images'}
          </label>
        </div>

        {/* Image Gallery */}
        {formData.images.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {formData.images.map((image, index) => (
              <div key={index} className="relative group">
                <img
                  src={image}
                  alt={`Project image ${index + 1}`}
                  className="w-full h-32 object-cover rounded-lg border border-luxury-charcoal/20"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <FiX />
                </button>
                {index === 0 && (
                  <div className="absolute bottom-2 left-2 bg-luxury-copper text-white px-2 py-1 rounded text-xs">
                    Main
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {formData.images.length === 0 && (
          <div className="border-2 border-dashed border-luxury-charcoal/20 dark:border-luxury-copper/20 rounded-lg p-12 text-center">
            <FiImage className="mx-auto text-4xl text-luxury-charcoal/30 dark:text-luxury-darkText/30 mb-2" />
            <p className="text-sm text-luxury-textLight dark:text-luxury-darkTextSecondary">
              No images uploaded yet
            </p>
          </div>
        )}
      </div>

      {/* Featured & Order */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="flex items-center">
          <input
            type="checkbox"
            id="featured"
            name="featured"
            checked={formData.featured}
            onChange={handleInputChange}
            className="w-4 h-4 text-luxury-copper border-luxury-charcoal/20 rounded focus:ring-luxury-copper"
          />
          <label htmlFor="featured" className="ml-2 text-sm font-medium text-luxury-charcoal dark:text-luxury-darkText">
            Featured Project
          </label>
        </div>

        <div>
          <label htmlFor="order" className="block text-sm font-medium text-luxury-charcoal dark:text-luxury-darkText mb-2">
            Display Order
          </label>
          <input
            type="number"
            id="order"
            name="order"
            value={formData.order}
            onChange={handleInputChange}
            min="0"
            className="w-full px-4 py-3 border border-luxury-charcoal/20 dark:border-luxury-copper/20 rounded-lg bg-white dark:bg-luxury-darkBg text-luxury-charcoal dark:text-luxury-darkText focus:ring-2 focus:ring-luxury-copper focus:border-luxury-copper transition-colors"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4 pt-6 border-t border-luxury-charcoal/10 dark:border-luxury-copper/20">
        <button
          type="submit"
          disabled={saving}
          className="luxury-button disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {saving ? 'Saving...' : isEdit ? 'Update Project' : 'Create Project'}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="luxury-button luxury-button-secondary"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}




