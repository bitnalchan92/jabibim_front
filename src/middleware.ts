import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';


// 로그인한 사용자가 접근하면 안 되는 페이지
const AUTH_ROUTES = ['/login', '/signup'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const refreshToken = request.cookies.get('refreshToken')?.value;

  // 정적 리소스 제외
  if (pathname.startsWith('/_next') || pathname.startsWith('/images')) {
    return NextResponse.next();
  }

  // 인증 페이지 (로그인/회원가입) 처리
  if (AUTH_ROUTES.includes(pathname)) {
    if (refreshToken) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
    return NextResponse.next();
  }

  // 프로덕션에서만 동작하는 보안 규칙 추가

 /*  if (process.env.NODE_ENV === 'production') {
    if (pathname.startsWith('/admin')) {
      const ip = request.ip;
      const allowedIps = ['43.203.226.104']; 
      if (!allowedIps.includes(ip ?? '')) {
        return NextResponse.redirect(new URL('/403', request.url));
      }

    }
  } */

  return NextResponse.next();

}
  


