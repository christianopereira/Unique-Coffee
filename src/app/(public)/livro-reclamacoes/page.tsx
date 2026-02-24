import { redirect } from "next/navigation";
import { getSiteData } from "@/lib/get-site-data";

export const dynamic = "force-dynamic";

const DEFAULT_LINK = "https://www.livroreclamacoes.pt/Inicio/";

export default function LivroReclamacoesPage() {
  const data = getSiteData();
  const link = data.livroReclamacoes?.link || DEFAULT_LINK;
  redirect(link);
}
