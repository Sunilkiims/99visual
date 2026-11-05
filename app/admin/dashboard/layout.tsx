import type { Metadata } from 'next'

// noindex for the dashboard route, same as app/admin/layout.tsx.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
}

// app/admin/layout.tsx already wraps every /admin/* route — including this
// one — with the session check and <AdminSidebar>. This layout previously
// repeated both, so the dashboard rendered the sidebar twice and its content
// was offset by a second ml-64 margin. It now just passes children through.
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
