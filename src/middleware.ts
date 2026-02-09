import { NextRequest, NextResponse } from "next/server";

const ADMIN_SESSION_COOKIE = "admin_session";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Rotas admin (excepto login e API de login)
  if (
    pathname.startsWith("/admin") &&
    !pathname.startsWith("/admin/login") &&
    !pathname.startsWith("/api/admin/login")
  ) {
    const sessionCookie = request.cookies.get(ADMIN_SESSION_COOKIE);

    if (!sessionCookie?.value) {
      const loginUrl = new URL("/admin/login", request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Proteger API routes admin (excepto login)
  if (
    pathname.startsWith("/api/admin") &&
    !pathname.startsWith("/api/admin/login")
  ) {
    const sessionCookie = request.cookies.get(ADMIN_SESSION_COOKIE);

    if (!sessionCookie?.value) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
