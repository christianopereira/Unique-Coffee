"use client";

import { LegalPageEditor } from "@/components/admin/LegalPageEditor";

export default function AdminPrivacidadePage() {
  return (
    <LegalPageEditor
      sectionKey="privacidade"
      title="Privacidade e Termos"
      description="Edite o conteudo da pagina de privacidade e termos de utilizacao"
    />
  );
}
