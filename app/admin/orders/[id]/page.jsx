import Link from "next/link";
import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/admin-auth";
import { ORDER_STATUSES } from "@/lib/orders";
import { db, supabaseConfigured } from "@/lib/supabase";
import { formatPrice } from "@/lib/utils";
import { updateOrder } from "../../actions";
import { Notice, SetupRequired } from "../../ui";

export default async function OrderPage({ params, searchParams }) {
  await requireAdmin();
  const { id } = await params;
  if (!supabaseConfigured()) return <SetupRequired />;

  const { data: order } = await db().from("orders").select("*").eq("id", id).maybeSingle();
  if (!order) notFound();
  const { customer, address, totals } = order;

  return (
    <>
      <p>
        <Link href="/admin" className="textbtn">
          ← All orders
        </Link>
      </p>
      <h1 className="admin__title">Order {order.id}</h1>
      <p className="muted">
        Placed{" "}
        {new Date(order.created_at).toLocaleString("en-IN", {
          dateStyle: "medium",
          timeStyle: "short",
          timeZone: "Asia/Kolkata",
        })}
      </p>
      <Notice searchParams={await searchParams} savedText="Order updated." />

      <div className="admin__cols">
        <section className="admin__card">
          <h2>Items</h2>
          <table className="table admin__table">
            <tbody>
              {order.items.map((item) => (
                <tr key={`${item.id}-${item.size}`}>
                  <td>
                    {item.name} — {item.colour}, size {item.size}
                  </td>
                  <td>× {item.qty}</td>
                  <td>{formatPrice(item.price * item.qty)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <dl className="totals">
            <div>
              <dt>Subtotal</dt>
              <dd>{formatPrice(totals.subtotal)}</dd>
            </div>
            {totals.discount > 0 && (
              <div>
                <dt>Discount ({totals.discountCode})</dt>
                <dd>−{formatPrice(totals.discount)}</dd>
              </div>
            )}
            <div>
              <dt>Shipping</dt>
              <dd>{formatPrice(totals.shipping)}</dd>
            </div>
            <div className="totals__grand">
              <dt>Total</dt>
              <dd>{formatPrice(totals.total)}</dd>
            </div>
          </dl>

          <h2>Customer</h2>
          <p>
            {customer.name}
            <br />
            +91 {customer.mobile} ·{" "}
            <a
              className="textbtn"
              href={`https://wa.me/91${customer.mobile}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Open WhatsApp chat
            </a>
            <br />
            {customer.email}
          </p>
          <h2>Deliver to</h2>
          <p>
            {address.line1}
            {address.line2 ? `, ${address.line2}` : ""}
            <br />
            {address.city}, {address.state} {address.pin}
          </p>
          {order.estimate && <p className="muted">Estimate shown to customer: {order.estimate}</p>}
        </section>

        <form action={updateOrder} className="admin__card admin__form">
          <h2>Update</h2>
          <input type="hidden" name="id" value={order.id} />
          <div className="field">
            <label htmlFor="status">Status</label>
            <select id="status" name="status" defaultValue={order.status}>
              {ORDER_STATUSES.map((s) => (
                <option key={s.key} value={s.key}>
                  {s.label}
                </option>
              ))}
            </select>
            <p className="field__hint">
              {order.stock_deducted
                ? "Stock has been taken out for this order. Cancelling puts it back."
                : "Stock is taken out when you confirm the order."}
            </p>
          </div>
          <label className="check">
            <input type="checkbox" name="paid" defaultChecked={order.paid} /> Payment received
          </label>
          <div className="field">
            <label htmlFor="courier">Courier</label>
            <input id="courier" name="courier" defaultValue={order.tracking?.courier || ""} />
          </div>
          <div className="field">
            <label htmlFor="tracking_url">Tracking link</label>
            <input
              id="tracking_url"
              name="tracking_url"
              type="url"
              placeholder="https://"
              defaultValue={order.tracking?.url || ""}
            />
            <p className="field__hint">Shown to the customer on the Track page when both are filled.</p>
          </div>
          <div className="field">
            <label htmlFor="notes">Private notes</label>
            <textarea id="notes" name="notes" rows={4} defaultValue={order.notes} />
          </div>
          <button type="submit" className="btn btn--solid btn--block">
            Save
          </button>
        </form>
      </div>
    </>
  );
}
