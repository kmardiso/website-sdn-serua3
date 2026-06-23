'use client'

import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { useEffect, useState } from 'react'

const fotoSekolah = [
  'https://i.ibb.co.com/nNM0x0Rf/Whats-App-Image-2026-06-15-at-1-14-35-PM-1.jpg',
  'https://i.ibb.co.com/LhDNWB4b/Screenshot-2026-06-23-085612.png',
  'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=300&q=30',
  'https://i.ibb.co.com/gMyZtQTB/Whats-App-Image-2026-06-15-at-1-14-37-PM.jpg',
]

export default function HomePage() {
  const [info, setInfo] = useState<any>({})
  const [beritaList, setBeritaList] = useState<any[]>([])

  useEffect(() => {
    async function fetchData() {
      try {
        const [infoRes, beritaRes] = await Promise.all([
          fetch('/api/info').then(res => res.json()),
          fetch('/api/berita?limit=3').then(res => res.json())
        ])
        setInfo(infoRes.data || {})
        setBeritaList(beritaRes.data || [])
      } catch {}
    }
    fetchData()
  }, [])

  const kategoriLabel: Record<string, string> = {
    PENGUMUMAN: 'Pengumuman', PRESTASI: 'Prestasi', KEGIATAN: 'Kegiatan', INFORMASI: 'Informasi',
  }

  return (
    <>
      <style>{`
        .hero-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; align-items: center; }
        .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; text-align: center; }
        .profil-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: start; }
        .fasilitas-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
        .berita-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
        .cta-btns { display: flex; gap: 12px; justify-content: center; }
        .hero-btns { display: flex; gap: 12px; }
        @media (max-width: 768px) {
          .hero-grid { grid-template-columns: 1fr; gap: 2rem; }
          .hero-img { display: none; }
          .stats-grid { grid-template-columns: repeat(2, 1fr); }
          .profil-grid { grid-template-columns: 1fr; gap: 2rem; }
          .fasilitas-grid { grid-template-columns: 1fr; }
          .berita-grid { grid-template-columns: 1fr; }
          .cta-btns { flex-direction: column; align-items: center; }
          .hero-btns { flex-direction: column; }
          .hero-h1 { font-size: 2rem !important; }
        }
      `}</style>

      <Navbar />

      {/* HERO */}
      <section style={{ background: 'linear-gradient(135deg, #1B2D6B 0%, #2a4090 100%)', padding: '5rem 1.5rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -100, right: -100, width: 400, height: 400, borderRadius: '50%', background: 'rgba(200,168,75,0.08)' }} />
        <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative' }}>
          <div className="hero-grid">
            <div>
              <div style={{ display: 'inline-block', background: 'rgba(200,168,75,0.2)', color: '#C8A84B', fontSize: 12, fontWeight: 600, padding: '6px 14px', borderRadius: 20, marginBottom: 20 }}>
                Akreditasi A • Unggul & Berprestasi
              </div>
              <h1 className="hero-h1" style={{ fontWeight: 800, fontSize: '2.8rem', color: '#fff', lineHeight: 1.2, marginBottom: 20 }}>
                Membangun Karakter,<br />
                <span style={{ color: '#C8A84B' }}>Meraih Cita-Cita</span><br />
                Bersama.
              </h1>
              <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 15, lineHeight: 1.8, marginBottom: 32, maxWidth: 460 }}>
                Mewujudkan generasi penerus bangsa yang berilmu, berkarakter, dan berkompeten dalam menghadapi era global.
              </p>
              <div className="hero-btns">
                <Link href="/kontak" style={{ background: '#C8A84B', color: '#1B2D6B', fontWeight: 700, fontSize: 14, padding: '13px 28px', borderRadius: 10, textDecoration: 'none', textAlign: 'center' }}>
                  Daftar Sekarang
                </Link>
                <Link href="/akademik" style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', fontWeight: 600, fontSize: 14, padding: '13px 28px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.2)', textDecoration: 'none', textAlign: 'center' }}>
                  Lihat Kurikulum
                </Link>
              </div>
            </div>
            <div className="hero-img" style={{ position: 'relative' }}>
              <div style={{ borderRadius: 16, overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,0.3)', border: '3px solid rgba(200,168,75,0.3)' }}>
                <img src={fotoSekolah[0]} alt="SD Negeri Serua 3" style={{ width: '100%', height: 320, objectFit: 'cover' }} />
              </div>
              <div style={{ position: 'absolute', bottom: -20, left: -20, background: '#C8A84B', borderRadius: 12, padding: '12px 16px', boxShadow: '0 8px 20px rgba(0,0,0,0.2)' }}>
                <div style={{ fontWeight: 800, fontSize: 22, color: '#1B2D6B' }}>A+</div>
                <div style={{ fontSize: 11, color: '#1B2D6B', fontWeight: 600 }}>Akreditasi</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section style={{ background: '#fff', padding: '2.5rem 1.5rem', borderBottom: '1px solid #e5e7eb' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div className="stats-grid">
            {[
              { num: `${info.jumlah_siswa || '1.200'}+`, label: 'Jumlah Siswa' },
              { num: `${info.jumlah_guru || '45'}+`, label: 'Tenaga Pendidik' },
              { num: '85', label: 'Prestasi Nasional' },
              { num: info.jumlah_rombel || '24', label: 'Ruang Mata Pelajaran' },
            ].map((s, i) => (
              <div key={i} style={{ padding: '1rem' }}>
                <div style={{ fontWeight: 800, fontSize: '2rem', color: '#1B2D6B' }}>{s.num}</div>
                <div style={{ fontSize: 13, color: '#6b7280', marginTop: 4 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROFIL & SAMBUTAN */}
      <section style={{ padding: '4rem 1.5rem', background: '#f9fafb' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div className="profil-grid">
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: '#C8A84B', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8 }}>• Profil Sekolah</div>
              {[
                ['Identitas Sekolah', '/profil'],
                ['Visi & Misi', '/profil#visi'],
                ['Struktur Organisasi', '/profil#struktur'],
                ['Staf Pengajar', '/profil#guru'],
                ['Staf Tenaga Kependidikan', '/profil#tendik'],
              ].map(([label, href]) => (
                <Link key={label} href={href} style={{ display: 'block', padding: '14px 0', fontSize: 15, fontWeight: 500, color: '#374151', borderBottom: '1px solid #e5e7eb', textDecoration: 'none' }}>
                  {label} →
                </Link>
              ))}
            </div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: '#6b7280', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8 }}>SAMBUTAN KEPALA SEKOLAH</div>
              <h2 style={{ fontWeight: 800, fontSize: '1.75rem', color: '#1B2D6B', marginBottom: 20, lineHeight: 1.3 }}>
                Mendidik dengan Hati,<br />Menginspirasi dengan Aksi
              </h2>
              <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                <div style={{ width: 4, background: '#C8A84B', borderRadius: 4, flexShrink: 0, alignSelf: 'stretch' }} />
                <p style={{ fontSize: 14, color: '#6b7280', lineHeight: 1.8, fontStyle: 'italic' }}>
                  "Setiap siswa di SDN Serua 3 kami percayai sebagai calon pemimpin masa depan. Melalui dedikasi pembelajaran yang menyenangkan dan penuh nilai, kami berkomitmen untuk membentuk generasi yang tidak hanya cerdas, tetapi juga berkarakter."
                </p>
              </div>
              <div style={{ marginTop: 20, display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 48, height: 48, background: '#EEF2FF', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>👤</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14, color: '#1B2D6B' }}>{info.kepala_sekolah || 'Hj. Siti Rohmah, M.Pd.'}</div>
                  <div style={{ fontSize: 12, color: '#6b7280' }}>Kepala SD Negeri Serua 3</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FASILITAS */}
      <section style={{ padding: '4rem 1.5rem', background: '#fff' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#C8A84B', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8 }}>SARANA & PRASARANA</div>
            <h2 style={{ fontWeight: 800, fontSize: '2rem', color: '#1B2D6B', marginBottom: 12 }}>Fasilitas Unggulan Kami</h2>
            <p style={{ color: '#6b7280', fontSize: 14, maxWidth: 500, margin: '0 auto' }}>Kami menyediakan fasilitas lengkap dan modern untuk mendukung proses belajar mengajar yang optimal.</p>
          </div>
          <div className="fasilitas-grid">
            {[
              { icon: '🖥️', title: 'Laboratorium Digital', desc: 'Dilengkapi 40 unit komputer terbaru dengan koneksi internet cepat.', img: fotoSekolah[1] },
              { icon: '📚', title: 'Library Hub', desc: 'Perpustakaan modern dengan koleksi 5.000+ buku fisik dan akses digital.', img: fotoSekolah[2] },
              { icon: '⚽', title: 'Fasilitas Olahraga', desc: 'Lapangan serbaguna dan ruang olahraga indoor untuk perkembangan fisik siswa.', img: fotoSekolah[3] },
            ].map((f, i) => (
              <div key={i} style={{ background: '#fff', borderRadius: 16, overflow: 'hidden', border: '1px solid #e5e7eb' }}>
                <div style={{ height: 180, overflow: 'hidden' }}>
                  <img src={f.img} alt={f.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ padding: '1.25rem' }}>
                  <div style={{ fontSize: 20, marginBottom: 8 }}>{f.icon}</div>
                  <h3 style={{ fontWeight: 700, fontSize: 15, color: '#1B2D6B', marginBottom: 8 }}>{f.title}</h3>
                  <p style={{ fontSize: 13, color: '#6b7280', lineHeight: 1.6 }}>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BERITA */}
      <section style={{ padding: '4rem 1.5rem', background: '#f9fafb' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem', flexWrap: 'wrap', gap: 12 }}>
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: '#C8A84B', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8 }}>INFORMASI TERKINI</div>
              <h2 style={{ fontWeight: 800, fontSize: '2rem', color: '#1B2D6B' }}>Berita & Informasi</h2>
            </div>
            <Link href="/berita" style={{ fontSize: 13.5, fontWeight: 600, color: '#1B2D6B', textDecoration: 'none' }}>Semua Berita →</Link>
          </div>
          <div className="berita-grid">
            {beritaList.length > 0 ? beritaList.map((b: any, i: number) => (
              <Link key={b.id} href={`/berita/${b.slug}`} style={{ background: '#fff', borderRadius: 16, overflow: 'hidden', border: '1px solid #e5e7eb', display: 'block', textDecoration: 'none' }}>
                <div style={{ height: 180, overflow: 'hidden' }}>
                  <img src={b.gambar || fotoSekolah[i % 3]} alt={b.judul} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ padding: '1.25rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                    <span style={{ background: '#EEF2FF', color: '#1B2D6B', fontSize: 11, fontWeight: 600, padding: '3px 10px', borderRadius: 20 }}>{kategoriLabel[b.kategori] || b.kategori}</span>
                    <span style={{ fontSize: 11, color: '#9ca3af' }}>{b.publishedAt ? new Date(b.publishedAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) : ''}</span>
                  </div>
                  <h3 style={{ fontWeight: 700, fontSize: 14, color: '#1B2D6B', lineHeight: 1.4, marginBottom: 8 }}>{b.judul}</h3>
                  <p style={{ fontSize: 13, color: '#6b7280', lineHeight: 1.6 }}>{b.ringkasan?.substring(0, 80)}...</p>
                  <div style={{ marginTop: 12, fontSize: 13, fontWeight: 600, color: '#1B2D6B' }}>Baca Selengkapnya →</div>
                </div>
              </Link>
            )) : [0, 1, 2].map(i => (
              <div key={i} style={{ background: '#fff', borderRadius: 16, overflow: 'hidden', border: '1px solid #e5e7eb' }}>
                <div style={{ height: 180, overflow: 'hidden' }}>
                  <img src={fotoSekolah[i]} alt="Berita" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ padding: '1.25rem' }}>
                  <span style={{ background: '#EEF2FF', color: '#1B2D6B', fontSize: 11, fontWeight: 600, padding: '3px 10px', borderRadius: 20 }}>Pengumuman</span>
                  <h3 style={{ fontWeight: 700, fontSize: 14, color: '#1B2D6B', lineHeight: 1.4, margin: '10px 0 8px' }}>Informasi sekolah akan segera tersedia</h3>
                  <p style={{ fontSize: 13, color: '#6b7280' }}>Pantau terus halaman berita kami.</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: 'linear-gradient(135deg, #1B2D6B, #2a4090)', padding: '4rem 1.5rem', textAlign: 'center' }}>
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <h2 style={{ fontWeight: 800, fontSize: '2rem', color: '#fff', marginBottom: 16 }}>Siap Bergabung dengan Keluarga Besar Kami?</h2>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 15, marginBottom: 32 }}>Dapatkan pendidikan terbaik untuk masa depan cerah bersama SD Negeri Serua 3.</p>
          <div className="cta-btns">
            <Link href="/kontak" style={{ background: '#C8A84B', color: '#1B2D6B', fontWeight: 700, fontSize: 14, padding: '13px 28px', borderRadius: 10, textDecoration: 'none' }}>Daftar Sekarang</Link>
            <Link href="/kontak" style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', fontWeight: 600, fontSize: 14, padding: '13px 28px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.2)', textDecoration: 'none' }}>Hubungi Kami</Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}