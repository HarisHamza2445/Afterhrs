import Link from "next/link";
import { requireAdmin } from "@/lib/admin-auth";
import { ORDER_STATUSES, statusLabel } from "@/lib/orders";
import { db, supabaseConfigured } from "@/lib/supabase";
import { formatPrice } from "@/lib/utils";
import { Notice, SetupRequired } from "./ui";

const when = (iso) =>
  new Date(iso).toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Kolkata",
  });

export default async function OrdersPage({ searchParams }) {
  await requireAdmin();
  const params = await searchParams;
  if (!supabaseConfigured()) return <SetupRequired />;

  const filter = ORDER_STATUSES.some((s) => s.key === params.status) ? params.status : null;
  let query = db().from("orders").select("*").order("created_at", { ascending: false }).limit(300);
  if (filter) query = query.eq("status", filter);
  const { data: orders, error } = await query;

  return (
    <>
      <h1 className="admin__title">Orders</h1>
      <Notice searchParams={error ? { error: error.message } : params} />
      <nav className="admin__filters" aria-label="Filter by status">
        <Link href="/admin" className={filter ? "chip" : "chip is-on"}>
          All
        </Link>
        {ORDER_STATUSES.map((s) => (
          <Link
            key={s.key}
            href={`/admin?status=${s.key}`}
            className={filter === s.key ? "chip is-on" : "chip"}
          >
            {statusLabel(s.key)}
          </Link>
        ))}
      </nav>
      {orders?.length ? (
        <div className="table-wrap">
          <table className="table admin__table">
            <thead>
              <tr>
                <th>Order</th>
                <th>Placed</th>
                <th>Customer</th>
                <th>Items</th>
                <th>Total</th>
                <th>Paid</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td>
                    <Link href={`/admin/orders/${order.id}`} className="textbtn">
                      {order.id}
                    </Link>
                  </td>
                  <td>{when(order.created_at)}</td>
                  <td>
                    {order.customer.name}
                    <br />
                    <span className="muted">+91 {order.customer.mobile}</span>
                  </td>
                  <td>
                    {order.items.map((item) => (
                      <div key={`${item.id}-${item.size}`}>
                        {item.qty} × {item.name} ({item.size})
                      </div>
                    ))}
                  </td>
                  <td>{formatPrice(order.totals.total)}</td>
                  <td>{order.paid ? "Yes" : "No"}</td>
                  <td>
                    <span className={`admin__status admin__status--${order.status}`}>
                      {statusLabel(order.status)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        !error && <p className="muted">No orders{filter ? " with this status" : " yet"}.</p>
      )}
    </>
  );
}
