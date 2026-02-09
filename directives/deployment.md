# Directiva: Deployment

> Instruções para deploy e CI/CD.

---

## Deploy — Hostinger (Web App Node.js)

O site está em produção no Hostinger com deploy automático via GitHub.

### Configuração
- **Plataforma:** Hostinger Web App Node.js
- **Domínio:** `uniquecoffee.pt`
- **Repositório:** `christianopereira/Unique-Coffee` (GitHub)
- **Branch:** `main`
- **Build command:** `npm run build`
- **Start command:** `npm run start`

### Fluxo de Deploy
```
git push origin main → Hostinger detecta → git pull → npm install → npm run build → npm run start
```

**Importante:** O deploy faz `git pull` + rebuild, mas **não apaga ficheiros fora do repo**. A pasta `data/` (com site-data.json e uploads) persiste entre deploys.

---

## Variáveis de Ambiente (Hostinger)

| Variável | Descrição | Obrigatória |
|---|---|---|
| `ADMIN_PASSWORD_HASH` | Hash da password de admin | Sim (para login admin) |
| `ADMIN_SESSION_SECRET` | Secret para sessões | Sim (para login admin) |

Configurar no painel da Hostinger → Web App → Environment Variables.

Gerar com: `node scripts/setup-admin.js`

---

## Setup Inicial no Servidor

Após o primeiro deploy, correr uma vez:

```bash
node scripts/setup-admin.js
```

Isto cria a pasta `data/`, faz seed do `site-data.json`, e gera os valores para as variáveis de ambiente.

---

## Git Workflow

```bash
# Branch principal
main

# Commits em português
git commit -m "feat: implementa secção Hero com parallax"
git commit -m "fix: corrige responsividade da navbar mobile"
git commit -m "style: ajusta espaçamento da secção Conceito"
```

---

## Build Local

```bash
npm run build        # Build padrão (servidor Hostinger / Linux)
npm run build:local  # Build local no Windows (HD externo, usa fix-readlink.js)
npm run dev          # Dev server local
```

O `fix-readlink.js` contorna um bug do Windows com `fs.readlink` em discos externos. Só é necessário localmente.

---

## Testes E2E (Playwright)

```bash
npx playwright test                      # Todos os testes (116)
npx playwright test --project=desktop    # Só desktop (Chrome)
npx playwright test --project=mobile     # Só mobile (WebKit)
npx playwright test e2e/admin.spec.ts    # Só testes admin
npx playwright test e2e/navigation.spec.ts  # Só navegação
```

### Projectos
- **Desktop:** Chromium 1280x720
- **Mobile:** WebKit 390x844 (iPhone 14)

### Pré-requisitos
```bash
npx playwright install          # Instalar browsers
npm run dev                     # Dev server a correr na porta 3000
```

---

## Checklist Pré-Deploy

- [ ] `npm run build` sem erros
- [ ] `npx playwright test` — 116/116 testes passam
- [ ] Responsivo testado em desktop e mobile
- [ ] Imagens optimizadas
- [ ] Console sem erros
- [ ] Painel admin funcional (`/admin/login`)
