import { NextRequest, NextResponse } from 'next/server'

const USERNAME = 'admin'
const PASSWORD = 'AmGlobalHub@123'
const COOKIE_NAME = 'admin_session'
// Simple token — not a secret that needs rotation, just protects the route
const SESSION_TOKEN = 'am-global-hub-admin-authenticated'

export async function POST(req: NextRequest) {
  const { username, password } = await req.json()

  if (username !== USERNAME || password !== PASSWORD) {
    return NextResponse.json(
      { error: 'Invalid username or password.' },
      { status: 401 }
    )
  }

  const res = NextResponse.json({ ok: true })

  res.cookies.set(COOKIE_NAME, SESSION_TOKEN, {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    // 7-day session
    maxAge: 60 * 60 * 24 * 7,
    secure: process.env.NODE_ENV === 'production',
  })

  return res
}
