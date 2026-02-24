import Link from "next/link";
import { getSiteData } from "@/lib/get-site-data";
import { Instagram, Facebook } from "lucide-react";

const LEGAL_LINKS = [
  { label: "Privacidade e Termos", href: "/privacidade" },
  { label: "Politica de Cookies", href: "/cookies" },
];

export function Footer() {
  const siteData = getSiteData();
  const livroLink = siteData.livroReclamacoes?.link || "https://www.livroreclamacoes.pt/Inicio/";
  return (
    <footer className="bg-footer-bg text-warm-white/70 py-12">
      <div className="section-container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="text-center md:text-left">
            <p className="font-display text-lg text-warm-white">
              {siteData.brand.name}
            </p>
            <p className="text-sm mt-1">{siteData.footer.location}</p>
          </div>

          {/* Social */}
          <div className="flex items-center gap-4">
            {siteData.visiteNos.social.instagram && (
              <a
                href={siteData.visiteNos.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-copper transition-colors duration-300"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
            )}
            {siteData.visiteNos.social.facebook && (
              <a
                href={siteData.visiteNos.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-copper transition-colors duration-300"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
            )}
          </div>

          {/* Copyright */}
          <p className="text-xs tracking-wide">
            {siteData.footer.copyright}
          </p>
        </div>

        {/* Legal links */}
        <div className="mt-8 pt-6 border-t border-warm-white/10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {LEGAL_LINKS.map((link) => (
            <span key={link.href} className="flex items-center gap-6">
              <Link
                href={link.href}
                className="text-xs text-warm-white/50 hover:text-copper transition-colors duration-300"
              >
                {link.label}
              </Link>
              <span className="text-warm-white/20">|</span>
            </span>
          ))}
          {livroLink && (
            <a
              href={livroLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-warm-white/50 hover:text-copper transition-colors duration-300"
            >
              Livro de Reclamacoes
            </a>
          )}
        </div>
      </div>
    </footer>
  );
}
