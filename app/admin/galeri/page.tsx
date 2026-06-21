'use client'
import { useEffect, useState } from 'react'
import AdminShell from '@/components/layout/AdminShell'

const kategoriOptions = ['Kegiatan Belajar', 'Olahraga', 'Seni & Budaya', 'Prestasi', 'Fasilitas', 'Lainnya']

export default function AdminGaleriPage() {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ judul: '', gambar: '', kategori: 'Kegiatan Belajar' })
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [errMsg, setErrMsg] = useState('')
  const [page, setPage] = useState(1)
  const [meta, setMeta] = useState<any>(null)

  const fetchData = async () => {
    setLoading(true)
    const res = await fetch(`/api/galeri?page=${page}&limit=12`)
    const json = await res.json()
    setData(json.data || [])
    setMeta(json.meta)
    setLoading(false)
  }

  useEffect(() => { fetchData() }, [page])

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    setErrMsg('')
    try {
      const fd = new FormData()
      fd.append('file', file)
      const res = await fetch('/api/upload', { method: 'POST', body: fd })
      const json = await res.json()
      if (json.url) {
        setForm(f => ({ ...f, gambar: json.url }))
      } else {
        setErrMsg('Upload gagal: ' + (json.error || 'Unknown error'))
      }
    } catch {
      setErrMsg('Upload gagal, coba lagi.')
    }
    setUploading(false)
  }

  const save = async () => {
    if (!form.judul || !form.gambar) { setErrMsg('Judul dan gambar wajib diisi'); return }
    setSaving(true)
    const res = await fetch('/api/galeri', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
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

  const closeForm = () => { setShowForm(false); setErrMsg(''); setForm({ judul: '', gambar: '', kategori: 'Kegiatan Belajar' }) }

  const inputStyle: React.CSSProperties = { width: '100%', padding: '10px 12px', fontSize: 13, border: '1.5px solid #e5e7eb', borderRadius: 8, fontFamily: 'inherit', color: '#1a1a2e', outline: 'none', boxSizing: 'border-box' }

  return (
    <AdminShell>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div>
          <h1 style={{ fontWeight: 800, fontSize: '1.5rem', color: '#1B2D6B', marginBottom: 4 }}>Manajemen Galeri</h1>
          <p style={{ fontSize: 13, color: '#6b7280' }}>Kelola foto dan dokumentasi kegiatan sekolah</p>
        </div>
        <button onClick={() => setShowForm(true)} style={{ background: '#1B2D6B', color: '#fff', fontWeight: 600, fontSize: 13.5, padding: '10px 20px', borderRadius: 10, border: 'none', cursor: 'pointer' }}>+ Tambah Foto</button>
      </div>

      {/* GRID */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '4rem', color: '#9ca3af' }}>Memuat...</div>
      ) : data.length === 0 ? (
        <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #e5e7eb', padding: '5rem', textAlign: 'center' }}>
          <div style={{ fontSize: 56, marginBottom: 16 }}>🖼️</div>
          <div style={{ fontWeight: 700, fontSize: 16, color: '#1B2D6B', marginBottom: 8 }}>Belum ada foto</div>
          <button onClick={() => setShowForm(true)} style={{ background: '#1B2D6B', color: '#fff', padding: '10px 24px', borderRadius: 10, border: 'none', fontWeight: 600, fontSize: 13.5, cursor: 'pointer' }}>+ Tambah Foto Pertama</button>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
          {data.map((g: any) => (
            <div key={g.id} style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 12, overflow: 'hidden' }}>
              <div style={{ height: 160, overflow: 'hidden', position: 'relative' }}>
                <img src={g.gambar} alt={g.judul} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={e => { (e.target as HTMLImageElement).src = 'https://via.placeholder.com/300x200?text=No+Image' }} />
                <div style={{ position: 'absolute', top: 8, right: 8 }}>
                  <button onClick={() => hapus(g.id)} style={{ background: 'rgba(220,38,38,0.9)', color: '#fff', border: 'none', borderRadius: 6, padding: '4px 8px', fontSize: 11, cursor: 'pointer', fontWeight: 600 }}>Hapus</button>
                </div>
              </div>
              <div style={{ padding: '0.75rem' }}>
                <div style={{ fontWeight: 600, fontSize: 13, color: '#1B2D6B', marginBottom: 4, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{g.judul}</div>
                {g.kategori && <span style={{ fontSize: 11, color: '#6b7280', background: '#f3f4f6', padding: '2px 8px', borderRadius: 10 }}>{g.kategori}</span>}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* PAGINATION */}
      {meta && meta.totalPages > 1 && (
        <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: '1.5rem' }}>
          <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page <= 1} style={{ padding: '8px 16px', borderRadius: 8, border: '1px solid #e5e7eb', background: '#fff', cursor: 'pointer', fontSize: 13 }}>← Prev</button>
          <span style={{ padding: '8px 16px', fontSize: 13, color: '#6b7280' }}>{page} / {meta.totalPages}</span>
          <button onClick={() => setPage(p => Math.min(meta.totalPages, p + 1))} disabled={page >= meta.totalPages} style={{ padding: '8px 16px', borderRadius: 8, border: '1px solid #e5e7eb', background: '#fff', cursor: 'pointer', fontSize: 13 }}>Next →</button>
        </div>
      )}

      {/* MODAL FORM */}
      {showForm && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 999, padding: '2rem' }}>
          <div style={{ background: '#fff', borderRadius: 20, padding: '2rem', maxWidth: 520, width: '100%', boxShadow: '0 20px 60px rgba(0,0,0,0.2)', maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <div style={{ fontWeight: 800, fontSize: 16, color: '#1B2D6B' }}>Tambah Foto Galeri</div>
              <button onClick={closeForm} style={{ background: 'none', border: 'none', fontSize: 22, cursor: 'pointer', color: '#9ca3af' }}>×</button>
            </div>

            {/* JUDUL */}
            <div style={{ marginBottom: 14 }}>
              <label style={{ fontSize: 12.5, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>Judul Foto *</label>
              <input style={inputStyle} value={form.judul} onChange={e => setForm(f => ({ ...f, judul: e.target.value }))} placeholder="Contoh: Kegiatan Upacara Bendera" />
            </div>

            {/* KATEGORI */}
            <div style={{ marginBottom: 14 }}>
              <label style={{ fontSize: 12.5, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>Kategori</label>
              <select style={inputStyle} value={form.kategori} onChange={e => setForm(f => ({ ...f, kategori: e.target.value }))}>
                {kategoriOptions.map(k => <option key={k} value={k}>{k}</option>)}
              </select>
            </div>

            {/* UPLOAD FOTO */}
            <div style={{ marginBottom: 16 }}>
              <label style={{ fontSize: 12.5, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>Foto *</label>

              {/* Upload dari PC */}
              <div style={{ border: '2px dashed #e5e7eb', borderRadius: 10, padding: '1.25rem', textAlign: 'center', background: '#fafafa', marginBottom: 10 }}>
                <input
                  type="file"
                  accept="image/*"
                  id="galeri-upload"
                  style={{ display: 'none' }}
                  onChange={handleImageUpload}
                />
                <label htmlFor="galeri-upload" style={{ cursor: uploading ? 'not-allowed' : 'pointer' }}>
                  <div style={{ fontSize: 28, marginBottom: 6 }}>📁</div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#1B2D6B' }}>
                    {uploading ? '⏳ Mengupload...' : 'Klik untuk pilih foto dari PC'}
                  </div>
                  <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 4 }}>JPG, PNG, WebP — maks 2MB</div>
                </label>
              </div>

              {/* Atau URL manual */}
              <div style={{ fontSize: 11, color: '#9ca3af', textAlign: 'center', marginBottom: 8 }}>— atau masukkan URL foto —</div>
              <input
                style={inputStyle}
                value={form.gambar}
                onChange={e => setForm(f => ({ ...f, gambar: e.target.value }))}
                placeholder="https://contoh.com/foto.jpg"
              />

              {/* Preview */}
              {form.gambar && (
                <div style={{ marginTop: 10, borderRadius: 8, overflow: 'hidden', border: '1px solid #e5e7eb' }}>
                  <img src={form.gambar} alt="preview" style={{ width: '100%', height: 160, objectFit: 'cover', display: 'block' }} onError={e => { (e.target as HTMLImageElement).style.display = 'none' }} />
                  <div style={{ padding: '6px 10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: 11, color: '#6b7280' }}>Preview foto</span>
                    <button onClick={() => setForm(f => ({ ...f, gambar: '' }))} style={{ fontSize: 11, color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}>Hapus foto</button>
                  </div>
                </div>
              )}
            </div>

            {errMsg && <div style={{ background: '#fef2f2', color: '#dc2626', fontSize: 13, padding: '10px 14px', borderRadius: 8, marginBottom: 14, border: '1px solid #fecaca' }}>{errMsg}</div>}

            <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
              <button onClick={closeForm} style={{ padding: '10px 20px', borderRadius: 10, border: '1px solid #e5e7eb', background: '#fff', fontSize: 13.5, cursor: 'pointer' }}>Batal</button>
              <button onClick={save} disabled={saving || uploading} style={{ padding: '10px 20px', borderRadius: 10, background: '#1B2D6B', color: '#fff', border: 'none', fontSize: 13.5, fontWeight: 600, cursor: 'pointer', opacity: saving || uploading ? 0.7 : 1 }}>
                {saving ? 'Menyimpan...' : 'Simpan Foto'}
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminShell>
  )
}