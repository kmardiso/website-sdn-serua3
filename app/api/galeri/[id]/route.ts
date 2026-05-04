import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { ok, err } from '@/lib/response'
import { getAuthUser } from '@/lib/auth'

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await getAuthUser()
    if (!user) return err('Unauthorized', 401)

    await prisma.galeri.delete({ where: { id: parseInt(params.id) } })
    return ok({ message: 'Foto dihapus' })
  } catch (e) {
    return err('Server error', 500)
  }
}
