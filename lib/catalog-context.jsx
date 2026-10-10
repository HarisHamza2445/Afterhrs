"use client";

import { createContext, useContext, useMemo } from "react";
import { PRODUCTS as STATIC_PRODUCTS } from "@/lib/catalog";

const CatalogContext = createContext(null);

function build(products) {
  return { PRODUCTS: products, getProduct: (id) => products.find((p) => p.id === id) };
}

const FALLBACK = build(STATIC_PRODUCTS);

// Products are loaded on the server (lib/catalog-server.js) and handed down here.
export function CatalogProvider({ products, children }) {
  const value = useMemo(() => build(products), [products]);
  return <CatalogContext.Provider value={value}>{children}</CatalogContext.Provider>;
}

export const useCatalog = () => useContext(CatalogContext) || FALLBACK;
