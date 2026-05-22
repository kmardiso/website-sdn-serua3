'use client'
import AdminSidebar from '@/app/admin/layout/adminsidebar'
 
export default function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ minHeight: '100vh', background: '#f9fafb', display: 'flex' }}>
      <AdminSidebar />
      <main style={{ marginLeft: 240, flex: 1, padding: '2rem', minWidth: 0 }}>
        {children}
      </main>
    </div>
  )
}
 