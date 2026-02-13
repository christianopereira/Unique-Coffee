import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { UPLOADS_DIR } from "@/lib/data-dir";

const MIME_TYPES: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".gif": "image/gif",
};

export async function GET(
  _request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  const filePath = path.join(UPLOADS_DIR, ...params.path);

  // Segurança: impedir path traversal
  const resolved = path.resolve(filePath);
  if (!resolved.startsWith(path.resolve(UPLOADS_DIR))) {
    return NextResponse.json({ error: "Acesso negado" }, { status: 403 });
  }

  if (!fs.existsSync(resolved)) {
    return NextResponse.json(
      { error: "Ficheiro não encontrado" },
      { status: 404 }
    );
  }

  const ext = path.extname(resolved).toLowerCase();
  const contentType = MIME_TYPES[ext] || "application/octet-stream";
  const buffer = fs.readFileSync(resolved);

  const headers: Record<string, string> = {
    "Content-Type": contentType,
    "Cache-Control": "public, max-age=31536000, immutable",
  };

  // SVGs podem conter JS embebido — servir com CSP restritivo para bloquear execução
  if (ext === ".svg") {
    headers["Content-Security-Policy"] = "default-src 'none'; style-src 'unsafe-inline'";
    headers["X-Content-Type-Options"] = "nosniff";
  }

  return new NextResponse(buffer, { headers });
}
