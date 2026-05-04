import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { ok, err } from '@/lib/response'
import { getAuthUser } from '@/lib/auth'

export async function GET() {
  try {
    const data = await prisma.fasilitas.findMany({ orderBy: { urutan: 'asc' } })
    return ok(data)
  } catch (e) {
    return err('Server error', 500)
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await getAuthUser()
    if (!user) return err('Unauthorized', 401)

    const { nama, deskripsi, icon, gambar, urutan } = await req.json()
    if (!nama || !deskripsi) return err('Nama dan deskripsi wajib diisi')

    const data = await prisma.fasilitas.create({
      data: { nama, deskripsi, icon, gambar, urutan: urutan || 0 },
    })
    return ok(data, 201)
  } catch (e) {
    return err('Server error', 500)
  }
}
