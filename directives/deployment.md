# Directiva: Deployment

> Instruções para deploy e CI/CD.

---

## Opção A: Vercel (Recomendado para MVP)

1. Push para GitHub: `git push origin main`
2. Conectar repo no Vercel (vercel.com)
3. Framework preset: Next.js (auto-detectado)
4. Domínio: configurar `uniquecoffee.pt` (ou temporário do Vercel)
5. Variáveis de ambiente: nenhuma necessária para Fase 1

### Vantagens
- Zero config para Next.js
- CDN global, SSL automático
- Preview deploys para cada PR
- Grátis para este tipo de site

---

## Opção B: Coolify (VPS)

1. Configurar app no Coolify como "Next.js"
2. Source: GitHub repo
3. Build command: `pnpm build`
4. Start command: `pnpm start`
5. Port: 3000
6. Configurar domínio e SSL via Coolify

---

## Opção C: Export Estático (GitHub Pages)

Se decidirmos ir full estático:
1. Em `next.config.js`: `output: 'export'`
2. Build gera pasta `out/`
3. Deploy via GitHub Pages action

**Nota:** Perde-se funcionalidade de ISR e API routes.

---

## Git Workflow

```bash
# Branch principal
main

# Branches de feature
feat/hero-section
feat/navbar
feat/galeria

# Commits em português
git commit -m "feat: implementa secção Hero com parallax"
git commit -m "fix: corrige responsividade da navbar mobile"
git commit -m "style: ajusta espaçamento da secção Conceito"
```

---

## Checklist Pré-Deploy

- [ ] `pnpm build` sem erros
- [ ] Lighthouse 90+ (Performance, SEO, Accessibility, Best Practices)
- [ ] Responsivo testado em 3 breakpoints
- [ ] Imagens optimizadas
- [ ] Metadados e OG tags correctos
- [ ] Favicon configurado
- [ ] Links de navegação funcionais
- [ ] Console sem erros
