'use client'
import AdminShell from '@/components/layout/AdminShell'
import { useEffect, useState } from 'react'

const kategoriOptions = ['PENGUMUMAN', 'PRESTASI', 'KEGIATAN', 'INFORMASI']
const kategoriLabel: Record<string, string> = {
  PENGUMUMAN: 'Pengumuman', PRESTASI: 'Prestasi', KEGIATAN: 'Kegiatan', INFORMASI: 'Informasi',
}

const emptyForm = { judul: '', ringkasan: '', konten: '', kategori: 'PENGUMUMAN', status: 'DRAFT' }

export default function AdminBeritaPage() {
  const [data, setData] = useState<any[]>([])
  const [meta, setMeta] = useState<any>(null)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState(emptyForm)
  const [editSlug, setEditSlug] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)

  const fetchData = async () => {
    setLoading(true)
    const res = await fetch(`/api/berita?page=${page}&limit=15&status=PUBLISHED`)
    const json = await res.json()
    setData(json.data || [])
    setMeta(json.meta)
    setLoading(false)
  }

  useEffect(() => { fetchData() }, [page])

  const openNew = () => { setForm(emptyForm); setEditSlug(null); setShowForm(true) }
  const openEdit = (b: any) => { setForm({ judul: b.judul, ringkasan: b.ringkasan, konten: b.konten, kategori: b.kategori, status: b.status }); setEditSlug(b.slug); setShowForm(true) }

  const save = async () => {
    setSaving(true)
    const method = editSlug ? 'PUT' : 'POST'
    const url = editSlug ? `/api/berita/${editSlug}` : '/api/berita'
    await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
    setSaving(false)
    setShowForm(false)
    fetchData()
  }

  const hapus = async (slug: string) => {
    if (!confirm('Hapus berita ini?')) return
    await fetch(`/api/berita/${slug}`, { method: 'DELETE' })
    fetchData()
  }

  const inputStyle: React.CSSProperties = { width: '100%', padding: '9px 12px', fontSize: 13, border: '1px solid #e8e5de', borderRadius: 8, fontFamily: 'inherit', color: '#1a2340', background: '#fff' }

  return (
    <AdminShell>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h1 style={{ fontFamily: 'Playfair Display,serif', fontSize: '1.5rem', fontWeight: 700 }}>Manajemen Berita</h1>
        <button onClick={openNew} style={{ background: '#0d2660', color: '#fff', fontWeight: 600, fontSize: 13, padding: '9px 20px', borderRadius: 8, border: 'none', cursor: 'pointer' }}>+ Tambah Berita</button>
      </div>

      <div style={{ background: '#fff', border: '1px solid #e8e5de', borderRadius: 12, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #e8e5de', background: '#f8f7f4' }}>
              {['Judul', 'Kategori', 'Status', 'Tanggal', 'Aksi'].map((h) => (
                <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontSize: 11, fontWeight: 600, color: '#8a8880', textTransform: 'uppercase' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={5} style={{ padding: '3rem', textAlign: 'center', color: '#8a8880' }}>Memuat...</td></tr>
            ) : data.map((b) => (
              <tr key={b.id} style={{ borderBottom: '1px solid #f0ede6' }}>
                <td style={{ padding: '10px 14px', maxWidth: 320 }}>
                  <div style={{ fontWeight: 500 }}>{b.judul}</div>
                  <div style={{ fontSize: 11, color: '#8a8880', marginTop: 2 }}>{b.ringkasan?.substring(0, 60)}...</div>
                </td>
                <td style={{ padding: '10px 14px' }}>
                  <span style={{ fontSize: 11, padding: '3px 8px', borderRadius: 4, background: '#eef2fc', color: '#0d2660', fontWeight: 600 }}>{kategoriLabel[b.kategori]}</span>
                </td>
                <td style={{ padding: '10px 14px' }}>
                  <span style={{ fontSize: 11, padding: '3px 8px', borderRadius: 4, background: b.status === 'PUBLISHED' ? '#edfaf4' : '#fdf8ec', color: b.status === 'PUBLISHED' ? '#0a6e4f' : '#7a5a0a', fontWeight: 600 }}>{b.status}</span>
                </td>
                <td style={{ padding: '10px 14px', color: '#8a8880' }}>{b.publishedAt ? new Date(b.publishedAt).toLocaleDateString('id-ID') : '-'}</td>
                <td style={{ padding: '10px 14px' }}>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button onClick={() => openEdit(b)} style={{ fontSize: 12, color: '#0d2660', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer' }}>Edit</button>
                    <button onClick={() => hapus(b.slug)} style={{ fontSize: 12, color: '#8c2a2a', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer' }}>Hapus</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showForm && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 999, padding: '2rem' }}>
          <div style={{ background: '#fff', borderRadius: 16, padding: '2rem', maxWidth: 640, width: '100%', maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
              <div style={{ fontWeight: 700, fontSize: 15 }}>{editSlug ? 'Edit Berita' : 'Tambah Berita Baru'}</div>
              <button onClick={() => setShowForm(false)} style={{ background: 'none', border: 'none', fontSize: 20, cursor: 'pointer', color: '#8a8880' }}>×</button>
            </div>
            <div style={{ marginBottom: 12 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: '#4a4840', display: 'block', marginBottom: 6 }}>Judul *</label>
              <input style={inputStyle} value={form.judul} onChange={e => setForm(f => ({ ...f, judul: e.target.value }))} placeholder="Judul berita" />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: '#4a4840', display: 'block', marginBottom: 6 }}>Kategori</label>
                <select style={inputStyle} value={form.kategori} onChange={e => setForm(f => ({ ...f, kategori: e.target.value }))}>
                  {kategoriOptions.map(k => <option key={k} value={k}>{kategoriLabel[k]}</option>)}
                </select>
              </div>
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: '#4a4840', display: 'block', marginBottom: 6 }}>Status Publikasi</label>
                <select style={inputStyle} value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))}>
                  <option value="DRAFT">Draft</option>
                  <option value="PUBLISHED">Published</option>
                </select>
              </div>
            </div>
            <div style={{ marginBottom: 12 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: '#4a4840', display: 'block', marginBottom: 6 }}>Ringkasan *</label>
              <textarea style={{ ...inputStyle, height: 70, resize: 'vertical' }} value={form.ringkasan} onChange={e => setForm(f => ({ ...f, ringkasan: e.target.value }))} placeholder="Ringkasan singkat berita..." />
            </div>
            <div style={{ marginBottom: 16 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: '#4a4840', display: 'block', marginBottom: 6 }}>Konten *</label>
              <textarea style={{ ...inputStyle, height: 200, resize: 'vertical' }} value={form.konten} onChange={e => setForm(f => ({ ...f, konten: e.target.value }))} placeholder="Tulis isi berita lengkap di sini..." />
            </div>
            <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
              <button onClick={() => setShowForm(false)} style={{ padding: '9px 18px', borderRadius: 8, border: '1px solid #e8e5de', background: '#fff', fontSize: 13, cursor: 'pointer' }}>Batal</button>
              <button onClick={save} disabled={saving} style={{ padding: '9px 18px', borderRadius: 8, background: '#0d2660', color: '#fff', border: 'none', fontSize: 13, fontWeight: 600, cursor: 'pointer', opacity: saving ? 0.7 : 1 }}>
                {saving ? 'Menyimpan...' : (editSlug ? 'Simpan Perubahan' : 'Publikasikan')}
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminShell>
  )
}
