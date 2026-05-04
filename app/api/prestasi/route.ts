import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { ok, err } from '@/lib/response'
import { getAuthUser } from '@/lib/auth'

export async function GET() {
  try {
    const data = await prisma.prestasi.findMany({ orderBy: { tahun: 'desc' } })
    return ok(data)
  } catch (e) {
    return err('Server error', 500)
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await getAuthUser()
    if (!user) return err('Unauthorized', 401)

    const { judul, tingkat, tahun, juara, siswa } = await req.json()
    if (!judul || !tingkat || !tahun || !juara || !siswa) {
      return err('Semua field wajib diisi')
    }

    const data = await prisma.prestasi.create({
      data: { judul, tingkat, tahun: parseInt(tahun), juara, siswa },
    })
    return ok(data, 201)
  } catch (e) {
    return err('Server error', 500)
  }
}
