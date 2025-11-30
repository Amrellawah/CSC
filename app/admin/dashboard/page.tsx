import { redirect } from 'next/navigation'
import { isAuthenticated } from '@/lib/auth'
import { getProjects } from '@/lib/projects'
import Link from 'next/link'
import { FiArrowRight, FiBriefcase, FiPlus } from 'react-icons/fi'
import DashboardStats from '@/components/DashboardStats'

export default async function AdminDashboard() {
  const authenticated = await isAuthenticated()
  
  if (!authenticated) {
    redirect('/admin/login')
  }

  const projects = await getProjects()

  return (
    <div className="min-h-screen pt-8 pb-12">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="luxury-heading text-4xl md:text-5xl text-luxury-charcoal dark:text-luxury-darkText mb-2">
            Admin <span className="text-luxury-copper">Dashboard</span>
          </h1>
          <p className="text-luxury-textLight dark:text-luxury-darkTextSecondary">
            Manage your portfolio projects
          </p>
        </div>

        {/* Stats Cards */}
        <DashboardStats projects={projects} />

        {/* Quick Actions */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="luxury-heading text-2xl text-luxury-charcoal dark:text-luxury-darkText">
              Quick Actions
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <Link
              href="/admin/projects/new"
              className="group p-6 bg-white dark:bg-luxury-darkSecondary rounded-lg border border-luxury-copper/20 hover:border-luxury-copper/60 transition-all duration-300 hover:shadow-xl"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-3 bg-luxury-copper/10 rounded-lg">
                      <FiPlus className="text-2xl text-luxury-copper" />
                    </div>
                    <h3 className="luxury-heading text-xl text-luxury-charcoal dark:text-luxury-darkText">
                      Add New Project
                    </h3>
                  </div>
                  <p className="text-luxury-textLight dark:text-luxury-darkTextSecondary">
                    Create a new portfolio project
                  </p>
                </div>
                <FiArrowRight className="text-luxury-copper group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            <Link
              href="/admin/projects"
              className="group p-6 bg-white dark:bg-luxury-darkSecondary rounded-lg border border-luxury-copper/20 hover:border-luxury-copper/60 transition-all duration-300 hover:shadow-xl"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-3 bg-luxury-copper/10 rounded-lg">
                      <FiBriefcase className="text-2xl text-luxury-copper" />
                    </div>
                    <h3 className="luxury-heading text-xl text-luxury-charcoal dark:text-luxury-darkText">
                      Manage Projects
                    </h3>
                  </div>
                  <p className="text-luxury-textLight dark:text-luxury-darkTextSecondary">
                    View and edit all projects
                  </p>
                </div>
                <FiArrowRight className="text-luxury-copper group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </div>
        </div>

        {/* Recent Projects */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="luxury-heading text-2xl text-luxury-charcoal dark:text-luxury-darkText">
              Recent Projects
            </h2>
            <Link
              href="/admin/projects"
              className="text-luxury-copper hover:text-luxury-copper/80 text-sm font-semibold"
            >
              View All →
            </Link>
          </div>
          {projects.length > 0 ? (
            <div className="bg-white dark:bg-luxury-darkSecondary rounded-lg border border-luxury-copper/20 overflow-hidden">
              <div className="divide-y divide-luxury-charcoal/10 dark:divide-luxury-copper/20">
                {projects.slice(0, 5).map((project) => (
                  <Link
                    key={project.id}
                    href={`/admin/projects/${project.id}`}
                    className="block p-4 hover:bg-luxury-beige dark:hover:bg-luxury-darkBg transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="luxury-heading text-lg text-luxury-charcoal dark:text-luxury-darkText">
                          {project.title}
                        </h3>
                        <p className="text-sm text-luxury-textLight dark:text-luxury-darkTextSecondary">
                          {project.category}
                        </p>
                      </div>
                      <FiArrowRight className="text-luxury-copper" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ) : (
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
          )}
        </div>
      </div>
    </div>
  )
}


