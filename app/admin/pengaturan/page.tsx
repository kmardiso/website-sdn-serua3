'use client'
import { useEffect, useState } from 'react'
import AdminShell from '@/components/layout/AdminShell'

const fieldList = [
  { key: 'nama_sekolah', label: 'Nama Sekolah', placeholder: 'SD Negeri Serua 3' },
  { key: 'npsn', label: 'NPSN', placeholder: '20604893' },
  { key: 'status', label: 'Status Sekolah', placeholder: 'Negeri / Aktif' },
  { key: 'akreditasi', label: 'Akreditasi', placeholder: 'A (Unggul)' },
  { key: 'kepala_sekolah', label: 'Nama Kepala Sekolah', placeholder: 'Hj. Siti Rohmah, M.Pd.' },
  { key: 'alamat', label: 'Alamat Lengkap', placeholder: 'Jl. Serua Raya No. 3...', textarea: true },
  { key: 'telepon', label: 'Nomor Telepon', placeholder: '(021) 7463-XXXX' },
  { key: 'email', label: 'Email Sekolah', placeholder: 'info@sdnserua3.sch.id' },
  { key: 'jam_operasional', label: 'Jam Operasional', placeholder: 'Senin – Jumat: 07.00 – 15.00 WIB' },
  { key: 'jumlah_siswa', label: 'Jumlah Siswa', placeholder: '1200' },
  { key: 'jumlah_guru', label: 'Jumlah Guru & Tenaga', placeholder: '45' },
  { key: 'jumlah_rombel', label: 'Jumlah Rombongan Belajar', placeholder: '24' },
]

const fotoList = [
  { key: 'foto_hero', label: 'Foto Banner/Hero', desc: 'Foto latar belakang di bagian atas homepage' },
  { key: 'foto_kepala_sekolah', label: 'Foto Kepala Sekolah', desc: 'Foto yang tampil di bagian sambutan' },
]

export default function AdminPengaturanPage() {
  const [data, setData] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [msg, setMsg] = useState('')

  useEffect(() => {
    fetch('/api/info').then(r => r.json()).then(json => { setData(json.data || {}); setLoading(false) })
  }, [])

  const handleSave = async () => {
    setSaving(true)
    setStatus('idle')
    try {
      const allFields = [...fieldList, ...fotoList]
      const updates = allFields.map(f => ({ key: f.key, value: data[f.key] || '', label: f.label }))
      const res = await fetch('/api/info', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(updates) })
      const json = await res.json()
      if (json.success) { setStatus('success'); setMsg('Data berhasil disimpan!') }
      else { setStatus('error'); setMsg('Gagal menyimpan data') }
    } catch { setStatus('error'); setMsg('Terjadi kesalahan server') }
    setSaving(false)
    setTimeout(() => setStatus('idle'), 3000)
  }

  const inputStyle: React.CSSProperties = { width: '100%', padding: '10px 12px', fontSize: 13, border: '1.5px solid #e5e7eb', borderRadius: 8, fontFamily: 'inherit', color: '#1a1a2e', outline: 'none' }

  return (
    <AdminShell>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div>
          <h1 style={{ fontWeight: 800, fontSize: '1.5rem', color: '#1B2D6B', marginBottom: 4 }}>Pengaturan Sekolah</h1>
          <p style={{ fontSize: 13, color: '#6b7280' }}>Edit informasi sekolah yang tampil di website</p>
        </div>
        <button onClick={handleSave} disabled={saving || loading}
          style={{ background: '#1B2D6B', color: '#fff', fontWeight: 600, fontSize: 13.5, padding: '10px 20px', borderRadius: 10, border: 'none', cursor: 'pointer', opacity: saving || loading ? 0.7 : 1 }}>
          {saving ? 'Menyimpan...' : '💾 Simpan Perubahan'}
        </button>
      </div>

      {status !== 'idle' && (
        <div style={{ padding: '12px 16px', borderRadius: 10, marginBottom: '1.5rem', fontSize: 13, fontWeight: 500, background: status === 'success' ? '#f0fdf4' : '#fef2f2', color: status === 'success' ? '#16a34a' : '#dc2626', border: `1px solid ${status === 'success' ? '#bbf7d0' : '#fecaca'}` }}>
          {status === 'success' ? '✅' : '❌'} {msg}
        </div>
      )}

      {loading ? (
        <div style={{ textAlign: 'center', padding: '4rem', color: '#9ca3af' }}>Memuat data...</div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

          {/* INFORMASI UMUM */}
          <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 16, padding: '1.5rem' }}>
            <div style={{ fontWeight: 700, fontSize: 13.5, color: '#1B2D6B', marginBottom: '1.25rem', paddingBottom: '0.75rem', borderBottom: '1px solid #f3f4f6' }}>Informasi Umum</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              {fieldList.slice(0, 5).map(f => (
                <div key={f.key}>
                  <label style={{ fontSize: 12.5, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>{f.label}</label>
                  <input style={inputStyle} value={data[f.key] || ''} onChange={e => setData(d => ({ ...d, [f.key]: e.target.value }))} placeholder={f.placeholder} />
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            {/* KONTAK */}
            <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 16, padding: '1.5rem' }}>
              <div style={{ fontWeight: 700, fontSize: 13.5, color: '#1B2D6B', marginBottom: '1.25rem', paddingBottom: '0.75rem', borderBottom: '1px solid #f3f4f6' }}>Kontak & Lokasi</div>
              {fieldList.slice(5, 9).map(f => (
                <div key={f.key} style={{ marginBottom: 12 }}>
                  <label style={{ fontSize: 12.5, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>{f.label}</label>
                  {(f as any).textarea ? (
                    <textarea style={{ ...inputStyle, height: 80, resize: 'vertical' }} value={data[f.key] || ''} onChange={e => setData(d => ({ ...d, [f.key]: e.target.value }))} placeholder={f.placeholder} />
                  ) : (
                    <input style={inputStyle} value={data[f.key] || ''} onChange={e => setData(d => ({ ...d, [f.key]: e.target.value }))} placeholder={f.placeholder} />
                  )}
                </div>
              ))}
            </div>

            {/* STATISTIK */}
            <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 16, padding: '1.5rem' }}>
              <div style={{ fontWeight: 700, fontSize: 13.5, color: '#1B2D6B', marginBottom: '1.25rem', paddingBottom: '0.75rem', borderBottom: '1px solid #f3f4f6' }}>Data Statistik</div>
              <p style={{ fontSize: 12.5, color: '#9ca3af', marginBottom: '1rem' }}>Angka ini tampil di bagian statistik homepage.</p>
              {fieldList.slice(9).map(f => (
                <div key={f.key} style={{ marginBottom: 12 }}>
                  <label style={{ fontSize: 12.5, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>{f.label}</label>
                  <input style={inputStyle} type="number" value={data[f.key] || ''} onChange={e => setData(d => ({ ...d, [f.key]: e.target.value }))} placeholder={f.placeholder} />
                </div>
              ))}
            </div>
          </div>

          {/* FOTO */}
          <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 16, padding: '1.5rem' }}>
            <div style={{ fontWeight: 700, fontSize: 13.5, color: '#1B2D6B', marginBottom: '0.5rem', paddingBottom: '0.75rem', borderBottom: '1px solid #f3f4f6' }}>Foto Website</div>
            <p style={{ fontSize: 12.5, color: '#9ca3af', marginBottom: '1.25rem' }}>
              💡 Upload foto ke <a href="https://imgbb.com" target="_blank" style={{ color: '#1B2D6B', fontWeight: 600 }}>ImgBB.com</a> (gratis), lalu paste URL-nya di bawah.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              {fotoList.map(f => (
                <div key={f.key}>
                  <label style={{ fontSize: 12.5, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 4 }}>{f.label}</label>
                  <p style={{ fontSize: 12, color: '#9ca3af', marginBottom: 8 }}>{f.desc}</p>
                  <input style={inputStyle} value={data[f.key] || ''} onChange={e => setData(d => ({ ...d, [f.key]: e.target.value }))} placeholder="https://..." />
                  {data[f.key] && (
                    <div style={{ marginTop: 8, height: 120, borderRadius: 10, overflow: 'hidden', border: '1px solid #e5e7eb' }}>
                      <img src={data[f.key]} alt={f.label} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={e => { (e.target as HTMLImageElement).style.display = 'none' }} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {!loading && (
        <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end' }}>
          <button onClick={handleSave} disabled={saving}
            style={{ background: '#C8A84B', color: '#1B2D6B', fontWeight: 700, fontSize: 14, padding: '13px 32px', borderRadius: 10, border: 'none', cursor: 'pointer', opacity: saving ? 0.7 : 1 }}>
            {saving ? 'Menyimpan...' : '💾 Simpan Semua Perubahan'}
          </button>
        </div>
      )}
    </AdminShell>
  )
}