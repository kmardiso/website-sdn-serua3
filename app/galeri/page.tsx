'use client'

import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { useEffect, useState, useCallback } from 'react'

const fotoSekolah = [
  { url: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&q=80', judul: 'Kegiatan Belajar Mengajar', kategori: 'Kegiatan' },
  { url: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80', judul: 'Perpustakaan Sekolah', kategori: 'Fasilitas' },
  { url: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80', judul: 'Laboratorium Komputer', kategori: 'Fasilitas' },
  { url: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&q=80', judul: 'Upacara Bendera', kategori: 'Kegiatan' },
  { url: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80', judul: 'Kegiatan Olahraga', kategori: 'Olahraga' },
  { url: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&q=80', judul: 'Pembelajaran Outdoor', kategori: 'Kegiatan' },
  { url: 'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=800&q=80', judul: 'Pentas Seni Siswa', kategori: 'Prestasi' },
  { url: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80', judul: 'Lomba Cerdas Cermat', kategori: 'Prestasi' },
  { url: 'https://images.unsplash.com/photo-1543269664-7eef42226a21?w=800&q=80', judul: 'Kegiatan Ekstrakulikuler', kategori: 'Kegiatan' },
]

export default function GaleriPage() {
  const [galeriList, setGaleriList] = useState<any[]>([])
  const [selectedKategori, setSelectedKategori] = useState('Semua')
  const [visibleCount, setVisibleCount] = useState(9)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  useEffect(() => {
    async function fetchGaleri() {
      try {
        const res = await fetch('/api/galeri?limit=24')
        const json = await res.json()
        if (json.data && json.data.length > 0) setGaleriList(json.data)
      } catch {}
    }
    fetchGaleri()
  }, [])

  const data = galeriList.length > 0 ? galeriList : fotoSekolah
  const kategoriSet = ['Semua']
  data.forEach((g: any) => { if (g.kategori && !kategoriSet.includes(g.kategori)) kategoriSet.push(g.kategori) })
  const filteredData = selectedKategori === 'Semua' ? data : data.filter((g: any) => g.kategori === selectedKategori)
  const displayedData = filteredData.slice(0, visibleCount)
  const currentPhoto = filteredData[lightboxIndex]

  const openLightbox = (index: number) => { setLightboxIndex(index); setLightboxOpen(true); document.body.style.overflow = 'hidden' }
  const closeLightbox = () => { setLightboxOpen(false); document.body.style.overflow = '' }
  const prevPhoto = useCallback(() => setLightboxIndex(i => (i - 1 + filteredData.length) % filteredData.length), [filteredData.length])
  const nextPhoto = useCallback(() => setLightboxIndex(i => (i + 1) % filteredData.length), [filteredData.length])

  useEffect(() => {
    if (!lightboxOpen) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prevPhoto()
      if (e.key === 'ArrowRight') nextPhoto()
      if (e.key === 'Escape') closeLightbox()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [lightboxOpen, prevPhoto, nextPhoto])

  return (
    <>
      <style>{`
        .galeri-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; }
        @media (max-width: 768px) { .galeri-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 480px) { .galeri-grid { grid-template-columns: 1fr; } }
      `}</style>

      <Navbar />

      {/* LIGHTBOX */}
      {lightboxOpen && currentPhoto && (
        <div onClick={closeLightbox} style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(0,0,0,0.92)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <button onClick={closeLightbox} style={{ position: 'absolute', top: 20, right: 24, background: 'rgba(255,255,255,0.15)', border: 'none', color: '#fff', fontSize: 28, width: 44, height: 44, borderRadius: '50%', cursor: 'pointer' }}>×</button>
          <button onClick={e => { e.stopPropagation(); prevPhoto() }} style={{ position: 'absolute', left: 12, background: 'rgba(255,255,255,0.15)', border: 'none', color: '#fff', fontSize: 28, width: 48, height: 48, borderRadius: '50%', cursor: 'pointer' }}>‹</button>
          <div onClick={e => e.stopPropagation()} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: '85vw' }}>
            <img src={currentPhoto.gambar || currentPhoto.url} alt={currentPhoto.judul} style={{ maxWidth: '85vw', maxHeight: '78vh', objectFit: 'contain', borderRadius: 12 }} />
            <div style={{ marginTop: 16, textAlign: 'center' }}>
              <div style={{ color: '#fff', fontWeight: 700, fontSize: 16 }}>{currentPhoto.judul}</div>
              {currentPhoto.kategori && <div style={{ color: '#C8A84B', fontSize: 12, marginTop: 4 }}>{currentPhoto.kategori}</div>}
              <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: 12, marginTop: 6 }}>{lightboxIndex + 1} / {filteredData.length}</div>
            </div>
          </div>
          <button onClick={e => { e.stopPropagation(); nextPhoto() }} style={{ position: 'absolute', right: 12, background: 'rgba(255,255,255,0.15)', border: 'none', color: '#fff', fontSize: 28, width: 48, height: 48, borderRadius: '50%', cursor: 'pointer' }}>›</button>
        </div>
      )}

      <section style={{ background: 'linear-gradient(135deg, #1B2D6B, #2a4090)', padding: '3rem 1.5rem' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', marginBottom: 8 }}>Beranda &rsaquo; Galeri</div>
          <h1 style={{ fontWeight: 800, fontSize: '2rem', color: '#fff' }}>Galeri Kegiatan</h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14, marginTop: 8 }}>Mendokumentasikan momen-momen berharga di SD Negeri Serua 3.</p>
        </div>
      </section>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '2rem 1.5rem' }}>
        <div style={{ display: 'flex', gap: 8, marginBottom: '2rem', flexWrap: 'wrap' }}>
          {kategoriSet.map(k => (
            <button key={k} onClick={() => { setSelectedKategori(k); setVisibleCount(9) }} style={{ padding: '8px 18px', borderRadius: 20, fontSize: 13, fontWeight: 500, border: '1px solid #e5e7eb', background: selectedKategori === k ? '#1B2D6B' : '#fff', color: selectedKategori === k ? '#fff' : '#374151', cursor: 'pointer' }}>{k}</button>
          ))}
        </div>

        <div className="galeri-grid">
          {displayedData.map((g: any, i: number) => (
            <div key={g.id || i} onClick={() => openLightbox(i)} style={{ borderRadius: 12, overflow: 'hidden', cursor: 'pointer', border: '1px solid #e5e7eb' }}>
              <div style={{ height: 200, overflow: 'hidden' }}>
                <img src={g.gambar || g.url} alt={g.judul} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ padding: '0.875rem 1rem', background: '#fff' }}>
                <div style={{ fontWeight: 600, fontSize: 13.5, color: '#1B2D6B', marginBottom: 4 }}>{g.judul}</div>
                {g.kategori && <span style={{ fontSize: 11, color: '#6b7280', background: '#f3f4f6', padding: '2px 8px', borderRadius: 10 }}>{g.kategori}</span>}
              </div>
            </div>
          ))}
        </div>

        {displayedData.length === 0 && (
          <div style={{ textAlign: 'center', padding: '5rem', color: '#9ca3af' }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>🖼️</div>
            <div style={{ fontSize: 16, fontWeight: 600 }}>Tidak ada foto di kategori ini</div>
          </div>
        )}

        {visibleCount < filteredData.length && (
          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <button onClick={() => setVisibleCount(p => p + 9)} style={{ padding: '12px 32px', borderRadius: 10, border: '1px solid #e5e7eb', background: '#fff', color: '#374151', fontWeight: 600, fontSize: 14, cursor: 'pointer' }}>
              Tampilkan Lebih Banyak ↓
            </button>
          </div>
        )}
      </div>

      <Footer />
    </>
  )
}