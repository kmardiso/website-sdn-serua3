import Link from 'next/link'

export default function Footer() {
  return (
    <footer style={{ background: '#1B2D6B', color: '#fff', padding: '3rem 1.5rem 1.5rem' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '2rem', paddingBottom: '2rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <div style={{ width: 40, height: 40, background: '#C8A84B', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 14, color: '#1B2D6B' }}>SD</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 14 }}>SD Negeri Serua 3</div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)' }}>Tangerang Selatan</div>
              </div>
            </div>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, maxWidth: 260 }}>
              Menjadi lembaga pendidikan dasar unggulan yang membentuk karakter siswa cerdas, amanah, dan berakhlak mulia.
            </p>
          </div>

          <div>
            <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 16, color: '#C8A84B' }}>TENTANG KAMI</div>
            {[['/', 'Beranda'], ['/profil', 'Identitas Sekolah'], ['/profil#visi', 'Visi & Misi'], ['/profil#struktur', 'Struktur Organisasi']].map(([href, label]) => (
              <Link key={href} href={href} style={{ display: 'block', fontSize: 13, color: 'rgba(255,255,255,0.65)', marginBottom: 10 }}>{label}</Link>
            ))}
          </div>

          <div>
            <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 16, color: '#C8A84B' }}>INFORMASI</div>
            {[['/berita', 'Berita & Info'], ['/akademik', 'Akademik'], ['/galeri', 'Galeri']].map(([href, label]) => (
              <Link key={href} href={href} style={{ display: 'block', fontSize: 13, color: 'rgba(255,255,255,0.65)', marginBottom: 10 }}>{label}</Link>
            ))}
          </div>

          <div>
            <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 16, color: '#C8A84B' }}>HUBUNGI KAMI</div>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)', lineHeight: 1.7 }}>
              <p>Jl. Serua Raya No. 3, Serua, Kec. Ciputat, Kota Tangerang Selatan, Banten 15414</p>
              <p style={{ marginTop: 8 }}>(021) 7463-XXXX</p>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1.5rem', fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>
          <span>© {new Date().getFullYear()} SD Negeri Serua 3. All rights reserved.</span>
          <span>NPSN 20604893</span>
        </div>
      </div>
    </footer>
  )
}