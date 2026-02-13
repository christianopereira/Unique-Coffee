import { NextRequest, NextResponse } from "next/server";

const ADMIN_SESSION_COOKIE = "admin_session";

/**
 * Verifica a assinatura HMAC do cookie de sessão usando Web Crypto API (Edge-compatible).
 * Retorna true se a assinatura é válida.
 */
async function verifySignedCookie(cookieValue: string): Promise<boolean> {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) return false;

  const lastDot = cookieValue.lastIndexOf(".");
  if (lastDot === -1) return false;

  const sessionId = cookieValue.substring(0, lastDot);
  const signature = cookieValue.substring(lastDot + 1);

  try {
    const encoder = new TextEncoder();
    const key = await crypto.subtle.importKey(
      "raw",
      encoder.encode(secret),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"]
    );

    const signatureBuffer = await crypto.subtle.sign("HMAC", key, encoder.encode(sessionId));
    const expectedHex = Array.from(new Uint8Array(signatureBuffer))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");

    // Comparação constant-time simplificada (mesma length, byte a byte)
    if (signature.length !== expectedHex.length) return false;
    let diff = 0;
    for (let i = 0; i < signature.length; i++) {
      diff |= signature.charCodeAt(i) ^ expectedHex.charCodeAt(i);
    }
    return diff === 0;
  } catch {
    return false;
  }
}

export async function middleware(request: NextRequest) {
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

    // Verificar assinatura HMAC do cookie
    const isValid = await verifySignedCookie(sessionCookie.value);
    if (!isValid) {
      // Cookie forjado ou inválido — limpar e redirigir para login
      const loginUrl = new URL("/admin/login", request.url);
      const response = NextResponse.redirect(loginUrl);
      response.cookies.set(ADMIN_SESSION_COOKIE, "", { maxAge: 0, path: "/" });
      return response;
    }
  }

  // Proteger API routes admin (excepto login e logout)
  if (
    pathname.startsWith("/api/admin") &&
    !pathname.startsWith("/api/admin/login") &&
    !pathname.startsWith("/api/admin/logout")
  ) {
    const sessionCookie = request.cookies.get(ADMIN_SESSION_COOKIE);

    if (!sessionCookie?.value) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const isValid = await verifySignedCookie(sessionCookie.value);
    if (!isValid) {
      return NextResponse.json({ error: "Sessão inválida" }, { status: 401 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
