import "server-only";
import { cache } from "react";
import { PRODUCTS as STATIC_PRODUCTS } from "@/lib/catalog";
import { db, supabaseConfigured } from "@/lib/supabase";

export function rowToProduct(row) {
  const stock = row.stock || {};
  return {
    id: row.id,
    name: row.name,
    fullName: row.full_name,
    status: row.status,
    price: row.price,
    colours: row.colours,
    sizes: row.sizes,
    stock,
    soldOut: row.sizes.filter((size) => !(Number(stock[size]) > 0)),
    collections: row.collections,
    tone: row.tone,
    images: row.images,
    gallery: row.gallery,
    short: row.short,
    description: row.description,
    design: row.design,
    fit: row.fit,
    fabric: row.fabric,
    gsm: row.gsm,
    printMethod: row.print_method,
    tags: row.tags,
  };
}

// Every product row, including hidden ones (admin panel).
export async function getAllProducts() {
  const { data, error } = await db().from("products").select("*").order("sort").order("name");
  if (error) throw new Error(error.message);
  return data.map(rowToProduct);
}

// The storefront catalog. Falls back to the built-in catalog in lib/catalog.js
// while Supabase isn't connected (or can't be reached).
export const getCatalog = cache(async () => {
  if (!supabaseConfigured()) return STATIC_PRODUCTS;
  try {
    const products = (await getAllProducts()).filter((p) => p.status !== "hidden");
    return products.length ? products : STATIC_PRODUCTS;
  } catch (err) {
    console.error("Could not load products from Supabase:", err.message);
    return STATIC_PRODUCTS;
  }
});
