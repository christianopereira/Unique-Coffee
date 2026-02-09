import { NextRequest, NextResponse } from "next/server";
import { verifyPassword, createSession } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { password } = body as { password?: string };

    if (!password) {
      return NextResponse.json(
        { error: "Password é obrigatória" },
        { status: 400 }
      );
    }

    const storedHash = process.env.ADMIN_PASSWORD_HASH;
    if (!storedHash) {
      console.error("[login] ADMIN_PASSWORD_HASH não está definida");
      return NextResponse.json(
        { error: "Configuração do servidor inválida" },
        { status: 500 }
      );
    }

    const valid = await verifyPassword(password, storedHash);
    if (!valid) {
      return NextResponse.json(
        { error: "Password incorrecta" },
        { status: 401 }
      );
    }

    const sessionId = createSession();

    const response = NextResponse.json({ success: true });
    response.cookies.set("admin_session", sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 7 * 24 * 60 * 60, // 7 dias
    });

    return response;
  } catch {
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
