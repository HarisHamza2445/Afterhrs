"use client";

import { useState } from "react";
import { Star } from "@/components/Brand";
import { IconArrow, IconTruck } from "@/components/icons";
import { Link } from "@/components/Link";
import { PageHero } from "@/components/sections";
import { DemoBadge, Field, Img, WhatsAppButton } from "@/components/ui";
import { useStore } from "@/lib/store";
import { MOBILE_RE, cx, formatPrice, normaliseMobile } from "@/lib/utils";
import { waMessages } from "@/lib/whatsapp";
import { CheckoutSteps } from "@/views/BagPage";
const ORDER_STEPS = [
  {
    key: "processing",
    label: "Processing",
    text: "Order received and being prepared.",
  },
  {
    key: "shipped",
    label: "Shipped",
    text: "Handed to the courier.",
  },
  {
    key: "out",
    label: "Out for delivery",
    text: "With your local delivery partner.",
  },
  {
    key: "delivered",
    label: "Delivered",
    text: "Arrived at your address.",
  },
];

function OrderStatus({ order }) {
  let t = ORDER_STEPS.findIndex((a) => a.key === order.status);
  return (
    <div className="ostatus">
      <ol className="ostatus__steps">
        {ORDER_STEPS.map((a, l) => (
          <li key={a.key} className={cx(l < t && "is-done", l === t && "is-now")}>
            <span className="ostatus__dot" aria-hidden="true">
              {l <= t ? <Star size={10} /> : null}
            </span>
            <strong>{a.label}</strong>
            <small>
              {l === t
                ? order.demo
                  ? "Current status (demo)"
                  : order.whatsapp
                    ? "Awaiting confirmation on WhatsApp"
                    : a.text
                : l < t
                  ? "Done"
                  : "Not yet"}
            </small>
          </li>
        ))}
      </ol>
      <div className="ostatus__courier">
        <IconTruck size={18} />
        {order.tracking ? (
          <a href={order.tracking.url} target="_blank" rel="noopener noreferrer">
            {"Track with "}
            {order.tracking.courier} <IconArrow size={14} />
          </a>
        ) : (
          <span>Courier tracking link appears here once the order ships.</span>
        )}
      </div>
    </div>
  );
}

function OrderCard({ order }) {
  let t = order.address;
  return (
    <div className="ocard">
      <div className="ocard__head">
        <div>
          <p className="eyebrow">Order ID</p>
          <p className="ocard__id">{order.id}</p>
        </div>
        <p className="muted">
          {"Placed "}
          {new Date(order.createdAt).toLocaleString("en-IN", {
            dateStyle: "medium",
            timeStyle: "short",
          })}
        </p>
      </div>
      <OrderStatus order={order} />
      <div className="ocard__grid">
        <div>
          <h3 className="ocard__h">Delivering to</h3>
          <address>
            {order.customer.name}
            <br />
            {t.line1}
            {t.line2 && (
              <>
                <br />
                {t.line2}
              </>
            )}
            <br />
            {t.city}
            {", "}
            {t.state} {t.pin}
            <br />
            {"+91 "}
            {order.customer.mobile}
          </address>
          {order.estimate && (
            <p className="muted">
              {"Estimated arrival: "}
              {order.estimate}
            </p>
          )}
        </div>
        <div>
          <h3 className="ocard__h">Items</h3>
          <ul className="mini-lines">
            {order.items.map((a, l) => (
              <li key={l}>
                <span className="mini-lines__img">
                  <Img src={a.image} alt="" />
                  <b>{a.qty}</b>
                </span>
                <span className="mini-lines__txt">
                  <strong>{a.name}</strong>
                  <small>
                    {a.colour}
                    {" · "}
                    {a.size}
                  </small>
                </span>
                <span>{formatPrice(a.price * a.qty)}</span>
              </li>
            ))}
          </ul>
          <dl className="totals">
            <div>
              <dt>Subtotal</dt>
              <dd>{formatPrice(order.totals.subtotal)}</dd>
            </div>
            {order.totals.discount > 0 && (
              <div className="is-discount">
                <dt>Discount</dt>
                <dd>−{formatPrice(order.totals.discount)}</dd>
              </div>
            )}
            <div>
              <dt>Shipping</dt>
              <dd>{formatPrice(order.totals.shipping)}</dd>
            </div>
            <div className="totals__grand">
              <dt>Total</dt>
              <dd>{formatPrice(order.totals.total)}</dd>
            </div>
          </dl>
          <p className="muted">
            {"Payment: "}
            {order.payment}
          </p>
        </div>
      </div>
      <WhatsAppButton className="btn btn--wa-line" title="Order help" text={waMessages.orderHelp(order.id)}>
        Get help with this order
      </WhatsAppButton>
    </div>
  );
}

export function OrderPage({ id }) {
  let { orders } = useStore();
  let a = orders.find((l) => l.id === id);
  return a ? (
    <div className="page page--light">
      <div className="container checkout-wrap">
        <CheckoutSteps at={2} />
        <div className="confirm-head">
          <Star size={26} className="confirm-head__star" />
          <p className="eyebrow">
            {a.demo ? "Demo order created" : a.whatsapp ? "Order sent on WhatsApp" : "Order confirmed"}
          </p>
          <h1 className="display display--serif">
            {"Thank you, "}
            <em>{a.customer.name.split(" ")[0]}.</em>
          </h1>
          {a.demo ? (
            <div className="demo-strip" role="note">
              <DemoBadge>Demo</DemoBadge>
              <span>
                This is a preview. No payment was taken and AFTERHRS has not received this order. It is saved
                only in this browser so you can try order tracking.
              </span>
            </div>
          ) : a.whatsapp ? (
            <>
              <p>
                Send the WhatsApp message to finish placing your order. AFTERHRS will confirm it and share
                payment details in the chat.
              </p>
              <WhatsAppButton
                className="btn btn--wa"
                title="Send your order on WhatsApp"
                text={waMessages.orderPlaced(a)}
              >
                Send order on WhatsApp
              </WhatsAppButton>
            </>
          ) : (
            <p>
              {"A confirmation has been sent to "}
              {a.customer.email}.
            </p>
          )}
        </div>
        <OrderCard order={a} />
        <div className="confirm-actions">
          <Link to="track" className="btn btn--line">
            Track an order
          </Link>
          <Link to="shop" className="btn btn--solid">
            {"Continue shopping "}
            <IconArrow size={16} />
          </Link>
        </div>
      </div>
    </div>
  ) : (
    <div className="page page--dark">
      <PageHero eyebrow="Order" title="We can’t find that order in this browser.">
        <p>
          {"Demo orders are saved only in the browser that created them. "}
          <Link to="track" className="link-arrow">
            {"Track an order "}
            <IconArrow size={14} />
          </Link>
        </p>
      </PageHero>
    </div>
  );
}

export function TrackPage() {
  let { orders } = useStore();
  let [t, a] = useState("");
  let [l, i] = useState("");
  let [n, o] = useState({});
  let [r, s] = useState(null);
  let [d, g] = useState(false);
  let v = (y) => {
    y.preventDefault();
    let N = {};
    if (!/^AH-[A-Z0-9-]{4,}$/i.test(t.trim())) {
      N.id = "Enter your order ID, for example AH-DEMO-4K7Q2P.";
    }
    if (!MOBILE_RE.test(normaliseMobile(l))) {
      N.mobile = "Enter the 10-digit mobile number used at checkout.";
    }
    o(N);
    if (!Object.keys(N).length) {
      g(true);
      let local = orders.find(
        (U) => U.id.toUpperCase() === t.trim().toUpperCase() && U.customer.mobile === normaliseMobile(l),
      );
      // the server copy carries the status set by AFTERHRS; fall back to the
      // copy saved in this browser
      fetch("/api/orders/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: t.trim(), mobile: normaliseMobile(l) }),
      })
        .then((res) => (res.ok ? res.json() : null))
        .catch(() => null)
        .then((found) => {
          s(found?.order || local || "none");
          g(false);
        });
    }
  };
  let p = orders[0];
  return (
    <div className="page page--dark">
      <PageHero
        eyebrow="Track my order"
        title={
          <>
            {"Where’s "}
            <em>my order?</em>
          </>
        }
      >
        <p>Enter your order ID and the mobile number you used at checkout.</p>
      </PageHero>
      <div className="container narrow">
        <form className="track" onSubmit={v} noValidate>
          <Field id="tr-id" label="Order ID" error={n.id}>
            <input
              id="tr-id"
              value={t}
              onChange={(y) => a(y.target.value.toUpperCase())}
              placeholder="AH-…"
              autoComplete="off"
              aria-invalid={!!n.id}
            />
          </Field>
          <Field id="tr-mobile" label="Mobile number" error={n.mobile}>
            <div className="prefix-input">
              <span>+91</span>
              <input
                id="tr-mobile"
                type="tel"
                inputMode="numeric"
                value={l}
                onChange={(y) => i(y.target.value)}
                aria-invalid={!!n.mobile}
              />
            </div>
          </Field>
          <button type="submit" className="btn btn--ivory" disabled={d}>
            {d ? "Looking up…" : "Track order"}
          </button>
        </form>
        {p && (
          <p className="fineprint">
            {"Ordered from this browser? "}
            <button
              type="button"
              className="textbtn"
              onClick={() => {
                a(p.id);
                i(p.customer.mobile);
              }}
            >
              Fill in your latest order
            </button>
            .
          </p>
        )}
        <div aria-live="polite">
          {r === "none" && (
            <div className="empty empty--dark">
              <p className="empty__title">No order matches those details.</p>
              <p>Check the order ID in your confirmation and use the same mobile number. Still stuck?</p>
              <WhatsAppButton className="btn btn--wa-line" text={waMessages.orderHelp(t)} title="Order help">
                Ask us on WhatsApp
              </WhatsAppButton>
            </div>
          )}
          {r && r !== "none" && (
            <div className="track__result">
              <OrderCard order={r} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
