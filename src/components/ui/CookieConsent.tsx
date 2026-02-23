"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie } from "lucide-react";

const COOKIE_KEY = "uc-cookie-consent";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_KEY);
    if (!consent) {
      // Small delay so it doesn't flash on page load
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  function accept() {
    localStorage.setItem(COOKIE_KEY, "accepted");
    setVisible(false);
  }

  function decline() {
    localStorage.setItem(COOKIE_KEY, "declined");
    setVisible(false);
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
        >
          <div className="max-w-2xl mx-auto bg-espresso/95 backdrop-blur-md rounded-2xl border border-warm-white/10 p-5 md:p-6 shadow-2xl">
            <div className="flex items-start gap-4">
              <div className="hidden sm:flex w-10 h-10 rounded-full bg-copper/20 items-center justify-center shrink-0 mt-0.5">
                <Cookie size={20} className="text-copper" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-body text-warm-white/90 text-sm leading-relaxed">
                  Utilizamos cookies para melhorar a sua experiencia no nosso site.
                  Ao continuar a navegar, concorda com a nossa{" "}
                  <Link href="/cookies" className="text-copper hover:underline">
                    Politica de Cookies
                  </Link>.
                </p>
                <div className="flex flex-wrap gap-3 mt-4">
                  <button
                    onClick={accept}
                    className="px-5 py-2 bg-copper text-warm-white rounded-lg font-sans text-sm font-medium hover:bg-copper/90 transition-colors"
                  >
                    Aceitar
                  </button>
                  <button
                    onClick={decline}
                    className="px-5 py-2 bg-warm-white/10 text-warm-white/70 rounded-lg font-sans text-sm font-medium hover:bg-warm-white/20 hover:text-warm-white transition-colors"
                  >
                    Recusar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
