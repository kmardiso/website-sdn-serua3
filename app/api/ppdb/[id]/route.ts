import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { ok, err } from '@/lib/response'
import { getAuthUser } from '@/lib/auth'

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await getAuthUser()
    if (!user) return err('Unauthorized', 401)

    const ppdb = await prisma.pPDB.findUnique({ where: { id: parseInt(params.id) } })
    if (!ppdb) return err('Data tidak ditemukan', 404)
    return ok(ppdb)
  } catch (e) {
    return err('Server error', 500)
  }
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await getAuthUser()
    if (!user) return err('Unauthorized', 401)

    const { status } = await req.json()
    const updated = await prisma.pPDB.update({
      where: { id: parseInt(params.id) },
      data: { status },
    })

    return ok(updated)
  } catch (e) {
    return err('Server error', 500)
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await getAuthUser()
    if (!user) return err('Unauthorized', 401)

    await prisma.pPDB.delete({ where: { id: parseInt(params.id) } })
    return ok({ message: 'Data dihapus' })
  } catch (e) {
    return err('Server error', 500)
  }
}
