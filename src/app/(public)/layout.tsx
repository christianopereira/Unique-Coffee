import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { getSiteData } from "@/lib/get-site-data";

export const dynamic = "force-dynamic";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const siteData = getSiteData();

  return (
    <>
      <Navbar navLinks={siteData.nav.links} logoUrl={siteData.brand.logo} />
      <main>{children}</main>
      <Footer />
    </>
  );
}
