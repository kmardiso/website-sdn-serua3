import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { ok, err, paginate } from '@/lib/response'
import { getAuthUser, slugify } from '@/lib/auth'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '6')
    const kategori = searchParams.get('kategori') as any
    const status = searchParams.get('status') as any
    const skip = (page - 1) * limit

    const where: any = {}
    if (kategori) where.kategori = kategori
    // Public endpoint hanya tampilkan PUBLISHED
    if (!status) where.status = 'PUBLISHED'
    else where.status = status

    const [data, total] = await Promise.all([
      prisma.berita.findMany({
        where,
        orderBy: { publishedAt: 'desc' },
        skip,
        take: limit,
        select: {
          id: true,
          judul: true,
          slug: true,
          ringkasan: true,
          gambar: true,
          kategori: true,
          status: true,
          publishedAt: true,
          createdAt: true,
        },
      }),
      prisma.berita.count({ where }),
    ])

    return paginate(data, total, page, limit)
  } catch (e) {
    console.error(e)
    return err('Server error', 500)
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await getAuthUser()
    if (!user) return err('Unauthorized', 401)

    const body = await req.json()
    const { judul, konten, ringkasan, gambar, kategori, status } = body

    if (!judul || !konten || !ringkasan || !kategori) {
      return err('Judul, konten, ringkasan, dan kategori wajib diisi')
    }

    const slug = slugify(judul) + '-' + Date.now()

    const berita = await prisma.berita.create({
      data: {
        judul,
        slug,
        konten,
        ringkasan,
        gambar: gambar || null,
        kategori,
        status: status || 'DRAFT',
        publishedAt: status === 'PUBLISHED' ? new Date() : null,
      },
    })

    return ok(berita, 201)
  } catch (e) {
    console.error(e)
    return err('Server error', 500)
  }
}
