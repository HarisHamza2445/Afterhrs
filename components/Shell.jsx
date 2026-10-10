"use client";

import { useEffect, useMemo } from "react";
import { usePathname, useRouter } from "next/navigation";
import { CartDrawer } from "@/components/cart";
import { Footer } from "@/components/Footer";
import { AnnouncementBar, Header } from "@/components/Header";
import { SearchOverlay } from "@/components/SearchOverlay";
import { Toasts } from "@/components/Toasts";
import { WhatsAppFab, WhatsAppSheet } from "@/components/WhatsApp";
import { parseRoute, setRouter } from "@/lib/navigation";

export function Shell({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const route = useMemo(() => parseRoute(pathname), [pathname]);

  useEffect(() => setRouter(router), [router]);

  // the admin panel has its own layout, without the storefront chrome
  if (pathname.startsWith("/admin")) return children;

  return (
    <>
      <a
        className="skip"
        href="#main"
        onClick={(e) => {
          e.preventDefault();
          document.getElementById("main")?.focus();
        }}
      >
        Skip to content
      </a>
      <AnnouncementBar />
      <Header route={route} />
      <main id="main" tabIndex={-1} className={`main main--${route.page}`} key={route.raw}>
        {children}
      </main>
      <Footer />
      <CartDrawer />
      <SearchOverlay />
      <WhatsAppSheet />
      <WhatsAppFab route={route} />
      <Toasts />
    </>
  );
}
