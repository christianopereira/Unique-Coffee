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
| **Deploy** | GitHub → Vercel / Coolify |

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
│   └── deployment.md
├── src/
│   ├── app/
│   │   ├── layout.tsx           # Layout global (Navbar + Footer)
│   │   ├── page.tsx             # Homepage com teasers
│   │   ├── globals.css
│   │   ├── sobre/page.tsx       # Sobre + Missão/Visão/Valores
│   │   ├── conceito/page.tsx    # Conceito + Diferencial
│   │   ├── graos/page.tsx       # Grãos Seleccionados
│   │   ├── menu/
│   │   │   ├── page.tsx         # Grid de categorias
│   │   │   └── [slug]/page.tsx  # Detalhe da categoria
│   │   ├── sobremesas/
│   │   │   ├── page.tsx         # Grid de sobremesas
│   │   │   └── [slug]/page.tsx  # Detalhe da sobremesa
│   │   ├── equipa/page.tsx      # Nossa Equipa
│   │   ├── galeria/page.tsx     # Galeria com lightbox
│   │   └── contacto/page.tsx    # Venha Conhecer
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx       # Navbar multi-página com logo
│   │   │   └── Footer.tsx
│   │   ├── sections/            # Componentes de secção reutilizáveis
│   │   │   ├── Hero.tsx
│   │   │   ├── SobreNos.tsx
│   │   │   ├── MissaoVisaoValores.tsx
│   │   │   ├── Conceito.tsx
│   │   │   ├── Diferencial.tsx
│   │   │   ├── Graos.tsx
│   │   │   ├── Menu.tsx
│   │   │   ├── Sobremesas.tsx
│   │   │   ├── Equipa.tsx
│   │   │   ├── Galeria.tsx
│   │   │   └── VisiteNos.tsx
│   │   └── ui/
│   │       ├── ScrollReveal.tsx
│   │       ├── SectionTitle.tsx
│   │       └── Button.tsx
│   ├── content/
│   │   └── site-data.ts         # ← TODA a data editável centralizada aqui
│   └── lib/
│       └── utils.ts
├── public/images/
│   └── logo.jpeg                # Logo da Unique Coffee
├── tailwind.config.ts
├── next.config.js
├── tsconfig.json
└── package.json
```

---

## Conteúdo Editável

Todo o conteúdo está em `src/content/site-data.ts`.
Fonte: **Apresentação Unique Coffee rev01** (PDF oficial do cliente).

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
