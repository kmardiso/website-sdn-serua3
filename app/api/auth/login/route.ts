import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { signToken } from '@/lib/auth'
import { ok, err } from '@/lib/response'
import bcrypt from 'bcryptjs'
import { cookies } from 'next/headers'

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json()

    if (!email || !password) return err('Email dan password wajib diisi')

    const admin = await prisma.admin.findUnique({ where: { email } })
    if (!admin) return err('Email atau password salah', 401)

    const valid = await bcrypt.compare(password, admin.password)
    if (!valid) return err('Email atau password salah', 401)

    const token = await signToken({ id: admin.id, email: admin.email, role: admin.role, nama: admin.nama })

    const cookieStore = cookies()
    cookieStore.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    })

    return ok({ nama: admin.nama, email: admin.email, role: admin.role })
  } catch (e) {
    console.error(e)
    return err('Server error', 500)
  }
}
