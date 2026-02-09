/**
 * Script de setup do admin.
 *
 * Uso: node scripts/setup-admin.js
 *
 * Pede uma password e gera o hash para colocar na variável de ambiente
 * ADMIN_PASSWORD_HASH no painel da Hostinger.
 *
 * Também cria a pasta data/ e o ficheiro site-data.json inicial
 * a partir dos dados estáticos.
 */

const crypto = require("crypto");
const fs = require("fs");
const path = require("path");
const readline = require("readline");

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "site-data.json");
const UPLOADS_DIR = path.join(DATA_DIR, "uploads");

function hashPassword(password) {
  return new Promise((resolve, reject) => {
    const salt = crypto.randomBytes(16).toString("hex");
    crypto.scrypt(password, salt, 64, (err, derived) => {
      if (err) reject(err);
      resolve(`${salt}:${derived.toString("hex")}`);
    });
  });
}

function ask(question) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer);
    });
  });
}

async function main() {
  console.log("\n🔧 Unique Coffee — Setup Admin\n");

  // 1. Criar pastas
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
    console.log("✅ Pasta data/ criada");
  }
  if (!fs.existsSync(UPLOADS_DIR)) {
    fs.mkdirSync(UPLOADS_DIR, { recursive: true });
    console.log("✅ Pasta data/uploads/ criada");
  }

  // 2. Seed do site-data.json (se não existir)
  if (!fs.existsSync(DATA_FILE)) {
    try {
      // Tentar importar os dados estáticos
      const siteDataPath = path.join(
        process.cwd(),
        "src",
        "content",
        "site-data.ts"
      );
      if (fs.existsSync(siteDataPath)) {
        // Ler o TypeScript e extrair o JSON (simples, sem transpilação)
        const content = fs.readFileSync(siteDataPath, "utf-8");
        // Extrair o objecto entre 'export const siteData = {' e '} as const;'
        const match = content.match(
          /export const siteData = (\{[\s\S]*\}) as const;/
        );
        if (match) {
          // Avaliar como JS (atenção: só seguro com dados controlados)
          const evalContent = `(${match[1]})`;
          // eslint-disable-next-line no-eval
          const data = eval(evalContent);
          fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), "utf-8");
          console.log("✅ data/site-data.json criado com dados iniciais");
        } else {
          console.log("⚠️  Não foi possível extrair dados de site-data.ts");
          console.log(
            "   Cria manualmente data/site-data.json ou edita via admin."
          );
        }
      }
    } catch (err) {
      console.log("⚠️  Erro ao criar seed:", err.message);
    }
  } else {
    console.log("ℹ️  data/site-data.json já existe — não foi substituído");
  }

  // 3. Gerar password hash
  console.log("");
  const password = await ask("Escolhe a password de admin: ");

  if (!password || password.length < 6) {
    console.log("❌ Password tem que ter pelo menos 6 caracteres.");
    process.exit(1);
  }

  const hash = await hashPassword(password);

  console.log("\n✅ Hash gerado com sucesso!\n");
  console.log("Adiciona esta variável de ambiente no painel da Hostinger:\n");
  console.log(`  ADMIN_PASSWORD_HASH=${hash}\n`);
  console.log("E também adiciona:");
  console.log(
    `  ADMIN_SESSION_SECRET=${crypto.randomBytes(32).toString("hex")}\n`
  );
  console.log("Depois faz deploy e acede a /admin/login no site.\n");
}

main().catch(console.error);
