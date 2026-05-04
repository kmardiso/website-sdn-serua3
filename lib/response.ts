import { NextResponse } from 'next/server'

export function ok(data: unknown, status = 200) {
  return NextResponse.json({ success: true, data }, { status })
}

export function err(message: string, status = 400) {
  return NextResponse.json({ success: false, message }, { status })
}

export function paginate<T>(data: T[], total: number, page: number, limit: number) {
  return NextResponse.json({
    success: true,
    data,
    meta: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  })
}
