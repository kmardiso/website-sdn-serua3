'use client'
import { useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export default function KontakPage() {
  const [form, setForm] = useState({ nama: '', email: '', subjek: 'Informasi Umum', pesan: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [msg, setMsg] = useState('')

  const handleSubmit = async () => {
    if (!form.nama || !form.email || !form.pesan) { setMsg('Semua field wajib diisi'); setStatus('error'); return }
    setStatus('loading')
    try {
      const res = await fetch('/api/kontak', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ nama: form.nama, email: form.email, pesan: `[${form.subjek}] ${form.pesan}` }) })
      const json = await res.json()
      if (json.success) { setStatus('success'); setMsg('Pesan berhasil dikirim!'); setForm({ nama: '', email: '', subjek: 'Informasi Umum', pesan: '' }) }
      else { setStatus('error'); setMsg(json.message || 'Gagal mengirim pesan') }
    } catch { setStatus('error'); setMsg('Terjadi kesalahan. Coba lagi.') }
  }

  const inputStyle: React.CSSProperties = { width: '100%', padding: '12px 14px', fontSize: 14, border: '1.5px solid #e5e7eb', borderRadius: 10, fontFamily: 'inherit', color: '#1a1a2e', background: '#fff', outline: 'none', boxSizing: 'border-box' }

  return (
    <>
      <style>{`
        .kontak-hero-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; align-items: center; }
        .kontak-main-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; }
        .kontak-nama-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 14px; }
        @media (max-width: 768px) {
          .kontak-hero-grid { grid-template-columns: 1fr; gap: 1.5rem; }
          .kontak-main-grid { grid-template-columns: 1fr; gap: 2rem; }
          .kontak-nama-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <Navbar />

      <section style={{ background: 'linear-gradient(135deg, #1B2D6B, #2a4090)', padding: '3rem 1.5rem' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div className="kontak-hero-grid">
            <div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', marginBottom: 8 }}>Beranda &rsaquo; Kontak</div>
              <h1 style={{ fontWeight: 800, fontSize: '2.2rem', color: '#fff', lineHeight: 1.2, marginBottom: 16 }}>Hubungi Kami</h1>
              <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 14, lineHeight: 1.8 }}>Kami siap mendengarkan aspirasi dan menjawab pertanyaan Anda.</p>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.1)', borderRadius: 16, padding: '1.5rem' }}>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', marginBottom: 16, fontWeight: 500 }}>Kirim Pesan Cepat</div>
              <input style={{ ...inputStyle, marginBottom: 10, background: 'rgb(255, 255, 255)', border: '1px solid rgba(255,255,255,0.2)', color: '#000000' }} placeholder="Nama lengkap Anda" value={form.nama} onChange={e => setForm(f => ({ ...f, nama: e.target.value }))} />
              <input style={{ ...inputStyle, marginBottom: 10, background: 'rgb(255, 255, 255)', border: '1px solid rgba(255,255,255,0.2)', color: '#000000' }} placeholder="Alamat email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
              <textarea style={{ ...inputStyle, height: 80, resize: 'none', background: 'rgb(255, 255, 255)', border: '1px solid rgba(255,255,255,0.2)', color: '#000000', marginBottom: 10 }} placeholder="Pesan Anda..." value={form.pesan} onChange={e => setForm(f => ({ ...f, pesan: e.target.value }))} />
              <button onClick={handleSubmit} disabled={status === 'loading'} style={{ width: '100%', background: '#C8A84B', color: '#1B2D6B', fontWeight: 700, fontSize: 14, padding: '12px', borderRadius: 10, border: 'none', cursor: 'pointer' }}>
                {status === 'loading' ? 'Mengirim...' : 'Kirim Pesan Sekarang'}
              </button>
              {status !== 'idle' && <div style={{ marginTop: 10, fontSize: 12, color: status === 'success' ? '#86efac' : '#fca5a5', textAlign: 'center' }}>{msg}</div>}
            </div>
          </div>
        </div>
      </section>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '3rem 1.5rem' }}>
        <div className="kontak-main-grid">
          <div>
            <h2 style={{ fontWeight: 800, fontSize: '1.5rem', color: '#1B2D6B', marginBottom: 8 }}>Informasi Kontak</h2>
            <p style={{ color: '#6b7280', fontSize: 13.5, marginBottom: '2rem' }}>Kunjungi kantor administrasi kami atau hubungi kami melalui kanal komunikasi resmi.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                { icon: '📍', label: 'Alamat Sekolah', value: 'Jl. Serua Raya, Serua, Kec. Bojongsari, Kota Depok, Jawa Barat 16523', color: '#1B2D6B' },
                { icon: '📞', label: 'Telepon & WhatsApp', value: '(021) 7463-XXXX\n+62 812-XXXX-XXXX', color: '#10b981' },
                { icon: '✉️', label: 'Email Resmi', value: 'info@sdnserua3.sch.id', color: '#8b5cf6' },
                { icon: '🕐', label: 'Jam Operasional', value: 'Senin - Jumat: 07.00 – 15.00\nSabtu - Minggu: Libur', color: '#C8A84B' },
              ].map(item => (
                <div key={item.label} style={{ display: 'flex', gap: 16, padding: '1.25rem', background: '#f9fafb', borderRadius: 12 }}>
                  <div style={{ width: 44, height: 44, background: '#EEF2FF', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>{item.icon}</div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 13.5, color: item.color, marginBottom: 4 }}>{item.label}</div>
                    <div style={{ fontSize: 13, color: '#374151', lineHeight: 1.7, whiteSpace: 'pre-line' }}>{item.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 style={{ fontWeight: 800, fontSize: '1.5rem', color: '#1B2D6B', marginBottom: 8 }}>Kirim Pesan</h2>
            <p style={{ color: '#6b7280', fontSize: 13.5, marginBottom: '1.5rem' }}>Kami akan merespons dalam 1x24 jam kerja.</p>

            <div className="kontak-nama-grid">
              <div>
                <label style={{ fontSize: 12.5, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>Nama Lengkap *</label>
                <input style={inputStyle} placeholder="Nama Anda" value={form.nama} onChange={e => setForm(f => ({ ...f, nama: e.target.value }))} />
              </div>
              <div>
                <label style={{ fontSize: 12.5, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>Alamat Email *</label>
                <input style={inputStyle} type="email" placeholder="nama@email.com" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
              </div>
            </div>

            <div style={{ marginBottom: 14 }}>
              <label style={{ fontSize: 12.5, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>Subjek Pesan</label>
              <select style={inputStyle} value={form.subjek} onChange={e => setForm(f => ({ ...f, subjek: e.target.value }))}>
                <option>Informasi Umum</option>
                <option>Penerimaan Siswa</option>
                <option>Akademik</option>
                <option>Fasilitas</option>
                <option>Lainnya</option>
              </select>
            </div>

            <div style={{ marginBottom: 20 }}>
              <label style={{ fontSize: 12.5, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>Pesan *</label>
              <textarea style={{ ...inputStyle, height: 140, resize: 'vertical' }} placeholder="Tuliskan pesan Anda..." value={form.pesan} onChange={e => setForm(f => ({ ...f, pesan: e.target.value }))} />
            </div>

            {status !== 'idle' && (
              <div style={{ padding: '10px 14px', borderRadius: 8, marginBottom: 14, fontSize: 13, fontWeight: 500, background: status === 'success' ? '#f0fdf4' : '#fef2f2', color: status === 'success' ? '#16a34a' : '#dc2626', border: `1px solid ${status === 'success' ? '#bbf7d0' : '#fecaca'}` }}>{msg}</div>
            )}

            <button onClick={handleSubmit} disabled={status === 'loading'} style={{ width: '100%', background: '#C8A84B', color: '#1B2D6B', fontWeight: 700, fontSize: 14, padding: '14px', borderRadius: 10, border: 'none', cursor: 'pointer', opacity: status === 'loading' ? 0.7 : 1 }}>
              {status === 'loading' ? 'Mengirim...' : 'Kirim Pesan Sekarang'}
            </button>
          </div>
        </div>

        <div style={{ marginTop: '3rem', background: '#EEF2FF', borderRadius: 16, height: 260, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 12 }}>
          <div style={{ width: 56, height: 56, background: '#1B2D6B', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>📍</div>
          <div style={{ fontWeight: 600, fontSize: 14, color: '#1B2D6B' }}>SD Negeri Serua 3 Depok</div>
          <div style={{ fontSize: 13, color: '#6b7280', textAlign: 'center', padding: '0 1rem' }}>Jl. Serua Raya, Serua, Kec. Bojongsari, Kota Depok, Jawa Barat 16523.</div>
          <a href="https://www.google.com/maps/place/Serua+State+Elementary+School+03/@-6.3669119,106.7321748,3a,75y,249.02h,69.6t/data=!3m7!1e1!3m5!1sM_EpR9lmX7GJfNVtRz-BLA!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D20.3960312376027%26panoid%3DM_EpR9lmX7GJfNVtRz-BLA%26yaw%3D249.0227186730117!7i16384!8i8192!4m6!3m5!1s0x2e69ef5c59af565d:0xbe8af972f88497a0!8m2!3d-6.3670115!4d106.7321926!16s%2Fg%2F1hm5fzdk5?entry=ttu&g_ep=EgoyMDI2MDYxNi4wIKXMDSoASAFQAw%3D%3D" target="_blank" style={{ background: '#1B2D6B', color: '#fff', padding: '8px 20px', borderRadius: 8, fontSize: 13, fontWeight: 600, textDecoration: 'none' }}>Lihat di Google Maps ↗</a>
        </div>
      </div>

      <Footer />
    </>
  )
}