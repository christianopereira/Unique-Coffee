"use client";

import { LegalPageEditor } from "@/components/admin/LegalPageEditor";

export default function AdminCookiesPage() {
  return (
    <LegalPageEditor
      sectionKey="cookies"
      title="Politica de Cookies"
      description="Edite o conteudo da pagina de politica de cookies"
    />
  );
}
