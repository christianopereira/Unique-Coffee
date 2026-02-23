import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CookieConsent } from "@/components/ui/CookieConsent";
import { getSiteData } from "@/lib/get-site-data";

export const dynamic = "force-dynamic";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const siteData = getSiteData();
  const hidden = siteData.hiddenPages || [];

  // Filtrar links de páginas ocultas da navbar
  const visibleLinks = siteData.nav.links.filter(
    (link) => !hidden.includes(link.href)
  );

  return (
    <>
      <Navbar navLinks={visibleLinks} logoUrl={siteData.brand.logo} />
      <main>{children}</main>
      <Footer />
      <CookieConsent />
    </>
  );
}
