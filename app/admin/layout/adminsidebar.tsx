'use client'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

const menuList = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: '📊' },
  { href: '/admin/berita', label: 'Berita', icon: '📰' },
  { href: '/admin/galeri', label: 'Galeri', icon: '🖼️' },
  { href: '/admin/kontak', label: 'Pesan Masuk', icon: '✉️' },
  { href: '/admin/pengaturan', label: 'Pengaturan', icon: '⚙️' },
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/admin/login')
    router.refresh()
  }

  return (
    <aside style={{
      width: 240,
      background: '#1B2D6B',
      position: 'fixed',
      top: 0,
      bottom: 0,
      overflowY: 'auto',
      zIndex: 50,
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* LOGO */}
      <div style={{ padding: '1.5rem 1.25rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 40, height: 40, background: '#C8A84B', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 14, color: '#1B2D6B' }}>SD</div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 13.5, color: '#fff' }}>SDN Serua 3</div>
            <div style={{ fontSize: 11, color: '#C8A84B' }}>Panel Admin</div>
          </div>
        </div>
      </div>

      {/* MENU */}
      <nav style={{ flex: 1, padding: '1rem 0' }}>
        {menuList.map(({ href, label, icon }) => {
          const active = pathname === href
          return (
            <Link key={href} href={href} style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              padding: '11px 1.25rem',
              color: active ? '#fff' : 'rgba(255,255,255,0.65)',
              fontSize: 13.5,
              fontWeight: active ? 600 : 400,
              background: active ? 'rgba(200,168,75,0.15)' : 'transparent',
              borderLeft: active ? '3px solid #C8A84B' : '3px solid transparent',
              textDecoration: 'none',
              transition: 'all 0.15s',
            }}>
              <span style={{ fontSize: 16 }}>{icon}</span>
              {label}
            </Link>
          )
        })}
      </nav>

      {/* BOTTOM */}
      <div style={{ padding: '1rem 1.25rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'rgba(255,255,255,0.5)', fontSize: 13, textDecoration: 'none', marginBottom: 12 }}>
          <span>🌐</span> Lihat Website
        </Link>
        <button onClick={handleLogout} style={{
          width: '100%', background: 'rgba(255,255,255,0.08)',
          color: 'rgba(255,255,255,0.7)', border: '1px solid rgba(255,255,255,0.15)',
          padding: '9px', borderRadius: 8, fontSize: 13, cursor: 'pointer', fontWeight: 500,
        }}>
          Logout
        </button>
      </div>
    </aside>
  )
}