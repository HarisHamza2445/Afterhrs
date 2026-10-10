"use client";

import { useEffect, useRef, useState } from "react";
import { IconWhatsApp } from "@/components/icons";
import { config } from "@/lib/config";
import { useStore } from "@/lib/store";
import { cx, formatPrice } from "@/lib/utils";
import { whatsappReady, whatsappUrl } from "@/lib/whatsapp";
export function Img({ src, alt = "", className, eager, ...rest }) {
  const [loaded, setLoaded] = useState(false);
  const ref = useRef(null);
  // A server-rendered image can finish loading before hydration, in which
  // case onLoad never fires.
  useEffect(() => {
    if (ref.current?.complete) setLoaded(true);
  }, [src]);
  return (
    <img
      ref={ref}
      src={src}
      alt={alt}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      className={cx("img", loaded && "is-loaded", className)}
      onLoad={() => setLoaded(true)}
      onError={() => setLoaded(true)}
      {...rest}
    />
  );
}

export function useReveal() {
  let e = useRef(null);
  useEffect(() => {
    let t = e.current;
    if (!t || !("IntersectionObserver" in window)) return;
    let a = new IntersectionObserver(
      (l) => l.forEach((i) => i.isIntersecting && (i.target.classList.add("is-in"), a.unobserve(i.target))),
      {
        rootMargin: "0px 0px -8% 0px",
      },
    );
    t.querySelectorAll("[data-reveal]").forEach((l) => a.observe(l));
    if (t.hasAttribute("data-reveal")) {
      a.observe(t);
    }
    return () => a.disconnect();
  }, []);
  return e;
}

export function Price({ value, className }) {
  return (
    <span className={cx("price", className)}>
      {formatPrice(value)}
      {!config.pricing.pricesConfirmed && (
        <span className="price__flag" title="Placeholder price — to be confirmed">
          *
        </span>
      )}
    </span>
  );
}

export function PriceNote() {
  return config.pricing.pricesConfirmed ? null : (
    <p className="fineprint">* Prices are placeholders until confirmed by AFTERHRS.</p>
  );
}

export function DemoBadge({ children = "Demo" }) {
  return <span className="demo-badge">{children}</span>;
}

export function useWhatsAppSheet() {
  let { setWa } = useStore();
  return (t, a = "Message AFTERHRS on WhatsApp") =>
    setWa({
      text: t,
      title: a,
    });
}

export function WhatsAppButton({ text, title, children, className = "btn btn--ghost" }) {
  let i = useWhatsAppSheet();
  return whatsappReady() ? (
    <a className={className} href={whatsappUrl(text)} target="_blank" rel="noopener noreferrer">
      <IconWhatsApp size={18} /> {children}
    </a>
  ) : (
    <button type="button" className={className} onClick={() => i(text, title)}>
      <IconWhatsApp size={18} /> {children}
    </button>
  );
}

export function Eyebrow({ children, className }) {
  return <p className={cx("eyebrow", className)}>{children}</p>;
}

export function Field({ id, label, error, hint, children, className }) {
  return (
    <div className={cx("field", error && "field--error", className)}>
      <label htmlFor={id}>{label}</label>
      {children}
      {error ? (
        <p className="field__msg" id={id + "-err"} role="alert">
          {error}
        </p>
      ) : hint ? (
        <p className="field__hint">{hint}</p>
      ) : null}
    </div>
  );
}

export function QtyStepper({ value, onChange, id, small }) {
  return (
    <div className={cx("qty", small && "qty--sm")} role="group" aria-label="Quantity">
      <button
        type="button"
        onClick={() => onChange(value - 1)}
        disabled={value <= 1}
        aria-label="Decrease quantity"
      >
        −
      </button>
      <output id={id} aria-live="polite">
        {value}
      </output>
      <button
        type="button"
        onClick={() => onChange(value + 1)}
        disabled={value >= 10}
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  );
}

export function DraftBanner() {
  return (
    <div className="draft-banner" role="note">
      <strong>Draft for business review.</strong>
      {" This policy uses placeholder terms and must be reviewed and confirmed by AFTERHRS before launch."}
    </div>
  );
}
