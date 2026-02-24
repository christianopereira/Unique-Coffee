"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronDown,
  LayoutDashboard,
  Type,
  ImageIcon,
  Grid3x3,
  PanelTop,
  Palette,
  Search,
  Settings,
  Lightbulb,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { SectionHeader } from "@/components/admin/fields";

interface GuideSectionProps {
  id: string;
  icon: LucideIcon;
  title: string;
  openId: string | null;
  onToggle: (id: string) => void;
  children: React.ReactNode;
}

function GuideSection({ id, icon: Icon, title, openId, onToggle, children }: GuideSectionProps) {
  const isOpen = openId === id;
  return (
    <div className="rounded-xl border border-linen overflow-hidden">
      <button
        onClick={() => onToggle(id)}
        className="w-full flex items-center gap-3 px-5 py-4 bg-warm-white hover:bg-parchment/50 transition-colors text-left"
      >
        <Icon size={18} className="text-copper shrink-0" />
        <span className="font-sans font-semibold text-espresso flex-1">{title}</span>
        <ChevronDown
          size={16}
          className={`text-stone transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="px-5 py-4 border-t border-linen text-sm text-mocha font-sans leading-relaxed space-y-3">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Tip({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-copper/5 border-l-2 border-copper p-3 rounded-r-lg text-sm text-roast">
      <strong className="text-copper">Dica:</strong> {children}
    </div>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-1.5 pl-1">
      {items.map((item, i) => (
        <li key={i} className="flex gap-2">
          <span className="text-copper mt-1.5 shrink-0">•</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function AdminGuiaPage() {
  const [openId, setOpenId] = useState<string | null>("como-funciona");

  function handleToggle(id: string) {
    setOpenId(openId === id ? null : id);
  }

  return (
    <div>
      <SectionHeader
        title="Guia do Utilizador"
        description="Aprenda a editar o conteúdo do seu site de forma simples e rápida."
      />

      <div className="space-y-3">
        {/* 1. Como funciona */}
        <GuideSection id="como-funciona" icon={LayoutDashboard} title="Como funciona o painel" openId={openId} onToggle={handleToggle}>
          <p>
            O painel de administração permite-lhe editar todos os textos, imagens e configurações do
            site sem precisar de conhecimentos técnicos.
          </p>
          <BulletList items={[
            "O menu lateral (à esquerda) dá acesso a todas as secções do site.",
            "O Dashboard mostra cartões de acesso rápido a cada secção.",
            "Depois de editar, clique em \"Guardar alterações\" no fundo da página.",
            "As alterações ficam visíveis no site em cerca de 1 minuto.",
          ]} />
          <Tip>
            Pode abrir o site numa nova aba a qualquer momento clicando em &quot;Ver site →&quot; no fundo do menu lateral.
          </Tip>
        </GuideSection>

        {/* 2. Editar textos */}
        <GuideSection id="editar-textos" icon={Type} title="Editar textos" openId={openId} onToggle={handleToggle}>
          <p>
            Cada secção do site tem campos de texto editáveis: títulos, parágrafos, highlights e descrições.
          </p>
          <BulletList items={[
            "Clique numa secção no menu lateral ou no Dashboard.",
            "Altere os campos de texto directamente — o que escrever é o que aparece no site.",
            "Campos com lista (parágrafos, highlights) permitem adicionar ou remover itens com os botões \"+\" e \"✕\".",
            "Use as setas ↑↓ para reordenar itens numa lista.",
            "No final, clique \"Guardar alterações\" para aplicar.",
          ]} />
          <Tip>
            Pode copiar e colar texto de um documento Word ou Google Docs. A formatação é
            simplificada automaticamente.
          </Tip>
        </GuideSection>

        {/* 3. Enviar imagens */}
        <GuideSection id="enviar-imagens" icon={ImageIcon} title="Enviar imagens" openId={openId} onToggle={handleToggle}>
          <p>
            Cada secção permite enviar imagens que aparecem no site.
          </p>
          <BulletList items={[
            "Clique em \"Enviar imagem\" no campo da imagem.",
            "Escolha uma imagem do computador (máximo 5 MB).",
            "Para imagens JPG e PNG, aparece uma janela de recorte na proporção correcta — ajuste e confirme.",
            "Imagens SVG e GIF não passam pelo recorte (são enviadas directamente).",
            "A imagem é enviada e guardada automaticamente — clique \"Guardar alterações\" para aplicar ao site.",
          ]} />
          <Tip>
            Use imagens com menos de 1 MB para carregamento mais rápido. O formato JPEG é ideal
            para fotografias; PNG para logótipos e gráficos com transparência.
          </Tip>
        </GuideSection>

        {/* 4. Secções do site */}
        <GuideSection id="seccoes" icon={Grid3x3} title="Secções do site" openId={openId} onToggle={handleToggle}>
          <p>
            Cada secção do site tem a sua própria página de edição no admin:
          </p>
          <BulletList items={[
            "Hero — Imagem e texto principal que aparece no topo da homepage.",
            "Sobre Nós — História da cafetaria, highlights e imagem.",
            "Conceito — O conceito do espaço, texto e imagem de fundo.",
            "Grãos — Informação sobre os grãos seleccionados.",
            "Menu — Categorias e itens com nome, descrição e preço.",
            "Sobremesas — Itens com imagem, descrição e destaques.",
            "Equipa — Membros (nome, cargo, foto e descrição).",
            "Galeria — Fotografias do espaço com texto alternativo.",
            "Contacto — Morada, horários, redes sociais e mapa.",
            "Configurações — Logo, tagline, cores, fontes e footer.",
          ]} />
        </GuideSection>

        {/* 5. Hero por página */}
        <GuideSection id="hero-pagina" icon={PanelTop} title="Hero por página (banner de topo)" openId={openId} onToggle={handleToggle}>
          <p>
            Cada página do site pode ter o seu próprio banner (hero) no topo — uma imagem grande com
            título e subtítulo sobrepostos.
          </p>
          <BulletList items={[
            "Vá à página da secção que quer editar (ex: Sobre Nós, Galeria, Grãos).",
            "No topo, procure o painel \"Hero da página\" — clique para abrir.",
            "Active o interruptor \"Mostrar hero\" para activar o banner.",
            "Escolha uma imagem de fundo, título e subtítulo.",
            "Defina a altura (Pequeno, Médio ou Grande) e o escurecimento do overlay.",
            "Clique \"Guardar\" dentro do painel do hero.",
          ]} />
          <Tip>
            Se não activar o hero, a página mantém o espaçamento normal (sem banner). Pode activar
            e desactivar a qualquer momento.
          </Tip>
        </GuideSection>

        {/* 6. Fundos de secção */}
        <GuideSection id="fundos" icon={Palette} title="Fundos de secção (cor e imagem)" openId={openId} onToggle={handleToggle}>
          <p>
            Cada secção do site pode ter uma cor ou imagem de fundo personalizada, diferente do fundo predefinido.
          </p>
          <BulletList items={[
            "Vá à página da secção que quer editar.",
            "Procure o painel \"Fundo da secção\" — clique para abrir.",
            "Escolha uma cor de fundo usando o selector de cor, ou envie uma imagem de fundo.",
            "Ajuste a opacidade do overlay (escurecimento sobre a imagem).",
            "Active \"Texto claro\" se o fundo for escuro (para o texto ficar branco).",
            "Use \"Repor predefinido\" para voltar às cores originais.",
            "Clique \"Guardar\" dentro do painel.",
          ]} />
          <Tip>
            A cor de fundo e a imagem podem ser usadas em conjunto — a cor aparece enquanto a imagem
            carrega, e o overlay escurece a imagem para o texto ficar legível.
          </Tip>
        </GuideSection>

        {/* 7. SEO */}
        <GuideSection id="seo" icon={Search} title="SEO (aparecer no Google)" openId={openId} onToggle={handleToggle}>
          <p>
            As configurações de SEO controlam como o site aparece nos resultados do Google e nas
            pré-visualizações das redes sociais.
          </p>
          <BulletList items={[
            "Aceda a \"SEO\" no menu lateral.",
            "Edite o título e descrição globais — são usados como predefinição para todas as páginas.",
            "Personalize o título e descrição de cada página individualmente.",
            "O campo \"Verificação Google\" permite ligar o Google Search Console para monitorizar o desempenho.",
          ]} />
          <Tip>
            Mantenha os títulos com menos de 60 caracteres e as descrições com menos de 160
            caracteres para aparecerem completos no Google.
          </Tip>
        </GuideSection>

        {/* 8. Configurações */}
        <GuideSection id="config" icon={Settings} title="Configurações gerais" openId={openId} onToggle={handleToggle}>
          <p>
            Na página de Configurações pode personalizar a identidade visual e estrutura do site:
          </p>
          <BulletList items={[
            "Marca — Logo, tagline, favicon e imagem para redes sociais.",
            "Aparência — Cores do site (navbar, footer, fundo), fontes e tamanho de texto.",
            "Botões — Arredondamento dos cantos dos botões.",
            "Navegação — Reordene os links do menu de navegação.",
            "Páginas — Active ou desactive páginas do site (páginas desactivadas deixam de aparecer no menu e no site).",
            "Footer — Textos, direitos de autor e links das redes sociais.",
          ]} />
          <Tip>
            As alterações de cores e fontes afectam todo o site de uma vez. Pode clicar no código
            da cor para copiar o valor hexadecimal.
          </Tip>
        </GuideSection>

        {/* 9. Dicas úteis */}
        <GuideSection id="dicas" icon={Lightbulb} title="Dicas úteis" openId={openId} onToggle={handleToggle}>
          <BulletList items={[
            "Guarde as alterações com frequência — não espere até ao fim para guardar.",
            "Use imagens JPG ou PNG até 5 MB (idealmente menos de 1 MB para carregamento rápido).",
            "As imagens SVG e GIF são enviadas sem recorte — use-as para logótipos e ícones animados.",
            "Para ver as alterações no site, aguarde cerca de 1 minuto após guardar.",
            "Se algo parecer estranho, tente fazer um \"hard refresh\" no browser (Ctrl+Shift+R ou Cmd+Shift+R).",
            "A sessão de admin expira após 30 minutos de inactividade — guarde o trabalho antes de sair.",
            "Em caso de dúvida, contacte o suporte via WhatsApp clicando no botão \"?\" no canto inferior direito.",
          ]} />
        </GuideSection>
      </div>
    </div>
  );
}
