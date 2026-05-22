'use client'
import { useEffect, useState } from 'react'
import AdminShell from '@/components/layout/AdminShell'

const statusColor: Record<string, string> = { BELUM_DIBACA: '#dc2626', SUDAH_DIBACA: '#6b7280', DIBALAS: '#16a34a' }
const statusBg: Record<string, string> = { BELUM_DIBACA: '#fef2f2', SUDAH_DIBACA: '#f9fafb', DIBALAS: '#f0fdf4' }

export default function AdminKontakPage() {
  const [data, setData] = useState<any[]>([])
  const [meta, setMeta] = useState<any>(null)
  const [page, setPage] = useState(1)
  const [selected, setSelected] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  const fetchData = async () => {
    setLoading(true)
    const res = await fetch(`/api/kontak?page=${page}&limit=20`)
    const json = await res.json()
    setData(json.data || [])
    setMeta(json.meta)
    setLoading(false)
  }

  useEffect(() => { fetchData() }, [page])

  const updateStatus = async (id: number, status: string) => {
    await fetch(`/api/kontak/${id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status }) })
    fetchData()
    if (selected?.id === id) setSelected({ ...selected, status })
  }

  const hapus = async (id: number) => {
    if (!confirm('Hapus pesan ini?')) return
    await fetch(`/api/kontak/${id}`, { method: 'DELETE' })
    fetchData()
    setSelected(null)
  }

  return (
    <AdminShell>
      <div style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ fontWeight: 800, fontSize: '1.5rem', color: '#1B2D6B', marginBottom: 4 }}>Pesan Masuk</h1>
        <p style={{ fontSize: 13, color: '#6b7280' }}>Kelola pesan dan pertanyaan dari pengunjung website</p>
      </div>

      <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 16, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr style={{ background: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
              {['Pengirim', 'Email', 'Pesan', 'Tanggal', 'Status', 'Aksi'].map(h => (
                <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: 11.5, fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={6} style={{ padding: '3rem', textAlign: 'center', color: '#9ca3af' }}>Memuat...</td></tr>
            ) : data.length === 0 ? (
              <tr><td colSpan={6} style={{ padding: '3rem', textAlign: 'center', color: '#9ca3af' }}>Belum ada pesan masuk.</td></tr>
            ) : data.map(k => (
              <tr key={k.id} style={{ borderBottom: '1px solid #f3f4f6', background: k.status === 'BELUM_DIBACA' ? '#fffef9' : '#fff' }}>
                <td style={{ padding: '12px 16px', fontWeight: k.status === 'BELUM_DIBACA' ? 700 : 500, color: '#1B2D6B' }}>{k.nama}</td>
                <td style={{ padding: '12px 16px', color: '#6b7280', fontSize: 12 }}>{k.email}</td>
                <td style={{ padding: '12px 16px', maxWidth: 200, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', color: '#374151' }}>{k.pesan}</td>
                <td style={{ padding: '12px 16px', color: '#9ca3af', fontSize: 12, whiteSpace: 'nowrap' }}>{new Date(k.createdAt).toLocaleDateString('id-ID')}</td>
                <td style={{ padding: '12px 16px' }}>
                  <span style={{ fontSize: 11, padding: '4px 10px', borderRadius: 20, background: statusBg[k.status], color: statusColor[k.status], fontWeight: 600 }}>{k.status.replace('_', ' ')}</span>
                </td>
                <td style={{ padding: '12px 16px' }}>
                  <button onClick={() => { setSelected(k); if (k.status === 'BELUM_DIBACA') updateStatus(k.id, 'SUDAH_DIBACA') }}
                    style={{ fontSize: 12.5, color: '#1B2D6B', fontWeight: 600, background: '#EEF2FF', border: 'none', padding: '6px 12px', borderRadius: 6, cursor: 'pointer' }}>
                    Baca
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      {meta && (
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem', fontSize: 13, color: '#6b7280' }}>
          <span>Total: {meta.total} pesan</span>
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page <= 1} style={{ padding: '6px 14px', borderRadius: 8, border: '1px solid #e5e7eb', background: '#fff', cursor: 'pointer', fontSize: 12 }}>← Prev</button>
            <span style={{ padding: '6px 14px' }}>{page} / {meta.totalPages}</span>
            <button onClick={() => setPage(p => Math.min(meta.totalPages, p + 1))} disabled={page >= meta.totalPages} style={{ padding: '6px 14px', borderRadius: 8, border: '1px solid #e5e7eb', background: '#fff', cursor: 'pointer', fontSize: 12 }}>Next →</button>
          </div>
        </div>
      )}

      {/* DETAIL MODAL */}
      {selected && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 999, padding: '2rem' }}>
          <div style={{ background: '#fff', borderRadius: 20, padding: '2rem', maxWidth: 520, width: '100%', boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <div style={{ fontWeight: 800, fontSize: 16, color: '#1B2D6B' }}>Detail Pesan</div>
              <button onClick={() => setSelected(null)} style={{ background: 'none', border: 'none', fontSize: 22, cursor: 'pointer', color: '#9ca3af' }}>×</button>
            </div>
            <div style={{ background: '#f9fafb', borderRadius: 12, padding: '1rem', marginBottom: '1rem' }}>
              <div style={{ fontSize: 13, lineHeight: 2 }}>
                <div><span style={{ color: '#9ca3af', fontWeight: 500 }}>Dari: </span><strong>{selected.nama}</strong></div>
                <div><span style={{ color: '#9ca3af', fontWeight: 500 }}>Email: </span>{selected.email}</div>
                <div><span style={{ color: '#9ca3af', fontWeight: 500 }}>Telepon: </span>{selected.telepon || '-'}</div>
                <div><span style={{ color: '#9ca3af', fontWeight: 500 }}>Tanggal: </span>{new Date(selected.createdAt).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>
              </div>
            </div>
            <div style={{ background: '#f9fafb', borderRadius: 12, padding: '1rem', fontSize: 14, lineHeight: 1.8, color: '#374151', marginBottom: '1.25rem' }}>{selected.pesan}</div>
            <div style={{ display: 'flex', gap: 8, justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', gap: 8 }}>
                {['SUDAH_DIBACA', 'DIBALAS'].map(s => (
                  <button key={s} onClick={() => updateStatus(selected.id, s)}
                    style={{ padding: '8px 16px', borderRadius: 8, border: '1px solid #e5e7eb', background: selected.status === s ? statusBg[s] : '#fff', color: selected.status === s ? statusColor[s] : '#374151', fontSize: 12.5, fontWeight: selected.status === s ? 700 : 400, cursor: 'pointer' }}>
                    {s.replace('_', ' ')}
                  </button>
                ))}
              </div>
              <button onClick={() => hapus(selected.id)} style={{ padding: '8px 16px', borderRadius: 8, background: '#fef2f2', border: 'none', color: '#dc2626', fontSize: 12.5, fontWeight: 600, cursor: 'pointer' }}>Hapus</button>
            </div>
          </div>
        </div>
      )}
    </AdminShell>
  )
}