import Link from 'next/link'
import { notFound } from 'next/navigation'

async function getBeritaBySlug(slug: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/berita/${slug}`, { next: { revalidate: 600 } })
    if (!res.ok) return null
    const json = await res.json()
    return json.data
  } catch { return null }
}

export default async function BeritaDetailPage({ params }: { params: { slug: string } }) {
  const berita = await getBeritaBySlug(params.slug)
  if (!berita) notFound()

  return (
    <>
      <nav style={{ background: '#0d2660', padding: '0 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 40, height: 40, background: '#c8a84b', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Playfair Display,serif', fontSize: 16, fontWeight: 700, color: '#0d2660' }}>SD</div>
          <div style={{ color: '#fff', fontWeight: 600, fontSize: 13 }}>SDN Serua 3</div>
        </Link>
        <Link href="/berita" style={{ color: 'rgba(255,255,255,0.75)', fontSize: 12.5, padding: '8px 12px' }}>← Kembali ke Berita</Link>
      </nav>

      <article style={{ maxWidth: 720, margin: '3rem auto', padding: '0 2rem' }}>
        <span style={{ display: 'inline-block', background: '#eef2fc', color: '#0d2660', fontSize: 11, fontWeight: 600, padding: '4px 10px', borderRadius: 4, marginBottom: 12 }}>
          {berita.kategori}
        </span>
        <h1 style={{ fontFamily: 'Playfair Display,serif', fontSize: '2rem', fontWeight: 700, lineHeight: 1.25, marginBottom: '0.75rem', color: '#1a2340' }}>{berita.judul}</h1>
        <div style={{ color: '#8a8880', fontSize: 13, marginBottom: '2rem' }}>
          {berita.publishedAt ? new Date(berita.publishedAt).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }) : ''}
        </div>
        <div style={{ background: '#f8f7f4', height: 280, borderRadius: 10, marginBottom: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontSize: 48, opacity: 0.2 }}>📰</span>
        </div>
        <div style={{ fontSize: 15, lineHeight: 1.8, color: '#2a3050', whiteSpace: 'pre-wrap' }}>{berita.konten}</div>
      </article>
    </>
  )
}
