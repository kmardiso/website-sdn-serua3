import Link from 'next/link'
import KontakForm from '@/components/sections/KontakForm'
import Navbar from '@/components/layout/Navbar'

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

async function getFasilitas() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/fasilitas`, { cache: 'no-store' })
    const json = await res.json()
    return json.data || []
  } catch { return [] }
}

async function getProfil() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/profil`, { cache: 'no-store' })
    const json = await res.json()
    return json.data || []
  } catch { return [] }
}

const kategoriLabel: Record<string, string> = {
  PENGUMUMAN: 'Pengumuman',
  PRESTASI: 'Prestasi',
  KEGIATAN: 'Kegiatan',
  INFORMASI: 'Informasi',
}

const profilCards = [
  { key: 'identitas', label: 'Identitas Sekolah', sub: 'Data & legalitas', bg: '#eef2fc', color: '#0d2660' },
  { key: 'visi', label: 'Visi & Misi', sub: 'Tujuan sekolah', bg: '#edfaf4', color: '#0a6e4f' },
  { key: 'sejarah', label: 'Sejarah Sekolah', sub: 'Perjalanan kami', bg: '#fdf8ec', color: '#7a5a0a' },
  { key: 'struktur', label: 'Struktur Organisasi', sub: 'Tim kepemimpinan', bg: '#fef0f0', color: '#8c2a2a' },
  { key: 'guru', label: 'Data Guru & Tenaga', sub: 'Profil pendidik', bg: '#eef2fc', color: '#0d2660' },
  { key: 'program', label: 'Program Unggulan', sub: 'Kekhasan kami', bg: '#edfaf4', color: '#0a6e4f' },
  { key: 'prestasi', label: 'Prestasi', sub: 'Capaian terbaik', bg: '#fdf8ec', color: '#7a5a0a' },
  { key: 'ekskul', label: 'Ekstrakurikuler', sub: 'Kegiatan siswa', bg: '#fef0f0', color: '#8c2a2a' },
]

export default async function HomePage() {
  const [info, beritaList, fasilitasList, profilList] = await Promise.all([
    getInfo(), getBerita(), getFasilitas(), getProfil(),
  ])

  const sambutanProfil = profilList.find((p: any) => p.key === 'sambutan')

  return (
    <>
      <Navbar npsn={info.npsn} namaSekolah={info.nama_sekolah} />

      {/* HERO */}
      <section style={{ background: '#0d2660', position: 'relative', overflow: 'hidden', padding: '4rem 2rem 3rem' }}>
        {info.foto_hero && (
          <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${info.foto_hero})`, backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.25 }} />
        )}
        <div style={{ position: 'absolute', inset: 0, opacity: 0.06, backgroundImage: 'repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)', backgroundSize: '24px 24px' }} />
        <div style={{ position: 'relative', maxWidth: 860, margin: '0 auto' }}>
          <div style={{ display: 'inline-block', background: 'rgba(200,168,75,0.2)', color: '#c8a84b', fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', padding: '5px 14px', borderRadius: 20, border: '1px solid rgba(200,168,75,0.3)', marginBottom: '1.25rem', textTransform: 'uppercase' }}>
            Sekolah Dasar Negeri — Tangerang Selatan
          </div>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2.6rem', fontWeight: 700, color: '#fff', lineHeight: 1.2, marginBottom: '0.75rem' }}>
            Mendidik Generasi <span style={{ color: '#c8a84b' }}>Berkarakter</span><br />dan Berprestasi
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 14.5, maxWidth: 520, marginBottom: '2rem' }}>
            SD Negeri Serua 3 berkomitmen menghadirkan pendidikan berkualitas yang mengintegrasikan nilai-nilai Pancasila, ilmu pengetahuan, dan pengembangan karakter sejak dini.
          </p>
          <div style={{ display: 'flex', gap: 12 }}>
            <Link href="/ppdb" style={{ background: '#c8a84b', color: '#0d2660', fontWeight: 600, fontSize: 13, padding: '10px 22px', borderRadius: 6 }}>Penerimaan Siswa Baru</Link>
            <Link href="/profil" style={{ background: 'transparent', color: 'rgba(255,255,255,0.8)', fontWeight: 500, fontSize: 13, padding: '10px 22px', borderRadius: 6, border: '1px solid rgba(255,255,255,0.25)' }}>Profil Sekolah</Link>
          </div>
        </div>
      </section>

      {/* INFO BAR */}
      <div style={{ background: '#fff', borderBottom: '1px solid #e8e5de', padding: '0 2rem' }}>
        <div style={{ maxWidth: 860, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)' }}>
          {[
            { label: 'NPSN', value: info.npsn || '20604893' },
            { label: 'Status', value: info.status || 'Negeri / Aktif' },
            { label: 'Akreditasi', value: info.akreditasi || 'A (Unggul)' },
            { label: 'Kota', value: 'Tangerang Selatan' },
          ].map((item, i) => (
            <div key={i} style={{ padding: '1rem 1.25rem', borderRight: i < 3 ? '1px solid #e8e5de' : 'none' }}>
              <div style={{ fontSize: 10, color: '#8a8880', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 2 }}>{item.label}</div>
              <div style={{ fontSize: 12.5, fontWeight: 600, color: '#1a2340' }}>{item.value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* PROFIL SEKOLAH */}
      <section style={{ padding: '3rem 2rem', background: '#f8f7f4' }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <div style={{ fontSize: 10.5, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#0d2660', opacity: 0.5, marginBottom: 6 }}>Tentang Kami</div>
          <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.75rem', fontWeight: 700, color: '#1a2340', marginBottom: '0.5rem' }}>Profil Sekolah</div>
          <p style={{ color: '#6b6860', fontSize: 13.5, marginBottom: '2rem' }}>Informasi lengkap mengenai identitas, visi-misi, dan kelembagaan SD Negeri Serua 3.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: 10 }}>
            {profilCards.map((card) => (
              <Link key={card.key} href={`/profil#${card.key}`} style={{ background: '#fff', border: '1px solid #e8e5de', borderRadius: 10, padding: '1.1rem', textAlign: 'center', display: 'block' }}>
                <div style={{ width: 40, height: 40, background: card.bg, borderRadius: 10, margin: '0 auto 8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: 18, color: card.color }}>◆</span>
                </div>
                <div style={{ fontSize: 12, fontWeight: 600, color: '#1a2340', lineHeight: 1.3 }}>{card.label}</div>
                <div style={{ fontSize: 11, color: '#8a8880', marginTop: 3 }}>{card.sub}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section style={{ background: '#c8a84b' }}>
        <div style={{ maxWidth: 860, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', textAlign: 'center' }}>
          {[
            { num: `${info.jumlah_siswa || '420'}+`, label: 'Siswa Aktif' },
            { num: info.jumlah_guru || '24', label: 'Guru & Tenaga Kependidikan' },
            { num: info.jumlah_rombel || '12', label: 'Rombongan Belajar' },
            { num: info.akreditasi?.charAt(0) || 'A', label: 'Nilai Akreditasi' },
          ].map((s, i) => (
            <div key={i} style={{ padding: '2rem 1rem', borderRight: i < 3 ? '1px solid rgba(13,38,96,0.15)' : 'none' }}>
              <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '2.5rem', fontWeight: 700, color: '#0d2660', lineHeight: 1, marginBottom: 4 }}>{s.num}</div>
              <div style={{ fontSize: 12, color: 'rgba(13,38,96,0.65)', fontWeight: 500 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* SAMBUTAN */}
      <section style={{ background: '#0d2660', padding: '3rem 2rem' }}>
        <div style={{ maxWidth: 860, margin: '0 auto', display: 'grid', gridTemplateColumns: '160px 1fr', gap: '2.5rem', alignItems: 'center' }}>
          <div style={{ width: 140, height: 175, background: 'rgba(255,255,255,0.1)', borderRadius: 10, border: '2px solid rgba(200,168,75,0.4)', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 6 }}>
            {info.foto_kepala_sekolah ? (
              <img src={info.foto_kepala_sekolah} alt="Kepala Sekolah" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <>
                <span style={{ fontSize: 32, opacity: 0.3 }}>👤</span>
                <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', textAlign: 'center', padding: '0 8px' }}>Foto Kepala Sekolah</span>
              </>
            )}
          </div>
          <div>
            <div style={{ fontSize: 10.5, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#c8a84b', marginBottom: 6 }}>Sambutan</div>
            <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.4rem', fontWeight: 700, color: '#fff', marginBottom: '1rem' }}>Kata Kepala Sekolah</div>
            <blockquote style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13.5, lineHeight: 1.75, borderLeft: '3px solid #c8a84b', paddingLeft: '1rem', margin: '1rem 0 1.25rem' }}>
              "{sambutanProfil?.konten || 'Kami percaya bahwa setiap anak membawa potensi yang luar biasa. Tugas kami adalah memastikan lingkungan belajar yang aman, menyenangkan, dan bermakna.'}"
            </blockquote>
            <div>
              <div style={{ color: '#c8a84b', fontWeight: 600, fontSize: 13 }}>{info.kepala_sekolah || 'Kepala Sekolah'}</div>
              <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 11.5 }}>Kepala SD Negeri Serua 3</div>
            </div>
          </div>
        </div>
      </section>

      {/* FASILITAS */}
      <section style={{ padding: '3rem 2rem', background: '#f8f7f4' }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <div style={{ fontSize: 10.5, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#0d2660', opacity: 0.5, marginBottom: 6 }}>Sarana & Prasarana</div>
          <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.75rem', fontWeight: 700, marginBottom: '0.5rem' }}>Fasilitas Sekolah</div>
          <p style={{ color: '#6b6860', fontSize: 13.5, marginBottom: '2rem' }}>Fasilitas lengkap untuk mendukung proses belajar mengajar yang optimal.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, minmax(0, 1fr))', gap: 10 }}>
            {fasilitasList.length > 0 ? fasilitasList.map((f: any) => (
              <div key={f.id} style={{ background: '#fff', border: '1px solid #e8e5de', borderRadius: 10, padding: '1rem', textAlign: 'center' }}>
                <div style={{ width: 44, height: 44, background: '#eef2fc', borderRadius: 10, margin: '0 auto 8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>🏫</div>
                <div style={{ fontSize: 12, fontWeight: 600, color: '#1a2340' }}>{f.nama}</div>
                <div style={{ fontSize: 11, color: '#8a8880', marginTop: 2 }}>{f.deskripsi}</div>
              </div>
            )) : ['Ruang Kelas', 'Lab Komputer', 'Perpustakaan', 'Lapangan Olahraga', 'Kantin Sehat'].map((n) => (
              <div key={n} style={{ background: '#fff', border: '1px solid #e8e5de', borderRadius: 10, padding: '1rem', textAlign: 'center' }}>
                <div style={{ width: 44, height: 44, background: '#eef2fc', borderRadius: 10, margin: '0 auto 8px' }} />
                <div style={{ fontSize: 12, fontWeight: 600, color: '#1a2340' }}>{n}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BERITA */}
      <section style={{ padding: '3rem 2rem', background: '#fff' }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '1.5rem' }}>
            <div>
              <div style={{ fontSize: 10.5, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#0d2660', opacity: 0.5, marginBottom: 6 }}>Informasi Terkini</div>
              <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.75rem', fontWeight: 700 }}>Berita & Pengumuman</div>
            </div>
            <Link href="/berita" style={{ fontSize: 12.5, color: '#0d2660', fontWeight: 600 }}>Lihat semua →</Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 14 }}>
            {beritaList.map((b: any) => (
              <Link key={b.id} href={`/berita/${b.slug}`} style={{ border: '1px solid #e8e5de', borderRadius: 10, overflow: 'hidden', display: 'block' }}>
                <div style={{ height: 120, background: '#eef2fc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: 32, opacity: 0.3 }}>📰</span>
                </div>
                <div style={{ padding: '1rem' }}>
                  <span style={{ display: 'inline-block', background: '#eef2fc', color: '#0d2660', fontSize: 10, fontWeight: 600, padding: '3px 8px', borderRadius: 4, marginBottom: 6 }}>
                    {kategoriLabel[b.kategori] || b.kategori}
                  </span>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#1a2340', lineHeight: 1.4, marginBottom: 6 }}>{b.judul}</div>
                  <div style={{ fontSize: 11.5, color: '#8a8880' }}>
                    {b.publishedAt ? new Date(b.publishedAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : ''}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* KONTAK */}
      <section style={{ padding: '3rem 2rem', background: '#f8f7f4' }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <div style={{ fontSize: 10.5, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#0d2660', opacity: 0.5, marginBottom: 6 }}>Hubungi Kami</div>
          <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.75rem', fontWeight: 700, marginBottom: '0.5rem' }}>Informasi Kontak</div>
          <p style={{ color: '#6b6860', fontSize: 13.5, marginBottom: '2rem' }}>Kami siap melayani pertanyaan dan kebutuhan informasi Anda.</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', alignItems: 'start' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[
                { label: 'Alamat', value: info.alamat || 'Jl. Serua Raya No. 1, Serua, Ciputat, Kota Tangerang Selatan', icon: '📍' },
                { label: 'Telepon', value: info.telepon || '(021) 7490001', icon: '📞' },
                { label: 'Email', value: info.email || 'sdnserua3@dindiktangsel.go.id', icon: '✉️' },
                { label: 'Jam Operasional', value: info.jam_operasional || 'Senin – Jumat: 07.00 – 15.00 WIB', icon: '🕐' },
              ].map((item) => (
                <div key={item.label} style={{ display: 'flex', gap: 12 }}>
                  <div style={{ width: 36, height: 36, background: '#eef2fc', borderRadius: 8, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>{item.icon}</div>
                  <div>
                    <div style={{ fontSize: 11, color: '#8a8880', marginBottom: 2 }}>{item.label}</div>
                    <div style={{ fontSize: 13, fontWeight: 500, color: '#1a2340' }}>{item.value}</div>
                  </div>
                </div>
              ))}
            </div>
            <KontakForm />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: '#0b1e4d', padding: '2.5rem 2rem 1.25rem' }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.8fr 1fr 1fr', gap: '2rem', paddingBottom: '2rem', borderBottom: '1px solid rgba(255,255,255,0.08)', marginBottom: '1.25rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                <div style={{ width: 34, height: 34, background: '#c8a84b', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Playfair Display, serif', fontSize: 13, fontWeight: 700, color: '#0d2660' }}>SD</div>
                <div>
                  <div style={{ color: '#fff', fontWeight: 600, fontSize: 13 }}>SD Negeri Serua 3</div>
                  <div style={{ color: '#c8a84b', fontSize: 10.5 }}>Tangerang Selatan</div>
                </div>
              </div>
              <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 12, lineHeight: 1.7, marginTop: 10, maxWidth: 260 }}>
                Sekolah Dasar Negeri terpercaya di Kota Tangerang Selatan yang berkomitmen mencetak generasi unggul dan berkarakter Pancasila.
              </p>
            </div>
            <div>
              <div style={{ color: '#c8a84b', fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 12 }}>Navigasi</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                {[['/', 'Beranda'], ['/profil', 'Profil Sekolah'], ['/akademik', 'Akademik'], ['/berita', 'Berita'], ['/galeri', 'Galeri']].map(([href, label]) => (
                  <Link key={href} href={href} style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12.5 }}>{label}</Link>
                ))}
              </div>
            </div>
            <div>
              <div style={{ color: '#c8a84b', fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 12 }}>Layanan</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                {[['/ppdb', 'PPDB Online'], ['/akademik', 'Kalender Akademik'], ['/kontak', 'Kontak Kami']].map(([href, label]) => (
                  <Link key={href} href={href} style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12.5 }}>{label}</Link>
                ))}
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: 11.5 }}>© {new Date().getFullYear()} SD Negeri Serua 3 — Dinas Pendidikan Kota Tangerang Selatan</p>
            <p style={{ color: 'rgba(255,255,255,0.2)', fontSize: 11.5 }}>NPSN 20604893</p>
          </div>
        </div>
      </footer>
    </>
  )}