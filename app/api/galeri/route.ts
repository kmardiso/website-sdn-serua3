import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { ok, err, paginate } from '@/lib/response'
import { getAuthUser } from '@/lib/auth'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '12')
    const kategori = searchParams.get('kategori')
    const skip = (page - 1) * limit

    const where: any = {}
    if (kategori) where.kategori = kategori

    const [data, total] = await Promise.all([
      prisma.galeri.findMany({ where, orderBy: { createdAt: 'desc' }, skip, take: limit }),
      prisma.galeri.count({ where }),
    ])

    return paginate(data, total, page, limit)
  } catch (e) {
    return err('Server error', 500)
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await getAuthUser()
    if (!user) return err('Unauthorized', 401)

    const { judul, gambar, kategori } = await req.json()
    if (!judul || !gambar) return err('Judul dan gambar wajib diisi')

    const data = await prisma.galeri.create({ data: { judul, gambar, kategori } })
    return ok(data, 201)
  } catch (e) {
    return err('Server error', 500)
  }
}
