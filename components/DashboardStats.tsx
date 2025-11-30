import { FiBriefcase, FiGrid, FiStar } from 'react-icons/fi'

interface Project {
  id: number
  category: string
  featured: boolean
}

interface DashboardStatsProps {
  projects: Project[]
}

export default function DashboardStats({ projects }: DashboardStatsProps) {
  const totalProjects = projects.length
  const featuredProjects = projects.filter((p) => p.featured).length
  const categories = new Set(projects.map((p) => p.category)).size

  const stats = [
    {
      label: 'Total Projects',
      value: totalProjects,
      icon: FiBriefcase,
      color: 'text-luxury-copper',
    },
    {
      label: 'Featured Projects',
      value: featuredProjects,
      icon: FiStar,
      color: 'text-luxury-copper',
    },
    {
      label: 'Categories',
      value: categories,
      icon: FiGrid,
      color: 'text-luxury-copper',
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon
        return (
          <div
            key={index}
            className="bg-white dark:bg-luxury-darkSecondary rounded-lg border border-luxury-copper/20 p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-luxury-textLight dark:text-luxury-darkTextSecondary mb-1">
                  {stat.label}
                </p>
                <p className="luxury-heading text-3xl text-luxury-charcoal dark:text-luxury-darkText">
                  {stat.value}
                </p>
              </div>
              <div className={`p-3 bg-luxury-copper/10 rounded-lg ${stat.color}`}>
                <Icon className="text-2xl" />
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}


