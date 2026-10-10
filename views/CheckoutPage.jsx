"use client";

import { useMemo, useState } from "react";
import { PromoCode, Totals } from "@/components/cart";
import { IconArrow, IconInfo, IconTruck, IconWhatsApp } from "@/components/icons";
import { Link } from "@/components/Link";
import { PageHero } from "@/components/sections";
import { Field, Img, PriceNote } from "@/components/ui";
import { navigate } from "@/lib/navigation";
import { useStore } from "@/lib/store";
import { EMAIL_RE, MOBILE_RE, STATES, checkPin, formatPrice, normaliseMobile } from "@/lib/utils";
import { waMessages, whatsappReady, whatsappUrl } from "@/lib/whatsapp";
import { CheckoutSteps } from "@/views/BagPage";
const EMPTY_ADDRESS = {
  name: "",
  mobile: "",
  email: "",
  line1: "",
  line2: "",
  city: "",
  state: "",
  pin: "",
};

function validateAddress(e) {
  let t = {};
  if (e.name.trim().length < 2) {
    t.name = "Enter your full name.";
  }
  if (!MOBILE_RE.test(normaliseMobile(e.mobile))) {
    t.mobile = "Enter a 10-digit Indian mobile number starting with 6, 7, 8 or 9.";
  }
  if (!EMAIL_RE.test(e.email.trim())) {
    t.email = "Enter a valid email, like name@example.com.";
  }
  if (e.line1.trim().length < 5) {
    t.line1 = "Enter your house number, building and street.";
  }
  if (e.city.trim().length < 2) {
    t.city = "Enter your city or town.";
  }
  if (!e.state) {
    t.state = "Choose your state or union territory.";
  }
  let a = checkPin(e.pin.trim());
  if (!a.ok) {
    t.pin = a.error;
  }
  return t;
}

export function CheckoutPage() {
  let { lines, totals, saveOrder, clearCart, setPromo, setWa } = useStore();
  let [n, o] = useState(() => {
    try {
      return {
        ...EMPTY_ADDRESS,
        ...JSON.parse(sessionStorage.getItem("afterhrs:checkout") || "{}"),
      };
    } catch {
      return EMPTY_ADDRESS;
    }
  });
  let [r, s] = useState({});
  let [d, g] = useState(false);
  let M = useMemo(() => validateAddress(n), [n]);
  let U = (S) => (d || r[S]) && M[S];
  let m = (S) => (D) => {
    let B = D.target.value;
    o((L) => {
      let pe = {
        ...L,
        [S]: S === "pin" ? B.replace(/\D/g, "").slice(0, 6) : B,
      };
      try {
        sessionStorage.setItem("afterhrs:checkout", JSON.stringify(pe));
      } catch {}
      return pe;
    });
  };
  let f = (S) => () =>
    s((D) => ({
      ...D,
      [S]: true,
    }));
  let b = n.pin.length === 6 ? checkPin(n.pin) : null;
  if (!lines.length)
    return (
      <div className="page page--dark">
        <PageHero eyebrow="Checkout" title="There’s nothing to check out.">
          <p>Your bag is empty. Add a piece first.</p>
          <Link to="shop" className="btn btn--ivory">
            {"Shop the collection "}
            <IconArrow size={16} />
          </Link>
        </PageHero>
      </div>
    );
  let x = (S) => {
    S.preventDefault();
    g(true);
    if (Object.keys(M).length) {
      setTimeout(() => {
        let D = document.querySelector(".field--error input, .field--error select");
        if (D) {
          D.focus();
          D.scrollIntoView({
            block: "center",
            behavior: "smooth",
          });
        }
      }, 0);
      return;
    }
    // No online payment: the order is saved in this browser and sent to
    // AFTERHRS as a WhatsApp message; payment is arranged in the chat.
    let order = {
      id: "AH-" + Math.random().toString(36).slice(2, 8).toUpperCase(),
      whatsapp: true,
      createdAt: new Date().toISOString(),
      status: "processing",
      items: lines.map((L) => ({
        id: L.id,
        name: L.product.name,
        colour: L.colour,
        size: L.size,
        qty: L.qty,
        price: L.product.price,
        image: L.product.images.main,
      })),
      totals: {
        ...totals,
      },
      customer: {
        name: n.name.trim(),
        mobile: normaliseMobile(n.mobile),
        email: n.email.trim(),
      },
      address: {
        line1: n.line1.trim(),
        line2: n.line2.trim(),
        city: n.city.trim(),
        state: n.state,
        pin: n.pin,
      },
      estimate: b && b.ok ? b.window : null,
      payment: "To be arranged on WhatsApp",
      tracking: null,
    };
    let message = waMessages.orderPlaced(order);
    // opened directly from the submit so the browser doesn't block it
    if (whatsappReady()) {
      window.open(whatsappUrl(message), "_blank", "noopener");
    } else {
      setWa({
        text: message,
        title: "Send your order on WhatsApp",
      });
    }
    saveOrder(order);
    // Record the order for the admin panel. Not awaited, so WhatsApp opens
    // straight away; prices are recalculated on the server.
    fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      keepalive: true,
      body: JSON.stringify({
        id: order.id,
        items: order.items.map(({ id, colour, size, qty }) => ({ id, colour, size, qty })),
        promo: totals.discountCode,
        customer: order.customer,
        address: order.address,
        estimate: order.estimate,
      }),
    }).catch(() => {});
    clearCart();
    setPromo("");
    try {
      sessionStorage.removeItem("afterhrs:checkout");
    } catch {}
    navigate("order-" + order.id);
  };
  let Z = d ? Object.keys(M).length : 0;
  return (
    <div className="page page--light">
      <div className="container checkout-wrap">
        <CheckoutSteps at={1} />
        <form className="two-col" onSubmit={x} noValidate>
          <div className="two-col__main checkout">
            <h1 className="display display--sm">Checkout</h1>
            {Z > 0 && (
              <div className="form-alert" role="alert">
                {"Please fix "}
                {Z} {Z === 1 ? "field" : "fields"}
                {" below."}
              </div>
            )}
            <fieldset className="fs">
              <legend>
                <span>01</span>
                {" Contact"}
              </legend>
              <div className="grid-fields">
                <Field id="co-name" label="Full name" error={U("name")} className="span-2">
                  <input
                    id="co-name"
                    autoComplete="name"
                    value={n.name}
                    onChange={m("name")}
                    onBlur={f("name")}
                    aria-invalid={!!U("name")}
                  />
                </Field>
                <Field
                  id="co-mobile"
                  label="Mobile number"
                  error={U("mobile")}
                  hint="For delivery updates. 10 digits."
                >
                  <div className="prefix-input">
                    <span>+91</span>
                    <input
                      id="co-mobile"
                      type="tel"
                      inputMode="numeric"
                      autoComplete="tel-national"
                      value={n.mobile}
                      onChange={m("mobile")}
                      onBlur={f("mobile")}
                      aria-invalid={!!U("mobile")}
                    />
                  </div>
                </Field>
                <Field id="co-email" label="Email" error={U("email")} hint="For order updates.">
                  <input
                    id="co-email"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    value={n.email}
                    onChange={m("email")}
                    onBlur={f("email")}
                    aria-invalid={!!U("email")}
                  />
                </Field>
              </div>
            </fieldset>
            <fieldset className="fs">
              <legend>
                <span>02</span>
                {" Delivery address"}
              </legend>
              <div className="grid-fields">
                <Field
                  id="co-line1"
                  label="House no., building, street"
                  error={U("line1")}
                  className="span-2"
                >
                  <input
                    id="co-line1"
                    autoComplete="address-line1"
                    value={n.line1}
                    onChange={m("line1")}
                    onBlur={f("line1")}
                    aria-invalid={!!U("line1")}
                  />
                </Field>
                <Field id="co-line2" label="Area, landmark (optional)" className="span-2">
                  <input id="co-line2" autoComplete="address-line2" value={n.line2} onChange={m("line2")} />
                </Field>
                <Field id="co-pin" label="PIN code" error={U("pin")}>
                  <input
                    id="co-pin"
                    inputMode="numeric"
                    autoComplete="postal-code"
                    value={n.pin}
                    onChange={m("pin")}
                    onBlur={f("pin")}
                    aria-invalid={!!U("pin")}
                  />
                </Field>
                <Field id="co-city" label="City / town" error={U("city")}>
                  <input
                    id="co-city"
                    autoComplete="address-level2"
                    value={n.city}
                    onChange={m("city")}
                    onBlur={f("city")}
                    aria-invalid={!!U("city")}
                  />
                </Field>
                <Field id="co-state" label="State / UT" error={U("state")} className="span-2">
                  <select
                    id="co-state"
                    autoComplete="address-level1"
                    value={n.state}
                    onChange={m("state")}
                    onBlur={f("state")}
                    aria-invalid={!!U("state")}
                  >
                    <option value="">Choose…</option>
                    {STATES.map((S) => (
                      <option key={S}>{S}</option>
                    ))}
                  </select>
                </Field>
              </div>
              {b && b.ok && (
                <p className="pin__ok">
                  <IconTruck size={16} />
                  {" Estimated delivery to "}
                  {b.region}
                  {": "}
                  <strong>{b.window}</strong> <span className="fineprint">(placeholder estimate)</span>
                </p>
              )}
            </fieldset>
            <fieldset className="fs">
              <legend>
                <span>03</span>
                {" Order on WhatsApp"}
              </legend>
              <p>
                There is no online payment on this site. Placing your order opens WhatsApp with your items and
                delivery details filled in — send the message, and AFTERHRS will confirm the order and share
                payment details in the chat.
              </p>
            </fieldset>
            <button type="submit" className="btn btn--wa btn--block btn--lg">
              <IconWhatsApp size={18} />
              {` Order on WhatsApp · ${formatPrice(totals.total)}`}
            </button>
            <p className="fineprint">
              <IconInfo size={13} />
              {" Your order is confirmed only after AFTERHRS replies on WhatsApp."}
            </p>
          </div>
          <aside className="summary" aria-label="Order summary">
            <h2 className="summary__title">Order summary</h2>
            <ul className="mini-lines">
              {lines.map((S) => (
                <li key={S.key}>
                  <span className="mini-lines__img">
                    <Img src={S.product.images.main} alt="" />
                    <b>{S.qty}</b>
                  </span>
                  <span className="mini-lines__txt">
                    <strong>{S.product.name}</strong>
                    <small>
                      {S.colour}
                      {" · "}
                      {S.size}
                    </small>
                  </span>
                  <span>{formatPrice(S.product.price * S.qty)}</span>
                </li>
              ))}
            </ul>
            <Link to="bag" className="textbtn">
              Edit bag
            </Link>
            <PromoCode />
            <Totals big />
            <PriceNote />
          </aside>
        </form>
      </div>
    </div>
  );
}
