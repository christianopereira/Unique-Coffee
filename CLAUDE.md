# CLAUDE.md — Unique Coffee Website

> Directiva central para o Claude Code no VSCode. Lê este ficheiro SEMPRE antes de qualquer tarefa.

## Projecto

Website institucional premium para a **Unique Coffee**, cafetaria premium em Caldas da Rainha, Portugal.
- **Tagline:** "O Sabor Único do Verdadeiro Café"
- **Fundadora:** Priscila
- **Site:** www.uniquecoffee.pt
- **Morada:** R. Vitorino Fróis 12A, 2500-256 Caldas da Rainha
- **Telefone:** 925 903 132

O site deve transmitir sofisticação, conforto, exclusividade subtil e tranquilidade.

---

## Arquitectura de 3 Camadas

| Camada | Papel | Localização |
|--------|-------|-------------|
| **Directive** | SOPs e especificações | `directives/` |
| **Orchestration** | Tu (Claude). Decisões, routing, coordenação | — |
| **Execution** | Código determinístico, scripts, componentes | `src/`, `execution/` |

### Regras de Operação
1. **Verifica antes de criar** — Antes de criar um ficheiro, verifica se já existe.
2. **Self-anneal** — Se algo falhar, lê o erro, corrige, testa, e actualiza a directiva relevante.
3. **Actualiza directivas** — Quando descobrires algo novo, actualiza o ficheiro em `directives/`.
4. **Não sobrescrever directivas sem pedir** — A menos que explicitamente instruído.

---

## Stack Tecnológico

| Tecnologia | Versão/Detalhe |
|------------|----------------|
| **Framework** | Next.js 14+ (App Router) |
| **Linguagem** | TypeScript (strict) |
| **Styling** | Tailwind CSS 3.4+ |
| **Animações** | Framer Motion |
| **Fontes** | Google Fonts (Playfair Display, Lora, Raleway) |
| **Icons** | Lucide React |
| **Imagens** | next/image com optimização |
| **Deploy** | GitHub → Hostinger (Node.js Web App) |
| **Testes E2E** | Playwright (116 testes) |

---

## Identidade Visual

### Paleta de Cores (Tailwind custom)
- `cream` (#F5F0EB) — Fundo principal
- `warm-white` (#FAF8F5) — Fundo alternativo
- `parchment` (#EDE8E1) — Cards, secções alternadas
- `espresso` (#2C1810) — Texto principal, fundo escuro (como na apresentação)
- `roast` (#4A3428) — Texto secundário
- `mocha` (#6B5344) — Captions
- `copper` (#B87333) — Acento principal
- `gold-soft` (#C9A96E) — Acento secundário
- `sage` (#8B9A7B) — Acento terciário
- `stone` (#A09690) — Bordas
- `linen` (#D4CCC4) — Linhas subtis

### Tipografia
- **Display/Títulos:** `Playfair Display` (serif)
- **Corpo:** `Lora` (serif)
- **Auxiliar/Nav:** `Raleway` (sans-serif)
- **NUNCA usar:** Inter, Roboto, Arial, system fonts genéricos

### Nota sobre a Apresentação Original
A apresentação oficial usa fundo escuro (preto/espresso) com texto claro — este estilo é aplicado nas secções de destaque do site (Missão/Visão/Valores, Grãos, Visite-nos). As restantes secções alternam entre `cream`, `warm-white` e `parchment`.

---

## Estrutura do Site (Multi-Página)

O site usa **arquitectura multi-página** com Next.js App Router e navegação fixa.

### Homepage (`/`)
A homepage mostra **teasers** de cada secção com links para as páginas completas:
- **Hero** — Tagline "O Sabor Único do Verdadeiro Café", imagem fullscreen, CTA → `/sobre`
- **Sobre Nós** (teaser) — 1º parágrafo + link "Conhecer a nossa história" → `/sobre`
- **Conceito** (teaser) — 1º parágrafo + link → `/conceito`
- **Grãos** (teaser) — 1º parágrafo + imagem + link → `/graos`
- **Menu** (preview) — Grid 4 categorias com links → `/menu/[slug]`
- **Sobremesas** (preview) — Grid com links → `/sobremesas/[slug]`
- **Galeria** (preview) — 3 imagens + link → `/galeria`
- **CTA Visite-nos** — Morada, horário, link → `/contacto`
- **Footer** — Copyright + morada + redes sociais

### Páginas Individuais

| Rota | Componentes | Conteúdo |
|------|-------------|----------|
| `/sobre` | SobreNos + MissaoVisaoValores | História + highlights + missão/visão/valores |
| `/conceito` | Conceito + Diferencial | Conceito + diferencial |
| `/graos` | Graos | Grãos seleccionados |
| `/menu` | Menu (grid com links) | 4 categorias com links para detalhe |
| `/menu/[slug]` | Detalhe da categoria | Hero + descrição + lista de itens |
| `/sobremesas` | Sobremesas (grid com links) | Imagens + texto + highlights |
| `/sobremesas/[slug]` | Detalhe da sobremesa | Imagem + descrição |
| `/equipa` | Equipa | 4 membros |
| `/galeria` | Galeria (com lightbox) | Texto + grid de fotos |
| `/contacto` | VisiteNos | Dados reais + mapa + CTA |

### Navbar Multi-Página
- Transparente na homepage, sólida nas restantes páginas
- Logo com imagem (`/images/logo.jpeg`) + nome
- Links activos destacados em `copper`
- Usa `usePathname()` para detectar a página activa
- Mobile: fecha automaticamente ao navegar

---

## Estrutura de Ficheiros

```
unique-coffee/
├── CLAUDE.md
├── fix-readlink.js              # Workaround Windows (disco externo)
├── directives/
│   ├── site-content.md
│   ├── design-system.md
│   ├── seo-guidelines.md
│   ├── deployment.md
│   └── admin-panel.md           # Documentação do painel admin
├── scripts/
│   └── setup-admin.js           # Script de setup inicial (password + seed)
├── e2e/
│   ├── navigation.spec.ts       # Testes de navegação (páginas públicas)
│   └── admin.spec.ts            # Testes do painel admin
├── data/                        # ⚠️ NÃO está no git — persiste no servidor
│   ├── site-data.json           # Dados editáveis (gerado pelo setup-admin.js)
│   ├── sessions.json            # Sessões activas (auto-gerido)
│   └── uploads/                 # Imagens enviadas pelo admin
├── src/
│   ├── app/
│   │   ├── layout.tsx           # Layout global (apenas html/body, sem Navbar)
│   │   ├── globals.css
│   │   ├── (public)/            # ← Route group para páginas públicas
│   │   │   ├── layout.tsx       # Layout público (Navbar + Footer)
│   │   │   ├── page.tsx         # Homepage com teasers
│   │   │   ├── sobre/page.tsx
│   │   │   ├── conceito/page.tsx
│   │   │   ├── graos/page.tsx
│   │   │   ├── menu/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [slug]/page.tsx
│   │   │   ├── sobremesas/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [slug]/page.tsx
│   │   │   ├── equipa/page.tsx
│   │   │   ├── galeria/page.tsx
│   │   │   └── contacto/page.tsx
│   │   ├── admin/               # ← Painel de administração
│   │   │   ├── layout.tsx       # Layout admin (sidebar + logo)
│   │   │   ├── login/page.tsx   # Página de login
│   │   │   ├── page.tsx         # Dashboard
│   │   │   ├── hero/page.tsx
│   │   │   ├── sobre/page.tsx
│   │   │   ├── conceito/page.tsx
│   │   │   ├── diferencial/page.tsx
│   │   │   ├── graos/page.tsx
│   │   │   ├── missao/page.tsx
│   │   │   ├── menu/page.tsx
│   │   │   ├── sobremesas/page.tsx
│   │   │   ├── equipa/page.tsx
│   │   │   ├── galeria/page.tsx
│   │   │   ├── contacto/page.tsx
│   │   │   └── config/page.tsx
│   │   └── api/
│   │       ├── admin/
│   │       │   ├── login/route.ts
│   │       │   ├── logout/route.ts
│   │       │   ├── content/route.ts   # GET + PATCH
│   │       │   └── upload/route.ts    # POST (imagens)
│   │       └── uploads/
│   │           └── [...path]/route.ts # Serve imagens de data/uploads/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   └── Footer.tsx
│   │   ├── sections/            # Componentes de secção reutilizáveis
│   │   │   └── (Hero, SobreNos, Conceito, etc.)
│   │   ├── admin/               # Componentes do painel admin
│   │   │   ├── AdminForm.tsx    # Form genérico (render-props)
│   │   │   └── fields.tsx       # TextInput, TextArea, ArrayEditor, ImagePicker
│   │   └── ui/
│   │       └── (ScrollReveal, SectionTitle, Button)
│   ├── content/
│   │   └── site-data.ts         # Dados estáticos (fallback se JSON não existir)
│   ├── types/
│   │   └── site-data.ts         # Interfaces TypeScript para SiteData
│   ├── lib/
│   │   ├── get-site-data.ts     # Leitura/escrita do JSON com cache 60s
│   │   ├── auth.ts              # Hash password + sessões (crypto nativo)
│   │   └── utils.ts
│   └── middleware.ts            # Protege /admin/* e /api/admin/*
├── public/images/
│   └── logo.jpeg
├── tailwind.config.ts
├── next.config.js
├── tsconfig.json
└── package.json
```

---

## Conteúdo Editável

O conteúdo é gerido pelo **Painel Admin** (`/admin`) e guardado em `data/site-data.json` no servidor.
O ficheiro `src/content/site-data.ts` serve como **fallback** se o JSON não existir.

**Fluxo de dados:**
```
Admin edita → PATCH /api/admin/content → data/site-data.json → getSiteData() → Site público
```

A função `getSiteData()` em `src/lib/get-site-data.ts` lê o JSON com cache de 60 segundos, com fallback automático para os dados estáticos.

Fonte original: **Apresentação Unique Coffee rev01** (PDF oficial do cliente).

---

## Painel de Administração (`/admin`)

Painel completo para a Priscila editar textos e imagens sem tocar em código.

### Arquitectura
- **Dados:** ficheiro JSON no filesystem do servidor (`data/site-data.json`)
- **Imagens:** guardadas em `data/uploads/`, servidas via API route
- **Auth:** password com hash (`crypto.scrypt` nativo), sessões em cookie HttpOnly
- **Dependências externas:** ZERO — tudo usa Node.js built-in + Next.js
- **Custo adicional:** ZERO

### Variáveis de Ambiente (Hostinger)
```
ADMIN_PASSWORD_HASH=...     # Gerado pelo scripts/setup-admin.js
ADMIN_SESSION_SECRET=...    # String aleatória para assinar cookies
```

### Setup Inicial (correr uma vez no servidor)
```bash
node scripts/setup-admin.js
```
Este script: cria `data/` e `data/uploads/`, faz seed do JSON a partir de `site-data.ts`, e gera o hash da password.

### Secções Editáveis

| Rota Admin | Secção do JSON |
|---|---|
| `/admin/hero` | hero |
| `/admin/sobre` | sobreNos |
| `/admin/conceito` | conceito |
| `/admin/diferencial` | diferencial |
| `/admin/graos` | graos |
| `/admin/missao` | missaoVisaoValores |
| `/admin/menu` | menu (categorias + itens) |
| `/admin/sobremesas` | sobremesas (itens + highlights) |
| `/admin/equipa` | equipa (membros) |
| `/admin/galeria` | galeria (imagens) |
| `/admin/contacto` | visiteNos |
| `/admin/config` | brand + footer + nav |

Ver `directives/admin-panel.md` para documentação detalhada.

---

## Linguagem e Tom

- **Idioma:** Português de Portugal (PT-PT)
- **Tom:** Elegante, humano, acolhedor
- **Padrão "Aqui, ...":** Usado em Sobre Nós, Sobremesas — manter este estilo
- **EVITAR:** termos promocionais, slogans agressivos, exageros
- **PREFERIR:** linguagem sensorial, descritiva, que convida sem impor

---

## Notas para o Claude Code

1. **Sempre lê este ficheiro e `directives/` antes de começar qualquer tarefa.**
2. **TypeScript strict** — sem `any`, interfaces bem definidas.
3. **Server Components por default** — usa `'use client'` apenas quando necessário.
4. **Commits descritivos** em português: `feat: adiciona secção Equipa`.
5. **Se algo falhar**, aplica o loop: corrige → testa → actualiza directiva.
6. **Imagens:** todas as imagens actuais são placeholders Unsplash. Serão substituídas por fotos reais do cliente.
7. **Equipa:** fotos placeholder — 3 dos 4 membros ainda não têm foto real.

---

## Git & Deploy

### Repositório
- **GitHub:** `https://github.com/christianopereira/Unique-Coffee.git`
- **Branch principal:** `main`

### Workflow de Commit
```bash
git add .
git commit -m "feat: descrição em português"
git push origin main
```

### Convenção de Commits (em português)
- `feat: adiciona página de menu com rotas dinâmicas`
- `fix: corrige responsividade da navbar mobile`
- `style: ajusta espaçamento da secção Conceito`
- `refactor: reorganiza site-data para multi-página`
- `chore: actualiza dependências`

### Build
```bash
npm run build        # Build padrão (servidor Hostinger / Linux)
npm run build:local  # Build local no Windows (HD externo, usa fix-readlink.js)
npm run dev          # Dev server local
```

O `fix-readlink.js` contorna um bug do Windows com `fs.readlink` em discos externos. Só é necessário localmente.

### Deploy — Hostinger (Web App Node.js)
- **Plataforma:** Hostinger Web App Node.js
- **Domínio:** `uniquecoffee.pt` (configurado e online)
- **Repositório:** ligado ao GitHub `christianopereira/Unique-Coffee`
- **Branch:** `main`
- **Build command:** `npm run build`
- **Start command:** `npm run start`
- Push para `main` → Hostinger detecta e faz redeploy automaticamente

### Testes E2E (Playwright)
```bash
npx playwright test              # Corre todos os testes (116)
npx playwright test --project=desktop  # Só desktop (Chrome)
npx playwright test --project=mobile   # Só mobile (WebKit)
npx playwright test e2e/admin.spec.ts  # Só testes admin
```

**Testes existentes:**
- `e2e/navigation.spec.ts` — Navegação, consola limpa, páginas dinâmicas (menu/sobremesas)
- `e2e/admin.spec.ts` — Auth, protecção de rotas, API routes, screenshots

**Projectos configurados:** Desktop (Chrome 1280x720) e Mobile (WebKit 390x844)

### Importante: Pasta `data/`
A pasta `data/` está no `.gitignore` e **persiste no servidor Hostinger** entre deploys. Contém:
- `site-data.json` — todos os textos/dados editáveis
- `sessions.json` — sessões de admin activas
- `uploads/` — imagens enviadas pelo admin

**NUNCA** adicionar `data/` ao git. O deploy do Hostinger faz `git pull` + rebuild mas não apaga ficheiros fora do repo.
