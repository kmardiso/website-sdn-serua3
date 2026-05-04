import { NextRequest, NextResponse } from 'next/server'
import { verifyToken } from './lib/auth'

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  if (pathname === '/admin/login') return NextResponse.next()
  if (pathname === '/api/auth/login') return NextResponse.next()
  if (pathname === '/api/auth/logout') return NextResponse.next()

  const isAdminPage = pathname.startsWith('/admin/')
  const isAdminApi = pathname.startsWith('/api/admin/')

  if (!isAdminPage && !isAdminApi) return NextResponse.next()

  const token = req.cookies.get('auth-token')?.value

  if (!token) {
    if (isAdminApi) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 })
    }
    return NextResponse.redirect(new URL('/admin/login', req.url))
  }

  const payload = await verifyToken(token)
  if (!payload) {
    if (isAdminApi) {
      return NextResponse.json({ success: false, message: 'Token tidak valid' }, { status: 401 })
    }
    const res = NextResponse.redirect(new URL('/admin/login', req.url))
    res.cookies.delete('auth-token')
    return res
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
}