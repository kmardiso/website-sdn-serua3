'use client'
import AdminShell from '@/components/layout/AdminShell'
import { useEffect, useState } from 'react'

const kategoriOptions = ['Kegiatan Belajar', 'Olahraga', 'Seni & Budaya', 'Prestasi', 'Fasilitas', 'Lainnya']

export default function AdminGaleriPage() {
  const [data, setData] = useState<any[]>([])
  const [meta, setMeta] = useState<any>(null)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ judul: '', gambar: '', kategori: 'Kegiatan Belajar' })
  const [saving, setSaving] = useState(false)
  const [errMsg, setErrMsg] = useState('')

  const fetchData = async () => {
    setLoading(true)
    const res = await fetch(`/api/galeri?page=${page}&limit=12`)
    const json = await res.json()
    setData(json.data || [])
    setMeta(json.meta)
    setLoading(false)
  }

  useEffect(() => { fetchData() }, [page])

  const save = async () => {
    if (!form.judul || !form.gambar) { setErrMsg('Judul dan URL gambar wajib diisi'); return }
    setSaving(true)
    const res = await fetch('/api/galeri', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    const json = await res.json()
    if (json.success) {
      setShowForm(false)
      setForm({ judul: '', gambar: '', kategori: 'Kegiatan Belajar' })
      setErrMsg('')
      fetchData()
    } else {
      setErrMsg(json.message || 'Gagal menyimpan')
    }
    setSaving(false)
  }

  const hapus = async (id: number) => {
    if (!confirm('Hapus foto ini?')) return
    await fetch(`/api/galeri/${id}`, { method: 'DELETE' })
    fetchData()
  }

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '9px 12px', fontSize: 13, border: '1px solid #e8e5de',
    borderRadius: 8, fontFamily: 'inherit', color: '#1a2340', background: '#fff',
  }

  return (
    <AdminShell>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h1 style={{ fontFamily: 'Playfair Display,serif', fontSize: '1.5rem', fontWeight: 700 }}>Manajemen Galeri</h1>
        <button onClick={() => setShowForm(true)} style={{ background: '#0d2660', color: '#fff', fontWeight: 600, fontSize: 13, padding: '9px 20px', borderRadius: 8, border: 'none', cursor: 'pointer' }}>+ Tambah Foto</button>
      </div>

      <div style={{ background: '#eef2fc', border: '1px solid #b5d4f4', borderRadius: 8, padding: '10px 14px', marginBottom: '1.5rem', fontSize: 12.5, color: '#0d2660' }}>
        💡 Masukkan URL gambar dari internet (ImgBB, Google Drive, dll). Contoh: <code style={{ background: 'rgba(0,0,0,0.06)', padding: '1px 6px', borderRadius: 4 }}>https://i.imgur.com/contoh.jpg</code>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '3rem', color: '#8a8880' }}>Memuat...</div>
      ) : data.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '5rem', color: '#8a8880' }}>
          <div style={{ fontSize: 48, marginBottom: 12, opacity: 0.3 }}>🖼️</div>
          <div style={{ fontSize: 14, fontWeight: 500 }}>Belum ada foto</div>
          <div style={{ fontSize: 12, marginTop: 4 }}>Klik "+ Tambah Foto" untuk menambahkan</div>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: 12 }}>
          {data.map((g: any) => (
            <div key={g.id} style={{ background: '#fff', border: '1px solid #e8e5de', borderRadius: 10, overflow: 'hidden' }}>
              <div style={{ height: 150, background: '#eef2fc', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                {g.gambar ? (
                  <img src={g.gambar} alt={g.judul} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }} />
                ) : (
                  <span style={{ fontSize: 32, opacity: 0.2 }}>🖼️</span>
                )}
              </div>
              <div style={{ padding: '0.75rem' }}>
                <div style={{ fontSize: 12.5, fontWeight: 600, color: '#1a2340', marginBottom: 3 }}>{g.judul}</div>
                {g.kategori && <div style={{ fontSize: 11, color: '#8a8880', marginBottom: 8 }}>{g.kategori}</div>}
                <button onClick={() => hapus(g.id)} style={{ fontSize: 11.5, color: '#8c2a2a', background: '#fef0f0', border: 'none', padding: '4px 10px', borderRadius: 4, cursor: 'pointer', fontWeight: 600 }}>Hapus</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {meta && meta.totalPages > 1 && (
        <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: '1.5rem' }}>
          <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page <= 1} style={{ padding: '6px 14px', borderRadius: 6, border: '1px solid #e8e5de', background: '#fff', cursor: 'pointer', fontSize: 12 }}>← Prev</button>
          <span style={{ padding: '6px 14px', fontSize: 12, color: '#8a8880' }}>{page} / {meta.totalPages}</span>
          <button onClick={() => setPage(p => Math.min(meta.totalPages, p + 1))} disabled={page >= meta.totalPages} style={{ padding: '6px 14px', borderRadius: 6, border: '1px solid #e8e5de', background: '#fff', cursor: 'pointer', fontSize: 12 }}>Next →</button>
        </div>
      )}

      {showForm && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 999, padding: '2rem' }}>
          <div style={{ background: '#fff', borderRadius: 16, padding: '2rem', maxWidth: 500, width: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
              <div style={{ fontWeight: 700, fontSize: 15 }}>Tambah Foto Galeri</div>
              <button onClick={() => { setShowForm(false); setErrMsg('') }} style={{ background: 'none', border: 'none', fontSize: 20, cursor: 'pointer', color: '#8a8880' }}>×</button>
            </div>
            <div style={{ marginBottom: 12 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: '#4a4840', display: 'block', marginBottom: 6 }}>Judul Foto *</label>
              <input style={inputStyle} value={form.judul} onChange={e => setForm(f => ({ ...f, judul: e.target.value }))} placeholder="Contoh: Kegiatan Upacara Bendera" />
            </div>
            <div style={{ marginBottom: 12 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: '#4a4840', display: 'block', marginBottom: 6 }}>URL Gambar *</label>
              <input style={inputStyle} value={form.gambar} onChange={e => setForm(f => ({ ...f, gambar: e.target.value }))} placeholder="https://..." />
              {form.gambar && (
                <div style={{ marginTop: 8, height: 120, background: '#f8f7f4', borderRadius: 8, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <img src={form.gambar} alt="preview" style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }} onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }} />
                </div>
              )}
            </div>
            <div style={{ marginBottom: 16 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: '#4a4840', display: 'block', marginBottom: 6 }}>Kategori</label>
              <select style={inputStyle} value={form.kategori} onChange={e => setForm(f => ({ ...f, kategori: e.target.value }))}>
                {kategoriOptions.map(k => <option key={k} value={k}>{k}</option>)}
              </select>
            </div>
            {errMsg && (
              <div style={{ background: '#fef0f0', color: '#8c2a2a', fontSize: 12.5, padding: '8px 12px', borderRadius: 6, marginBottom: 12 }}>{errMsg}</div>
            )}
            <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
              <button onClick={() => { setShowForm(false); setErrMsg('') }} style={{ padding: '9px 18px', borderRadius: 8, border: '1px solid #e8e5de', background: '#fff', fontSize: 13, cursor: 'pointer' }}>Batal</button>
              <button onClick={save} disabled={saving} style={{ padding: '9px 18px', borderRadius: 8, background: '#0d2660', color: '#fff', border: 'none', fontSize: 13, fontWeight: 600, cursor: 'pointer', opacity: saving ? 0.7 : 1 }}>
                {saving ? 'Menyimpan...' : 'Simpan Foto'}
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminShell>
  )
}
