import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { ok, err, paginate } from '@/lib/response'
import { getAuthUser } from '@/lib/auth'

export async function GET(req: NextRequest) {
  try {
    const user = await getAuthUser()
    if (!user) return err('Unauthorized', 401)

    const { searchParams } = new URL(req.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const status = searchParams.get('status') as any
    const skip = (page - 1) * limit

    const where: any = {}
    if (status) where.status = status

    const [data, total] = await Promise.all([
      prisma.kontak.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.kontak.count({ where }),
    ])

    return paginate(data, total, page, limit)
  } catch (e) {
    console.error(e)
    return err('Server error', 500)
  }
}

export async function POST(req: NextRequest) {
  try {
    const { nama, email, telepon, pesan } = await req.json()

    if (!nama || !email || !pesan) {
      return err('Nama, email, dan pesan wajib diisi')
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) return err('Format email tidak valid')

    const kontak = await prisma.kontak.create({
      data: { nama, email, telepon: telepon || null, pesan },
    })

    return ok(kontak, 201)
  } catch (e) {
    console.error(e)
    return err('Server error', 500)
  }
}
