import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  console.log('🔍 Request:', {
    method: request.method,
    url: request.url,
    pathname: request.nextUrl.pathname,
    timestamp: new Date().toISOString(),
    userAgent: request.headers.get('user-agent'),
    cookies: request.cookies.getAll(),
  });

  return NextResponse.next();
}

// Optionally, you can configure which paths the middleware runs on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
