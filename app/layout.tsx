import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'SD Negeri Serua 3 - Tangerang Selatan',
  description: 'Website resmi SD Negeri Serua 3, Ciputat, Kota Tangerang Selatan. NPSN 20604893.',
  keywords: 'SDN Serua 3, sekolah dasar, Tangerang Selatan, Ciputat, PPDB',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  )
}
export const dynamic = 'force-dynamic'