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

## Estrutura do Site (12 Secções)

O site é **single-page com scroll suave** e navegação fixa.

1. **Hero** — Tagline "O Sabor Único do Verdadeiro Café", imagem fullscreen
2. **Sobre Nós** — História oficial + highlights "Aqui, ..."
3. **Missão / Visão / Valores** — Fundo escuro, 4 valores com ícones
4. **Nosso Conceito** — 3 parágrafos centrados
5. **Nosso Diferencial** — Layout split: intro à esquerda, parágrafos à direita
6. **Grãos Seleccionados** — Fundo escuro, texto + imagem
7. **Nosso Menu** — Grid 4 categorias: Tostas, Doces, Especialidades, Cafés
8. **Nossas Sobremesas** — Grid de imagens + texto com highlights
9. **Nossa Equipa** — 4 membros: Priscila, Maria, Juliana, Helena
10. **Nossa Galeria** — Texto descritivo + grid de fotos com lightbox
11. **Venha Conhecer** — Dados de contacto reais, mapa, CTA
12. **Footer** — Copyright + morada + redes sociais

---

## Estrutura de Ficheiros

```
unique-coffee/
├── CLAUDE.md
├── directives/
│   ├── site-content.md
│   ├── design-system.md
│   ├── seo-guidelines.md
│   └── deployment.md
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   └── Footer.tsx
│   │   ├── sections/
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
