import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { ok, err } from '@/lib/response'
import { getAuthUser } from '@/lib/auth'

export async function GET() {
  try {
    const info = await prisma.infoSekolah.findMany()
    const result: Record<string, string> = {}
    info.forEach((i) => { result[i.key] = i.value })
    return ok(result)
  } catch (e) {
    return err('Server error', 500)
  }
}

export async function PUT(req: NextRequest) {
  try {
    const user = await getAuthUser()
    if (!user) return err('Unauthorized', 401)

    const updates: { key: string; value: string; label?: string }[] = await req.json()

    const results = await Promise.all(
      updates.map((u) =>
        prisma.infoSekolah.upsert({
          where: { key: u.key },
          update: { value: u.value },
          create: { key: u.key, value: u.value, label: u.label || u.key },
        })
      )
    )

    return ok(results)
  } catch (e) {
    return err('Server error', 500)
  }
}
