'use client'
import AdminShell from '@/components/layout/AdminShell'
import { useEffect, useState } from 'react'

const statusOptions = ['PENDING', 'WAWANCARA', 'DITERIMA', 'DITOLAK']
const statusColor: Record<string, string> = {
  PENDING: '#7a5a0a', DITERIMA: '#0a6e4f', DITOLAK: '#8c2a2a', WAWANCARA: '#0d2660',
}
const statusBg: Record<string, string> = {
  PENDING: '#fdf8ec', DITERIMA: '#edfaf4', DITOLAK: '#fef0f0', WAWANCARA: '#eef2fc',
}

export default function AdminPPDBPage() {
  const [data, setData] = useState<any[]>([])
  const [meta, setMeta] = useState<any>(null)
  const [page, setPage] = useState(1)
  const [filterStatus, setFilterStatus] = useState('')
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState<any>(null)

  const fetchData = async () => {
    setLoading(true)
    const params = new URLSearchParams({ page: String(page), limit: '15' })
    if (filterStatus) params.set('status', filterStatus)
    const res = await fetch(`/api/ppdb?${params}`)
    const json = await res.json()
    setData(json.data || [])
    setMeta(json.meta)
    setLoading(false)
  }

  useEffect(() => { fetchData() }, [page, filterStatus])

  const updateStatus = async (id: number, status: string) => {
    await fetch(`/api/ppdb/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    })
    fetchData()
    setSelected(null)
  }

  return (
    <AdminShell>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h1 style={{ fontFamily: 'Playfair Display,serif', fontSize: '1.5rem', fontWeight: 700 }}>Data PPDB</h1>
        <div style={{ display: 'flex', gap: 8 }}>
          {['', ...statusOptions].map((s) => (
            <button key={s} onClick={() => { setFilterStatus(s); setPage(1) }}
              style={{ padding: '6px 14px', borderRadius: 20, fontSize: 12, fontWeight: 500, cursor: 'pointer', border: '1px solid #e8e5de', background: filterStatus === s ? '#0d2660' : '#fff', color: filterStatus === s ? '#fff' : '#1a2340' }}>
              {s || 'Semua'}
            </button>
          ))}
        </div>
      </div>

      <div style={{ background: '#fff', border: '1px solid #e8e5de', borderRadius: 12, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #e8e5de', background: '#f8f7f4' }}>
              {['No. Pendaftaran', 'Nama Calon Siswa', 'JK', 'Orang Tua', 'Telepon', 'Tanggal Daftar', 'Status', 'Aksi'].map((h) => (
                <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontSize: 11, fontWeight: 600, color: '#8a8880', letterSpacing: '0.04em', textTransform: 'uppercase' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={8} style={{ padding: '3rem', textAlign: 'center', color: '#8a8880' }}>Memuat data...</td></tr>
            ) : data.map((p) => (
              <tr key={p.id} style={{ borderBottom: '1px solid #f0ede6' }}>
                <td style={{ padding: '10px 14px', fontFamily: 'monospace', fontSize: 12 }}>{p.nomorPendaftaran}</td>
                <td style={{ padding: '10px 14px', fontWeight: 500 }}>{p.namaLengkap}</td>
                <td style={{ padding: '10px 14px' }}>{p.jenisKelamin === 'LAKI_LAKI' ? 'L' : 'P'}</td>
                <td style={{ padding: '10px 14px' }}>{p.namaAyah}</td>
                <td style={{ padding: '10px 14px' }}>{p.teleponOrtu}</td>
                <td style={{ padding: '10px 14px', color: '#8a8880' }}>{new Date(p.createdAt).toLocaleDateString('id-ID')}</td>
                <td style={{ padding: '10px 14px' }}>
                  <span style={{ fontSize: 11, padding: '3px 8px', borderRadius: 4, background: statusBg[p.status], color: statusColor[p.status], fontWeight: 600 }}>{p.status}</span>
                </td>
                <td style={{ padding: '10px 14px' }}>
                  <button onClick={() => setSelected(p)} style={{ fontSize: 12, color: '#0d2660', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer' }}>Detail</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {meta && (
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem', fontSize: 13, color: '#8a8880' }}>
          <span>Total: {meta.total} pendaftar</span>
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page <= 1} style={{ padding: '5px 12px', borderRadius: 6, border: '1px solid #e8e5de', background: '#fff', cursor: 'pointer', fontSize: 12 }}>← Prev</button>
            <span style={{ padding: '5px 12px' }}>{page} / {meta.totalPages}</span>
            <button onClick={() => setPage(p => Math.min(meta.totalPages, p + 1))} disabled={page >= meta.totalPages} style={{ padding: '5px 12px', borderRadius: 6, border: '1px solid #e8e5de', background: '#fff', cursor: 'pointer', fontSize: 12 }}>Next →</button>
          </div>
        </div>
      )}

      {selected && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 999, padding: '2rem' }}>
          <div style={{ background: '#fff', borderRadius: 16, padding: '2rem', maxWidth: 560, width: '100%', maxHeight: '85vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
              <div style={{ fontFamily: 'Playfair Display,serif', fontSize: '1.25rem', fontWeight: 700 }}>Detail Pendaftaran</div>
              <button onClick={() => setSelected(null)} style={{ background: 'none', border: 'none', fontSize: 20, cursor: 'pointer', color: '#8a8880' }}>×</button>
            </div>
            <div style={{ fontFamily: 'monospace', background: '#eef2fc', color: '#0d2660', padding: '6px 12px', borderRadius: 6, fontSize: 14, marginBottom: '1rem', display: 'inline-block', fontWeight: 700 }}>{selected.nomorPendaftaran}</div>
            {[
              ['Nama Lengkap', selected.namaLengkap],
              ['Tempat, Tanggal Lahir', `${selected.tempatLahir}, ${new Date(selected.tanggalLahir).toLocaleDateString('id-ID')}`],
              ['Jenis Kelamin', selected.jenisKelamin === 'LAKI_LAKI' ? 'Laki-laki' : 'Perempuan'],
              ['Alamat', selected.alamat],
              ['Asal Sekolah', selected.asalSekolah || '-'],
              ['Nama Ayah', selected.namaAyah],
              ['Nama Ibu', selected.namaIbu],
              ['Telepon Orang Tua', selected.teleponOrtu],
              ['Email Orang Tua', selected.emailOrtu],
              ['Tanggal Daftar', new Date(selected.createdAt).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })],
            ].map(([k, v]) => (
              <div key={k} style={{ display: 'flex', gap: 12, padding: '7px 0', borderBottom: '1px solid #f0ede6', fontSize: 13 }}>
                <span style={{ color: '#8a8880', width: 160, flexShrink: 0 }}>{k}</span>
                <span style={{ fontWeight: 500 }}>{v}</span>
              </div>
            ))}
            <div style={{ marginTop: '1.5rem' }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: '#4a4840', marginBottom: 8 }}>Update Status</div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {statusOptions.map((s) => (
                  <button key={s} onClick={() => updateStatus(selected.id, s)}
                    style={{ padding: '8px 16px', borderRadius: 6, border: '1px solid #e8e5de', background: selected.status === s ? statusBg[s] : '#fff', color: selected.status === s ? statusColor[s] : '#1a2340', fontSize: 12, fontWeight: selected.status === s ? 700 : 400, cursor: 'pointer' }}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminShell>
  )
}

