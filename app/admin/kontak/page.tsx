'use client'
import AdminShell from '@/components/layout/AdminShell'
import { useEffect, useState } from 'react'

const statusColor: Record<string, string> = {
  BELUM_DIBACA: '#8c2a2a', SUDAH_DIBACA: '#6b6860', DIBALAS: '#0a6e4f',
}
const statusBg: Record<string, string> = {
  BELUM_DIBACA: '#fef0f0', SUDAH_DIBACA: '#f8f7f4', DIBALAS: '#edfaf4',
}

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
    await fetch(`/api/kontak/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    })
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
      <h1 style={{ fontFamily: 'Playfair Display,serif', fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem' }}>Pesan Masuk</h1>

      <div style={{ background: '#fff', border: '1px solid #e8e5de', borderRadius: 12, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #e8e5de', background: '#f8f7f4' }}>
              {['Nama', 'Email', 'Telepon', 'Pesan', 'Tanggal', 'Status', 'Aksi'].map((h) => (
                <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontSize: 11, fontWeight: 600, color: '#8a8880', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={7} style={{ padding: '3rem', textAlign: 'center', color: '#8a8880' }}>Memuat...</td></tr>
            ) : data.map((k) => (
              <tr key={k.id} style={{ borderBottom: '1px solid #f0ede6', background: k.status === 'BELUM_DIBACA' ? '#fffef9' : '#fff' }}>
                <td style={{ padding: '10px 14px', fontWeight: k.status === 'BELUM_DIBACA' ? 600 : 400 }}>{k.nama}</td>
                <td style={{ padding: '10px 14px', color: '#6b6860' }}>{k.email}</td>
                <td style={{ padding: '10px 14px', color: '#6b6860' }}>{k.telepon || '-'}</td>
                <td style={{ padding: '10px 14px', maxWidth: 200, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{k.pesan}</td>
                <td style={{ padding: '10px 14px', color: '#8a8880', whiteSpace: 'nowrap' }}>{new Date(k.createdAt).toLocaleDateString('id-ID')}</td>
                <td style={{ padding: '10px 14px' }}>
                  <span style={{ fontSize: 11, padding: '3px 8px', borderRadius: 4, background: statusBg[k.status], color: statusColor[k.status], fontWeight: 600 }}>{k.status.replace('_', ' ')}</span>
                </td>
                <td style={{ padding: '10px 14px' }}>
                  <button onClick={() => { setSelected(k); if (k.status === 'BELUM_DIBACA') updateStatus(k.id, 'SUDAH_DIBACA') }}
                    style={{ fontSize: 12, color: '#0d2660', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer' }}>Baca</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {meta && (
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem', fontSize: 13, color: '#8a8880' }}>
          <span>Total: {meta.total} pesan</span>
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page <= 1} style={{ padding: '5px 12px', borderRadius: 6, border: '1px solid #e8e5de', background: '#fff', cursor: 'pointer', fontSize: 12 }}>← Prev</button>
            <span style={{ padding: '5px 12px' }}>{page} / {meta?.totalPages}</span>
            <button onClick={() => setPage(p => Math.min(meta.totalPages, p + 1))} disabled={page >= meta?.totalPages} style={{ padding: '5px 12px', borderRadius: 6, border: '1px solid #e8e5de', background: '#fff', cursor: 'pointer', fontSize: 12 }}>Next →</button>
          </div>
        </div>
      )}

      {selected && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 999, padding: '2rem' }}>
          <div style={{ background: '#fff', borderRadius: 16, padding: '2rem', maxWidth: 520, width: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <div style={{ fontWeight: 700, fontSize: 15 }}>Detail Pesan</div>
              <button onClick={() => setSelected(null)} style={{ background: 'none', border: 'none', fontSize: 20, cursor: 'pointer', color: '#8a8880' }}>×</button>
            </div>
            <div style={{ fontSize: 13, lineHeight: 2 }}>
              <div><span style={{ color: '#8a8880' }}>Dari:</span> <strong>{selected.nama}</strong></div>
              <div><span style={{ color: '#8a8880' }}>Email:</span> {selected.email}</div>
              <div><span style={{ color: '#8a8880' }}>Telepon:</span> {selected.telepon || '-'}</div>
              <div><span style={{ color: '#8a8880' }}>Tanggal:</span> {new Date(selected.createdAt).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>
            </div>
            <div style={{ background: '#f8f7f4', borderRadius: 8, padding: '1rem', fontSize: 13.5, lineHeight: 1.7, margin: '1rem 0', color: '#1a2340' }}>{selected.pesan}</div>
            <div style={{ display: 'flex', gap: 8, justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', gap: 8 }}>
                {['SUDAH_DIBACA', 'DIBALAS'].map((s) => (
                  <button key={s} onClick={() => updateStatus(selected.id, s)}
                    style={{ padding: '8px 14px', borderRadius: 6, border: '1px solid #e8e5de', background: selected.status === s ? statusBg[s] : '#fff', color: selected.status === s ? statusColor[s] : '#1a2340', fontSize: 12, fontWeight: selected.status === s ? 700 : 400, cursor: 'pointer' }}>
                    {s.replace('_', ' ')}
                  </button>
                ))}
              </div>
              <button onClick={() => hapus(selected.id)} style={{ padding: '8px 14px', borderRadius: 6, background: '#fef0f0', border: 'none', color: '#8c2a2a', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>Hapus</button>
            </div>
          </div>
        </div>
      )}
    </AdminShell>
  )
}
