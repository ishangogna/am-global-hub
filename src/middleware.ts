import { NextRequest, NextResponse } from 'next/server'

const COOKIE_NAME = 'admin_session'
const SESSION_TOKEN = 'am-global-hub-admin-authenticated'

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Only protect /admin routes, but not /admin/login itself
  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
    const token = req.cookies.get(COOKIE_NAME)?.value

    if (token !== SESSION_TOKEN) {
      const loginUrl = new URL('/admin/login', req.url)
      return NextResponse.redirect(loginUrl)
    }
  }

  // If already authenticated and visiting /admin/login, redirect to dashboard
  if (pathname.startsWith('/admin/login')) {
    const token = req.cookies.get(COOKIE_NAME)?.value
    if (token === SESSION_TOKEN) {
      return NextResponse.redirect(new URL('/admin', req.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
