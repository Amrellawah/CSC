import { redirect } from 'next/navigation'
import { isAuthenticated } from '@/lib/auth'
import ProjectForm from '@/components/ProjectForm'

export default async function NewProject() {
  const authenticated = await isAuthenticated()
  
  if (!authenticated) {
    redirect('/admin/login')
  }

  return (
    <div className="min-h-screen pt-8 pb-12">
      <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="mb-8">
          <h1 className="luxury-heading text-4xl md:text-5xl text-luxury-charcoal dark:text-luxury-darkText mb-2">
            Add New <span className="text-luxury-copper">Project</span>
          </h1>
          <p className="text-luxury-textLight dark:text-luxury-darkTextSecondary">
            Create a new portfolio project
          </p>
        </div>

        <div className="bg-white dark:bg-luxury-darkSecondary rounded-lg border border-luxury-copper/20 p-6 md:p-8">
          <ProjectForm isEdit={false} />
        </div>
      </div>
    </div>
  )
}




