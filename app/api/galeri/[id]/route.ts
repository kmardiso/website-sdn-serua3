import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { ok, err } from '@/lib/response'
import { getAuthUser } from '@/lib/auth'

export const dynamic = 'force-dynamic'

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await getAuthUser()
    if (!user) return err('Unauthorized', 401)
    const { id } = await params
    await prisma.galeri.delete({ where: { id: parseInt(id) } })
    return ok({ message: 'Foto dihapus' })
  } catch (e) {
    return err('Server error', 500)
  }
}