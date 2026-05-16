import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { ok, err } from '@/lib/response'
import { getAuthUser } from '@/lib/auth'

export const dynamic = 'force-dynamic'

export async function GET(_req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params
    const berita = await prisma.berita.findUnique({ where: { slug } })
    if (!berita) return err('Berita tidak ditemukan', 404)
    return ok(berita)
  } catch (e) {
    return err('Server error', 500)
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const user = await getAuthUser()
    if (!user) return err('Unauthorized', 401)
    const { slug } = await params
    const body = await req.json()
    const { judul, konten, ringkasan, gambar, kategori, status } = body
    const existing = await prisma.berita.findUnique({ where: { slug } })
    if (!existing) return err('Berita tidak ditemukan', 404)
    const updated = await prisma.berita.update({
      where: { slug },
      data: {
        judul: judul || existing.judul,
        konten: konten || existing.konten,
        ringkasan: ringkasan || existing.ringkasan,
        gambar: gambar !== undefined ? gambar : existing.gambar,
        kategori: kategori || existing.kategori,
        status: status || existing.status,
        publishedAt: status === 'PUBLISHED' && !existing.publishedAt ? new Date() : existing.publishedAt,
      },
    })
    return ok(updated)
  } catch (e) {
    return err('Server error', 500)
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const user = await getAuthUser()
    if (!user) return err('Unauthorized', 401)
    const { slug } = await params
    await prisma.berita.delete({ where: { slug } })
    return ok({ message: 'Berita dihapus' })
  } catch (e) {
    return err('Server error', 500)
  }
}