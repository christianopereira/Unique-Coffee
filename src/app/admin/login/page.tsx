"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (res.ok) {
        router.push("/admin");
      } else {
        setError(data.error || "Erro ao fazer login");
      }
    } catch {
      setError("Erro de ligação ao servidor");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-espresso flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <Image
            src="/images/Logo.svg"
            alt="Unique Coffee"
            width={120}
            height={120}
            className="mx-auto h-20 w-auto mb-4"
          />
          <h1 className="font-display text-2xl text-warm-white">
            Painel Admin
          </h1>
          <p className="text-stone text-sm mt-1">Unique Coffee</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="password"
              className="block text-sm text-stone mb-1.5"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-roast text-warm-white border border-mocha/30 focus:border-copper focus:outline-none placeholder:text-mocha"
              placeholder="Introduza a password"
              required
              autoFocus
            />
          </div>

          {error && (
            <p className="text-red-400 text-sm text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg bg-copper text-white font-sans font-medium hover:bg-copper/90 transition-colors disabled:opacity-50"
          >
            {loading ? "A entrar..." : "Entrar"}
          </button>
        </form>

        <p className="text-center text-mocha text-xs mt-8">
          Acesso restrito à administração
        </p>
      </div>
    </div>
  );
}
