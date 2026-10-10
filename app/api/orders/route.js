import { getCatalog } from "@/lib/catalog-server";
import { db, supabaseConfigured } from "@/lib/supabase";
import { EMAIL_RE, MOBILE_RE, checkPin, normaliseMobile, resolveDiscount, shippingFor } from "@/lib/utils";

const text = (value, max) =>
  String(value ?? "")
    .trim()
    .slice(0, max);
const bad = (reason) => Response.json({ ok: false, reason }, { status: 400 });

// Records an order placed at checkout. Prices and totals are recalculated
// here from the catalog; nothing the browser sends about money is trusted.
export async function POST(request) {
  if (!supabaseConfigured()) return Response.json({ ok: false, reason: "not-configured" }, { status: 503 });

  let body;
  try {
    body = await request.json();
  } catch {
    return bad("invalid-json");
  }

  const id = text(body.id, 20);
  if (!/^AH-[A-Z0-9]{6}$/.test(id)) return bad("id");

  const products = await getCatalog();
  const items = (Array.isArray(body.items) ? body.items : [])
    .slice(0, 20)
    .map((item) => {
      const product = products.find((p) => p.id === item?.id);
      const qty = Math.floor(Number(item?.qty));
      if (!product || product.status !== "available") return null;
      if (!product.sizes.includes(item.size) || !(qty >= 1 && qty <= 10)) return null;
      const colour = product.colours.find((c) => c.name === item.colour) || product.colours[0];
      return {
        id: product.id,
        name: product.name,
        colour: colour.name,
        size: item.size,
        qty,
        price: product.price,
        image: product.images.main,
      };
    })
    .filter(Boolean);
  if (!items.length) return bad("items");

  const customer = {
    name: text(body.customer?.name, 80),
    mobile: normaliseMobile(text(body.customer?.mobile, 20)),
    email: text(body.customer?.email, 120),
  };
  if (customer.name.length < 2 || !MOBILE_RE.test(customer.mobile) || !EMAIL_RE.test(customer.email)) {
    return bad("customer");
  }

  const address = {
    line1: text(body.address?.line1, 160),
    line2: text(body.address?.line2, 160),
    city: text(body.address?.city, 80),
    state: text(body.address?.state, 80),
    pin: text(body.address?.pin, 6),
  };
  if (address.line1.length < 5 || address.city.length < 2 || !address.state || !checkPin(address.pin).ok) {
    return bad("address");
  }

  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);
  const discount = resolveDiscount(text(body.promo, 30), subtotal);
  const discountAmount = discount ? discount.amount : 0;
  const shipping = shippingFor(subtotal - discountAmount);
  const totals = {
    count: items.reduce((sum, item) => sum + item.qty, 0),
    subtotal,
    discount: discountAmount,
    discountCode: discount ? discount.code : "",
    shipping,
    total: Math.max(0, subtotal - discountAmount + shipping),
  };

  const { error } = await db()
    .from("orders")
    .insert({ id, customer, address, items, totals, estimate: text(body.estimate, 60) || null });
  if (error) {
    console.error("Could not save order:", error.message);
    return Response.json({ ok: false, reason: "save-failed" }, { status: 500 });
  }
  return Response.json({ ok: true });
}
