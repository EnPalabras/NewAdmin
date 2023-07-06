import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'

// paths that require authentication or authorization

export async function middleware(request) {
  const res = NextResponse.next()
  const pathname = request.nextUrl.pathname

  console.log('pathname', pathname)

  const token = await getToken({
    req: request,
    secret: 'Probando',
  })
  console.log('token', token)

  if (pathname === '/login' || pathname === '/register') {
    if (token) {
      const url = new URL(`/`, request.url)
      return NextResponse.redirect(url)
    }
  }

  if (
    pathname !== '/login' &&
    pathname !== '/register' &&
    pathname !== '/retiros' &&
    !pathname.includes('/retiros')
  ) {
    if (token && token.email === 'entregas@gmail.com') {
      console.log('token.email', token.email)
      const url = new URL(`/retiros`, request.url)
      return NextResponse.redirect(url)
    }
    if (!token) {
      const url = new URL(`/login`, request.url)
      return NextResponse.redirect(url)
    }
  }

  return res
}

// Falta agregar el middleware para proteger rutas
export const config = {
  matcher: [
    '/login/:path*',
    '/register/:path*',
    '/retiros',
    '/',
    '/ventas/:path*',
    '/ventas',
  ],
}
