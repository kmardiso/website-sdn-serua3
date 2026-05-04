import Link from 'next/link'

async function getBerita(page = 1, kategori?: string) {
  const params = new URLSearchParams({ page: String(page), limit: '9' })
  if (kategori) params.set('kategori', kategori)
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/berita?${params}`, { next: { revalidate: 300 } })
  const json = await res.json()
  return json
}

const kategoriLabel: Record<string, string> = {
  PENGUMUMAN: 'Pengumuman', PRESTASI: 'Prestasi', KEGIATAN: 'Kegiatan', INFORMASI: 'Informasi',
}

export default async function BeritaPage() {
  const result = await getBerita()
  const beritaList = result.data || []

  return (
    <>
      <nav style={{ background: '#0d2660', padding: '0 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 40, height: 40, background: '#c8a84b', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Playfair Display,serif', fontSize: 16, fontWeight: 700, color: '#0d2660' }}>SD</div>
          <div style={{ color: '#fff', fontWeight: 600, fontSize: 13 }}>SDN Serua 3</div>
        </Link>
        <div style={{ display: 'flex', gap: 2 }}>
          {[['/', 'Beranda'], ['/berita', 'Berita'], ['/ppdb', 'PPDB'], ['/kontak', 'Kontak']].map(([href, label]) => (
            <Link key={href} href={href} style={{ color: 'rgba(255,255,255,0.75)', fontSize: 12.5, fontWeight: 500, padding: '8px 12px', borderRadius: 4 }}>{label}</Link>
          ))}
        </div>
      </nav>

      <section style={{ padding: '3rem 2rem', background: '#f8f7f4', minHeight: '80vh' }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <div style={{ fontFamily: 'Playfair Display,serif', fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Berita & Pengumuman</div>
          <p style={{ color: '#6b6860', fontSize: 13.5, marginBottom: '2rem' }}>Informasi terkini dari SD Negeri Serua 3</p>

          <div style={{ display: 'flex', gap: 8, marginBottom: '1.5rem', flexWrap: 'wrap' }}>
            {['Semua', 'PENGUMUMAN', 'PRESTASI', 'KEGIATAN', 'INFORMASI'].map((k) => (
              <span key={k} style={{ padding: '6px 14px', borderRadius: 20, fontSize: 12, fontWeight: 500, background: '#fff', border: '1px solid #e8e5de', color: '#1a2340', cursor: 'pointer' }}>
                {k === 'Semua' ? 'Semua' : kategoriLabel[k]}
              </span>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 14 }}>
            {beritaList.map((b: any) => (
              <Link key={b.id} href={`/berita/${b.slug}`} style={{ border: '1px solid #e8e5de', borderRadius: 10, overflow: 'hidden', display: 'block', background: '#fff' }}>
                <div style={{ height: 120, background: '#eef2fc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: 32, opacity: 0.3 }}>📰</span>
                </div>
                <div style={{ padding: '1rem' }}>
                  <span style={{ display: 'inline-block', background: '#eef2fc', color: '#0d2660', fontSize: 10, fontWeight: 600, padding: '3px 8px', borderRadius: 4, marginBottom: 6 }}>
                    {kategoriLabel[b.kategori] || b.kategori}
                  </span>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#1a2340', lineHeight: 1.4, marginBottom: 6 }}>{b.judul}</div>
                  <div style={{ fontSize: 12, color: '#8a8880', lineHeight: 1.5, marginBottom: 8 }}>{b.ringkasan}</div>
                  <div style={{ fontSize: 11, color: '#b0ada6' }}>
                    {b.publishedAt ? new Date(b.publishedAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : ''}
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {beritaList.length === 0 && (
            <div style={{ textAlign: 'center', padding: '4rem', color: '#8a8880' }}>Belum ada berita yang dipublikasikan.</div>
          )}
        </div>
      </section>
    </>
  )
}
