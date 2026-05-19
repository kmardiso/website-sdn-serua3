import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default function AkademikPage() {
  return (
    <>
      <Navbar />

      {/* HERO */}
      <section style={{ background: 'linear-gradient(135deg, #1B2D6B, #2a4090)', padding: '3rem 1.5rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', marginBottom: 8 }}>Beranda &rsaquo; Akademik</div>
            <div style={{ display: 'inline-block', background: 'rgba(200,168,75,0.2)', color: '#C8A84B', fontSize: 12, fontWeight: 600, padding: '5px 14px', borderRadius: 20, marginBottom: 16 }}>
              Kurikulum Merdeka
            </div>
            <h1 style={{ fontWeight: 800, fontSize: '2.2rem', color: '#fff', lineHeight: 1.2, marginBottom: 16 }}>
              Membentuk Generasi<br />
              <span style={{ color: '#C8A84B' }}>Berkarakter</span> dengan<br />
              Kurikulum Merdeka
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 14, lineHeight: 1.8, marginBottom: 24 }}>
              Kami menerapkan kurikulum inovatif yang berpusat pada pengembangan karakter, kreativitas, dan kompetensi siswa.
            </p>
            <div style={{ display: 'flex', gap: 12 }}>
              <Link href="/kontak" style={{ background: '#C8A84B', color: '#1B2D6B', fontWeight: 700, fontSize: 14, padding: '12px 24px', borderRadius: 10 }}>Daftar Sekarang</Link>
              <Link href="/profil" style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', fontWeight: 600, fontSize: 14, padding: '12px 24px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.2)' }}>Pelajari Lebih Lanjut</Link>
            </div>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.1)', borderRadius: 16, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.2)' }}>
            <img src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&q=80" alt="Akademik" style={{ width: '100%', height: 280, objectFit: 'cover' }} />
          </div>
        </div>
      </section>

      {/* PILAR KURIKULUM */}
      <section style={{ padding: '4rem 1.5rem', background: '#fff' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#C8A84B', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8 }}>PENDEKATAN PEMBELAJARAN</div>
            <h2 style={{ fontWeight: 800, fontSize: '2rem', color: '#1B2D6B', marginBottom: 12 }}>Pilar Kurikulum Merdeka</h2>
            <p style={{ color: '#6b7280', fontSize: 14, maxWidth: 500, margin: '0 auto' }}>Tiga pilar utama yang menjadi fondasi pembelajaran di SD Negeri Serua 3.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
            {[
              { icon: '🎯', title: 'Pembelajaran Berdiferensiasi', desc: 'Setiap siswa mendapatkan pendekatan belajar yang disesuaikan dengan kebutuhan, bakat, dan minat mereka.' },
              { icon: '🤝', title: 'Projek Profil Pancasila', desc: 'Pengembangan karakter melalui projek nyata yang mencerminkan nilai-nilai Pancasila dalam kehidupan sehari-hari.' },
              { icon: '💡', title: 'Pembelajaran Berdiferensiasi', desc: 'Asesmen yang berfokus pada pertumbuhan dan perkembangan siswa, bukan hanya hasil akhir semata.' },
            ].map((p, i) => (
              <div key={i} style={{ background: '#f9fafb', borderRadius: 16, padding: '2rem', textAlign: 'center' }}>
                <div style={{ fontSize: 40, marginBottom: 16 }}>{p.icon}</div>
                <h3 style={{ fontWeight: 700, fontSize: 15, color: '#1B2D6B', marginBottom: 10 }}>{p.title}</h3>
                <p style={{ fontSize: 13.5, color: '#6b7280', lineHeight: 1.7 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* KALENDER AKADEMIK */}
      <section style={{ padding: '4rem 1.5rem', background: '#f9fafb' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: '#C8A84B', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8 }}>JADWAL KEGIATAN</div>
              <h2 style={{ fontWeight: 800, fontSize: '1.75rem', color: '#1B2D6B' }}>Kalender Akademik 2024/2025</h2>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              {['Semester 1', 'Semester 2', 'Hari Normal'].map(t => (
                <button key={t} style={{ padding: '8px 16px', borderRadius: 8, border: '1px solid #e5e7eb', background: '#fff', color: '#374151', fontSize: 13, cursor: 'pointer' }}>{t}</button>
              ))}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: '2rem' }}>
            {/* KALENDER */}
            <div style={{ background: '#fff', borderRadius: 16, padding: '1.5rem', border: '1px solid #e5e7eb' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                <button style={{ background: 'none', border: 'none', fontSize: 20, cursor: 'pointer', color: '#374151' }}>←</button>
                <div style={{ fontWeight: 700, fontSize: 16, color: '#1B2D6B' }}>Januari 2024</div>
                <button style={{ background: 'none', border: 'none', fontSize: 20, cursor: 'pointer', color: '#374151' }}>→</button>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4, textAlign: 'center' }}>
                {['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'].map(d => (
                  <div key={d} style={{ fontSize: 12, fontWeight: 600, color: '#9ca3af', padding: '8px 0' }}>{d}</div>
                ))}
                {[...Array(31)].map((_, i) => (
                  <div key={i} style={{
                    padding: '8px 0', fontSize: 13, borderRadius: 8,
                    background: i + 1 === 4 ? '#1B2D6B' : 'transparent',
                    color: i + 1 === 4 ? '#fff' : i % 7 === 0 ? '#ef4444' : '#374151',
                    cursor: 'pointer', fontWeight: i + 1 === 4 ? 700 : 400,
                  }}>
                    {i + 1}
                  </div>
                ))}
              </div>
            </div>

            {/* AGENDA */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 4 }}>Kegiatan Bulan Ini</div>
              {[
                { tanggal: '4 Jan', kegiatan: 'Rapat Komite Sekolah', warna: '#1B2D6B' },
                { tanggal: '8 Jan', kegiatan: 'UKT Semester Ganjil', warna: '#C8A84B' },
                { tanggal: '15 Jan', kegiatan: 'Peringatan HUT Sekolah', warna: '#10b981' },
                { tanggal: '22 Jan', kegiatan: 'Penerimaan Rapor', warna: '#8b5cf6' },
              ].map(a => (
                <div key={a.tanggal} style={{ background: '#fff', borderRadius: 10, padding: '12px 14px', border: '1px solid #e5e7eb', display: 'flex', gap: 12, alignItems: 'center' }}>
                  <div style={{ width: 44, height: 44, background: a.warna, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: '#fff', flexShrink: 0, textAlign: 'center', lineHeight: 1.3 }}>
                    {a.tanggal.split(' ')[0]}<br />{a.tanggal.split(' ')[1]}
                  </div>
                  <div style={{ fontSize: 13.5, fontWeight: 500, color: '#374151' }}>{a.kegiatan}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* METODE PEMBELAJARAN */}
      <section style={{ padding: '4rem 1.5rem', background: '#fff' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: '#C8A84B', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8 }}>INOVASI PEDAGOGIS</div>
              <h2 style={{ fontWeight: 800, fontSize: '1.75rem', color: '#1B2D6B', marginBottom: 16, lineHeight: 1.3 }}>
                Mendukung Pembelajaran yang Efektif dan Menyenangkan
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {[
                  { icon: '🎮', title: 'Gamifikasi Pembelajaran', desc: 'Mengintegrasikan elemen permainan dalam proses belajar untuk meningkatkan motivasi.' },
                  { icon: '📱', title: 'Pembelajaran Digital', desc: 'Memanfaatkan teknologi modern untuk memperkaya pengalaman belajar siswa.' },
                  { icon: '🌿', title: 'Outdoor Learning', desc: 'Pembelajaran di luar kelas untuk mendekatkan siswa dengan lingkungan nyata.' },
                ].map((m, i) => (
                  <div key={i} style={{ display: 'flex', gap: 14, padding: '1rem', background: '#f9fafb', borderRadius: 12 }}>
                    <span style={{ fontSize: 24 }}>{m.icon}</span>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 14, color: '#1B2D6B', marginBottom: 4 }}>{m.title}</div>
                      <div style={{ fontSize: 13, color: '#6b7280' }}>{m.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ borderRadius: 16, overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
              <img src="https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&q=80" alt="Pembelajaran" style={{ width: '100%', height: 380, objectFit: 'cover' }} />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: 'linear-gradient(135deg, #1B2D6B, #2a4090)', padding: '4rem 1.5rem', textAlign: 'center' }}>
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <h2 style={{ fontWeight: 800, fontSize: '1.75rem', color: '#fff', marginBottom: 16 }}>Siap Menjadi Bagian dari Keluarga SD Negeri Serua 3?</h2>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 14, marginBottom: 28 }}>Bergabunglah bersama ribuan siswa berprestasi yang telah merasakan kualitas pendidikan terbaik.</p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
            <Link href="/kontak" style={{ background: '#C8A84B', color: '#1B2D6B', fontWeight: 700, fontSize: 14, padding: '13px 28px', borderRadius: 10 }}>Gabung Sekarang</Link>
            <Link href="/profil" style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', fontWeight: 600, fontSize: 14, padding: '13px 28px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.2)' }}>Pelajari Lebih Lanjut</Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}