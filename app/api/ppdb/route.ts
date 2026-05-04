import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { ok, err, paginate } from '@/lib/response'
import { getAuthUser } from '@/lib/auth'

function generateNomorPendaftaran(): string {
  const year = new Date().getFullYear()
  const random = Math.floor(1000 + Math.random() * 9000)
  return `PPDB-${year}-${random}`
}

export async function GET(req: NextRequest) {
  try {
    const user = await getAuthUser()
    if (!user) return err('Unauthorized', 401)

    const { searchParams } = new URL(req.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const status = searchParams.get('status') as any
    const skip = (page - 1) * limit

    const where: any = {}
    if (status) where.status = status

    const [data, total] = await Promise.all([
      prisma.pPDB.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.pPDB.count({ where }),
    ])

    return paginate(data, total, page, limit)
  } catch (e) {
    console.error(e)
    return err('Server error', 500)
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const {
      namaLengkap, tempatLahir, tanggalLahir, jenisKelamin,
      alamat, namaAyah, namaIbu, teleponOrtu, emailOrtu, asalSekolah,
    } = body

    if (!namaLengkap || !tempatLahir || !tanggalLahir || !jenisKelamin ||
        !alamat || !namaAyah || !namaIbu || !teleponOrtu || !emailOrtu) {
      return err('Semua field wajib diisi')
    }

    const nomorPendaftaran = generateNomorPendaftaran()

    const ppdb = await prisma.pPDB.create({
      data: {
        namaLengkap,
        tempatLahir,
        tanggalLahir: new Date(tanggalLahir),
        jenisKelamin,
        alamat,
        namaAyah,
        namaIbu,
        teleponOrtu,
        emailOrtu,
        asalSekolah: asalSekolah || null,
        nomorPendaftaran,
        status: 'PENDING',
      },
    })

    return ok({ ...ppdb, message: `Pendaftaran berhasil! Nomor pendaftaran Anda: ${nomorPendaftaran}` }, 201)
  } catch (e) {
    console.error(e)
    return err('Server error', 500)
  }
}
