import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

async function getBerita() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/berita?limit=9`, { cache: 'no-store' })
    const json = await res.json()
    return json.data || []
  } catch { return [] }
}

const fallbackFoto = [
  'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400&q=30',
  'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=300&q=30',
  'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=300&q=30',
  'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=300&q=30',
  'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=300&q=30',
  'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=300&q=30',
]

const kategoriLabel: Record<string, string> = {
  PENGUMUMAN: 'Pengumuman', PRESTASI: 'Prestasi', KEGIATAN: 'Kegiatan', INFORMASI: 'Informasi',
}
const kategoriColor: Record<string, string> = {
  PENGUMUMAN: '#1B2D6B', PRESTASI: '#C8A84B', KEGIATAN: '#10b981', INFORMASI: '#8b5cf6',
}

function getFoto(berita: any, index: number) {
  return berita.gambar || fallbackFoto[index % fallbackFoto.length]
}

export default async function BeritaPage() {
  const beritaList = await getBerita()

  const dummyBerita = [
    { id: 1, slug: '#', judul: 'Pelepasan Siswa Kelas VI Tahun Ajaran 2023/2024', ringkasan: 'Momen mengharukan ketika menyaksikan pelepasan siswa kelas VI.', gambar: null, kategori: 'KEGIATAN', publishedAt: new Date() },
    { id: 2, slug: '#', judul: 'Juara Umum Lomba Cerdas Cermat Tingkat Kota', ringkasan: 'SDN Serua 3 berhasil meraih juara umum dalam kompetisi bergengsi.', gambar: null, kategori: 'PRESTASI', publishedAt: new Date() },
    { id: 3, slug: '#', judul: 'Persiapan Pentas Seni Akhir Tahun', ringkasan: 'Para siswa mempersiapkan pertunjukan terbaik mereka.', gambar: null, kategori: 'KEGIATAN', publishedAt: new Date() },
    { id: 4, slug: '#', judul: 'Penerimaan Peserta Didik Baru 2024/2025', ringkasan: 'Informasi resmi pembukaan pendaftaran peserta didik baru.', gambar: null, kategori: 'PENGUMUMAN', publishedAt: new Date() },
    { id: 5, slug: '#', judul: 'Peresmian Ruang Literasi Digital', ringkasan: 'SDN Serua 3 meresmikan ruang baca modern.', gambar: null, kategori: 'INFORMASI', publishedAt: new Date() },
    { id: 6, slug: '#', judul: 'Workshop Peningkatan Mutu Tenaga Pendidik', ringkasan: 'Seluruh guru mengikuti pelatihan kompetensi pembelajaran.', gambar: null, kategori: 'KEGIATAN', publishedAt: new Date() },
  ]

  const data = beritaList.length > 0 ? beritaList : dummyBerita
  const featured = data[0]
  const rest = data.slice(1)

  return (
    <>
      <style>{`
        .berita-featured { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; }
        .berita-featured-img { height: 280px; }
        .berita-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
        @media (max-width: 768px) {
          .berita-featured { grid-template-columns: 1fr; }
          .berita-featured-img { height: 200px; }
          .berita-grid { grid-template-columns: 1fr; }
        }
        @media (min-width: 480px) and (max-width: 768px) {
          .berita-grid { grid-template-columns: repeat(2, 1fr); }
        }
      `}</style>

      <Navbar />

      <section style={{ background: 'linear-gradient(135deg, #1B2D6B, #2a4090)', padding: '3rem 1.5rem' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', marginBottom: 8 }}>Beranda &rsaquo; Berita</div>
          <h1 style={{ fontWeight: 800, fontSize: '2rem', color: '#fff' }}>Berita & Pengumuman</h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14, marginTop: 8 }}>Informasi terkini mengenai prestasi, kegiatan akademik, dan pengumuman penting.</p>
        </div>
      </section>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '2rem 1.5rem' }}>
        <div style={{ display: 'flex', gap: 8, marginBottom: '2rem', flexWrap: 'wrap' }}>
          {['Semua', 'Kegiatan', 'Prestasi', 'Pengumuman', 'Informasi'].map(k => (
            <button key={k} style={{ padding: '8px 18px', borderRadius: 20, fontSize: 13, fontWeight: 500, border: '1px solid #e5e7eb', background: k === 'Semua' ? '#1B2D6B' : '#fff', color: k === 'Semua' ? '#fff' : '#374151', cursor: 'pointer' }}>{k}</button>
          ))}
        </div>

        {featured && (
          <Link href={`/berita/${featured.slug}`} style={{ textDecoration: 'none', display: 'block', marginBottom: '2rem' }}>
            <div className="berita-featured" style={{ background: '#fff', borderRadius: 16, overflow: 'hidden', border: '1px solid #e5e7eb' }}>
              <div className="berita-featured-img" style={{ overflow: 'hidden', background: '#f3f4f6' }}>
                <img src={getFoto(featured, 0)} alt={featured.judul} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12, flexWrap: 'wrap' }}>
                  <span style={{ background: '#EEF2FF', color: '#1B2D6B', fontSize: 11, fontWeight: 600, padding: '4px 12px', borderRadius: 20 }}>{kategoriLabel[featured.kategori] || featured.kategori}</span>
                  <span style={{ fontSize: 11, color: '#9ca3af' }}>{new Date(featured.publishedAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                </div>
                <h2 style={{ fontWeight: 800, fontSize: '1.4rem', color: '#1B2D6B', lineHeight: 1.3, marginBottom: 12 }}>{featured.judul}</h2>
                <p style={{ fontSize: 14, color: '#6b7280', lineHeight: 1.7, marginBottom: 20 }}>{featured.ringkasan}</p>
                <div style={{ fontWeight: 600, fontSize: 14, color: '#1B2D6B' }}>Baca Selengkapnya →</div>
              </div>
            </div>
          </Link>
        )}

        <div className="berita-grid">
          {rest.map((b: any, i: number) => (
            <Link key={b.id} href={`/berita/${b.slug}`} style={{ background: '#fff', borderRadius: 16, overflow: 'hidden', border: '1px solid #e5e7eb', display: 'block', textDecoration: 'none' }}>
              <div style={{ height: 180, overflow: 'hidden', position: 'relative', background: '#f3f4f6' }}>
                <img src={getFoto(b, i + 1)} alt={b.judul} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <span style={{ position: 'absolute', top: 12, left: 12, background: kategoriColor[b.kategori] || '#1B2D6B', color: '#fff', fontSize: 11, fontWeight: 600, padding: '4px 10px', borderRadius: 20 }}>
                  {kategoriLabel[b.kategori] || b.kategori}
                </span>
              </div>
              <div style={{ padding: '1.25rem' }}>
                <div style={{ fontSize: 11, color: '#9ca3af', marginBottom: 8 }}>{new Date(b.publishedAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}</div>
                <h3 style={{ fontWeight: 700, fontSize: 14, color: '#1B2D6B', lineHeight: 1.4, marginBottom: 8 }}>{b.judul}</h3>
                <p style={{ fontSize: 13, color: '#6b7280', lineHeight: 1.6, marginBottom: 12 }}>{b.ringkasan?.substring(0, 80)}...</p>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#1B2D6B' }}>Selengkapnya →</div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <Footer />
    </>
  )
}