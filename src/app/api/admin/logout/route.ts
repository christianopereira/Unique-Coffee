import { NextRequest, NextResponse } from "next/server";
import { removeSession } from "@/lib/auth";

export async function POST(request: NextRequest) {
  const sessionId = request.cookies.get("admin_session")?.value;

  if (sessionId) {
    removeSession(sessionId);
  }

  const response = NextResponse.json({ success: true });
  response.cookies.set("admin_session", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 0,
  });

  return response;
}
