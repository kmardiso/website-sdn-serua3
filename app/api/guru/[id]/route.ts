import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { ok, err } from '@/lib/response'
import { getAuthUser } from '@/lib/auth'

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await getAuthUser()
    if (!user) return err('Unauthorized', 401)

    const body = await req.json()
    const updated = await prisma.guru.update({
      where: { id: parseInt(params.id) },
      data: body,
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

    await prisma.guru.update({
      where: { id: parseInt(params.id) },
      data: { aktif: false },
    })
    return ok({ message: 'Guru dinonaktifkan' })
  } catch (e) {
    return err('Server error', 500)
  }
}
