import type { Metadata } from 'next'
import { getSession } from '@/lib/auth'
import { redirect } from 'next/navigation'
import AdminSidebar from '@/app/components/admin/AdminSidebar'

export const dynamic = 'force-dynamic'

// ✅ FIX — explicit noindex for all /admin/* routes, matching the /login fix.
// robots.ts already disallows /admin/ from crawling; this adds the noindex
// directive Google recommends alongside it so a discovered URL still can't
// end up indexed.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
}

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getSession()
  if (!session) {
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