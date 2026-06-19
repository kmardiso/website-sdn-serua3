import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import { notFound } from 'next/navigation'

async function getBeritaBySlug(slug: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/berita/${slug}`, {
      next: { revalidate: 600 },
    })
    if (!res.ok) return null
    const json = await res.json()
    return json.data
  } catch {
    return null
  }
}

export default async function BeritaDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const berita = await getBeritaBySlug(slug)
  if (!berita) notFound()

  const tanggal = berita.publishedAt
    ? new Date(berita.publishedAt).toLocaleDateString('id-ID', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : ''

  return (
    <>
      <Navbar />

      {/* HERO */}
      <section
        style={{
          background: 'linear-gradient(135deg, #1B2D6B, #2a4090)',
          padding: '3rem 1.5rem',
        }}
      >
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', marginBottom: 12 }}>
            <Link href="/" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>
              Beranda
            </Link>{' '}
            &rsaquo;{' '}
            <Link href="/berita" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>
              Berita
            </Link>{' '}
            &rsaquo; <span style={{ color: '#fff' }}>Detail</span>
          </div>
          {berita.kategori && (
            <span
              style={{
                display: 'inline-block',
                background: 'rgba(200,168,75,0.2)',
                color: '#C8A84B',
                fontSize: 11,
                fontWeight: 600,
                padding: '4px 12px',
                borderRadius: 20,
                marginBottom: 16,
              }}
            >
              {berita.kategori}
            </span>
          )}
          <h1
            style={{
              fontWeight: 800,
              fontSize: '2rem',
              color: '#fff',
              lineHeight: 1.3,
              marginBottom: 12,
            }}
          >
            {berita.judul}
          </h1>
          <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13 }}>{tanggal}</div>
        </div>
      </section>

      {/* ARTIKEL */}
      <article style={{ maxWidth: 800, margin: '3rem auto', padding: '0 1.5rem' }}>
        {/* Gambar utama */}
        {berita.gambar ? (
          <div
            style={{
              borderRadius: 16,
              overflow: 'hidden',
              marginBottom: '2.5rem',
              boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
            }}
          >
            <img
              src={berita.gambar}
              alt={berita.judul}
              style={{ width: '100%', maxHeight: 420, objectFit: 'cover', display: 'block' }}
            />
          </div>
        ) : (
          <div
            style={{
              background: '#f3f4f6',
              height: 280,
              borderRadius: 16,
              marginBottom: '2.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span style={{ fontSize: 64, opacity: 0.2 }}>📰</span>
          </div>
        )}

        {/* Konten */}
        <div
          style={{
            fontSize: 15.5,
            lineHeight: 1.9,
            color: '#374151',
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
          }}
        >
          {berita.konten}
        </div>

        {/* Back button */}
        <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid #e5e7eb' }}>
          <Link
            href="/berita"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              background: '#1B2D6B',
              color: '#fff',
              fontWeight: 600,
              fontSize: 14,
              padding: '12px 24px',
              borderRadius: 10,
              textDecoration: 'none',
            }}
          >
            ← Kembali ke Berita
          </Link>
        </div>
      </article>

      <Footer />
    </>
  )
}