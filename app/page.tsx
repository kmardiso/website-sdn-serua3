import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export const dynamic = 'force-dynamic'

async function getInfo() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/info`, { cache: 'no-store' })
    const json = await res.json()
    return json.data || {}
  } catch { return {} }
}

async function getBerita() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/berita?limit=3`, { cache: 'no-store' })
    const json = await res.json()
    return json.data || []
  } catch { return [] }
}

const fotoSekolah = [
  'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&q=80',
  'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80',
  'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80',
]

export default async function HomePage() {
  const [info, beritaList] = await Promise.all([getInfo(), getBerita()])

  const kategoriLabel: Record<string, string> = {
    PENGUMUMAN: 'Pengumuman', PRESTASI: 'Prestasi', KEGIATAN: 'Kegiatan', INFORMASI: 'Informasi',
  }

  return (
    <>
      <Navbar />

      {/* HERO */}
      <section style={{ background: 'linear-gradient(135deg, #1B2D6B 0%, #2a4090 100%)', padding: '5rem 1.5rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -100, right: -100, width: 400, height: 400, borderRadius: '50%', background: 'rgba(200,168,75,0.08)' }} />
        <div style={{ position: 'absolute', bottom: -80, left: -80, width: 300, height: 300, borderRadius: '50%', background: 'rgba(255,255,255,0.04)' }} />
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center', position: 'relative' }}>
          <div>
            <div style={{ display: 'inline-block', background: 'rgba(200,168,75,0.2)', color: '#C8A84B', fontSize: 12, fontWeight: 600, padding: '6px 14px', borderRadius: 20, marginBottom: 20, letterSpacing: '0.05em' }}>
              Akreditasi A • Unggul & Berprestasi
            </div>
            <h1 style={{ fontWeight: 800, fontSize: '2.8rem', color: '#fff', lineHeight: 1.2, marginBottom: 20 }}>
              Membangun Karakter,<br />
              <span style={{ color: '#C8A84B' }}>Meraih Cita-Cita</span><br />
              Bersama.
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 15, lineHeight: 1.8, marginBottom: 32, maxWidth: 460 }}>
              Mewujudkan generasi penerus bangsa yang berilmu, berkarakter, dan berkompeten dalam menghadapi era global.
            </p>
            <div style={{ display: 'flex', gap: 12 }}>
              <Link href="/profil" style={{ background: '#C8A84B', color: '#1B2D6B', fontWeight: 700, fontSize: 14, padding: '13px 28px', borderRadius: 10 }}>
                Daftar Sekarang
              </Link>
              <Link href="/profil" style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', fontWeight: 600, fontSize: 14, padding: '13px 28px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.2)' }}>
                Lihat Kurikulum
              </Link>
            </div>
          </div>
          <div style={{ position: 'relative' }}>
            <div style={{ borderRadius: 16, overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,0.3)', border: '3px solid rgba(200,168,75,0.3)' }}>
              <img src={fotoSekolah[0]} alt="SD Negeri Serua 3" style={{ width: '100%', height: 320, objectFit: 'cover' }} />
            </div>
            <div style={{ position: 'absolute', bottom: -20, left: -20, background: '#C8A84B', borderRadius: 12, padding: '12px 16px', boxShadow: '0 8px 20px rgba(0,0,0,0.2)' }}>
              <div style={{ fontWeight: 800, fontSize: 22, color: '#1B2D6B' }}>A+</div>
              <div style={{ fontSize: 11, color: '#1B2D6B', fontWeight: 600 }}>Akreditasi</div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section style={{ background: '#fff', padding: '2.5rem 1.5rem', borderBottom: '1px solid #e5e7eb' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', textAlign: 'center' }}>
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
      </section>

      {/* PROFIL SEKOLAH + SAMBUTAN */}
      <section style={{ padding: '4rem 1.5rem', background: '#f9fafb' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'start' }}>

          {/* PROFIL MENU */}
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#C8A84B', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8 }}>• Profil Sekolah</div>
            {[
              ['Identitas Sekolah', '/profil'],
              ['Visi & Misi', '/profil#visi'],
              ['Struktur Organisasi', '/profil#struktur'],
              ['Staf Pengajar', '/profil#guru'],
              ['Staf Tenaga Kependidikan', '/profil#tendik'],
            ].map(([label, href]) => (
              <Link key={label} href={href} style={{ display: 'block', padding: '14px 0', fontSize: 15, fontWeight: 500, color: '#374151', borderBottom: '1px solid #e5e7eb' }}
                onMouseEnter={e => { e.currentTarget.style.color = '#1B2D6B'; e.currentTarget.style.paddingLeft = '8px' }}
                onMouseLeave={e => { e.currentTarget.style.color = '#374151'; e.currentTarget.style.paddingLeft = '0' }}>
                {label}
              </Link>
            ))}
          </div>

          {/* SAMBUTAN */}
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#6b7280', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8 }}>SAMBUTAN KEPALA SEKOLAH</div>
            <h2 style={{ fontWeight: 800, fontSize: '1.75rem', color: '#1B2D6B', marginBottom: 20, lineHeight: 1.3 }}>
              Mendidik dengan Hati,<br />Menginspirasi dengan Aksi
            </h2>
            <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
              <div style={{ width: 4, background: '#C8A84B', borderRadius: 4, flexShrink: 0, alignSelf: 'stretch' }} />
              <p style={{ fontSize: 14, color: '#6b7280', lineHeight: 1.8, fontStyle: 'italic' }}>
                "Setiap siswa di SDN Serua 3 kami percayai sebagai calon pemimpin masa depan. Melalui dedikasi pembelajaran yang menyenangkan dan penuh nilai, kami berkomitmen untuk membentuk generasi yang tidak hanya cerdas, tetapi juga berkarakter dan siap menghadapi tantangan global."
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
      </section>

      {/* FASILITAS */}
      <section style={{ padding: '4rem 1.5rem', background: '#fff' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#C8A84B', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8 }}>SARANA & PRASARANA</div>
            <h2 style={{ fontWeight: 800, fontSize: '2rem', color: '#1B2D6B', marginBottom: 12 }}>Fasilitas Unggulan Kami</h2>
            <p style={{ color: '#6b7280', fontSize: 14, maxWidth: 500, margin: '0 auto' }}>Kami menyediakan fasilitas lengkap dan modern untuk mendukung proses belajar mengajar yang optimal.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
            {[
              { icon: '🖥️', title: 'Laboratorium Digital Multimedia', desc: 'Dilengkapi 40 unit komputer terbaru dengan koneksi internet cepat untuk mendukung pembelajaran digital.', img: fotoSekolah[1] },
              { icon: '📚', title: 'Library Hub', desc: 'Perpustakaan modern dengan koleksi 5.000+ buku fisik dan akses digital untuk mendukung budaya literasi.', img: fotoSekolah[2] },
              { icon: '⚽', title: 'Fasilitas Olahraga', desc: 'Lapangan serbaguna dan ruang olahraga indoor untuk mendukung perkembangan fisik dan bakat siswa.', img: fotoSekolah[0] },
            ].map((f, i) => (
              <div key={i} style={{ background: '#fff', borderRadius: 16, overflow: 'hidden', border: '1px solid #e5e7eb', transition: 'transform 0.2s, box-shadow 0.2s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 12px 30px rgba(0,0,0,0.1)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLElement).style.boxShadow = 'none' }}>
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
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem' }}>
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: '#C8A84B', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8 }}>INFORMASI TERKINI</div>
              <h2 style={{ fontWeight: 800, fontSize: '2rem', color: '#1B2D6B' }}>Berita & Informasi</h2>
              <p style={{ color: '#6b7280', fontSize: 14, marginTop: 4 }}>Ikuti perkembangan terkini dan pengumuman penting.</p>
            </div>
            <Link href="/berita" style={{ fontSize: 13.5, fontWeight: 600, color: '#1B2D6B', display: 'flex', alignItems: 'center', gap: 4 }}>
              Semua Berita →
            </Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
            {beritaList.length > 0 ? beritaList.map((b: any, i: number) => (
              <Link key={b.id} href={`/berita/${b.slug}`} style={{ background: '#fff', borderRadius: 16, overflow: 'hidden', border: '1px solid #e5e7eb', display: 'block' }}>
                <div style={{ height: 180, background: '#EEF2FF', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <img src={fotoSekolah[i % 3]} alt={b.judul} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
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
            )) : [1, 2, 3].map(i => (
              <div key={i} style={{ background: '#fff', borderRadius: 16, overflow: 'hidden', border: '1px solid #e5e7eb' }}>
                <div style={{ height: 180, overflow: 'hidden' }}>
                  <img src={fotoSekolah[i - 1]} alt="Berita" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ padding: '1.25rem' }}>
                  <span style={{ background: '#EEF2FF', color: '#1B2D6B', fontSize: 11, fontWeight: 600, padding: '3px 10px', borderRadius: 20 }}>Pengumuman</span>
                  <h3 style={{ fontWeight: 700, fontSize: 14, color: '#1B2D6B', lineHeight: 1.4, margin: '10px 0 8px' }}>Informasi sekolah akan segera tersedia</h3>
                  <p style={{ fontSize: 13, color: '#6b7280' }}>Pantau terus halaman berita kami untuk informasi terbaru.</p>
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
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
            <Link href="/kontak" style={{ background: '#C8A84B', color: '#1B2D6B', fontWeight: 700, fontSize: 14, padding: '13px 28px', borderRadius: 10 }}>
              Daftar Sekarang
            </Link>
            <Link href="/kontak" style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', fontWeight: 600, fontSize: 14, padding: '13px 28px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.2)' }}>
              Hubungi Kami
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}