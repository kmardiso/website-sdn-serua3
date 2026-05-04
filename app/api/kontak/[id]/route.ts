import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { ok, err } from '@/lib/response'
import { getAuthUser } from '@/lib/auth'

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await getAuthUser()
    if (!user) return err('Unauthorized', 401)

    const id = parseInt(params.id)
    const { status } = await req.json()

    const updated = await prisma.kontak.update({
      where: { id },
      data: { status },
    })

    return ok(updated)
  } catch (e) {
    console.error(e)
    return err('Server error', 500)
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await getAuthUser()
    if (!user) return err('Unauthorized', 401)

    await prisma.kontak.delete({ where: { id: parseInt(params.id) } })
    return ok({ message: 'Pesan dihapus' })
  } catch (e) {
    console.error(e)
    return err('Server error', 500)
  }
}
