"use client";

import { useState } from "react";
import { PdfModal } from "./PdfModal";

interface MenuCtaButtonProps {
  text: string;
  link: string;
}

function isEmbeddableLink(url: string): boolean {
  return (
    url.includes("drive.google.com/file") ||
    url.endsWith(".pdf")
  );
}

export function MenuCtaButton({ text, link }: MenuCtaButtonProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const embeddable = isEmbeddableLink(link);

  if (!embeddable) {
    // Fallback: link normal para URLs não-embeddable
    const isExternal = link.startsWith("http");
    return (
      <a
        href={link}
        className="inline-block font-sans text-sm font-semibold tracking-widest uppercase transition-all duration-400 btn-ghost relative after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:transition-all after:duration-400 hover:after:w-full"
        {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {text}
      </a>
    );
  }

  return (
    <>
      <button
        onClick={() => setModalOpen(true)}
        className="inline-block font-sans text-sm font-semibold tracking-widest uppercase transition-all duration-400 btn-ghost relative after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:transition-all after:duration-400 hover:after:w-full cursor-pointer"
      >
        {text}
      </button>

      <PdfModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        url={link}
        title={text}
      />
    </>
  );
}
