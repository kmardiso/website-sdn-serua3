'use client'
import AdminSidebar from '@/app/admin/layout/adminsidebar'

export default function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ minHeight: '100vh', background: '#f8f7f4', display: 'flex' }}>
      <AdminSidebar />
      <main style={{ marginLeft: 220, flex: 1, padding: '2rem', minWidth: 0 }}>
        {children}
      </main>
    </div>
  )
}
