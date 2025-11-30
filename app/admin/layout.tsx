import { redirect } from 'next/navigation'
import { isAuthenticated } from '@/lib/auth'
import AdminNav from '@/components/AdminNav'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Check authentication (except for login page)
  const authenticated = await isAuthenticated()
  
  // Allow access to login page without authentication
  // The check is done at the page level for login

  return (
    <div className="min-h-screen bg-luxury-cream dark:bg-luxury-darkBg">
      {authenticated && <AdminNav />}
      <main className={authenticated ? 'pt-20' : ''}>{children}</main>
    </div>
  )
}


