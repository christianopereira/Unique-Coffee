"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { HelpCircle, BookOpen, MessageCircle, Route } from "lucide-react";

interface HelpMenuProps {
  onStartTour: () => void;
}

const WHATSAPP_URL =
  "https://wa.me/351925903132?text=Ol%C3%A1%2C%20preciso%20de%20ajuda%20com%20o%20painel%20admin%20do%20site.";

const menuItems = [
  {
    icon: BookOpen,
    label: "Guia do Utilizador",
    type: "link" as const,
    href: "/admin/guia",
  },
  {
    icon: MessageCircle,
    label: "Suporte (WhatsApp)",
    type: "external" as const,
    href: WHATSAPP_URL,
  },
  {
    icon: Route,
    label: "Tour Guiado",
    type: "tour" as const,
  },
];

export function HelpMenu({ onStartTour }: HelpMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const itemClass =
    "flex items-center gap-3 w-full px-4 py-3 text-sm font-sans text-espresso hover:bg-parchment transition-colors text-left";

  return (
    <div ref={menuRef} className="fixed bottom-6 right-6 z-50" data-tour="help-button">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-full right-0 mb-2 w-56 rounded-xl bg-warm-white border border-linen shadow-xl overflow-hidden"
          >
            {menuItems.map((item) => {
              const Icon = item.icon;

              if (item.type === "link") {
                return (
                  <Link
                    key={item.label}
                    href={item.href!}
                    className={itemClass}
                    onClick={() => setIsOpen(false)}
                  >
                    <Icon size={18} className="text-copper shrink-0" />
                    {item.label}
                  </Link>
                );
              }

              if (item.type === "external") {
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={itemClass}
                    onClick={() => setIsOpen(false)}
                  >
                    <Icon size={18} className="text-copper shrink-0" />
                    {item.label}
                  </a>
                );
              }

              return (
                <button
                  key={item.label}
                  className={itemClass}
                  onClick={() => {
                    setIsOpen(false);
                    onStartTour();
                  }}
                >
                  <Icon size={18} className="text-copper shrink-0" />
                  {item.label}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 rounded-full bg-copper text-white shadow-lg hover:bg-copper/90 transition-colors flex items-center justify-center"
        aria-label="Ajuda"
      >
        <HelpCircle size={22} />
      </motion.button>
    </div>
  );
}
