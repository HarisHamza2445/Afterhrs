"use client";

import { useEffect, useRef, useState } from "react";
import { Newsletter } from "@/components/Footer";
import {
  IconArrow,
  IconCheck,
  IconClose,
  IconHeart,
  IconInfo,
  IconRuler,
  IconTruck,
  IconZoom,
} from "@/components/icons";
import { Link } from "@/components/Link";
import { Modal } from "@/components/Modal";
import { ProductCard, availabilityLabel } from "@/components/ProductCard";
import { Breadcrumbs, PageHero } from "@/components/sections";
import { Img, Price, PriceNote, QtyStepper, WhatsAppButton } from "@/components/ui";
import { isAvailable } from "@/lib/catalog";
import { useCatalog } from "@/lib/catalog-context";
import { config } from "@/lib/config";
import { navigate } from "@/lib/navigation";
import { useStore } from "@/lib/store";
import { checkPin, cx, formatPrice } from "@/lib/utils";
import { waMessages } from "@/lib/whatsapp";
const TBC = <span className="tbc">To be confirmed</span>;

export function ProductPage({ id }) {
  const { PRODUCTS, getProduct } = useCatalog();
  let t = getProduct(id);
  let a = useStore();
  let { addToCart, wishlist, toggleWish, viewed, recent } = a;
  let [s, d] = useState(0);
  let [g, v] = useState(t ? t.colours[0].name : "");
  let [p, y] = useState("");
  let [N, M] = useState(1);
  let [U, m] = useState(false);
  let [f, b] = useState(false);
  let [x, T] = useState(false);
  let [Z, S] = useState(false);
  let D = useRef(null);
  useEffect(() => {
    if (t) {
      viewed(t.id);
      d(0);
      y("");
      M(1);
      v(t.colours[0].name);
      m(false);
      document.title = `${t.fullName} \u2014 ${t.colours[0].name} | AFTERHRS`;
    }
  }, [id]);
  if (!t)
    return (
      <div className="page page--dark">
        <PageHero eyebrow="Product" title="This piece doesn’t exist, or not yet.">
          <p>
            <Link to="shop" className="link-arrow">
              {"Shop all pieces "}
              <IconArrow size={14} />
            </Link>
          </p>
        </PageHero>
      </div>
    );
  let B = isAvailable(t);
  let L = wishlist.includes(t.id);
  let pe = t.gallery;
  let la = () =>
    p
      ? true
      : (m(true),
        D.current &&
          D.current.scrollIntoView({
            behavior: "smooth",
            block: "center",
          }),
        false);
  let Tr = () => {
    if (la()) {
      addToCart({
        id: t.id,
        colour: g,
        size: p,
        qty: N,
      });
      S(true);
      setTimeout(() => S(false), 1800);
    }
  };
  let Ar = () => {
    if (la()) {
      addToCart(
        {
          id: t.id,
          colour: g,
          size: p,
          qty: N,
        },
        {
          open: false,
        },
      );
      navigate("checkout");
    }
  };
  let Er = PRODUCTS.filter((H) => H.id !== t.id).slice(0, 3);
  let ee = recent
    .filter((H) => H !== t.id)
    .map(getProduct)
    .filter(Boolean)
    .slice(0, 4);
  return (
    <div className={cx("page pdp", `pdp--${t.tone}`)}>
      <div className="pdp__top">
        <section className="gallery" aria-label={`${t.name} images`}>
          <div className="gallery__thumbs" role="tablist" aria-label="Choose image">
            {pe.map((H, se) => (
              <button
                key={H.src}
                type="button"
                role="tab"
                aria-selected={s === se}
                aria-label={H.label}
                className={cx("gallery__thumb", s === se && "is-on", H.stage && "is-stage")}
                onClick={() => d(se)}
              >
                <Img src={H.src} alt="" />
              </button>
            ))}
          </div>
          <div className={cx("gallery__main", pe[s].stage && "is-stage", pe[s].wide && "is-wide")}>
            <button
              type="button"
              className="gallery__zoombtn"
              onClick={() => T(true)}
              aria-label="View full screen"
            >
              <Img
                key={pe[s].src}
                src={pe[s].src}
                alt={`${t.fullName}, ${pe[s].label}`}
                eager
                className="gallery__img"
              />
            </button>
            <span className="gallery__label">
              {pe[s].label}
              {" · "}
              {s + 1}/{pe.length}
            </span>
            <span className="gallery__zoomhint" aria-hidden="true">
              <IconZoom size={16} />
              {" Zoom"}
            </span>
            <div className="gallery__nav">
              <button
                type="button"
                aria-label="Previous image"
                onClick={() => d((s - 1 + pe.length) % pe.length)}
              >
                <IconArrow
                  size={18}
                  style={{
                    transform: "scaleX(-1)",
                  }}
                />
              </button>
              <button type="button" aria-label="Next image" onClick={() => d((s + 1) % pe.length)}>
                <IconArrow size={18} />
              </button>
            </div>
          </div>
          <p className="gallery__note">
            <IconInfo size={14} />
            {" Back views shown. Front views will be added with final product photography."}
          </p>
        </section>
        <section className="buybox" aria-labelledby="pdp-title">
          <Breadcrumbs
            items={[
              {
                to: "shop",
                label: "Shop",
              },
              {
                to: "collection-graphic-tees",
                label: "Graphic Tees",
              },
              {
                label: t.name,
              },
            ]}
          />
          {!B && <p className="concept-flag">Concept piece · not yet available to buy</p>}
          <h1 id="pdp-title" className="buybox__title">
            {t.name}
          </h1>
          <p className="buybox__short">{t.short}</p>
          <div className="buybox__price">
            <Price value={t.price} />
            <span className={cx("avail", B ? "avail--ok" : "avail--concept")}>{availabilityLabel(t)}</span>
          </div>
          <div className="opt">
            <p className="opt__label">
              {"Colour "}
              <strong>{g}</strong>
            </p>
            <div className="opt__row" role="radiogroup" aria-label="Colour">
              {t.colours.map((H) => (
                <button
                  key={H.name}
                  type="button"
                  role="radio"
                  aria-checked={g === H.name}
                  className={cx("colour", g === H.name && "is-on")}
                  onClick={() => v(H.name)}
                >
                  <span
                    className="swatch swatch--lg"
                    style={{
                      "--sw": H.hex,
                    }}
                  />{" "}
                  {H.name}
                </button>
              ))}
            </div>
            {t.colours.length === 1 && <p className="opt__hint">This print comes in one colour.</p>}
          </div>
          <div className={cx("opt", U && "opt--error")} ref={D}>
            <div className="opt__labelrow">
              <p className="opt__label" id="size-label">
                {"Size "}
                {p && <strong>{p}</strong>}
              </p>
              <button type="button" className="textbtn" onClick={() => b(true)}>
                <IconRuler size={16} />
                {" Size guide"}
              </button>
            </div>
            <div
              className="sizes"
              role="radiogroup"
              aria-labelledby="size-label"
              aria-describedby={U ? "size-err" : undefined}
            >
              {t.sizes.map((H) => {
                let se = t.soldOut.includes(H);
                return (
                  <button
                    key={H}
                    type="button"
                    role="radio"
                    aria-checked={p === H}
                    disabled={se || !B}
                    className={cx("size", p === H && "is-on", se && "is-out")}
                    onClick={() => {
                      y(H);
                      m(false);
                    }}
                  >
                    {H}
                  </button>
                );
              })}
            </div>
            {U && (
              <p className="field__msg" id="size-err" role="alert">
                Choose a size to continue.
              </p>
            )}
            {B && (
              <p className="opt__hint">
                Oversized fit. If you prefer a closer fit, consider one size down. Not sure? Ask us on
                WhatsApp.
              </p>
            )}
          </div>
          {B ? (
            <>
              <div className="buyrow">
                <QtyStepper value={N} onChange={M} id="pdp-qty" />
                <button
                  type="button"
                  className={cx("btn btn--solid btn--grow", Z && "is-added")}
                  onClick={Tr}
                >
                  {Z ? (
                    <>
                      <IconCheck size={16} />
                      {" Added to bag"}
                    </>
                  ) : (
                    <>
                      {"Add to bag · "}
                      {formatPrice(t.price * N)}
                    </>
                  )}
                </button>
                <button
                  type="button"
                  className={cx("icon-btn icon-btn--box", L && "is-on")}
                  aria-pressed={L}
                  aria-label={L ? "Remove from wishlist" : "Save to wishlist"}
                  onClick={() => toggleWish(t.id)}
                >
                  <IconHeart filled={L} />
                </button>
              </div>
              <button type="button" className="btn btn--line btn--block" onClick={Ar}>
                Buy now
              </button>
              <WhatsAppButton
                className="btn btn--wa-line btn--block"
                title="Order on WhatsApp"
                text={
                  p
                    ? waMessages.orderItem({
                        product: t,
                        colour: g,
                        size: p,
                        qty: N,
                      })
                    : waMessages.product(t)
                }
              >
                {p ? "Order on WhatsApp" : "Ask about this piece on WhatsApp"}
              </WhatsAppButton>
              <p className="fineprint">
                A WhatsApp message starts an enquiry. Your order is confirmed only when AFTERHRS replies with
                payment details.
              </p>
            </>
          ) : (
            <div className="concept-box">
              <p>
                This design is a concept. Price, sizes and release timing will be confirmed before it goes on
                sale.
              </p>
              <Newsletter idPrefix="concept-nl" />
              <WhatsAppButton
                className="btn btn--wa-line btn--block"
                text={waMessages.product(t)}
                title="Ask about this concept"
              >
                Ask about this concept
              </WhatsAppButton>
            </div>
          )}
          <PinChecker />
          <ProductSpecs p={t} />
          <PriceNote />
        </section>
      </div>
      <section className="related" aria-labelledby="related-title">
        <div className="section-head">
          <h2 id="related-title" className="display display--sm">
            From the same drop
          </h2>
          <Link to="shop" className="link-arrow">
            {"Shop all "}
            <IconArrow size={14} />
          </Link>
        </div>
        <div className="grid-products grid-products--3">
          {Er.map((H) => (
            <ProductCard key={H.id} product={H} />
          ))}
        </div>
      </section>
      {ee.length > 0 && (
        <section className="related related--recent" aria-labelledby="recent-title">
          <h2 id="recent-title" className="display display--sm">
            Recently viewed
          </h2>
          <ul className="recent">
            {ee.map((H) => (
              <li key={H.id}>
                <Link to={`product-${H.id}`}>
                  <Img src={H.images.main} alt="" />
                  <span>{H.name}</span>
                  <Price value={H.price} />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
      <SizeGuide open={f} onClose={() => b(false)} product={t} />
      <Lightbox open={x} onClose={() => T(false)} images={pe} index={s} setIndex={d} name={t.fullName} />
    </div>
  );
}

export function PinChecker({ compact }) {
  let [t, a] = useState(() => {
    try {
      return localStorage.getItem("afterhrs:pin") || "";
    } catch {
      return "";
    }
  });
  let [l, i] = useState(null);
  let n = (r) => {
    r.preventDefault();
    let s = checkPin(t.trim());
    i(s);
    if (s.ok)
      try {
        localStorage.setItem("afterhrs:pin", t.trim());
      } catch {}
  };
  let o = config.shipping;
  return (
    <form className={cx("pin", compact && "pin--compact")} onSubmit={n} noValidate>
      <label htmlFor="pin-input" className="pin__label">
        <IconTruck size={18} />
        {" Check delivery"}
      </label>
      <div className="pin__row">
        <input
          id="pin-input"
          inputMode="numeric"
          maxLength={6}
          placeholder="6-digit PIN code"
          value={t}
          onChange={(r) => {
            a(r.target.value.replace(/\D/g, "").slice(0, 6));
            i(null);
          }}
          aria-invalid={l && !l.ok}
          aria-describedby="pin-result"
        />
        <button type="submit" className="btn btn--line btn--sm">
          Check
        </button>
      </div>
      <div id="pin-result" aria-live="polite">
        {l && l.ok && (
          <p className="pin__ok">
            <IconCheck size={16} />
            {" Delivers to "}
            {l.region}
            {". Estimated arrival "}
            <strong>{l.window}</strong>
            <span className="fineprint">
              {" · dispatch in "}
              {o.dispatchDays[0]}–{o.dispatchDays[1]}
              {" business days, then "}
              {l.min - o.dispatchDays[0]}–{l.max - o.dispatchDays[1]}
              {" days in transit. Placeholder estimate until shipping partners are confirmed."}
            </span>
          </p>
        )}
        {l && !l.ok && (
          <p className="field__msg" role="alert">
            {l.error}
          </p>
        )}
      </div>
    </form>
  );
}

function ProductSpecs({ p }) {
  let t = config.returns;
  let a = [
    {
      t: "Description",
      body: (
        <>
          <p>{p.description}</p>
          <p>{p.design}</p>
        </>
      ),
    },
    {
      t: "Fit & fabric",
      body: (
        <dl className="spec">
          <div>
            <dt>Fit</dt>
            <dd>{p.fit}</dd>
          </div>
          <div>
            <dt>Fabric</dt>
            <dd>{p.fabric || TBC}</dd>
          </div>
          <div>
            <dt>Weight (GSM)</dt>
            <dd>{p.gsm || TBC}</dd>
          </div>
          <div>
            <dt>Print method</dt>
            <dd>{p.printMethod || TBC}</dd>
          </div>
          <div>
            <dt>Model</dt>
            <dd>{TBC}</dd>
          </div>
        </dl>
      ),
    },
    {
      t: "Wash care",
      body: (
        <>
          <ul className="bullets">
            <li>Turn inside out before washing to protect the print.</li>
            <li>Wash cold with similar colours. Mild detergent, no bleach.</li>
            <li>Dry in shade. Do not tumble dry.</li>
            <li>Iron inside out on low heat. Never iron directly on the print.</li>
          </ul>
          <p className="fineprint">
            General care for printed tees. Follow the garment’s care label once final labels are confirmed.
          </p>
        </>
      ),
    },
    {
      t: "Shipping",
      body: (
        <p>
          {"Dispatched within "}
          {config.shipping.dispatchDays[0]}–{config.shipping.dispatchDays[1]}
          {" business days. Flat shipping of "}
          {formatPrice(config.shipping.flatRate)}
          {" per order. Use the PIN checker above for an estimate. "}
          <Link to="shipping">Shipping policy</Link>
          {". "}
          <span className="tbc">Placeholder terms</span>
        </p>
      ),
    },
    {
      t: "Returns & exchanges",
      body: (
        <p>
          {t.exchangesOffered
            ? `Size exchanges requested within ${t.windowDays} days of delivery, for unworn items with tags. `
            : ""}
          {t.refundsOffered ? "Refunds available on eligible items. " : "Refund terms to be confirmed. "}
          <Link to="returns">Returns policy</Link>
          {". "}
          <span className="tbc">Placeholder terms</span>
        </p>
      ),
    },
  ];
  let [l, i] = useState(0);
  return (
    <div className="accordion">
      {a.map((n, o) => (
        <div key={n.t} className={cx("acc", l === o && "is-open")}>
          <h3>
            <button
              type="button"
              aria-expanded={l === o}
              aria-controls={`acc-${o}`}
              id={`acc-h-${o}`}
              onClick={() => i(l === o ? -1 : o)}
            >
              {n.t}
              <span className="acc__icon" aria-hidden="true" />
            </button>
          </h3>
          <div
            className="acc__body"
            id={`acc-${o}`}
            role="region"
            aria-labelledby={`acc-h-${o}`}
            hidden={l !== o}
          >
            {n.body}
          </div>
        </div>
      ))}
    </div>
  );
}

function SizeGuide({ open, onClose, product }) {
  let l = product ? product.sizes : ["S", "M", "L", "XL", "XXL"];
  return (
    <Modal open={open} onClose={onClose} title="Size guide" side="right" className="sizeguide">
      <p>All Drop 01 tees are cut oversized, with dropped shoulders and a relaxed body.</p>
      <div className="table-wrap">
        <table className="table">
          <caption className="visually-hidden">Garment measurements in inches</caption>
          <thead>
            <tr>
              <th scope="col">Size</th>
              <th scope="col">Chest</th>
              <th scope="col">Length</th>
              <th scope="col">Shoulder</th>
              <th scope="col">Sleeve</th>
            </tr>
          </thead>
          <tbody>
            {l.map((i) => (
              <tr key={i}>
                <th scope="row">{i}</th>
                <td>—</td>
                <td>—</td>
                <td>—</td>
                <td>—</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="fineprint">
        <span className="tbc">To be confirmed</span>
        {
          " Measurements will be added from final production samples. Until then, message us your usual size and we’ll advise."
        }
      </p>
      <h3 className="sizeguide__h">How to measure</h3>
      <ol className="bullets bullets--num">
        <li>
          <strong>Chest.</strong>
          {" Lay a tee you like flat and measure straight across, armpit to armpit."}
        </li>
        <li>
          <strong>Length.</strong>
          {" From the highest point of the shoulder down to the hem."}
        </li>
        <li>
          <strong>Shoulder.</strong>
          {" Straight across the back, seam to seam."}
        </li>
      </ol>
      <WhatsAppButton
        className="btn btn--wa-line btn--block"
        text={waMessages.sizing(product)}
        title="Sizing help"
      >
        Get sizing help on WhatsApp
      </WhatsAppButton>
    </Modal>
  );
}

function Lightbox({ open, onClose, images, index, setIndex, name }) {
  let [o, r] = useState(false);
  let [s, d] = useState("50% 50%");
  useEffect(() => r(false), [index, open]);
  useEffect(() => {
    if (!open) return;
    let v = (p) => {
      if (p.key === "ArrowRight") {
        setIndex((y) => (y + 1) % images.length);
      }
      if (p.key === "ArrowLeft") {
        setIndex((y) => (y - 1 + images.length) % images.length);
      }
    };
    window.addEventListener("keydown", v);
    return () => window.removeEventListener("keydown", v);
  }, [open, images.length, setIndex]);
  let g = (v) => {
    let p = v.currentTarget.getBoundingClientRect();
    d(`${((v.clientX - p.left) / p.width) * 100}% ${((v.clientY - p.top) / p.height) * 100}%`);
  };
  return (
    <Modal open={open} onClose={onClose} title={null} side="full" className="lightbox" labelledBy="lb-title">
      <div className="lightbox__bar">
        <p id="lb-title">
          {name}
          {" · "}
          {images[index].label}{" "}
          <span>
            {index + 1}/{images.length}
          </span>
        </p>
        <button
          type="button"
          className="icon-btn"
          onClick={onClose}
          aria-label="Close full screen"
          data-autofocus
        >
          <IconClose />
        </button>
      </div>
      <div
        className={cx("lightbox__stage", o && "is-zoomed", images[index].stage && "is-stage")}
        onMouseMove={o ? g : undefined}
      >
        <button
          type="button"
          className="lightbox__imgbtn"
          onClick={(v) => {
            g(v);
            r((p) => !p);
          }}
          aria-label={o ? "Zoom out" : "Zoom in"}
        >
          <img
            src={images[index].src}
            alt={`${name}, ${images[index].label}`}
            style={{
              transformOrigin: s,
            }}
          />
        </button>
      </div>
      <div className="lightbox__nav">
        <button
          type="button"
          className="btn btn--ghost-light"
          onClick={() => setIndex((index - 1 + images.length) % images.length)}
        >
          Previous
        </button>
        <span className="fineprint">{o ? "Move to pan · click to zoom out" : "Click image to zoom"}</span>
        <button
          type="button"
          className="btn btn--ghost-light"
          onClick={() => setIndex((index + 1) % images.length)}
        >
          Next
        </button>
      </div>
    </Modal>
  );
}
