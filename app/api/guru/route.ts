import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { ok, err } from '@/lib/response'
import { getAuthUser } from '@/lib/auth'

export async function GET() {
  try {
    const data = await prisma.guru.findMany({
      where: { aktif: true },
      orderBy: { urutan: 'asc' },
    })
    return ok(data)
  } catch (e) {
    return err('Server error', 500)
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await getAuthUser()
    if (!user) return err('Unauthorized', 401)

    const { nama, nip, jabatan, mapel, foto, urutan } = await req.json()
    if (!nama || !jabatan) return err('Nama dan jabatan wajib diisi')

    const data = await prisma.guru.create({
      data: { nama, nip, jabatan, mapel, foto, urutan: urutan || 0 },
    })
    return ok(data, 201)
  } catch (e) {
    return err('Server error', 500)
  }
}
