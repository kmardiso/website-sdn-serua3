import Navbar from '@/components/layout/Navbar'
import Link from 'next/link'

async function getProfil() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/profil`, { next: { revalidate: 3600 } })
    const json = await res.json()
    const list = json.data || []
    const map: Record<string, any> = {}
    list.forEach((p: any) => { map[p.key] = p })
    return map
  } catch { return {} }
}

async function getGuru() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/guru`, { next: { revalidate: 3600 } })
    const json = await res.json()
    return json.data || []
  } catch { return [] }
}

async function getInfo() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/info`, { next: { revalidate: 3600 } })
    const json = await res.json()
    return json.data || {}
  } catch { return {} }
}

export default async function ProfilPage() {
  const [profil, guruList, info] = await Promise.all([getProfil(), getGuru(), getInfo()])

  const pengajar = guruList.filter((g: any) => g.jabatan?.toLowerCase().includes('guru') || g.mapel)
  const tendik = guruList.filter((g: any) => !g.jabatan?.toLowerCase().includes('guru') && !g.mapel)

  const sectionStyle: React.CSSProperties = {
    padding: '3rem 2rem',
    scrollMarginTop: 80,
  }

  const titleStyle: React.CSSProperties = {
    fontFamily: 'Playfair Display, serif',
    fontSize: '1.5rem',
    fontWeight: 700,
    color: '#1a2340',
    marginBottom: '1rem',
  }

  return (
    <>
      <Navbar npsn={info.npsn} namaSekolah={info.nama_sekolah} />

      {/* HERO */}
      <section style={{ background: '#0d2660', padding: '3rem 2rem' }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#c8a84b', marginBottom: 8 }}>Tentang Kami</div>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2rem', fontWeight: 700, color: '#fff', marginBottom: '0.5rem' }}>Profil Sekolah</h1>
          <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 14 }}>Informasi lengkap mengenai SD Negeri Serua 3, Tangerang Selatan</p>
        </div>
      </section>

      {/* SIDEBAR + CONTENT LAYOUT */}
      <div style={{ display: 'flex', maxWidth: 1100, margin: '0 auto', padding: '0 2rem' }}>

        {/* SIDEBAR NAVIGASI */}
        <aside style={{ width: 200, flexShrink: 0, paddingTop: '2rem', paddingRight: '1.5rem' }}>
          <div style={{ position: 'sticky', top: 80 }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: '#8a8880', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 12 }}>Menu Profil</div>
            {[
              ['#identitas', 'Identitas Sekolah'],
              ['#visi', 'Visi & Misi'],
              ['#sejarah', 'Sejarah Singkat'],
              ['#struktur', 'Struktur Organisasi'],
              ['#guru', 'Staf Pengajar'],
              ['#tendik', 'Staf Tenaga Kependidikan'],
            ].map(([href, label]) => (
              <a key={href} href={href} style={{ display: 'block', padding: '8px 10px', fontSize: 13, color: '#4a4840', borderRadius: 6, marginBottom: 2, textDecoration: 'none', borderLeft: '2px solid transparent' }}
                onMouseEnter={e => { e.currentTarget.style.background = '#f0ede6'; e.currentTarget.style.borderLeftColor = '#c8a84b' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderLeftColor = 'transparent' }}>
                {label}
              </a>
            ))}
          </div>
        </aside>

        {/* KONTEN */}
        <main style={{ flex: 1, minWidth: 0 }}>

          {/* IDENTITAS SEKOLAH */}
          <section id="identitas" style={{ ...sectionStyle, borderBottom: '1px solid #e8e5de' }}>
            <div style={titleStyle}>Identitas Sekolah</div>
            <div style={{ background: '#fff', border: '1px solid #e8e5de', borderRadius: 12, overflow: 'hidden' }}>
              {[
                ['Nama Sekolah', info.nama_sekolah || 'SD Negeri Serua 3'],
                ['NPSN', info.npsn || '20604893'],
                ['Status', info.status || 'Negeri / Aktif'],
                ['Akreditasi', info.akreditasi || 'A (Unggul)'],
                ['Alamat', info.alamat || 'Jl. Serua Raya No. 1, Serua, Ciputat, Kota Tangerang Selatan'],
                ['Telepon', info.telepon || '(021) 7490001'],
                ['Email', info.email || 'sdnserua3@dindiktangsel.go.id'],
                ['Jam Operasional', info.jam_operasional || 'Senin – Jumat: 07.00 – 15.00 WIB'],
                ['Kepala Sekolah', info.kepala_sekolah || '-'],
              ].map(([k, v], i) => (
                <div key={k} style={{ display: 'flex', borderBottom: i < 8 ? '1px solid #f0ede6' : 'none' }}>
                  <div style={{ width: 200, padding: '12px 16px', fontSize: 13, fontWeight: 600, color: '#4a4840', background: '#f8f7f4', flexShrink: 0 }}>{k}</div>
                  <div style={{ padding: '12px 16px', fontSize: 13, color: '#1a2340', flex: 1 }}>{v}</div>
                </div>
              ))}
            </div>
          </section>

          {/* VISI & MISI */}
          <section id="visi" style={{ ...sectionStyle, borderBottom: '1px solid #e8e5de' }}>
            <div style={titleStyle}>Visi & Misi</div>
            <div style={{ background: '#0d2660', borderRadius: 12, padding: '1.5rem 2rem', marginBottom: 16 }}>
              <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#c8a84b', marginBottom: 8 }}>Visi</div>
              <p style={{ color: '#fff', fontSize: 15, lineHeight: 1.7, fontFamily: 'Playfair Display, serif', fontStyle: 'italic' }}>
                {profil.visi?.konten?.split('Misi:')[0]?.replace('Visi:', '').trim() ||
                  'Terwujudnya peserta didik yang beriman, berkarakter, berprestasi, dan berwawasan lingkungan.'}
              </p>
            </div>
            <div style={{ background: '#fff', border: '1px solid #e8e5de', borderRadius: 12, padding: '1.5rem 2rem' }}>
              <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#0d2660', marginBottom: 12 }}>Misi</div>
              {[
                'Menyelenggarakan pembelajaran aktif, kreatif, efektif, dan menyenangkan',
                'Menumbuhkan penghayatan terhadap ajaran agama dan budaya bangsa',
                'Mengembangkan potensi peserta didik secara optimal',
                'Menciptakan lingkungan sekolah yang bersih, indah, dan nyaman',
                'Menjalin kerjasama yang harmonis antara warga sekolah dan masyarakat',
              ].map((m, i) => (
                <div key={i} style={{ display: 'flex', gap: 12, marginBottom: 10, alignItems: 'flex-start' }}>
                  <div style={{ width: 22, height: 22, background: '#eef2fc', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: '#0d2660', flexShrink: 0, marginTop: 1 }}>{i + 1}</div>
                  <p style={{ fontSize: 13.5, color: '#1a2340', lineHeight: 1.6, margin: 0 }}>{m}</p>
                </div>
              ))}
            </div>
          </section>

          {/* SEJARAH */}
          <section id="sejarah" style={{ ...sectionStyle, borderBottom: '1px solid #e8e5de' }}>
            <div style={titleStyle}>Sejarah Singkat</div>
            <div style={{ fontSize: 14, lineHeight: 1.85, color: '#2a3050' }}>
              <p style={{ marginBottom: '1rem' }}>
                {profil.sejarah?.konten || 'SD Negeri Serua 3 berdiri sejak tahun 1975 dan telah melayani masyarakat Ciputat selama lebih dari 4 dekade. Sekolah ini didirikan dalam rangka memenuhi kebutuhan pendidikan dasar bagi masyarakat di wilayah Serua dan sekitarnya.'}
              </p>
              <p style={{ marginBottom: '1rem' }}>
                Sejak awal berdirinya, SD Negeri Serua 3 telah mengalami berbagai perkembangan baik dari segi infrastruktur, kurikulum, maupun kualitas tenaga pengajar. Dengan dukungan penuh dari Dinas Pendidikan Kota Tangerang Selatan, sekolah ini terus berbenah untuk memberikan pelayanan pendidikan terbaik.
              </p>
              <p>
                Hingga saat ini, SD Negeri Serua 3 telah meluluskan ribuan siswa yang tersebar di berbagai penjuru Indonesia dan berkontribusi positif bagi masyarakat.
              </p>
            </div>
          </section>

          {/* STRUKTUR ORGANISASI */}
          <section id="struktur" style={{ ...sectionStyle, borderBottom: '1px solid #e8e5de' }}>
            <div style={titleStyle}>Struktur Organisasi</div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>

              {/* KEPALA SEKOLAH */}
              <div style={{ background: '#0d2660', color: '#fff', borderRadius: 10, padding: '12px 24px', textAlign: 'center', minWidth: 200 }}>
                <div style={{ fontSize: 11, color: '#c8a84b', fontWeight: 600, marginBottom: 4 }}>Kepala Sekolah</div>
                <div style={{ fontSize: 14, fontWeight: 600 }}>{info.kepala_sekolah || 'Dra. Sri Wahyuni, M.Pd.'}</div>
              </div>

              <div style={{ width: 1, height: 24, background: '#e8e5de' }} />

              {/* LEVEL 2 */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, width: '100%' }}>
                {[
                  { jabatan: 'Komite Sekolah', nama: '-' },
                  { jabatan: 'Operator Sekolah', nama: '-' },
                  { jabatan: 'Bendahara', nama: '-' },
                ].map((item) => (
                  <div key={item.jabatan} style={{ background: '#fff', border: '1px solid #e8e5de', borderRadius: 8, padding: '10px 14px', textAlign: 'center' }}>
                    <div style={{ fontSize: 11, color: '#8a8880', fontWeight: 600, marginBottom: 4 }}>{item.jabatan}</div>
                    <div style={{ fontSize: 13, fontWeight: 500, color: '#1a2340' }}>{item.nama}</div>
                  </div>
                ))}
              </div>

              <div style={{ width: 1, height: 24, background: '#e8e5de' }} />

              {/* WALI KELAS */}
              <div style={{ background: '#eef2fc', border: '1px solid #b5d4f4', borderRadius: 8, padding: '10px 24px', textAlign: 'center' }}>
                <div style={{ fontSize: 11, color: '#0d2660', fontWeight: 600, marginBottom: 2 }}>Wali Kelas & Guru Mata Pelajaran</div>
                <div style={{ fontSize: 12, color: '#6b6860' }}>Kelas 1 – 6</div>
              </div>

            </div>
            <p style={{ fontSize: 12.5, color: '#8a8880', textAlign: 'center', marginTop: '1.5rem' }}>
              * Data struktur organisasi lengkap dapat diperbarui melalui panel admin
            </p>
          </section>

          {/* STAF PENGAJAR */}
          <section id="guru" style={{ ...sectionStyle, borderBottom: '1px solid #e8e5de' }}>
            <div style={titleStyle}>Staf Pengajar</div>
            {pengajar.length > 0 ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 12 }}>
                {pengajar.map((g: any) => (
                  <div key={g.id} style={{ background: '#fff', border: '1px solid #e8e5de', borderRadius: 10, padding: '1rem', display: 'flex', gap: 12, alignItems: 'center' }}>
                    <div style={{ width: 44, height: 44, background: '#eef2fc', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 700, color: '#0d2660', flexShrink: 0 }}>
                      {g.nama?.charAt(0)}
                    </div>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: '#1a2340' }}>{g.nama}</div>
                      <div style={{ fontSize: 11.5, color: '#8a8880' }}>{g.jabatan}</div>
                      {g.mapel && <div style={{ fontSize: 11, color: '#0d2660', marginTop: 2 }}>{g.mapel}</div>}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ background: '#f8f7f4', borderRadius: 10, padding: '2rem', textAlign: 'center', color: '#8a8880', fontSize: 13 }}>
                Data staf pengajar belum ditambahkan. Tambahkan melalui panel admin.
              </div>
            )}
          </section>

          {/* TENAGA KEPENDIDIKAN */}
          <section id="tendik" style={sectionStyle}>
            <div style={titleStyle}>Staf Tenaga Kependidikan</div>
            {tendik.length > 0 ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 12 }}>
                {tendik.map((g: any) => (
                  <div key={g.id} style={{ background: '#fff', border: '1px solid #e8e5de', borderRadius: 10, padding: '1rem', display: 'flex', gap: 12, alignItems: 'center' }}>
                    <div style={{ width: 44, height: 44, background: '#fdf8ec', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 700, color: '#7a5a0a', flexShrink: 0 }}>
                      {g.nama?.charAt(0)}
                    </div>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: '#1a2340' }}>{g.nama}</div>
                      <div style={{ fontSize: 11.5, color: '#8a8880' }}>{g.jabatan}</div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ background: '#f8f7f4', borderRadius: 10, padding: '2rem', textAlign: 'center', color: '#8a8880', fontSize: 13 }}>
                Data tenaga kependidikan belum ditambahkan. Tambahkan melalui panel admin.
              </div>
            )}
          </section>

        </main>
      </div>

      {/* FOOTER */}
      <footer style={{ background: '#0b1e4d', padding: '1.5rem 2rem', marginTop: '2rem' }}>
        <div style={{ maxWidth: 860, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: 12 }}>© {new Date().getFullYear()} SD Negeri Serua 3 — Tangerang Selatan</p>
          <Link href="/" style={{ color: 'rgba(255,255,255,0.4)', fontSize: 12 }}>Kembali ke Beranda</Link>
        </div>
      </footer>
    </>
  )
}
