"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import { useRouter } from "next/navigation";

const IDLE_TIMEOUT = 30 * 60 * 1000; // 30 minutos
const WARNING_BEFORE = 2 * 60 * 1000; // Aviso 2 min antes
const CHECK_INTERVAL = 30 * 1000; // Verificar a cada 30s

/**
 * Componente que detecta inactividade e faz auto-logout.
 * Mostra aviso 2 minutos antes de expirar.
 */
export function AutoLogout() {
  const router = useRouter();
  const lastActivityRef = useRef(Date.now());
  const [showWarning, setShowWarning] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const resetActivity = useCallback(() => {
    lastActivityRef.current = Date.now();
    if (showWarning) setShowWarning(false);
  }, [showWarning]);

  const doLogout = useCallback(async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
    } catch {
      // Ignore errors — we're logging out anyway
    }
    router.push("/admin/login?reason=idle");
  }, [router]);

  // Escutar eventos de actividade do utilizador
  useEffect(() => {
    const events = ["mousedown", "keydown", "scroll", "touchstart"];
    const handler = () => resetActivity();

    events.forEach((e) => window.addEventListener(e, handler, { passive: true }));
    return () => {
      events.forEach((e) => window.removeEventListener(e, handler));
    };
  }, [resetActivity]);

  // Timer para verificar inactividade
  useEffect(() => {
    const interval = setInterval(() => {
      const elapsed = Date.now() - lastActivityRef.current;
      const remaining = IDLE_TIMEOUT - elapsed;

      if (remaining <= 0) {
        doLogout();
      } else if (remaining <= WARNING_BEFORE) {
        setShowWarning(true);
        setCountdown(Math.ceil(remaining / 1000));
      } else {
        setShowWarning(false);
      }
    }, CHECK_INTERVAL);

    return () => clearInterval(interval);
  }, [doLogout]);

  // Countdown mais preciso quando aviso está visível
  useEffect(() => {
    if (!showWarning) return;
    const interval = setInterval(() => {
      const elapsed = Date.now() - lastActivityRef.current;
      const remaining = IDLE_TIMEOUT - elapsed;
      if (remaining <= 0) {
        doLogout();
      } else {
        setCountdown(Math.ceil(remaining / 1000));
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [showWarning, doLogout]);

  if (!showWarning) return null;

  const minutes = Math.floor(countdown / 60);
  const seconds = countdown % 60;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-espresso/60 backdrop-blur-sm">
      <div className="bg-warm-white rounded-xl p-6 max-w-sm mx-4 shadow-xl border border-linen text-center">
        <h3 className="font-sans font-semibold text-espresso text-lg mb-2">
          Sessão a expirar
        </h3>
        <p className="text-sm text-roast mb-4">
          A sua sessão vai expirar por inactividade em{" "}
          <span className="font-semibold text-copper">
            {minutes > 0 ? `${minutes}m ${seconds.toString().padStart(2, "0")}s` : `${seconds}s`}
          </span>
        </p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={resetActivity}
            className="px-5 py-2 rounded-lg bg-copper text-white font-sans font-medium hover:bg-copper/90 transition-colors"
          >
            Continuar sessão
          </button>
          <button
            onClick={doLogout}
            className="px-5 py-2 rounded-lg border border-linen text-mocha font-sans hover:bg-parchment transition-colors"
          >
            Sair agora
          </button>
        </div>
      </div>
    </div>
  );
}
