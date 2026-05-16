import Link from 'next/link'

async function getGaleri(kategori?: string) {
  try {
    const params = new URLSearchParams({ limit: '24' })
    if (kategori) params.set('kategori', kategori)
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/galeri?${params}`, { cache: 'no-store' })
    const json = await res.json()
    return json.data || []
  } catch { return [] }
}

export default async function GaleriPage() {
  const galeriList = await getGaleri()

  const kategoriSet: string[] = Array.from(new Set<string>(galeriList.map((g: any) => g.kategori).filter(Boolean)))
  galeriList.forEach((g: any) => {
    if (g.kategori && !kategoriSet.includes(g.kategori)) kategoriSet.push(g.kategori)
  })
  const kategoriList = kategoriSet

  return (
    <>
      <nav style={{ background: '#0d2660', padding: '0 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64, position: 'sticky', top: 0, zIndex: 100 }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 40, height: 40, background: '#c8a84b', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Playfair Display,serif', fontSize: 16, fontWeight: 700, color: '#0d2660' }}>SD</div>
          <div>
            <div style={{ color: '#fff', fontWeight: 600, fontSize: 13 }}>SDN Serua 3</div>
            <div style={{ color: '#c8a84b', fontSize: 11 }}>Tangerang Selatan</div>
          </div>
        </Link>
        <div style={{ display: 'flex', gap: 2 }}>
          {[['/', 'Beranda'], ['/berita', 'Berita'], ['/galeri', 'Galeri'], ['/ppdb', 'PPDB'], ['/kontak', 'Kontak']].map(([href, label]) => (
            <Link key={href} href={href} style={{ color: href === '/galeri' ? '#c8a84b' : 'rgba(255,255,255,0.75)', fontSize: 12.5, fontWeight: 500, padding: '8px 12px', borderRadius: 4 }}>{label}</Link>
          ))}
        </div>
      </nav>

      <section style={{ background: '#0d2660', padding: '3rem 2rem' }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <div style={{ fontFamily: 'Playfair Display,serif', fontSize: '2rem', fontWeight: 700, color: '#fff', marginBottom: '0.5rem' }}>Galeri Kegiatan</div>
          <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 14 }}>Dokumentasi kegiatan belajar mengajar dan acara SD Negeri Serua 3</p>
        </div>
      </section>

      <section style={{ padding: '3rem 2rem', background: '#f8f7f4', minHeight: '60vh' }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          {kategoriList.length > 0 && (
            <div style={{ display: 'flex', gap: 8, marginBottom: '1.5rem', flexWrap: 'wrap' }}>
              {['Semua', ...kategoriList].map((k: any) => (
                <span key={k} style={{ padding: '6px 14px', borderRadius: 20, fontSize: 12, fontWeight: 500, background: '#fff', border: '1px solid #e8e5de', color: '#1a2340', cursor: 'pointer' }}>{k}</span>
              ))}
            </div>
          )}

          {galeriList.length > 0 ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 12 }}>
              {galeriList.map((g: any) => (
                <div key={g.id} style={{ background: '#fff', border: '1px solid #e8e5de', borderRadius: 10, overflow: 'hidden' }}>
                  <div style={{ height: 200, background: '#eef2fc', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {g.gambar ? (
                      <img src={g.gambar} alt={g.judul} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <span style={{ fontSize: 40, opacity: 0.2 }}>🖼️</span>
                    )}
                  </div>
                  <div style={{ padding: '0.75rem 1rem' }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: '#1a2340' }}>{g.judul}</div>
                    {g.kategori && (
                      <div style={{ fontSize: 11, color: '#8a8880', marginTop: 3 }}>{g.kategori}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '5rem 2rem', color: '#8a8880' }}>
              <div style={{ fontSize: 48, marginBottom: 16, opacity: 0.3 }}>🖼️</div>
              <div style={{ fontSize: 15, fontWeight: 500, marginBottom: 8 }}>Belum ada foto galeri</div>
              <div style={{ fontSize: 13 }}>Admin dapat menambahkan foto melalui panel admin</div>
            </div>
          )}
        </div>
      </section>

      <footer style={{ background: '#0b1e4d', padding: '1.5rem 2rem' }}>
        <div style={{ maxWidth: 860, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: 12 }}>© {new Date().getFullYear()} SD Negeri Serua 3 — Tangerang Selatan</p>
          <Link href="/" style={{ color: 'rgba(255,255,255,0.4)', fontSize: 12 }}>Kembali ke Beranda</Link>
        </div>
      </footer>
    </>
  )
}