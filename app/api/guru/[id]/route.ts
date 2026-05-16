import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { ok, err } from '@/lib/response'
import { getAuthUser } from '@/lib/auth'

export const dynamic = 'force-dynamic'

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await getAuthUser()
    if (!user) return err('Unauthorized', 401)
    const { id } = await params
    const body = await req.json()
    const updated = await prisma.guru.update({ where: { id: parseInt(id) }, data: body })
    return ok(updated)
  } catch (e) {
    return err('Server error', 500)
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await getAuthUser()
    if (!user) return err('Unauthorized', 401)
    const { id } = await params
    await prisma.guru.update({ where: { id: parseInt(id) }, data: { aktif: false } })
    return ok({ message: 'Guru dinonaktifkan' })
  } catch (e) {
    return err('Server error', 500)
  }
}