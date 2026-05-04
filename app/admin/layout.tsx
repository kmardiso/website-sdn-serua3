import AdminSidebar from '@/app/admin/layout/adminsidebar'

// export default function AdminLayout({ children }: { children: React.ReactNode }) {
//   return (
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
(
    <div style={{ minHeight: '100vh', background: '#f8f7f4', display: 'flex' }}>
      <AdminSidebar />
      <main style={{ marginLeft: 220, flex: 1, padding: '2rem', minWidth: 0 }}>
        {children}
      </main>
    </div>
  )
}
