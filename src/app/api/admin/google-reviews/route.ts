import { NextRequest, NextResponse } from "next/server";
import { validateSession } from "@/lib/auth";
import type { ReviewItem } from "@/types/site-data";

function checkAuth(request: NextRequest): boolean {
  const sessionId = request.cookies.get("admin_session")?.value;
  return sessionId ? validateSession(sessionId) : false;
}

export async function GET(request: NextRequest) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const apiKey = searchParams.get("apiKey");
  const placeId = searchParams.get("placeId");

  if (!apiKey || !placeId) {
    return NextResponse.json(
      { error: "apiKey e placeId são obrigatórios" },
      { status: 400 }
    );
  }

  try {
    // Google Places API (New) - Place Details with reviews
    const url = `https://places.googleapis.com/v1/places/${placeId}?fields=reviews&key=${apiKey}&languageCode=pt`;

    const res = await fetch(url, {
      headers: {
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask": "reviews",
      },
    });

    if (!res.ok) {
      const errorBody = await res.text();
      console.error("Google Places API error:", res.status, errorBody);
      return NextResponse.json(
        { error: `Erro da API do Google (${res.status}). Verifique a API Key e o Place ID.` },
        { status: 502 }
      );
    }

    const data = await res.json();
    const googleReviews = data.reviews || [];

    const reviews: ReviewItem[] = googleReviews.map(
      (r: {
        authorAttribution?: { displayName?: string; photoUri?: string };
        rating?: number;
        text?: { text?: string };
        relativePublishTimeDescription?: string;
        publishTime?: string;
      }) => ({
        author: r.authorAttribution?.displayName || "Anónimo",
        text: r.text?.text || "",
        rating: r.rating || 5,
        date: r.publishTime?.split("T")[0] || "",
        photo: r.authorAttribution?.photoUri || "",
        source: "google" as const,
      })
    );

    return NextResponse.json({ reviews });
  } catch (err) {
    console.error("Error fetching Google reviews:", err);
    return NextResponse.json(
      { error: "Erro ao comunicar com a API do Google" },
      { status: 500 }
    );
  }
}
