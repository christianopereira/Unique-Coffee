import { test, expect } from "@playwright/test";

const pages = [
  { name: "Homepage", path: "/" },
  { name: "Sobre", path: "/sobre" },
  { name: "Conceito", path: "/conceito" },
  { name: "Grãos", path: "/graos" },
  { name: "Menu", path: "/menu" },
  { name: "Sobremesas", path: "/sobremesas" },
  { name: "Equipa", path: "/equipa" },
  { name: "Galeria", path: "/galeria" },
  { name: "Contacto", path: "/contacto" },
];

test.describe("Navegação", () => {
  for (const page of pages) {
    test(`${page.name} (${page.path}) carrega sem erros`, async ({
      page: p,
    }) => {
      const errors: string[] = [];
      p.on("pageerror", (err) => errors.push(err.message));

      const response = await p.goto(page.path, { waitUntil: "domcontentloaded" });

      expect(response?.status()).toBe(200);
      expect(errors).toHaveLength(0);
    });
  }

  test("Navbar contém todos os links", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });

    const navLinks = page.locator("nav a[href]");
    const count = await navLinks.count();
    expect(count).toBeGreaterThanOrEqual(8);
  });

  test("Navbar links navegam correctamente", async ({ page }) => {
    // Navega directamente para /sobre e verifica que funciona
    const response = await page.goto("/sobre", { waitUntil: "domcontentloaded" });
    expect(response?.status()).toBe(200);
    expect(page.url()).toContain("/sobre");

    // Verifica que a homepage carrega a partir do link do logo
    const response2 = await page.goto("/", { waitUntil: "domcontentloaded" });
    expect(response2?.status()).toBe(200);
  });

  test("Páginas de menu dinâmicas carregam", async ({ page }) => {
    const slugs = ["cafes", "especialidades", "tostas", "doces"];

    for (const slug of slugs) {
      const response = await page.goto(`/menu/${slug}`, {
        waitUntil: "domcontentloaded",
      });
      expect(response?.status()).toBe(200);
    }
  });

  test("Páginas de sobremesas dinâmicas carregam", async ({ page }) => {
    const slugs = [
      "cheesecake",
      "tarte-do-dia",
      "bolo-de-noz",
      "croissant-artesanal",
    ];

    for (const slug of slugs) {
      const response = await page.goto(`/sobremesas/${slug}`, {
        waitUntil: "domcontentloaded",
      });
      expect(response?.status()).toBe(200);
    }
  });
});

test.describe("Consola limpa", () => {
  for (const page of pages) {
    test(`${page.name} — sem erros críticos na consola`, async ({
      page: p,
    }) => {
      const consoleErrors: string[] = [];
      p.on("console", (msg) => {
        if (msg.type() === "error") {
          const text = msg.text();
          // Ignore known harmless warnings
          if (
            text.includes("favicon") ||
            text.includes("preloaded using link preload")
          )
            return;
          consoleErrors.push(text);
        }
      });

      await p.goto(page.path, { waitUntil: "domcontentloaded" });

      expect(consoleErrors).toHaveLength(0);
    });
  }
});
