import { redirect } from 'next/navigation'
import { isAuthenticated } from '@/lib/auth'
import { getProjects } from '@/lib/projects'
import Link from 'next/link'
import { FiEdit, FiTrash2, FiPlus, FiEye } from 'react-icons/fi'
import ProjectsList from '@/components/ProjectsList'

export default async function AdminProjects() {
  const authenticated = await isAuthenticated()
  
  if (!authenticated) {
    redirect('/admin/login')
  }

  const projects = await getProjects()

  return (
    <div className="min-h-screen pt-8 pb-12">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="luxury-heading text-4xl md:text-5xl text-luxury-charcoal dark:text-luxury-darkText mb-2">
              Manage <span className="text-luxury-copper">Projects</span>
            </h1>
            <p className="text-luxury-textLight dark:text-luxury-darkTextSecondary">
              Add, edit, or delete portfolio projects
            </p>
          </div>
          <Link
            href="/admin/projects/new"
            className="luxury-button flex items-center gap-2"
          >
            <FiPlus />
            Add Project
          </Link>
        </div>

        <ProjectsList projects={projects} />
      </div>
    </div>
  )
}


