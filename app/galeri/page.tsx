'use client'

import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { useEffect, useState } from 'react'

const fotoSekolah = [
  { url: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400&q=30', judul: 'Kegiatan Belajar Mengajar', kategori: 'Kegiatan' },
  { url: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&q=30', judul: 'Perpustakaan Sekolah', kategori: 'Fasilitas' },
  { url: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400&q=30', judul: 'Laboratorium Komputer', kategori: 'Fasilitas' },
  { url: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=400&q=30', judul: 'Upacara Bendera', kategori: 'Kegiatan' },
  { url: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&q=30', judul: 'Kegiatan Olahraga', kategori: 'Olahraga' },
  { url: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=400&q=30', judul: 'Pembelajaran Outdoor', kategori: 'Kegiatan' },
  { url: 'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=400&q=30', judul: 'Pentas Seni Siswa', kategori: 'Prestasi' },
  { url: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=400&q=30', judul: 'Lomba Cerdas Cermat', kategori: 'Prestasi' },
  { url: 'https://images.unsplash.com/photo-1543269664-7eef42226a21?w=400&q=30', judul: 'Kegiatan Ekstrakulikuler', kategori: 'Kegiatan' },
]

export default function GaleriPage() {
  const [galeriList, setGaleriList] = useState<any[]>([])
  const [selectedKategori, setSelectedKategori] = useState('Semua')
  const [visibleCount, setVisibleCount] = useState(9)

  // Fetch data dari API (jalan SEKALI pas mount)
  useEffect(() => {
    async function fetchGaleri() {
      try {
        const res = await fetch('/api/galeri?limit=24')
        const json = await res.json()
        if (json.data && json.data.length > 0) {
          setGaleriList(json.data)
        }
      } catch (error) {
        console.error('Error fetching galeri:', error)
      }
    }
    fetchGaleri()
  }, [])

  // Pake data dari API kalo ada, kalo gak ada pake fotoSekolah
  const data = galeriList.length > 0 ? galeriList : fotoSekolah

  // Ambil daftar kategori unik
  const kategoriSet = ['Semua']
  data.forEach((g: any) => {
    if (g.kategori && !kategoriSet.includes(g.kategori)) {
      kategoriSet.push(g.kategori)
    }
  })

  // Filter data berdasarkan kategori
  const filteredData = selectedKategori === 'Semua' 
    ? data 
    : data.filter((g: any) => g.kategori === selectedKategori)

  // Data yang ditampilkan (sesuai visibleCount)
  const displayedData = filteredData.slice(0, visibleCount)

  const loadMore = () => {
    setVisibleCount(prev => prev + 9)
  }

  return (
    <>
      <Navbar />

      {/* HERO */}
      <section style={{ background: 'linear-gradient(135deg, #1B2D6B, #2a4090)', padding: '3rem 1.5rem' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', marginBottom: 8 }}>Beranda &rsaquo; Galeri</div>
          <h1 style={{ fontWeight: 800, fontSize: '2rem', color: '#fff' }}>Galeri Kegiatan</h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14, marginTop: 8 }}>Mendokumentasikan momen-momen berharga, inovasi pembelajaran, dan kehangatan komunitas di SD Negeri Serua 3.</p>
        </div>
      </section>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '2rem 1.5rem' }}>

        {/* FILTER - Sekarang functional karena pake state! */}
        <div style={{ display: 'flex', gap: 8, marginBottom: '2rem', flexWrap: 'wrap' }}>
          {kategoriSet.map((k, i) => (
            <button 
              key={k} 
              onClick={() => setSelectedKategori(k)}
              style={{ 
                padding: '8px 18px', 
                borderRadius: 20, 
                fontSize: 13, 
                fontWeight: 500, 
                border: '1px solid #e5e7eb', 
                background: selectedKategori === k ? '#1B2D6B' : '#fff', 
                color: selectedKategori === k ? '#fff' : '#374151', 
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              {k}
            </button>
          ))}
        </div>

        {/* GRID FOTO */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
          {displayedData.map((g: any, i: number) => (
            <div 
              key={g.id || i} 
              style={{ 
                borderRadius: 12, 
                overflow: 'hidden', 
                cursor: 'pointer', 
                border: '1px solid #e5e7eb',
                transition: 'transform 0.2s, box-shadow 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)'
                e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.1)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0px)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              <div style={{ height: 220, overflow: 'hidden' }}>
                <img
                  src={g.gambar || g.url}
                  alt={g.judul}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s' }}
                  onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.05)')}
                  onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
                />
              </div>
              <div style={{ padding: '0.875rem 1rem', background: '#fff' }}>
                <div style={{ fontWeight: 600, fontSize: 13.5, color: '#1B2D6B', marginBottom: 4 }}>{g.judul}</div>
                {g.kategori && (
                  <span style={{ fontSize: 11, color: '#6b7280', background: '#f3f4f6', padding: '2px 8px', borderRadius: 10 }}>{g.kategori}</span>
                )}
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

        {/* LOAD MORE - Sekarang functional! */}
        {visibleCount < filteredData.length && (
          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <button 
              onClick={loadMore}
              style={{ 
                padding: '12px 32px', 
                borderRadius: 10, 
                border: '1px solid #e5e7eb', 
                background: '#fff', 
                color: '#374151', 
                fontWeight: 600, 
                fontSize: 14, 
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#f3f4f6'
                e.currentTarget.style.borderColor = '#1B2D6B'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#fff'
                e.currentTarget.style.borderColor = '#e5e7eb'
              }}
            >
              Tampilkan Lebih Banyak ↓
            </button>
          </div>
        )}
      </div>

      <Footer />
    </>
  )
}