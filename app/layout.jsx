import { Archivo, Bodoni_Moda, IBM_Plex_Mono } from "next/font/google";
import { Shell } from "@/components/Shell";
import { CatalogProvider } from "@/lib/catalog-context";
import { getCatalog } from "@/lib/catalog-server";
import { StoreProvider } from "@/lib/store";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  variable: "--font-bodoni",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: {
    default: "AFTERHRS — Independent Streetwear",
    template: "%s | AFTERHRS",
  },
  description:
    "AFTERHRS is an independent streetwear label founded in July 2026. Oversized tees carrying original graphics, released in small drops.",
  openGraph: {
    type: "website",
    siteName: "AFTERHRS",
    title: "AFTERHRS — Made for the hours that define you",
    description: "Independent streetwear. Distinctive graphics. No ordinary uniform.",
    images: ["/img/cat-tee.webp"],
  },
  twitter: { card: "summary_large_image" },
};

export const viewport = {
  themeColor: "#090909",
  viewportFit: "cover",
};

const organization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "AFTERHRS",
  foundingDate: "2026-07",
  description: "Independent streetwear label.",
};

// Product data is re-read from Supabase at most every 5 minutes; the admin
// panel also refreshes it immediately after each change.
export const revalidate = 300;

export default async function RootLayout({ children }) {
  const products = await getCatalog();
  return (
    <html lang="en" className={`${archivo.variable} ${bodoni.variable} ${plexMono.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
        />
        <div id="root">
          <CatalogProvider products={products}>
            <StoreProvider>
              <Shell>{children}</Shell>
            </StoreProvider>
          </CatalogProvider>
        </div>
      </body>
    </html>
  );
}
