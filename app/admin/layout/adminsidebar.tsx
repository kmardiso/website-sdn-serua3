'use client'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

const menuList = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: '📊' },
  { href: '/admin/berita', label: 'Berita', icon: '📰' },
  { href: '/admin/ppdb', label: 'PPDB', icon: '📋' },
  { href: '/admin/kontak', label: 'Pesan Masuk', icon: '✉️' },
  { href: '/admin/galeri', label: 'Galeri', icon: '🖼️' },
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
      width: 220,
      background: '#0d2660',
      padding: '1.5rem 0',
      position: 'fixed',
      top: 0,
      bottom: 0,
      overflowY: 'auto',
      zIndex: 50,
    }}>
      <div style={{ padding: '0 1.25rem', marginBottom: '2rem' }}>
        <div style={{ fontFamily: 'Playfair Display,serif', fontSize: 16, fontWeight: 700, color: '#fff' }}>SDN Serua 3</div>
        <div style={{ color: '#c8a84b', fontSize: 11 }}>Panel Admin</div>
      </div>

      <nav>
        {menuList.map(({ href, label, icon }) => {
          const active = pathname === href
          return (
            <Link key={href} href={href} style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '10px 1.25rem',
              color: active ? '#fff' : 'rgba(255,255,255,0.7)',
              fontSize: 13,
              fontWeight: active ? 600 : 400,
              background: active ? 'rgba(255,255,255,0.1)' : 'transparent',
              textDecoration: 'none',
              borderLeft: active ? '3px solid #c8a84b' : '3px solid transparent',
            }}>
              <span style={{ fontSize: 15 }}>{icon}</span>
              {label}
            </Link>
          )
        })}
      </nav>

      <div style={{ position: 'absolute', bottom: '1.5rem', left: 0, right: 0, padding: '0 1.25rem' }}>
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1rem' }}>
          <Link href="/" style={{
            display: 'flex', alignItems: 'center', gap: 10,
            color: 'rgba(255,255,255,0.5)', fontSize: 12.5,
            textDecoration: 'none', marginBottom: 12,
          }}>
            <span>🌐</span> Lihat Website
          </Link>
          <button
            onClick={handleLogout}
            style={{
              background: 'rgba(255,255,255,0.08)',
              color: 'rgba(255,255,255,0.6)',
              border: '1px solid rgba(255,255,255,0.1)',
              padding: '7px 14px',
              borderRadius: 6,
              fontSize: 12,
              cursor: 'pointer',
              width: '100%',
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </aside>
  )
}