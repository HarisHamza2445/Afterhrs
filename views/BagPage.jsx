"use client";

import { useState } from "react";
import { CartLine, PromoCode, Totals } from "@/components/cart";
import { IconArrow, IconCheck } from "@/components/icons";
import { Link } from "@/components/Link";
import { PageHero } from "@/components/sections";
import { PriceNote, WhatsAppButton } from "@/components/ui";
import { navigate } from "@/lib/navigation";
import { useStore } from "@/lib/store";
import { cx } from "@/lib/utils";
import { waMessages } from "@/lib/whatsapp";
import { PinChecker } from "@/views/ProductPage";
export function BagPage() {
  let { lines, totals, clearCart } = useStore();
  let [l, i] = useState(false);
  return lines.length ? (
    <div className="page page--light">
      <div className="container checkout-wrap">
        <CheckoutSteps at={0} />
        <div className="two-col">
          <section aria-labelledby="bag-title" className="two-col__main">
            <div className="section-head section-head--tight">
              <h1 id="bag-title" className="display display--sm">
                {"Shopping bag "}
                <span className="muted">({totals.count})</span>
              </h1>
              {l ? (
                <span className="confirm-inline">
                  {"Remove everything? "}
                  <button
                    type="button"
                    className="textbtn"
                    onClick={() => {
                      clearCart();
                      i(false);
                    }}
                  >
                    Yes, clear bag
                  </button>{" "}
                  <button type="button" className="textbtn" onClick={() => i(false)}>
                    Cancel
                  </button>
                </span>
              ) : (
                <button type="button" className="textbtn" onClick={() => i(true)}>
                  Clear bag
                </button>
              )}
            </div>
            <ul className="lines">
              {lines.map((n) => (
                <CartLine key={n.key} line={n} />
              ))}
            </ul>
            <PinChecker compact />
          </section>
          <aside className="summary" aria-label="Order summary">
            <h2 className="summary__title">Summary</h2>
            <PromoCode />
            <Totals big />
            <button type="button" className="btn btn--solid btn--block" onClick={() => navigate("checkout")}>
              Continue to checkout
            </button>
            <WhatsAppButton
              className="btn btn--wa-line btn--block"
              title="Order help on WhatsApp"
              text={waMessages.orderCart(lines, totals)}
            >
              Get help with this order on WhatsApp
            </WhatsAppButton>
            <p className="fineprint">Your bag stays saved in this browser while you message us.</p>
            <PriceNote />
          </aside>
        </div>
      </div>
    </div>
  ) : (
    <div className="page page--dark">
      <PageHero eyebrow="Shopping bag" title="Your bag is empty.">
        <p>Nothing here yet. The first drop is waiting.</p>
        <Link to="shop" className="btn btn--ivory">
          {"Shop the collection "}
          <IconArrow size={16} />
        </Link>
      </PageHero>
    </div>
  );
}

export function CheckoutSteps({ at }) {
  return (
    <ol className="steps" aria-label="Checkout progress">
      {["Bag", "Details", "Confirmation"].map((a, l) => (
        <li
          key={a}
          className={cx(l < at && "is-done", l === at && "is-now")}
          aria-current={l === at ? "step" : undefined}
        >
          <span>{l < at ? <IconCheck size={12} /> : l + 1}</span> {a}
        </li>
      ))}
    </ol>
  );
}
