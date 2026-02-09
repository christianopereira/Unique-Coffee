import { test, expect } from "@playwright/test";

test.describe("Admin — Autenticação", () => {
  test("Redireciona /admin para /admin/login sem sessão", async ({ page }) => {
    await page.goto("/admin", { waitUntil: "domcontentloaded" });
    expect(page.url()).toContain("/admin/login");
  });

  test("Página de login carrega correctamente", async ({ page }) => {
    const response = await page.goto("/admin/login", {
      waitUntil: "domcontentloaded",
    });
    expect(response?.status()).toBe(200);

    // Verifica que o formulário existe
    await expect(page.locator('input[type="password"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();

    // Verifica o logo
    await expect(page.locator('img[alt="Unique Coffee"]')).toBeVisible();
  });

  test("Login com password inválida não redireciona para dashboard", async ({
    page,
  }) => {
    await page.goto("/admin/login", { waitUntil: "domcontentloaded" });

    await page.fill('input[type="password"]', "password-errada");
    await page.click('button[type="submit"]');

    // Espera pela resposta
    await page.waitForTimeout(2000);

    // Deve continuar na página de login (não redirecionou para /admin)
    expect(page.url()).toContain("/admin/login");
  });

  test("API /api/admin/content retorna 401 sem sessão", async ({ request }) => {
    const response = await request.get("http://localhost:3000/api/admin/content");
    expect(response.status()).toBe(401);
  });

  test("API /api/admin/upload retorna 401 sem sessão", async ({ request }) => {
    const response = await request.post("http://localhost:3000/api/admin/upload");
    expect(response.status()).toBe(401);
  });
});

test.describe("Admin — Páginas protegidas", () => {
  const adminPages = [
    "/admin",
    "/admin/hero",
    "/admin/sobre",
    "/admin/conceito",
    "/admin/diferencial",
    "/admin/graos",
    "/admin/missao",
    "/admin/menu",
    "/admin/sobremesas",
    "/admin/equipa",
    "/admin/galeria",
    "/admin/contacto",
    "/admin/config",
  ];

  for (const path of adminPages) {
    test(`${path} redireciona para login sem sessão`, async ({ page }) => {
      await page.goto(path, { waitUntil: "domcontentloaded" });
      expect(page.url()).toContain("/admin/login");
    });
  }
});

test.describe("Admin — API Routes", () => {
  test("POST /api/admin/login sem password retorna 400", async ({
    request,
  }) => {
    const response = await request.post("http://localhost:3000/api/admin/login", {
      data: {},
    });
    expect(response.status()).toBe(400);
  });

  test("POST /api/admin/login com password errada retorna erro", async ({
    request,
  }) => {
    const response = await request.post("http://localhost:3000/api/admin/login", {
      data: { password: "wrong" },
    });
    // 401 se ADMIN_PASSWORD_HASH está definida, 500 se não
    expect(response.ok()).toBe(false);
  });

  test("POST /api/admin/logout responde OK", async ({ request }) => {
    const response = await request.post("http://localhost:3000/api/admin/logout");
    expect(response.status()).toBe(200);
  });
});

test.describe("Admin — Screenshots", () => {
  test("screenshot: admin-login", async ({ page }, testInfo) => {
    await page.goto("/admin/login", { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(500);
    await page.screenshot({
      path: `e2e/screenshots/${testInfo.project.name}/admin-login.png`,
      fullPage: true,
    });
  });
});
