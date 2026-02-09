"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { siteData } from "@/content/site-data";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    setMounted(true);
    setScrolled(window.scrollY > 60);
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const isTransparent = mounted && isHome && !scrolled;

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          isTransparent
            ? "bg-transparent py-6"
            : "bg-warm-white/95 backdrop-blur-md shadow-sm py-4"
        )}
      >
        <div className="section-container flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image
              src="/images/Logo.svg"
              alt="Unique Coffee"
              width={200}
              height={200}
              className={cn(
                "object-contain transition-all duration-500",
                isTransparent ? "h-[120px] w-auto" : "h-20 w-auto"
              )}
              priority
            />
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            {siteData.nav.links.map((link) => {
              const isActive = link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "font-sans text-xs font-medium uppercase tracking-[0.12em] transition-colors duration-300 hover:text-copper",
                    isTransparent
                      ? isActive ? "text-copper" : "text-warm-white/90"
                      : isActive ? "text-copper" : "text-roast"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={cn(
              "lg:hidden p-2 transition-colors",
              isTransparent ? "text-warm-white" : "text-espresso"
            )}
            aria-label="Menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

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
              {siteData.nav.links.map((link, i) => {
                const isActive = link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);

                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 + 0.1 }}
                  >
                    <Link
                      href={link.href}
                      className={cn(
                        "font-sans text-sm uppercase tracking-[0.15em] transition-colors",
                        isActive ? "text-copper" : "text-warm-white/90 hover:text-copper"
                      )}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
