import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import ProfilSidebar from '@/components/layout/ProfilSidebar'

async function getInfo() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/info`, { cache: 'no-store' })
    const json = await res.json()
    return json.data || {}
  } catch { return {} }
}

async function getGuru() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/guru`, { cache: 'no-store' })
    const json = await res.json()
    return json.data || []
  } catch { return [] }
}

const fotoGuru = [
  'https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=100&q=10',
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&q=10',
  'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?w=100&q=10',
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&q=10',
  'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100&q=10',
  'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=100&q=10',
]

export default async function ProfilPage() {
  const [info, guruList] = await Promise.all([getInfo(), getGuru()])
  const pengajar = guruList.filter((g: any) => g.mapel || g.jabatan?.toLowerCase().includes('guru'))
  const tendik = guruList.filter((g: any) => !g.mapel && !g.jabatan?.toLowerCase().includes('guru'))

  return (
    <>
      <Navbar />

      {/* HERO */}
      <section style={{ background: 'linear-gradient(135deg, #1B2D6B, #2a4090)', padding: '3rem 1.5rem' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', marginBottom: 8 }}>Beranda &rsaquo; Profil</div>
          <h1 style={{ fontWeight: 800, fontSize: '2rem', color: '#fff' }}>Profil Sekolah</h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14, marginTop: 8 }}>Informasi resmi mengenai identitas dan data administratif SD Negeri Serua 3</p>
        </div>
      </section>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '2rem 1.5rem', display: 'grid', gridTemplateColumns: '240px 1fr', gap: '2rem', alignItems: 'start' }}>

        {/* SIDEBAR SEKARANG MENGGUNAKAN COMPONENT CLIENT */}
        <ProfilSidebar />

        {/* KONTEN */}
        <main>
          {/* IDENTITAS */}
          <section id="identitas" style={{ background: '#fff', borderRadius: 16, border: '1px solid #e5e7eb', padding: '2rem', marginBottom: '1.5rem', scrollMarginTop: 100 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 240px', gap: '2rem' }}>
              <div>
                <h2 style={{ fontWeight: 800, fontSize: '1.5rem', color: '#1B2D6B', marginBottom: 24 }}>Identitas Sekolah</h2>
                <p style={{ color: '#6b7280', fontSize: 13.5, marginBottom: 24 }}>Informasi resmi mengenai identitas dan data administratif SD Negeri Serua 3, dikelola secara transparan dan akuntabel.</p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  {[
                    ['NAMA SEKOLAH', info.nama_sekolah || 'SD NEGERI SERUA 3'],
                    ['NPSN', info.npsn || '20613589'],
                    ['NSS', '101036002003'],
                    ['BENTUK PENDIDIKAN', 'Sekolah Dasar (SD)'],
                    ['STATUS SEKOLAH', '✦ Negeri'],
                    ['KURIKULUM', 'Kurikulum Merdeka'],
                  ].map(([k, v]) => (
                    <div key={k} style={{ padding: '12px 0', borderBottom: '1px solid #f3f4f6' }}>
                      <div style={{ fontSize: 11, fontWeight: 600, color: '#9ca3af', letterSpacing: '0.06em', marginBottom: 4 }}>{k}</div>
                      <div style={{ fontSize: 14, fontWeight: 600, color: '#1a1a2e' }}>{v}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div style={{ background: 'linear-gradient(135deg, #1B2D6B, #2a4090)', borderRadius: 16, padding: '1.5rem', textAlign: 'center', color: '#fff', marginBottom: 12 }}>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)', marginBottom: 8 }}>Status Akreditasi</div>
                  <div style={{ fontWeight: 800, fontSize: '3rem', color: '#C8A84B' }}>A</div>
                  <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.8)', marginTop: 4 }}>Unggul dengan Nilai 95</div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)', marginTop: 4 }}>001.AK/2023</div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)' }}>31 Desember 2028</div>
                </div>
                <div style={{ background: '#f9fafb', borderRadius: 12, padding: '1rem' }}>
                  <div style={{ fontSize: 11, color: '#6b7280', marginBottom: 6 }}>Waktu Penyelenggaraan</div>
                  <div style={{ fontWeight: 600, fontSize: 13, color: '#1B2D6B' }}>Double Shift</div>
                  <div style={{ fontSize: 12, color: '#9ca3af' }}>Pagi & Siang</div>
                </div>
              </div>
            </div>

            {/* LOKASI */}
            <div style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid #f3f4f6' }}>
              <h3 style={{ fontWeight: 700, fontSize: '1.1rem', color: '#1B2D6B', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>📍 Lokasi & Kontak</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                {[
                  { icon: '📍', label: 'Alamat Lengkap', value: info.alamat || 'Jl. Serua Raya No. 3, Kelurahan Serua, Kecamatan Ciputat, Kota Tangerang Selatan, Banten 15414' },
                  { icon: '✉️', label: 'Email Resmi', value: info.email || 'info@sdnserua3.sch.id' },
                  { icon: '📞', label: 'Telepon & WhatsApp', value: info.telepon || '(021) 7463-XXXX' },
                  { icon: '🕐', label: 'Jam Operasional', value: info.jam_operasional || 'Senin - Jumat: 07.00 – 15.00' },
                ].map(item => (
                  <div key={item.label} style={{ display: 'flex', gap: 12, padding: '1rem', background: '#f9fafb', borderRadius: 10 }}>
                    <span style={{ fontSize: 20 }}>{item.icon}</span>
                    <div>
                      <div style={{ fontSize: 11, fontWeight: 600, color: '#9ca3af', marginBottom: 4 }}>{item.label}</div>
                      <div style={{ fontSize: 13, color: '#374151', fontWeight: 500 }}>{item.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* VISI MISI */}
          <section id="visi" style={{ background: '#fff', borderRadius: 16, border: '1px solid #e5e7eb', padding: '2rem', marginBottom: '1.5rem', scrollMarginTop: 100 }}>
            <h2 style={{ fontWeight: 800, fontSize: '1.5rem', color: '#1B2D6B', marginBottom: 8 }}>Visi & Misi</h2>
            <div style={{ fontSize: 11, fontWeight: 600, color: '#C8A84B', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 20 }}>ASPIRATIONS IN REACH</div>

            <div style={{ background: 'linear-gradient(135deg, #1B2D6B, #2a4090)', borderRadius: 12, padding: '1.5rem', marginBottom: 24 }}>
              <div style={{ fontSize: 11, color: '#C8A84B', fontWeight: 600, marginBottom: 8 }}>VISI SEKOLAH</div>
              <p style={{ color: '#fff', fontSize: 15, fontWeight: 600, lineHeight: 1.6, fontStyle: 'italic' }}>
                "Terwujudnya Peserta Didik yang Berakhak Mulia, Berprestasi, Mandiri, dan Berwawasan Lingkungan Global."
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              {[
                { icon: '✨', title: 'Akhlak Mulia', desc: 'Memandu terbentuknya karakter dan keimanan yang kuat melalui pembiasaan perilaku religius di sekolah.' },
                { icon: '🎓', title: 'Akademik Unggul', desc: 'Meningkatkan mutu pendidikan yang berkualitas dan berdaya saing global melalui inovasi pembelajaran.' },
                { icon: '🌱', title: 'Kemandirian', desc: 'Menciptakan lingkungan belajar yang kondusif untuk menumbuhkan jiwa kepemimpinan dan kemandirian siswa.' },
                { icon: '🌍', title: 'Wawasan Lingkungan', desc: 'Membiasakan budaya peduli lingkungan hidup melalui program pelestarian dan pencegahan pencemaran.' },
              ].map((m, i) => (
                <div key={i} style={{ background: '#f9fafb', borderRadius: 12, padding: '1.25rem' }}>
                  <div style={{ fontSize: 24, marginBottom: 8 }}>{m.icon}</div>
                  <h4 style={{ fontWeight: 700, fontSize: 14, color: '#1B2D6B', marginBottom: 6 }}>{m.title}</h4>
                  <p style={{ fontSize: 13, color: '#6b7280', lineHeight: 1.6 }}>{m.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* STRUKTUR ORGANISASI */}
          <section id="struktur" style={{ background: '#fff', borderRadius: 16, border: '1px solid #e5e7eb', padding: '2rem', marginBottom: '1.5rem', scrollMarginTop: 100 }}>
            <h2 style={{ fontWeight: 800, fontSize: '1.5rem', color: '#1B2D6B', marginBottom: 8 }}>Struktur Organisasi</h2>
            <p style={{ color: '#6b7280', fontSize: 13.5, marginBottom: 24 }}>Sinergi antara kepemimpinan, komite sekolah, dan tenaga pengajar untuk mewujudkan pendidikan berkualitas.</p>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
              <div style={{ background: 'linear-gradient(135deg, #1B2D6B, #2a4090)', color: '#fff', borderRadius: 12, padding: '16px 32px', textAlign: 'center', minWidth: 220 }}>
                <div style={{ fontSize: 11, color: '#C8A84B', fontWeight: 600, marginBottom: 4 }}>KEPALA SEKOLAH</div>
                <div style={{ fontWeight: 700, fontSize: 15 }}>{info.kepala_sekolah || 'Drs. H. Muliyati, M.Pd'}</div>
              </div>
              <div style={{ width: 2, height: 24, background: '#e5e7eb' }} />
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12, width: '100%', maxWidth: 500 }}>
                {[
                  { role: 'KETUA KOMITE', name: 'Siti Aminah, S.Soc' },
                  { role: 'KEPALA TATA USAHA', name: 'Ahmad Fauzi' },
                ].map(item => (
                  <div key={item.role} style={{ background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: 10, padding: '12px 16px', textAlign: 'center' }}>
                    <div style={{ fontSize: 11, color: '#9ca3af', fontWeight: 600, marginBottom: 4 }}>{item.role}</div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: '#1B2D6B' }}>{item.name}</div>
                  </div>
                ))}
              </div>
              <div style={{ width: 2, height: 24, background: '#e5e7eb' }} />
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, width: '100%' }}>
                {[
                  { role: 'KURIKULUM', name: 'Putri Santoso, S.Pd', color: '#1B2D6B' },
                  { role: 'KESISWAAN', name: 'Fitria Hermanto, S.Pd', color: '#C8A84B' },
                  { role: 'SARANA', name: 'Joko Wibowo, S.Pd', color: '#10b981' },
                  { role: 'HUMAS', name: 'Ani Lestari, M.Si', color: '#8b5cf6' },
                ].map(item => (
                  <div key={item.role} style={{ background: '#fff', border: `2px solid ${item.color}`, borderRadius: 10, padding: '10px', textAlign: 'center' }}>
                    <div style={{ fontSize: 10, color: item.color, fontWeight: 700, marginBottom: 4 }}>{item.role}</div>
                    <div style={{ fontSize: 12, fontWeight: 600, color: '#374151' }}>{item.name}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* STAF PENGAJAR */}
          <section id="guru" style={{ background: '#fff', borderRadius: 16, border: '1px solid #e5e7eb', padding: '2rem', marginBottom: '1.5rem', scrollMarginTop: 100 }}>
            <h2 style={{ fontWeight: 800, fontSize: '1.5rem', color: '#1B2D6B', marginBottom: 8 }}>Staf Pengajar</h2>
            <p style={{ color: '#6b7280', fontSize: 13.5, marginBottom: 24 }}>Mengenal para profesional yang membimbing dan menginspirasi generasi muda di SD Negeri Serua 3.</p>

            {pengajar.length > 0 ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
                {pengajar.map((g: any, i: number) => (
                  <div key={g.id} style={{ background: '#f9fafb', borderRadius: 12, padding: '1.25rem', display: 'flex', alignItems: 'center', gap: 12 }}>
                    <img src={g.foto || fotoGuru[i % fotoGuru.length]} alt={g.nama} style={{ width: 50, height: 50, borderRadius: '50%', objectFit: 'cover', border: '2px solid #e5e7eb' }} />
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 13.5, color: '#1B2D6B' }}>{g.nama}</div>
                      <div style={{ fontSize: 12, color: '#6b7280' }}>{g.jabatan}</div>
                      {g.mapel && <div style={{ fontSize: 11, color: '#9ca3af' }}>{g.mapel}</div>}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
                {['Hj. Siti Aminah, M.Pd', 'Budi Santoso, S.Pd', 'Larasati Putri, S.Pd', 'Andi Wijaya, S.Pd', 'Pandung Slamet, S.Pd', 'Siska Rini, S.Pd'].map((nama, i) => (
                  <div key={i} style={{ background: '#f9fafb', borderRadius: 12, padding: '1.25rem', display: 'flex', alignItems: 'center', gap: 12 }}>
                    <img src={fotoGuru[i % fotoGuru.length]} alt={nama} style={{ width: 50, height: 50, borderRadius: '50%', objectFit: 'cover', border: '2px solid #e5e7eb' }} />
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 13.5, color: '#1B2D6B' }}>{nama}</div>
                      <div style={{ fontSize: 12, color: '#6b7280' }}>Guru Kelas {i + 1}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* TENDIK */}
          <section id="tendik" style={{ background: '#fff', borderRadius: 16, border: '1px solid #e5e7eb', padding: '2rem', scrollMarginTop: 100 }}>
            <h2 style={{ fontWeight: 800, fontSize: '1.5rem', color: '#1B2D6B', marginBottom: 8 }}>Staf Tenaga Kependidikan</h2>
            <p style={{ color: '#6b7280', fontSize: 13.5, marginBottom: 24 }}>Mengenal para profesional yang membantu operasional dan administratif SD Negeri Serua 3.</p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
              {(tendik.length > 0 ? tendik : [
                { nama: 'Ahmad Fauzi', jabatan: 'Kepala Tata Usaha' },
                { nama: 'Suharto', jabatan: 'Staf Administrasi' },
                { nama: 'Muriyati', jabatan: 'Staf Kebersihan & Keamanan' },
              ]).map((g: any, i: number) => (
                <div key={i} style={{ background: '#f9fafb', borderRadius: 12, padding: '1.25rem', display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 50, height: 50, background: '#EEF2FF', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>👤</div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 13.5, color: '#1B2D6B' }}>{g.nama}</div>
                    <div style={{ fontSize: 12, color: '#6b7280' }}>{g.jabatan}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>

      <Footer />
    </>
  )
}