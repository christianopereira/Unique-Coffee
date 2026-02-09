import { NextRequest, NextResponse } from "next/server";
import { validateSession } from "@/lib/auth";
import { UPLOADS_DIR, ensureDataDirs } from "@/lib/data-dir";
import fs from "fs";
import path from "path";
import crypto from "crypto";

const MAX_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/svg+xml",
  "image/gif",
];

export async function POST(request: NextRequest) {
  const sessionId = request.cookies.get("admin_session")?.value;
  if (!sessionId || !validateSession(sessionId)) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { error: "Ficheiro é obrigatório" },
        { status: 400 }
      );
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: "Tipo de ficheiro não permitido. Use JPEG, PNG, WebP, SVG ou GIF." },
        { status: 400 }
      );
    }

    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: "Ficheiro demasiado grande. Máximo: 5MB." },
        { status: 400 }
      );
    }

    ensureDataDirs();

    // Gerar nome único para evitar colisões
    const ext = path.extname(file.name) || getExtFromMime(file.type);
    const uniqueName = `${crypto.randomUUID()}${ext}`;
    const filePath = path.join(UPLOADS_DIR, uniqueName);

    const buffer = Buffer.from(await file.arrayBuffer());
    fs.writeFileSync(filePath, buffer);

    const url = `/api/uploads/${uniqueName}`;

    return NextResponse.json({ success: true, url, filename: uniqueName });
  } catch {
    return NextResponse.json(
      { error: "Erro ao fazer upload do ficheiro" },
      { status: 500 }
    );
  }
}

function getExtFromMime(mime: string): string {
  const map: Record<string, string> = {
    "image/jpeg": ".jpg",
    "image/png": ".png",
    "image/webp": ".webp",
    "image/svg+xml": ".svg",
    "image/gif": ".gif",
  };
  return map[mime] || ".bin";
}
