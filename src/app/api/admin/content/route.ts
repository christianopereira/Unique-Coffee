import { NextRequest, NextResponse } from "next/server";
import { validateSession } from "@/lib/auth";
import {
  getSiteData,
  updateSiteDataSection,
} from "@/lib/get-site-data";
import type { SiteData } from "@/types/site-data";

function checkAuth(request: NextRequest): boolean {
  const sessionId = request.cookies.get("admin_session")?.value;
  return sessionId ? validateSession(sessionId) : false;
}

export async function GET(request: NextRequest) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  const data = getSiteData();
  return NextResponse.json(data);
}

export async function PATCH(request: NextRequest) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { section, data } = body as {
      section?: keyof SiteData;
      data?: SiteData[keyof SiteData];
    };

    if (!section || data === undefined) {
      return NextResponse.json(
        { error: "Campos 'section' e 'data' são obrigatórios" },
        { status: 400 }
      );
    }

    const validSections: (keyof SiteData)[] = [
      "brand",
      "nav",
      "hero",
      "sobreNos",
      "missaoVisaoValores",
      "conceito",
      "diferencial",
      "graos",
      "menu",
      "sobremesas",
      "equipa",
      "galeria",
      "visiteNos",
      "footer",
      "typography",
      "colors",
      "hiddenPages",
      "reviews",
    ];

    if (!validSections.includes(section)) {
      return NextResponse.json(
        { error: `Secção inválida: ${section}` },
        { status: 400 }
      );
    }

    const updated = updateSiteDataSection(section, data);
    return NextResponse.json({ success: true, data: updated[section] });
  } catch {
    return NextResponse.json(
      { error: "Erro ao guardar dados" },
      { status: 500 }
    );
  }
}
