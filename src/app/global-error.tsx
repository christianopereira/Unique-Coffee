"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    const isChunkError =
      error.name === "ChunkLoadError" ||
      error.message?.includes("Loading chunk") ||
      error.message?.includes("Failed to fetch");

    if (isChunkError) {
      const key = "chunk-reload";
      const last = sessionStorage.getItem(key);
      const now = Date.now();

      // Auto-reload once per 30 seconds to avoid infinite loops
      if (!last || now - Number(last) > 30000) {
        sessionStorage.setItem(key, String(now));
        window.location.reload();
        return;
      }
    }
  }, [error]);

  return (
    <html lang="pt-PT">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Unique Coffee</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600&family=Raleway:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#2C1810",
          color: "#FAF8F5",
          fontFamily: "'Raleway', sans-serif",
          textAlign: "center",
          padding: "2rem",
        }}
      >
        <img
          src="/images/Logo.svg"
          alt="Unique Coffee"
          style={{ width: 120, height: 120, objectFit: "contain", marginBottom: "2rem" }}
        />
        <div
          style={{
            width: 60,
            height: 1,
            background: "linear-gradient(90deg, transparent, #B87333, transparent)",
            marginBottom: "2rem",
          }}
        />
        <h1
          style={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 400,
            fontSize: "1.8rem",
            lineHeight: 1.3,
            marginBottom: "1rem",
          }}
        >
          Estamos a actualizar o site
        </h1>
        <p
          style={{
            fontWeight: 300,
            fontSize: "0.95rem",
            lineHeight: 1.8,
            color: "#A09690",
            maxWidth: 400,
            marginBottom: "2rem",
          }}
        >
          Voltamos num instante. Clique no botão abaixo para tentar novamente.
        </p>
        <button
          onClick={() => {
            sessionStorage.removeItem("chunk-reload");
            window.location.reload();
          }}
          style={{
            fontFamily: "'Raleway', sans-serif",
            fontSize: "0.85rem",
            fontWeight: 500,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            padding: "0.75rem 2rem",
            border: "1px solid #B87333",
            borderRadius: 4,
            backgroundColor: "transparent",
            color: "#B87333",
            cursor: "pointer",
            transition: "all 0.3s",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = "#B87333";
            e.currentTarget.style.color = "#FAF8F5";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = "transparent";
            e.currentTarget.style.color = "#B87333";
          }}
        >
          Tentar novamente
        </button>
      </body>
    </html>
  );
}
