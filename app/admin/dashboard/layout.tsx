import type { Metadata } from 'next'
import { getSession } from '@/lib/auth'
import { redirect } from 'next/navigation'
import AdminSidebar from '@/app/components/admin/AdminSidebar'

// ✅ FIX — noindex for the dashboard route, same as app/admin/layout.tsx.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
}

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getSession()

  if (!session) {
    // ✅ FIX — was redirecting to /admin/login, which doesn't exist (the
    // real login route is /login, per app/login/page.tsx and the redirect
    // in app/admin/layout.tsx). This was sending unauthenticated visitors
    // to a 404 instead of the login form.
    redirect('/login')
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