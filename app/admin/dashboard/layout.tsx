import { getSession } from '@/lib/auth'
import { redirect } from 'next/navigation'
import AdminSidebar from '@/app/components/admin/AdminSidebar'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getSession()

  if (!session) {
    redirect('/admin/login')
  }

  return (
    <div className="min-h-screen bg-gray-950 flex">
      <AdminSidebar user={session} />
      <main className="flex-1 ml-64 min-h-screen bg-gray-950">
        {children}
      </main>
    </div>
  )
}