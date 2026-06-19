import { NextRequest } from 'next/server'
import { err } from '@/lib/response'
import { getAuthUser } from '@/lib/auth'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  try {
    const user = await getAuthUser()
    if (!user) return err('Unauthorized', 401)

    const formData = await req.formData()
    const file = formData.get('file') as File | null

    if (!file) return err('File tidak ditemukan', 400)

    // Validasi tipe file
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']
    if (!allowedTypes.includes(file.type)) {
      return err('Tipe file tidak didukung. Gunakan JPG, PNG, atau WebP.', 400)
    }

    // Validasi ukuran (maks 2MB)
    const maxSize = 2 * 1024 * 1024
    if (file.size > maxSize) {
      return err('Ukuran file terlalu besar. Maksimal 2MB.', 400)
    }

    // Coba Vercel Blob kalau ada token-nya
    if (process.env.BLOB_READ_WRITE_TOKEN) {
      const { put } = await import('@vercel/blob')
      const filename = `berita/${Date.now()}-${file.name.replace(/\s+/g, '-')}`
      const blob = await put(filename, file, { access: 'public' })
      return Response.json({ url: blob.url })
    }

    // Fallback: convert ke base64 data URL (works tanpa storage eksternal)
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const base64 = buffer.toString('base64')
    const dataUrl = `data:${file.type};base64,${base64}`

    return Response.json({ url: dataUrl })

  } catch (e) {
    console.error('Upload error:', e)
    return err('Upload gagal', 500)
  }
}