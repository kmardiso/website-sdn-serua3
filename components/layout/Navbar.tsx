'use client'
import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'

const profilMenu = [
  { label: 'Profil Sekolah', href: '/profil' },
  { label: 'Identitas Sekolah', href: '/profil#identitas' },
  { label: 'Visi & Misi', href: '/profil#visi' },
  { label: 'Sejarah Singkat', href: '/profil#sejarah' },
  { label: 'Struktur Organisasi', href: '/profil#struktur' },
  { label: 'Staf Pengajar', href: '/profil#guru' },
  { label: 'Staf Tenaga Kependidikan', href: '/profil#tendik' },
]

export default function Navbar({ npsn, namaSekolah }: { npsn?: string; namaSekolah?: string }) {
  const [profilOpen, setProfilOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setProfilOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <nav style={{
      background: '#0d2660',
      padding: '0 2rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: 64,
      position: 'sticky',
      top: 0,
      zIndex: 100,
    }}>
      {/* LOGO */}
      <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none' }}>
        <div style={{
          width: 40, height: 40, background: '#c8a84b', borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'Playfair Display, serif', fontSize: 16, fontWeight: 700, color: '#0d2660',
        }}>SD</div>
        <div>
          <div style={{ color: '#fff', fontWeight: 600, fontSize: 13 }}>{namaSekolah || 'SDN Serua 3'}</div>
          <div style={{ color: '#c8a84b', fontSize: 11, letterSpacing: '0.06em' }}>NPSN {npsn || '20604893'}</div>
        </div>
      </Link>

      {/* MENU */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>

        <Link href="/" style={{ color: 'rgba(255,255,255,0.75)', fontSize: 12.5, fontWeight: 500, padding: '8px 12px', borderRadius: 4, textDecoration: 'none' }}>
          Beranda
        </Link>

        {/* DROPDOWN PROFIL KAMI */}
        <div ref={dropdownRef} style={{ position: 'relative' }}>
          <button
            onClick={() => setProfilOpen(o => !o)}
            style={{
              display: 'flex', alignItems: 'center', gap: 5,
              color: profilOpen ? '#fff' : 'rgba(255,255,255,0.75)',
              fontSize: 12.5, fontWeight: 500, padding: '8px 12px', borderRadius: 4,
              background: profilOpen ? 'rgba(255,255,255,0.1)' : 'transparent',
              border: 'none', cursor: 'pointer',
            }}
          >
            Profil Kami
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ transform: profilOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>
              <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {profilOpen && (
            <div style={{
              position: 'absolute', top: 'calc(100% + 8px)', left: 0,
              background: '#fff', borderRadius: 10, minWidth: 220,
              boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
              border: '1px solid #e8e5de', overflow: 'hidden', zIndex: 200,
            }}>
              {profilMenu.map((item, i) => (
                <Link
                  key={i}
                  href={item.href}
                  onClick={() => setProfilOpen(false)}
                  style={{
                    display: 'block', padding: '11px 16px',
                    fontSize: 13, color: '#1a2340', fontWeight: i === 0 ? 600 : 400,
                    textDecoration: 'none',
                    borderBottom: i < profilMenu.length - 1 ? '1px solid #f0ede6' : 'none',
                    background: '#fff',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = '#f8f7f4')}
                  onMouseLeave={e => (e.currentTarget.style.background = '#fff')}
                >
                  {i === 0 && (
                    <span style={{ display: 'inline-block', width: 6, height: 6, background: '#c8a84b', borderRadius: '50%', marginRight: 8, verticalAlign: 'middle' }} />
                  )}
                  {item.label}
                </Link>
              ))}
            </div>
          )}
        </div>

        <Link href="/akademik" style={{ color: 'rgba(255,255,255,0.75)', fontSize: 12.5, fontWeight: 500, padding: '8px 12px', borderRadius: 4, textDecoration: 'none' }}>
          Akademik
        </Link>

        <Link href="/berita" style={{ color: 'rgba(255,255,255,0.75)', fontSize: 12.5, fontWeight: 500, padding: '8px 12px', borderRadius: 4, textDecoration: 'none' }}>
          Berita
        </Link>

        <Link href="/galeri" style={{ color: 'rgba(255,255,255,0.75)', fontSize: 12.5, fontWeight: 500, padding: '8px 12px', borderRadius: 4, textDecoration: 'none' }}>
          Galeri
        </Link>

        <Link href="/ppdb" style={{
          color: '#0d2660', fontSize: 12.5, fontWeight: 600,
          padding: '7px 14px', borderRadius: 6, textDecoration: 'none',
          background: '#c8a84b', marginLeft: 6,
        }}>
          PPDB
        </Link>

        <Link href="/kontak" style={{ color: 'rgba(255,255,255,0.75)', fontSize: 12.5, fontWeight: 500, padding: '8px 12px', borderRadius: 4, textDecoration: 'none' }}>
          Kontak
        </Link>

      </div>
    </nav>
  )
}
