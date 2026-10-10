"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin, signIn, signOut } from "@/lib/admin-auth";
import { COLLECTIONS, SIZES } from "@/lib/catalog";
import { ORDER_STATUSES, holdsStock } from "@/lib/orders";
import { db } from "@/lib/supabase";

const text = (form, name, max = 2000) =>
  String(form.get(name) ?? "")
    .trim()
    .slice(0, max);
const wholeNumber = (value) => Math.max(0, Math.floor(Number(value)) || 0);
const fail = (path, message) => redirect(`${path}?error=${encodeURIComponent(message)}`);

// storefront pages are cached; rebuild them after any change
const refreshSite = () => revalidatePath("/", "layout");

export async function login(form) {
  if (!(await signIn(form.get("password")))) redirect("/admin/login?error=1");
  redirect("/admin");
}

export async function logout() {
  await signOut();
  redirect("/admin/login");
}

function readStock(form) {
  return Object.fromEntries(SIZES.map((size) => [size, wholeNumber(form.get(`stock_${size}`))]));
}

// Quick row on the stock page: price, status and per-size quantities.
export async function updateStock(form) {
  await requireAdmin();
  const id = text(form, "id", 80);
  const { error } = await db()
    .from("products")
    .update({
      price: wholeNumber(form.get("price")),
      status: ["available", "concept", "hidden"].includes(form.get("status"))
        ? form.get("status")
        : "available",
      stock: readStock(form),
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);
  if (error) fail("/admin/products", error.message);
  refreshSite();
  redirect(`/admin/products?saved=${encodeURIComponent(id)}`);
}

const slugify = (value) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);

async function uploadImages(id, files) {
  const urls = [];
  for (const file of files) {
    if (!file.type.startsWith("image/")) throw new Error(`${file.name} is not an image.`);
    const ext = (file.name.split(".").pop() || "jpg").toLowerCase().replace(/[^a-z0-9]/g, "");
    const path = `${id}/${Date.now()}-${urls.length}.${ext}`;
    const { error } = await db().storage.from("products").upload(path, file, { contentType: file.type });
    if (error) throw new Error(error.message);
    urls.push(db().storage.from("products").getPublicUrl(path).data.publicUrl);
  }
  return urls;
}

// Full product form, for both "add product" and "edit details".
export async function saveProduct(form) {
  await requireAdmin();
  const existingId = text(form, "id", 80);
  const isNew = !existingId;
  const back = isNew ? "/admin/products/new" : `/admin/products/${existingId}`;

  const name = text(form, "name", 80);
  if (name.length < 2) fail(back, "Enter a product name.");
  const id = isNew ? slugify(name) : existingId;
  if (!id) fail(back, "The product name needs at least one letter or number.");

  const row = {
    name,
    full_name: text(form, "full_name", 120) || name,
    status: ["available", "concept", "hidden"].includes(form.get("status"))
      ? form.get("status")
      : "available",
    price: wholeNumber(form.get("price")),
    colours: [
      { name: text(form, "colour_name", 40) || "Black", hex: text(form, "colour_hex", 9) || "#1a1a1a" },
    ],
    sizes: SIZES,
    collections: form.getAll("collections").filter((c) => COLLECTIONS.some((x) => x.id === c)),
    tone: form.get("tone") === "light" ? "light" : "dark",
    short: text(form, "short", 200),
    description: text(form, "description"),
    design: text(form, "design", 300) || null,
    fit: text(form, "fit", 300) || null,
    fabric: text(form, "fabric", 300) || null,
    gsm: text(form, "gsm", 40) || null,
    print_method: text(form, "print_method", 300) || null,
    tags: text(form, "tags", 300)
      .split(",")
      .map((tag) => tag.trim().toLowerCase())
      .filter(Boolean),
    updated_at: new Date().toISOString(),
  };

  const files = form.getAll("photos").filter((file) => typeof file === "object" && file.size > 0);
  if (isNew && !files.length) fail(back, "Add at least one photo.");
  if (files.length) {
    let urls;
    try {
      urls = await uploadImages(id, files);
    } catch (err) {
      fail(back, `Photo upload failed: ${err.message}`);
    }
    row.images = { main: urls[0], alt: urls[1] || null };
    row.gallery = urls.map((src, index) => ({ src, label: index === 0 ? "Main" : `View ${index + 1}` }));
  }

  if (isNew) {
    row.id = id;
    row.stock = readStock(form);
    const { error } = await db().from("products").insert(row);
    if (error) {
      fail(back, error.code === "23505" ? "A product with this name already exists." : error.message);
    }
  } else {
    const { error } = await db().from("products").update(row).eq("id", id);
    if (error) fail(back, error.message);
  }
  refreshSite();
  redirect(`/admin/products?saved=${encodeURIComponent(id)}`);
}

// Adds (direction +1) or removes (-1) an order's items from product stock.
async function adjustStock(items, direction) {
  for (const item of items) {
    const { data: product } = await db().from("products").select("stock").eq("id", item.id).maybeSingle();
    if (!product) continue;
    const stock = { ...product.stock };
    stock[item.size] = Math.max(0, (Number(stock[item.size]) || 0) + direction * item.qty);
    const { error } = await db().from("products").update({ stock }).eq("id", item.id);
    if (error) throw new Error(error.message);
  }
}

export async function updateOrder(form) {
  await requireAdmin();
  const id = text(form, "id", 20);
  const back = `/admin/orders/${id}`;
  const status = ORDER_STATUSES.some((s) => s.key === form.get("status")) ? form.get("status") : "pending";

  const { data: order, error: loadError } = await db().from("orders").select("*").eq("id", id).maybeSingle();
  if (loadError || !order) fail("/admin", loadError?.message || "Order not found.");

  // Confirming an order takes its items out of stock; cancelling it (or
  // moving it back to pending) puts them back.
  let stockDeducted = order.stock_deducted;
  try {
    if (holdsStock(status) && !order.stock_deducted) {
      await adjustStock(order.items, -1);
      stockDeducted = true;
    } else if (!holdsStock(status) && order.stock_deducted) {
      await adjustStock(order.items, 1);
      stockDeducted = false;
    }
  } catch (err) {
    fail(back, `Stock update failed: ${err.message}`);
  }

  const courier = text(form, "courier", 80);
  const trackingUrl = text(form, "tracking_url", 500);
  const { error } = await db()
    .from("orders")
    .update({
      status,
      paid: form.get("paid") === "on",
      notes: text(form, "notes"),
      tracking: courier && /^https?:\/\//.test(trackingUrl) ? { courier, url: trackingUrl } : null,
      stock_deducted: stockDeducted,
    })
    .eq("id", id);
  if (error) fail(back, error.message);
  refreshSite();
  redirect(`${back}?saved=1`);
}
