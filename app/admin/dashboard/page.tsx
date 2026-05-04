import { prisma } from '@/lib/prisma'
import { getAuthUser } from '@/lib/auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import AdminShell from '@/components/layout/AdminShell'

async function getStats() {
  const [totalBerita, totalPPDB, totalKontak, pendingPPDB, belumDibacaKontak] = await Promise.all([
    prisma.berita.count({ where: { status: 'PUBLISHED' } }),
    prisma.pPDB.count(),
    prisma.kontak.count(),
    prisma.pPDB.count({ where: { status: 'PENDING' } }),
    prisma.kontak.count({ where: { status: 'BELUM_DIBACA' } }),
  ])
  return { totalBerita, totalPPDB, totalKontak, pendingPPDB, belumDibacaKontak }
}

const statusColor: Record<string, string> = {
  PENDING: '#7a5a0a', DITERIMA: '#0a6e4f', DITOLAK: '#8c2a2a', WAWANCARA: '#0d2660',
  BELUM_DIBACA: '#8c2a2a', SUDAH_DIBACA: '#6b6860', DIBALAS: '#0a6e4f',
}
const statusBg: Record<string, string> = {
  PENDING: '#fdf8ec', DITERIMA: '#edfaf4', DITOLAK: '#fef0f0', WAWANCARA: '#eef2fc',
  BELUM_DIBACA: '#fef0f0', SUDAH_DIBACA: '#f8f7f4', DIBALAS: '#edfaf4',
}

export default async function AdminDashboardPage() {
  const user = await getAuthUser()
  if (!user) redirect('/admin/login')

  const stats = await getStats()

  const recentPPDB = await prisma.pPDB.findMany({ orderBy: { createdAt: 'desc' }, take: 5 })
  const recentKontak = await prisma.kontak.findMany({ orderBy: { createdAt: 'desc' }, take: 5 })

  return (
    <AdminShell>
      <h1 style={{ fontFamily: 'Playfair Display,serif', fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem' }}>Dashboard</h1>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 12, marginBottom: '2rem' }}>
        {[
          { label: 'Berita Tayang', val: stats.totalBerita, color: '#0d2660' },
          { label: 'Total PPDB', val: stats.totalPPDB, color: '#0a6e4f' },
          { label: 'PPDB Pending', val: stats.pendingPPDB, color: '#7a5a0a' },
          { label: 'Pesan Masuk', val: stats.totalKontak, color: '#0d2660' },
          { label: 'Belum Dibaca', val: stats.belumDibacaKontak, color: '#8c2a2a' },
        ].map((s) => (
          <div key={s.label} style={{ background: '#fff', border: '1px solid #e8e5de', borderRadius: 10, padding: '1rem' }}>
            <div style={{ fontSize: '1.75rem', fontWeight: 700, color: s.color }}>{s.val}</div>
            <div style={{ fontSize: 11.5, color: '#8a8880', marginTop: 4 }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        <div style={{ background: '#fff', border: '1px solid #e8e5de', borderRadius: 12, padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <div style={{ fontWeight: 600, fontSize: 14 }}>Pendaftaran Terbaru</div>
            <Link href="/admin/ppdb" style={{ fontSize: 12, color: '#0d2660' }}>Lihat semua →</Link>
          </div>
          {recentPPDB.length === 0
            ? <div style={{ fontSize: 13, color: '#8a8880', textAlign: 'center', padding: '1rem' }}>Belum ada pendaftar</div>
            : recentPPDB.map((p) => (
              <div key={p.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid #f0ede6' }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 500 }}>{p.namaLengkap}</div>
                  <div style={{ fontSize: 11, color: '#8a8880' }}>{p.nomorPendaftaran}</div>
                </div>
                <span style={{ fontSize: 11, padding: '3px 8px', borderRadius: 4, background: statusBg[p.status], color: statusColor[p.status], fontWeight: 600 }}>{p.status}</span>
              </div>
            ))
          }
        </div>

        <div style={{ background: '#fff', border: '1px solid #e8e5de', borderRadius: 12, padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <div style={{ fontWeight: 600, fontSize: 14 }}>Pesan Terbaru</div>
            <Link href="/admin/kontak" style={{ fontSize: 12, color: '#0d2660' }}>Lihat semua →</Link>
          </div>
          {recentKontak.length === 0
            ? <div style={{ fontSize: 13, color: '#8a8880', textAlign: 'center', padding: '1rem' }}>Belum ada pesan</div>
            : recentKontak.map((k) => (
              <div key={k.id} style={{ padding: '8px 0', borderBottom: '1px solid #f0ede6' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontSize: 13, fontWeight: 500 }}>{k.nama}</div>
                  <span style={{ fontSize: 11, padding: '3px 8px', borderRadius: 4, background: statusBg[k.status], color: statusColor[k.status], fontWeight: 600 }}>{k.status.replace('_', ' ')}</span>
                </div>
                <div style={{ fontSize: 11.5, color: '#8a8880', marginTop: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{k.pesan}</div>
              </div>
            ))
          }
        </div>
      </div>
    </AdminShell>
  )
}