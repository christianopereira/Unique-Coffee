import { test } from "@playwright/test";

const pages = [
  { name: "homepage", path: "/" },
  { name: "sobre", path: "/sobre" },
  { name: "conceito", path: "/conceito" },
  { name: "graos", path: "/graos" },
  { name: "menu", path: "/menu" },
  { name: "menu-cafes", path: "/menu/cafes" },
  { name: "menu-especialidades", path: "/menu/especialidades" },
  { name: "menu-tostas", path: "/menu/tostas" },
  { name: "menu-doces", path: "/menu/doces" },
  { name: "sobremesas", path: "/sobremesas" },
  { name: "sobremesas-cheesecake", path: "/sobremesas/cheesecake" },
  { name: "equipa", path: "/equipa" },
  { name: "galeria", path: "/galeria" },
  { name: "contacto", path: "/contacto" },
];

test.describe("Screenshots — todas as páginas", () => {
  for (const pg of pages) {
    test(`screenshot: ${pg.name}`, async ({ page }, testInfo) => {
      await page.goto(pg.path, { waitUntil: "domcontentloaded" });

      // Wait for animations to settle
      await page.waitForTimeout(1000);

      await page.screenshot({
        path: `e2e/screenshots/${testInfo.project.name}/${pg.name}.png`,
        fullPage: true,
      });
    });
  }
});
