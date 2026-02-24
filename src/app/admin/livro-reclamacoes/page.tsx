"use client";

import { AdminForm } from "@/components/admin/AdminForm";
import { TextInput, SectionHeader } from "@/components/admin/fields";

export default function AdminLivroReclamacoesPage() {
  return (
    <>
      <SectionHeader
        title="Livro de Reclamacoes"
        description="Link externo para o Livro de Reclamacoes Electronico. Aparece no rodape do site."
      />
      <AdminForm section="livroReclamacoes">
        {({ data, updateField }) => (
          <div className="space-y-5">
            <TextInput
              label="Link do Livro de Reclamacoes"
              value={(data.link as string) || ""}
              onChange={(v) => updateField("link", v)}
              placeholder="https://www.livroreclamacoes.pt/Inicio/"
              hint="Link externo para o portal oficial. Este link aparece no rodape de todas as paginas."
            />
            <div className="p-4 rounded-lg bg-copper/5 border border-copper/20">
              <p className="text-xs text-mocha">
                O Livro de Reclamacoes nao tem pagina propria no site — o link no rodape abre directamente o portal oficial.
              </p>
            </div>
          </div>
        )}
      </AdminForm>
    </>
  );
}
