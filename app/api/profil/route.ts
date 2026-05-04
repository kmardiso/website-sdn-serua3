import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { ok, err } from '@/lib/response'
import { getAuthUser } from '@/lib/auth'

export async function GET() {
  try {
    const profil = await prisma.profilSekolah.findMany({
      orderBy: { id: 'asc' },
    })
    return ok(profil)
  } catch (e) {
    return err('Server error', 500)
  }
}

export async function PUT(req: NextRequest) {
  try {
    const user = await getAuthUser()
    if (!user) return err('Unauthorized', 401)

    const body = await req.json()
    const { key, judul, konten } = body

    if (!key || !konten) return err('Key dan konten wajib diisi')

    const updated = await prisma.profilSekolah.upsert({
      where: { key },
      update: { judul, konten },
      create: { key, judul: judul || key, konten },
    })

    return ok(updated)
  } catch (e) {
    return err('Server error', 500)
  }
}
