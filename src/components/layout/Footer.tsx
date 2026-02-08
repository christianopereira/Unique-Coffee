import { siteData } from "@/content/site-data";
import { Instagram, Facebook } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-espresso text-warm-white/70 py-12">
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
      </div>
    </footer>
  );
}
