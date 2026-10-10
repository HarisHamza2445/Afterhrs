import { db, supabaseConfigured } from "@/lib/supabase";
import { normaliseMobile } from "@/lib/utils";

// Order lookup for the Track page: needs both the order ID and the mobile
// number used at checkout.
export async function POST(request) {
  if (!supabaseConfigured()) return Response.json({ ok: false }, { status: 503 });

  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false }, { status: 400 });
  }
  const id = String(body.id ?? "")
    .trim()
    .toUpperCase()
    .slice(0, 20);
  const mobile = normaliseMobile(String(body.mobile ?? "").slice(0, 20));

  const { data, error } = await db().from("orders").select("*").eq("id", id).maybeSingle();
  if (error) return Response.json({ ok: false }, { status: 500 });
  if (!data || data.customer?.mobile !== mobile) return Response.json({ ok: false }, { status: 404 });

  return Response.json({
    ok: true,
    order: {
      id: data.id,
      // "pending" shows on the storefront as awaiting confirmation on WhatsApp
      whatsapp: data.status === "pending",
      createdAt: data.created_at,
      status: data.status === "pending" ? "processing" : data.status,
      items: data.items,
      totals: data.totals,
      customer: data.customer,
      address: data.address,
      estimate: data.estimate,
      payment: data.paid ? "Paid" : "To be arranged on WhatsApp",
      tracking: data.tracking,
    },
  });
}
