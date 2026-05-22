'use client'
import { useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export default function KontakPage() {
  const [form, setForm] = useState({ nama: '', email: '', subjek: 'Informasi Umum', pesan: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [msg, setMsg] = useState('')

  const handleSubmit = async () => {
    if (!form.nama || !form.email || !form.pesan) {
      setMsg('Semua field wajib diisi')
      setStatus('error')
      return
    }
    setStatus('loading')
    try {
      const res = await fetch('/api/kontak', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nama: form.nama, email: form.email, pesan: `[${form.subjek}] ${form.pesan}` }),
      })
      const json = await res.json()
      if (json.success) {
        setStatus('success')
        setMsg('Pesan berhasil dikirim! Kami akan segera menghubungi Anda.')
        setForm({ nama: '', email: '', subjek: 'Informasi Umum', pesan: '' })
      } else {
        setStatus('error')
        setMsg(json.message || 'Gagal mengirim pesan')
      }
    } catch {
      setStatus('error')
      setMsg('Terjadi kesalahan. Coba lagi.')
    }
  }

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '12px 14px', fontSize: 14,
    border: '1.5px solid #e5e7eb', borderRadius: 10,
    fontFamily: 'inherit', color: '#1a1a2e', background: '#fff', outline: 'none',
  }

  return (
    <>
      <Navbar />

      {/* HERO */}
      <section style={{ background: 'linear-gradient(135deg, #1B2D6B, #2a4090)', padding: '3rem 1.5rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', marginBottom: 8 }}>Beranda &rsaquo; Kontak</div>
            <h1 style={{ fontWeight: 800, fontSize: '2.2rem', color: '#fff', lineHeight: 1.2, marginBottom: 16 }}>
              Hubungi Kami
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 14, lineHeight: 1.8 }}>
              Kami siap mendengarkan aspirasi dan menjawab pertanyaan Anda. Jalin komunikasi lebih dekat untuk masa depan pendidikan yang lebih baik.
            </p>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.1)', borderRadius: 16, padding: '1.5rem', backdropFilter: 'blur(10px)' }}>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', marginBottom: 16, fontWeight: 500 }}>Kirim Pesan Cepat</div>
            <input style={{ ...inputStyle, marginBottom: 10, background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff' }} placeholder="Nama lengkap Anda" value={form.nama} onChange={e => setForm(f => ({ ...f, nama: e.target.value }))} />
            <input style={{ ...inputStyle, marginBottom: 10, background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff' }} placeholder="Alamat email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
            <textarea style={{ ...inputStyle, height: 80, resize: 'none', background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', marginBottom: 10 }} placeholder="Tulisan pesan Anda di sini..." value={form.pesan} onChange={e => setForm(f => ({ ...f, pesan: e.target.value }))} />
            <button onClick={handleSubmit} disabled={status === 'loading'}
              style={{ width: '100%', background: '#C8A84B', color: '#1B2D6B', fontWeight: 700, fontSize: 14, padding: '12px', borderRadius: 10, border: 'none', cursor: 'pointer' }}>
              {status === 'loading' ? 'Mengirim...' : 'Kirim Pesan Sekarang'}
            </button>
            {status !== 'idle' && (
              <div style={{ marginTop: 10, fontSize: 12, color: status === 'success' ? '#86efac' : '#fca5a5', textAlign: 'center' }}>{msg}</div>
            )}
          </div>
        </div>
      </section>

      {/* KONTEN */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '3rem 1.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>

          {/* INFO KONTAK */}
          <div>
            <h2 style={{ fontWeight: 800, fontSize: '1.5rem', color: '#1B2D6B', marginBottom: 8 }}>Informasi Kontak</h2>
            <p style={{ color: '#6b7280', fontSize: 13.5, marginBottom: '2rem' }}>Kunjungi kantor administrasi kami atau hubungi kami melalui kanal komunikasi resmi di bawah ini.</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                { icon: '📍', label: 'Alamat Sekolah', value: 'Jl. Serua Raya No. 3, Kelurahan Serua, Kecamatan Ciputat, Kota Tangerang Selatan, Banten 15414', color: '#1B2D6B' },
                { icon: '📞', label: 'Telepon & WhatsApp', value: '(021) 7463-XXXX\n+62 812-XXXX-XXXX', color: '#10b981' },
                { icon: '✉️', label: 'Email Resmi', value: 'info@sdnserua3.sch.id\nadmin@sdnserua3.sch.id', color: '#8b5cf6' },
                { icon: '🕐', label: 'Jam Operasional', value: 'Senin - Jumat: 07.00 – 15.00\nSabtu - Minggu: Libur', color: '#C8A84B' },
              ].map(item => (
                <div key={item.label} style={{ display: 'flex', gap: 16, padding: '1.25rem', background: '#f9fafb', borderRadius: 12, border: '1px solid #f3f4f6' }}>
                  <div style={{ width: 44, height: 44, background: '#EEF2FF', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>
                    {item.icon}
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 13.5, color: item.color, marginBottom: 4 }}>{item.label}</div>
                    <div style={{ fontSize: 13, color: '#374151', lineHeight: 1.7, whiteSpace: 'pre-line' }}>{item.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* FORM KONTAK */}
          <div>
            <h2 style={{ fontWeight: 800, fontSize: '1.5rem', color: '#1B2D6B', marginBottom: 8 }}>Kirim Pesan</h2>
            <p style={{ color: '#6b7280', fontSize: 13.5, marginBottom: '1.5rem' }}>Isi formulir di bawah dan kami akan merespons dalam 1x24 jam kerja.</p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: 14 }}>
              <div>
                <label style={{ fontSize: 12.5, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>Nama Lengkap *</label>
                <input style={inputStyle} placeholder="Masukkan nama Anda" value={form.nama} onChange={e => setForm(f => ({ ...f, nama: e.target.value }))} />
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
              <textarea style={{ ...inputStyle, height: 140, resize: 'vertical' }} placeholder="Tuliskan pesan Anda di sini..." value={form.pesan} onChange={e => setForm(f => ({ ...f, pesan: e.target.value }))} />
            </div>

            {status !== 'idle' && (
              <div style={{ padding: '10px 14px', borderRadius: 8, marginBottom: 14, fontSize: 13, fontWeight: 500, background: status === 'success' ? '#f0fdf4' : '#fef2f2', color: status === 'success' ? '#16a34a' : '#dc2626', border: `1px solid ${status === 'success' ? '#bbf7d0' : '#fecaca'}` }}>
                {msg}
              </div>
            )}

            <button onClick={handleSubmit} disabled={status === 'loading'}
              style={{ width: '100%', background: '#C8A84B', color: '#1B2D6B', fontWeight: 700, fontSize: 14, padding: '14px', borderRadius: 10, border: 'none', cursor: 'pointer', opacity: status === 'loading' ? 0.7 : 1 }}>
              {status === 'loading' ? 'Mengirim...' : 'Kirim Pesan Sekarang'}
            </button>
          </div>
        </div>

        {/* MAP PLACEHOLDER */}
        <div style={{ marginTop: '3rem', background: '#EEF2FF', borderRadius: 16, height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 12, border: '1px solid #e5e7eb' }}>
          <div style={{ width: 56, height: 56, background: '#1B2D6B', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>📍</div>
          <div style={{ fontWeight: 600, fontSize: 14, color: '#1B2D6B' }}>SD Negeri Serua 3</div>
          <div style={{ fontSize: 13, color: '#6b7280' }}>Jl. Serua Raya No. 3, Ciputat, Tangerang Selatan</div>
          <a href="https://maps.google.com" target="_blank" style={{ background: '#1B2D6B', color: '#fff', padding: '8px 20px', borderRadius: 8, fontSize: 13, fontWeight: 600 }}>
            Lihat di Google Maps ↗
          </a>
        </div>
      </div>

      <Footer />
    </>
  )
}