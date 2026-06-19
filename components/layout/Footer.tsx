import Link from 'next/link'

export default function Footer() {
  return (
    <footer style={{ background: '#1B2D6B', color: '#fff', padding: '3rem 1.5rem 1.5rem' }}>
      <style>{`
        .footer-grid { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 2rem; }
        .footer-bottom { display: flex; justify-content: space-between; align-items: center; }
        @media (max-width: 768px) {
          .footer-grid { grid-template-columns: 1fr 1fr; }
          .footer-bottom { flex-direction: column; gap: 8px; text-align: center; }
        }
        @media (max-width: 480px) {
          .footer-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div className="footer-grid" style={{ paddingBottom: '2rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <img src="/Logo.png" alt="Logo" style={{ width: 40, height: 40, objectFit: 'contain', borderRadius: 8 }} />
              <div>
                <div style={{ fontWeight: 700, fontSize: 14 }}>SD Negeri Serua 3 Depok</div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)' }}>Bonjong Sari</div>
              </div>
            </div>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, maxWidth: 260 }}>
              Menjadi lembaga pendidikan dasar unggulan yang membentuk karakter siswa cerdas, amanah, dan berakhlak mulia.
            </p>
          </div>

          <div>
            <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 16, color: '#C8A84B' }}>TENTANG KAMI</div>
            {[['/', 'Beranda'], ['/profil', 'Identitas Sekolah'], ['/profil#visi', 'Visi & Misi'], ['/profil#struktur', 'Struktur Organisasi']].map(([href, label]) => (
              <Link key={href} href={href} style={{ display: 'block', fontSize: 13, color: 'rgba(255,255,255,0.65)', marginBottom: 10, textDecoration: 'none' }}>{label}</Link>
            ))}
          </div>

          <div>
            <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 16, color: '#C8A84B' }}>INFORMASI</div>
            {[['/berita', 'Berita & Info'], ['/akademik', 'Akademik'], ['/galeri', 'Galeri']].map(([href, label]) => (
              <Link key={href} href={href} style={{ display: 'block', fontSize: 13, color: 'rgba(255,255,255,0.65)', marginBottom: 10, textDecoration: 'none' }}>{label}</Link>
            ))}
          </div>

          <div>
            <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 16, color: '#C8A84B' }}>HUBUNGI KAMI</div>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)', lineHeight: 1.7 }}>
              <p>Jl. Serua Raya, Serua, Kec. Bojongsari, Kota Depok, Jawa Barat 16523.</p>
              <p style={{ marginTop: 8 }}>(021) 7463-XXXX</p>
            </div>
          </div>
        </div>

        <div className="footer-bottom" style={{ paddingTop: '1.5rem', fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>
          <span>© {new Date().getFullYear()} SD Negeri Serua 3 . All rights reserved.</span>
          <span>NPSN 20604893</span>
        </div>
      </div>
    </footer>
  )
}