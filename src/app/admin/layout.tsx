"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Image as ImageIcon,
  FileText,
  Coffee,
  UtensilsCrossed,
  Cake,
  Users,
  GalleryHorizontalEnd,
  MapPin,
  Settings,
  LogOut,
  Sparkles,
  Bean,
  Target,
} from "lucide-react";

const adminLinks = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/hero", label: "Hero", icon: ImageIcon },
  { href: "/admin/sobre", label: "Sobre Nós", icon: FileText },
  { href: "/admin/missao", label: "Missão/Visão/Valores", icon: Target },
  { href: "/admin/conceito", label: "Conceito", icon: Sparkles },
  { href: "/admin/diferencial", label: "Diferencial", icon: Sparkles },
  { href: "/admin/graos", label: "Grãos", icon: Bean },
  { href: "/admin/menu", label: "Menu", icon: UtensilsCrossed },
  { href: "/admin/sobremesas", label: "Sobremesas", icon: Cake },
  { href: "/admin/equipa", label: "Equipa", icon: Users },
  { href: "/admin/galeria", label: "Galeria", icon: GalleryHorizontalEnd },
  { href: "/admin/contacto", label: "Contacto", icon: MapPin },
  { href: "/admin/config", label: "Configurações", icon: Settings },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  // Não mostrar sidebar no login
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  }

  return (
    <div className="flex min-h-screen bg-cream">
      {/* Sidebar */}
      <aside className="w-64 bg-espresso text-warm-white flex flex-col shrink-0">
        <div className="p-5 border-b border-roast flex justify-center">
          <Link href="/admin">
            <Image
              src="/images/Logo.svg"
              alt="Unique Coffee"
              width={200}
              height={200}
              className="h-[100px] w-auto"
            />
          </Link>
        </div>

        <nav className="flex-1 overflow-y-auto py-4">
          {adminLinks.map((link) => {
            const Icon = link.icon;
            const isActive =
              link.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                  isActive
                    ? "bg-roast text-copper font-medium"
                    : "text-stone hover:text-warm-white hover:bg-roast/50"
                }`}
              >
                <Icon size={18} />
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-roast">
          <Link
            href="/"
            target="_blank"
            className="block text-xs text-stone hover:text-copper mb-3 transition-colors"
          >
            Ver site →
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm text-stone hover:text-copper transition-colors w-full"
          >
            <LogOut size={16} />
            Sair
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-5xl mx-auto p-8">{children}</div>
      </main>
    </div>
  );
}
