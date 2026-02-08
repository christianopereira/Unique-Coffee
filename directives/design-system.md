# Directiva: Design System

> Regras detalhadas de design para a Unique Coffee. Referência para todos os componentes.

---

## Princípios Fundamentais

1. **Minimalismo com alma** — Cada elemento tem propósito. Nada é decorativo sem razão.
2. **Premium ≠ Luxo ostensivo** — Sofisticação vem do cuidado, não do excesso.
3. **Espaço é design** — O branco/vazio é tão importante quanto o conteúdo.
4. **Consistência** — Repetir padrões cria confiança visual.

---

## Tipografia

### Escala Tipográfica (Desktop)
| Uso | Font | Tamanho | Weight | Line-height |
|-----|------|---------|--------|-------------|
| Hero Title | Playfair Display | 64-80px | 400 | 1.1 |
| Section Title | Playfair Display | 40-48px | 400 | 1.2 |
| Section Subtitle | Lora | 20-24px | 400 italic | 1.5 |
| Body | Lora | 16-18px | 400 | 1.7 |
| Nav Links | Raleway | 14px | 500 | 1 |
| Caption | Raleway | 12-13px | 400 | 1.4 |
| Button | Raleway | 14px | 600 | 1 |

### Escala Tipográfica (Mobile)
- Hero: 36-44px
- Section Title: 28-32px
- Body: 16px
- Reduzir proporcionalmente

### Regras
- Títulos NUNCA em all-caps (excepto nav links opcionalmente)
- Itálico para subtítulos e citações
- Letter-spacing: 0.02em nos títulos, 0.05em em text-transform uppercase

---

## Espaçamento

### Sistema de Espaçamento
```
4px  (1)  — Micro: entre ícone e label
8px  (2)  — Pequeno: padding interno de badges
16px (4)  — Base: gap em grids pequenos
24px (6)  — Médio: espaço entre parágrafos
32px (8)  — Grande: padding de cards
48px (12) — XL: espaço entre blocos de conteúdo
64px (16) — 2XL: padding vertical de secções (mobile)
96px (24) — 3XL: padding vertical de secções (desktop)
128px(32) — 4XL: espaço entre secções visuais
```

### Regras
- Secções: `py-16 md:py-24 lg:py-32`
- Container: `max-w-7xl mx-auto px-6 md:px-8 lg:px-16`
- Entre título de secção e conteúdo: `mb-12 md:mb-16`

---

## Componentes

### Botões
- **Primário:** fundo `copper`, texto `warm-white`, hover escurece 10%
- **Secundário:** borda fina `copper`, texto `copper`, hover preenche fundo
- **Ghost:** apenas texto `copper` com underline animado no hover
- Border-radius: `rounded-sm` (2px) — NÃO arredondado
- Padding: `px-8 py-3`
- Transição: `transition-all duration-300`

### Cards
- Fundo: `parchment` ou `warm-white`
- Sem sombra (ou sombra muito subtil: `shadow-sm`)
- Borda: nenhuma ou `border border-linen`
- Padding: `p-8`
- Hover: leve translate-y (-2px) + sombra subtil

### Separadores
- Linha fina: `h-px bg-linen`
- OU: elemento decorativo (linha curta centrada)
- OU: apenas espaço generoso

### Imagens
- Aspect ratios consistentes: 4:3, 3:2, 16:9, 1:1
- `object-fit: cover` sempre
- Overlay subtil em imagens hero: gradiente de fundo
- Hover em galeria: leve zoom (scale 1.02-1.05)

---

## Animações

### Princípios
- Subtis e elegantes — NUNCA chamativas ou bouncy
- Duração: 400-800ms
- Easing: `ease-out` ou `cubic-bezier(0.25, 0.46, 0.45, 0.94)`
- Trigger: on scroll (IntersectionObserver)

### Catálogo de Animações
1. **Fade Up** — Elemento sobe 20-30px enquanto faz fade-in (default para textos)
2. **Fade In** — Apenas opacidade (para imagens)
3. **Slide In** — Entra lateralmente (para layouts split)
4. **Stagger** — Elementos em lista aparecem sequencialmente (delay: 100-150ms entre items)
5. **Parallax Leve** — Apenas no hero, velocidade 0.3-0.5x

### Regras
- Animações só acontecem uma vez (não re-triggerar no scroll up)
- Elementos acima do fold NÃO têm animação de entrada (já visíveis)
- Mobile: reduzir ou eliminar parallax

---

## Navbar

- **Desktop:** Fixa no topo, transparente sobre o hero, fundo sólido ao scroll
- **Fundo scroll:** `warm-white` com `backdrop-blur-md`
- **Links:** Raleway 14px, uppercase, letter-spacing 0.1em
- **Active state:** underline ou cor `copper`
- **Logo:** Texto "Unique Coffee" em Playfair Display, ou logo se fornecido
- **Mobile:** Hamburger menu, fullscreen overlay com links centrados
- **Transição:** background e padding com `transition-all duration-500`

---

## Responsividade

### Breakpoints (Tailwind default)
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px

### Regras por Breakpoint
- **Mobile (< 768px):** Stack vertical, padding reduzido, imagens full-width
- **Tablet (768-1024px):** Grid 2 colunas, ajustar tipografia
- **Desktop (> 1024px):** Layouts assimétricos, grids 3-4 colunas, tipografia completa

---

## Imagens Placeholder

Enquanto não tivermos as imagens reais, usar imagens do Unsplash com tema café/cafeteria:
- Hero: interior de cafeteria com luz natural
- Sobre: detalhe de preparação de café
- Grãos: close-up de grãos de café
- Sobremesas: sobremesas artesanais
- Galeria: mix de ambiente, detalhes, café

Formato do URL Unsplash: `https://images.unsplash.com/photo-ID?w=WIDTH&h=HEIGHT&fit=crop`
