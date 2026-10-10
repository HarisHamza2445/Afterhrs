"use client";

import { useState } from "react";
import { IconArrow, IconBag } from "@/components/icons";
import { Link } from "@/components/Link";
import { Modal } from "@/components/Modal";
import { Img, Price, QtyStepper, WhatsAppButton } from "@/components/ui";
import { config } from "@/lib/config";
import { navigate } from "@/lib/navigation";
import { useStore } from "@/lib/store";
import { cx, formatPrice, resolveDiscount } from "@/lib/utils";
import { waMessages } from "@/lib/whatsapp";
export function CartLine({ line, compact }) {
  let { updateLine, removeLine } = useStore();
  let i = line.product;
  let n = line.key.replace(/[^a-z0-9]/gi, "-");
  return (
    <li className={cx("cline", compact && "cline--compact")}>
      <Link to={`product-${i.id}`} className="cline__img">
        <Img src={i.images.main} alt={`${i.name}, ${line.colour}`} />
      </Link>
      <div className="cline__body">
        <div className="cline__top">
          <Link to={`product-${i.id}`} className="cline__name">
            {i.name}
          </Link>
          <Price value={i.price * line.qty} />
        </div>
        <div className="cline__opts">
          <label className="mini-select">
            <span>Colour</span>
            <select
              id={`c-${n}`}
              value={line.colour}
              onChange={(o) =>
                updateLine(line.key, {
                  colour: o.target.value,
                })
              }
            >
              {i.colours.map((o) => (
                <option key={o.name}>{o.name}</option>
              ))}
            </select>
          </label>
          <label className="mini-select">
            <span>Size</span>
            <select
              id={`s-${n}`}
              value={line.size}
              onChange={(o) =>
                updateLine(line.key, {
                  size: o.target.value,
                })
              }
            >
              {i.sizes.map((o) => (
                <option key={o} disabled={i.soldOut.includes(o)}>
                  {o}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="cline__bottom">
          <QtyStepper
            small
            value={line.qty}
            onChange={(o) =>
              updateLine(line.key, {
                qty: o,
              })
            }
          />
          <span className="cline__unit">
            {formatPrice(i.price)}
            {" each"}
          </span>
          <button type="button" className="textbtn" onClick={() => removeLine(line.key)}>
            Remove
          </button>
        </div>
      </div>
    </li>
  );
}

export function PromoCode() {
  let { promo, setPromo, totals } = useStore();
  let [l, i] = useState(promo);
  let [n, o] = useState("");
  let r = (s) => {
    if (s) {
      s.preventDefault();
    }
    if (!l.trim()) return o("Enter a code.");
    if (!resolveDiscount(l, totals.subtotal)) {
      o("This code isn’t valid. Check the spelling and try again.");
      return;
    }
    o("");
    setPromo(l.trim().toUpperCase());
  };
  return promo && totals.discountCode ? (
    <div className="promo promo--applied">
      <span>
        <strong>{totals.discountCode}</strong>
        {" applied · "}
        {totals.discountLabel}
      </span>
      <button
        type="button"
        className="textbtn"
        onClick={() => {
          setPromo("");
          i("");
        }}
      >
        Remove
      </button>
    </div>
  ) : (
    <div className="promo" role="group" aria-label="Discount code">
      <label htmlFor="promo-code" className="visually-hidden">
        Discount code
      </label>
      <input
        id="promo-code"
        value={l}
        onKeyDown={(s) => {
          if (s.key === "Enter") {
            r(s);
          }
        }}
        onChange={(s) => {
          i(s.target.value);
          o("");
        }}
        placeholder="Discount code"
        autoComplete="off"
        aria-invalid={!!n}
        aria-describedby={n ? "promo-err" : undefined}
      />
      <button type="button" className="btn btn--line btn--sm" onClick={r}>
        Apply
      </button>
      {n && (
        <p className="field__msg" id="promo-err" role="alert">
          {n}
        </p>
      )}
    </div>
  );
}

export function Totals({ big }) {
  let { totals } = useStore();
  let a = config.shipping;
  return (
    <dl className={cx("totals", big && "totals--big")}>
      <div>
        <dt>Subtotal</dt>
        <dd>{formatPrice(totals.subtotal)}</dd>
      </div>
      {totals.discount > 0 && (
        <div className="is-discount">
          <dt>Discount</dt>
          <dd>−{formatPrice(totals.discount)}</dd>
        </div>
      )}
      <div>
        <dt>Shipping</dt>
        <dd>{totals.shipping === 0 ? (totals.subtotal ? "Free" : "—") : formatPrice(totals.shipping)}</dd>
      </div>
      <div className="totals__grand">
        <dt>Total</dt>
        <dd>{formatPrice(totals.total)}</dd>
      </div>
      <p className="fineprint">
        {"Flat shipping of "}
        {formatPrice(a.flatRate)}
        {" per order (placeholder rate). Prices include applicable taxes once confirmed."}
      </p>
    </dl>
  );
}

export function CartDrawer() {
  let { drawer, setDrawer, lines, totals } = useStore();
  let i = () => setDrawer(false);
  return (
    <Modal open={drawer} onClose={i} title={`Your bag (${totals.count})`} side="right" className="drawer">
      {lines.length === 0 ? (
        <div className="empty">
          <IconBag size={36} />
          <p className="empty__title">Your bag is empty.</p>
          <p>The first drop is three prints deep. Start with the one that looks back at you.</p>
          <button
            type="button"
            className="btn btn--solid"
            onClick={() => {
              i();
              navigate("shop");
            }}
          >
            {"Shop the collection "}
            <IconArrow size={16} />
          </button>
        </div>
      ) : (
        <>
          <ul className="drawer__lines">
            {lines.map((n) => (
              <CartLine key={n.key} line={n} compact />
            ))}
          </ul>
          <div className="drawer__foot">
            <Totals />
            <button
              type="button"
              className="btn btn--solid btn--block"
              onClick={() => {
                i();
                navigate("checkout");
              }}
            >
              {"Checkout · "}
              {formatPrice(totals.total)}
            </button>
            <div className="drawer__row">
              <button
                type="button"
                className="btn btn--line"
                onClick={() => {
                  i();
                  navigate("bag");
                }}
              >
                View bag
              </button>
              <WhatsAppButton
                className="btn btn--line"
                title="Order help on WhatsApp"
                text={waMessages.orderCart(lines, totals)}
              >
                Order help
              </WhatsAppButton>
            </div>
          </div>
        </>
      )}
    </Modal>
  );
}
