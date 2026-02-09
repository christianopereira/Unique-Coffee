# Directiva: Painel de Administração

> Documentação completa do painel admin em `/admin`.

---

## Visão Geral

O painel admin permite à dona do site (Priscila) editar textos, imagens e configurações sem tocar em código. Foi implementado com **zero custos adicionais** e **zero dependências externas** — usa apenas Node.js built-in + Next.js.

### Princípios
- **Ficheiro JSON** como "base de dados" (`data/site-data.json`)
- **Filesystem** para uploads de imagens (`data/uploads/`)
- **Crypto nativo** do Node.js para autenticação (sem bcrypt, sem JWT)
- **Sessões em ficheiro** (`data/sessions.json`) — sem Redis, sem DB

---

## Arquitectura

```
┌──────────────────┐     ┌──────────────────────┐     ┌─────────────────┐
│  Admin UI        │────▶│  API Routes           │────▶│  data/          │
│  /admin/*        │     │  /api/admin/*          │     │  site-data.json │
│  (React forms)   │◀────│  (Next.js Route       │◀────│  uploads/       │
│                  │     │   Handlers)            │     │  sessions.json  │
└──────────────────┘     └──────────────────────┘     └─────────────────┘
                                                              │
┌──────────────────┐     ┌──────────────────────┐             │
│  Site Público    │────▶│  getSiteData()        │─────────────┘
│  /*, /sobre, ... │     │  (cache 60s + fallback│
│  (Server Render) │◀────│   para site-data.ts)  │
└──────────────────┘     └──────────────────────┘
```

---

## Autenticação

### Fluxo
1. Utilizador acede a `/admin/login`
2. Introduz a password
3. `POST /api/admin/login` — valida com `crypto.scrypt` contra `ADMIN_PASSWORD_HASH`
4. Se válida: cria sessão em `data/sessions.json`, define cookie `admin_session` (HttpOnly, Secure)
5. Middleware verifica cookie em cada request a `/admin/*` e `/api/admin/*`

### Variáveis de Ambiente
| Variável | Descrição | Como gerar |
|---|---|---|
| `ADMIN_PASSWORD_HASH` | Hash da password (salt:hash) | `node scripts/setup-admin.js` |
| `ADMIN_SESSION_SECRET` | Secret para validação de sessões | Gerado automaticamente pelo script |

### Sessões
- Guardadas em `data/sessions.json`
- TTL: 7 dias
- Limpeza automática de sessões expiradas ao validar
- Formato: `{ "session-uuid": { "createdAt": timestamp, "expiresAt": timestamp } }`

### Middleware (`src/middleware.ts`)
- Intercepta `/admin/*` → redireciona para `/admin/login` se sem sessão
- Intercepta `/api/admin/*` → retorna 401 se sem sessão
- **Excepções:** `/admin/login`, `/api/admin/login`, `/api/admin/logout`

---

## API Routes

### `POST /api/admin/login`
- Body: `{ password: string }`
- Sucesso: 200 + set-cookie `admin_session`
- Erro: 401 (password errada), 400 (sem password)

### `POST /api/admin/logout`
- Limpa sessão e cookie
- Sempre retorna 200

### `GET /api/admin/content`
- Retorna o `siteData` completo como JSON
- Requer sessão válida

### `PATCH /api/admin/content`
- Body: `{ section: string, data: object }`
- Actualiza apenas a secção indicada no JSON
- Invalida cache do `getSiteData()`
- Requer sessão válida

### `POST /api/admin/upload`
- Body: FormData com campo `file`
- Valida: tipo (image/*), tamanho (max 5MB)
- Guarda em `data/uploads/` com nome único (timestamp + original)
- Retorna: `{ url: "/api/uploads/filename.jpg" }`
- Requer sessão válida

### `GET /api/uploads/[...path]`
- Serve imagens de `data/uploads/`
- Headers: `Cache-Control: public, max-age=31536000, immutable`
- **Não requer sessão** (imagens são públicas)

---

## Camada de Dados (`src/lib/get-site-data.ts`)

### `getSiteData(): SiteData`
- Síncrona (usa `fs.readFileSync`)
- Cache em memória com TTL de 60 segundos
- Fallback automático para `src/content/site-data.ts` se JSON não existir

### `saveSiteData(data: SiteData): void`
- Escreve o JSON completo em `data/site-data.json`
- Invalida o cache

### `updateSiteDataSection(section: string, data: unknown): void`
- Lê o JSON actual, actualiza apenas a secção, guarda
- Invalida o cache

### `invalidateSiteDataCache(): void`
- Força nova leitura do ficheiro na próxima chamada

### `ensureDataDir(): void`
- Cria `data/` se não existir

---

## Layouts (Route Groups)

O site usa **Next.js Route Groups** para separar layouts:

```
src/app/
├── layout.tsx          # Layout raiz: html + body + fonts (SEM Navbar/Footer)
├── (public)/
│   ├── layout.tsx      # Navbar + Footer (wrap das páginas públicas)
│   └── page.tsx, sobre/, conceito/, etc.
└── admin/
    ├── layout.tsx      # Sidebar + logo (layout admin)
    └── login/page.tsx, page.tsx, hero/page.tsx, etc.
```

**Importante:** Os route groups `(public)` não alteram os URLs. `/sobre` continua a ser `/sobre`, não `/(public)/sobre`.

---

## Componentes Admin

### `AdminForm` (`src/components/admin/AdminForm.tsx`)
Componente genérico com render-props para formulários de edição:
```tsx
<AdminForm section="hero">
  {({ data, updateField }) => (
    <TextInput label="Título" value={data.title} onChange={(v) => updateField("title", v)} />
  )}
</AdminForm>
```
- Carrega dados via `GET /api/admin/content`
- Guarda via `PATCH /api/admin/content`
- Mostra estados de loading, erro e sucesso

### Campos (`src/components/admin/fields.tsx`)
| Componente | Uso |
|---|---|
| `TextInput` | Campo de texto simples |
| `TextArea` | Campo multi-linha (parágrafos) |
| `ArrayEditor` | Lista editável (adicionar/remover strings) |
| `ImagePicker` | Upload + URL + preview de imagem |
| `SectionHeader` | Título + descrição da página |

---

## Secções Editáveis

| Rota Admin | Secção JSON | Campos Principais |
|---|---|---|
| `/admin/hero` | `hero` | título, subtítulo, CTA, imagem |
| `/admin/sobre` | `sobreNos` | título, parágrafos[], highlights[], imagem |
| `/admin/conceito` | `conceito` | título, parágrafos[] |
| `/admin/diferencial` | `diferencial` | título, intro, parágrafos[], closing[] |
| `/admin/graos` | `graos` | título, parágrafos[], imagem |
| `/admin/missao` | `missaoVisaoValores` | missão, visão, valores[] (nome + descrição) |
| `/admin/menu` | `menu` | categorias[] > itens[] (nome, preço, descrição) |
| `/admin/sobremesas` | `sobremesas` | parágrafos[], highlights[], itens[] com imagem |
| `/admin/equipa` | `equipa` | membros[] (nome, cargo, hasPhoto) |
| `/admin/galeria` | `galeria` | descrição[], imagens[] com upload |
| `/admin/contacto` | `visiteNos` | morada, telefone, horários, social, coordenadas |
| `/admin/config` | `brand` + `footer` + `nav` | nome, tagline, copyright, links nav |

---

## Setup no Servidor (Primeira Vez)

```bash
# 1. SSH para o servidor Hostinger (ou usar terminal no painel)

# 2. Navegar para a pasta do site
cd /path/to/unique-coffee

# 3. Correr o script de setup
node scripts/setup-admin.js

# 4. O script vai:
#    - Criar data/ e data/uploads/
#    - Fazer seed do site-data.json
#    - Pedir a password de admin
#    - Imprimir ADMIN_PASSWORD_HASH e ADMIN_SESSION_SECRET

# 5. Adicionar as variáveis no painel da Hostinger:
#    ADMIN_PASSWORD_HASH=<valor impresso>
#    ADMIN_SESSION_SECRET=<valor impresso>

# 6. Reiniciar a aplicação
```

---

## Segurança

- Password nunca guardada em texto — apenas hash com `crypto.scrypt` + salt aleatório
- Sessões com UUID v4 + TTL de 7 dias
- Cookie `HttpOnly` + `Secure` + `SameSite=Lax`
- Middleware bloqueia acesso sem sessão a todas as rotas admin e API
- Upload valida tipo MIME (apenas imagens) e tamanho (max 5MB)
- Pasta `data/` no `.gitignore` — nunca exposta no repositório
- API routes retornam 401 sem sessão válida

---

## Testes E2E (`e2e/admin.spec.ts`)

### Testes de Autenticação
- Redireciona `/admin` para `/admin/login` sem sessão
- Página de login carrega (form + logo visíveis)
- Login com password errada não redireciona

### Testes de API
- `GET /api/admin/content` retorna 401 sem sessão
- `POST /api/admin/upload` retorna 401 sem sessão
- `POST /api/admin/login` sem password retorna 400
- `POST /api/admin/login` com password errada retorna erro
- `POST /api/admin/logout` responde 200

### Testes de Protecção
- Todas as 13 rotas admin redirecionam para login sem sessão

### Screenshots
- Captura screenshot da página de login para referência visual

---

## Notas Importantes

1. **A pasta `data/` persiste entre deploys** — o Hostinger faz `git pull` + rebuild, não apaga ficheiros fora do repo
2. **O fallback para `site-data.ts` é automático** — se o JSON não existir (ex: primeiro deploy), o site usa os dados estáticos originais
3. **O cache de 60s** significa que alterações no admin demoram até 60 segundos a aparecer no site público (na prática, o cache é invalidado imediatamente após PATCH, mas outros processos Node.js podem ter o cache antigo)
4. **Sem rate limiting** na API de login — para um site com 1 utilizador admin, não é necessário
5. **Sem CSRF token** — o cookie `SameSite=Lax` protege contra CSRF em browsers modernos
