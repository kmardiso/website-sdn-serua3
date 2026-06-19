'use client'
import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const profilMenu = [
  { label: 'Identitas Sekolah', href: '/profil' },
  { label: 'Visi & Misi', href: '/profil#visi' },
  { label: 'Struktur Organisasi', href: '/profil#struktur' },
  { label: 'Staf Pengajar', href: '/profil#guru' },
  { label: 'Staf Tenaga Kependidikan', href: '/profil#tendik' },
  { label: 'Ekstrakurikuler', href: '/profil#ekskul' },
]

export default function Navbar() {
  const [profilOpen, setProfilOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileProfilOpen, setMobileProfilOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setProfilOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Tutup mobile menu saat navigasi
  useEffect(() => { setMobileOpen(false) }, [pathname])

  const isActive = (href: string) => pathname === href

  return (
    <>
      <style>{`
        .navbar-desktop { display: flex !important; }
        .navbar-hamburger { display: none !important; }
        .navbar-mobile { display: none; }
        @media (max-width: 768px) {
          .navbar-desktop { display: none !important; }
          .navbar-hamburger { display: flex !important; }
          .navbar-mobile { display: block; }
        }
      `}</style>

      <nav style={{
        background: '#fff',
        borderBottom: '1px solid #e5e7eb',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        boxShadow: '0 1px 8px rgba(0,0,0,0.06)',
      }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 68 }}>

          {/* LOGO */}
          <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
            <img
              src="/Logo.png"
              alt="logo"
              style={{ height: 40, width: 40, objectFit: 'contain', borderRadius: 8 }}
            />
            <div>
              <div style={{ fontWeight: 700, fontSize: 14, color: '#1B2D6B', lineHeight: 1.2 }}>SD Negeri Serua 3</div>
              <div style={{ fontSize: 11, color: '#6b7280' }}>Tangerang Selatan</div>
            </div>
          </Link>

          {/* DESKTOP MENU */}
          <div className="navbar-desktop" style={{ alignItems: 'center', gap: 4 }}>
            {[['/', 'Beranda'], ['/akademik', 'Akademik'], ['/berita', 'Berita'], ['/galeri', 'Galeri']].map(([href, label]) => (
              <Link key={href} href={href} style={{
                padding: '8px 14px', borderRadius: 8, fontSize: 13.5, fontWeight: 500,
                color: isActive(href) ? '#1B2D6B' : '#6b7280',
                background: isActive(href) ? '#EEF2FF' : 'transparent',
                textDecoration: 'none',
              }}>{label}</Link>
            ))}

            {/* PROFIL DROPDOWN */}
            <div ref={dropdownRef} style={{ position: 'relative' }}>
              <button onClick={() => setProfilOpen(o => !o)} style={{
                display: 'flex', alignItems: 'center', gap: 4,
                padding: '8px 14px', borderRadius: 8, fontSize: 13.5, fontWeight: 500,
                color: pathname.startsWith('/profil') ? '#1B2D6B' : '#6b7280',
                background: pathname.startsWith('/profil') ? '#EEF2FF' : 'transparent',
                border: 'none', cursor: 'pointer',
              }}>
                Profil
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ transform: profilOpen ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s' }}>
                  <path d="M3 5l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              {profilOpen && (
                <div style={{
                  position: 'absolute', top: 'calc(100% + 8px)', left: 0,
                  background: '#fff', borderRadius: 12, minWidth: 220,
                  boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
                  border: '1px solid #e5e7eb', overflow: 'hidden', zIndex: 200,
                }}>
                  {profilMenu.map((item, i) => (
                    <Link key={i} href={item.href} onClick={() => setProfilOpen(false)} style={{
                      display: 'block', padding: '11px 16px', fontSize: 13.5,
                      color: '#374151', borderBottom: i < profilMenu.length - 1 ? '1px solid #f3f4f6' : 'none',
                      textDecoration: 'none',
                    }}
                      onMouseEnter={e => (e.currentTarget.style.background = '#f9fafb')}
                      onMouseLeave={e => (e.currentTarget.style.background = '#fff')}>
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link href="/kontak" style={{
              padding: '9px 20px', borderRadius: 8, fontSize: 13.5, fontWeight: 600,
              background: '#1B2D6B', color: '#fff', marginLeft: 8, textDecoration: 'none',
            }}>Kontak</Link>
          </div>

          {/* HAMBURGER */}
          <button
            className="navbar-hamburger"
            onClick={() => setMobileOpen(o => !o)}
            style={{ background: 'none', border: 'none', padding: 8, cursor: 'pointer', alignItems: 'center', justifyContent: 'center' }}
          >
            {mobileOpen ? (
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path d="M6 6l12 12M18 6L6 18" stroke="#1B2D6B" strokeWidth="2" strokeLinecap="round" />
              </svg>
            ) : (
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path d="M3 6h18M3 12h18M3 18h18" stroke="#1B2D6B" strokeWidth="2" strokeLinecap="round" />
              </svg>
            )}
          </button>
        </div>

        {/* MOBILE MENU */}
        {mobileOpen && (
          <div className="navbar-mobile" style={{ background: '#fff', borderTop: '1px solid #e5e7eb', padding: '0.5rem 1.5rem 1rem' }}>
            {[['/', 'Beranda'], ['/akademik', 'Akademik'], ['/berita', 'Berita'], ['/galeri', 'Galeri']].map(([href, label]) => (
              <Link key={href} href={href} onClick={() => setMobileOpen(false)} style={{
                display: 'block', padding: '12px 0', fontSize: 14, fontWeight: 500,
                color: isActive(href) ? '#1B2D6B' : '#374151',
                borderBottom: '1px solid #f3f4f6', textDecoration: 'none',
              }}>{label}</Link>
            ))}

            {/* PROFIL di mobile — accordion */}
            <div>
              <button
                onClick={() => setMobileProfilOpen(o => !o)}
                style={{
                  width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '12px 0', fontSize: 14, fontWeight: 500, color: '#374151',
                  background: 'none', border: 'none', borderBottom: '1px solid #f3f4f6', cursor: 'pointer',
                }}
              >
                Profil
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ transform: mobileProfilOpen ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s' }}>
                  <path d="M3 5l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              {mobileProfilOpen && (
                <div style={{ paddingLeft: 16, background: '#f9fafb', borderBottom: '1px solid #f3f4f6' }}>
                  {profilMenu.map((item, i) => (
                    <Link key={i} href={item.href} onClick={() => { setMobileOpen(false); setMobileProfilOpen(false) }} style={{
                      display: 'block', padding: '10px 0', fontSize: 13.5,
                      color: '#6b7280', borderBottom: i < profilMenu.length - 1 ? '1px solid #f0f0f0' : 'none',
                      textDecoration: 'none',
                    }}>{item.label}</Link>
                  ))}
                </div>
              )}
            </div>

            <Link href="/kontak" onClick={() => setMobileOpen(false)} style={{
              display: 'block', marginTop: 12, padding: '12px', textAlign: 'center',
              background: '#1B2D6B', color: '#fff', borderRadius: 10,
              fontSize: 14, fontWeight: 600, textDecoration: 'none',
            }}>Kontak</Link>
          </div>
        )}
      </nav>
    </>
  )
}