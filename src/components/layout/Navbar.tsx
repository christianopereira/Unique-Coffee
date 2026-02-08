"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { siteData } from "@/content/site-data";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled
            ? "bg-warm-white/95 backdrop-blur-md shadow-sm py-4"
            : "bg-transparent py-6"
        )}
      >
        <div className="section-container flex items-center justify-between">
          {/* Logo */}
          <a
            href="#inicio"
            className={cn(
              "font-display text-xl md:text-2xl transition-colors duration-400",
              scrolled ? "text-espresso" : "text-warm-white"
            )}
          >
            {siteData.brand.name}
          </a>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-8">
            {siteData.nav.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={cn(
                  "font-sans text-xs font-medium uppercase tracking-[0.12em] transition-colors duration-300 hover:text-copper",
                  scrolled ? "text-roast" : "text-warm-white/90"
                )}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={cn(
              "lg:hidden p-2 transition-colors",
              scrolled ? "text-espresso" : "text-warm-white"
            )}
            aria-label="Menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-espresso/95 backdrop-blur-md flex items-center justify-center"
          >
            <nav className="flex flex-col items-center gap-8">
              {siteData.nav.links.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 + 0.1 }}
                  className="font-sans text-sm uppercase tracking-[0.15em] text-warm-white/90 hover:text-copper transition-colors"
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
