"use client";

import { useState } from "react";
import { Lockup } from "@/components/Brand";
import { IconCheck, IconInstagram } from "@/components/icons";
import { Link } from "@/components/Link";
import { DemoBadge } from "@/components/ui";
import { config } from "@/lib/config";
import { EMAIL_RE, cx, storage } from "@/lib/utils";
export function Newsletter({ variant = "block", idPrefix = "nl" }) {
  let [a, l] = useState("");
  let [i, n] = useState("idle");
  let [o, r] = useState("");
  let s = (g) => {
    g.preventDefault();
    if (!EMAIL_RE.test(a.trim())) {
      n("error");
      r("Enter a valid email address, like name@example.com.");
      return;
    }
    n("loading");
    setTimeout(() => {
      let v = storage.get("newsletter-demo", []);
      storage.set("newsletter-demo", [...new Set([...v, a.trim().toLowerCase()])]);
      n("done");
    }, 600);
  };
  let d = `${idPrefix}-email`;
  return i === "done" ? (
    <div className={cx("newsletter", `newsletter--${variant}`, "is-done")} role="status">
      <p className="newsletter__done">
        <IconCheck size={18} />
        {" Noted: "}
        {a.trim()}
      </p>
      <p className="fineprint">
        <DemoBadge />
        {
          " This preview has no email service connected, so your address was kept only in this browser. Nothing was sent or stored by AFTERHRS."
        }
      </p>
    </div>
  ) : (
    <form className={cx("newsletter", `newsletter--${variant}`)} onSubmit={s} noValidate>
      <label htmlFor={d} className="newsletter__label">
        Email for drop announcements
      </label>
      <div className="newsletter__row">
        <input
          id={d}
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={a}
          onChange={(g) => {
            l(g.target.value);
            if (i === "error") {
              n("idle");
              r("");
            }
          }}
          aria-invalid={i === "error"}
          aria-describedby={i === "error" ? d + "-err" : d + "-note"}
        />
        <button type="submit" className="btn btn--solid" disabled={i === "loading"}>
          {i === "loading" ? "Adding…" : "Notify me"}
        </button>
      </div>
      {i === "error" ? (
        <p className="field__msg" id={d + "-err"} role="alert">
          {o}
        </p>
      ) : (
        <p className="fineprint" id={d + "-note"}>
          <DemoBadge />
          {" Demo signup: no email service is connected yet."}
        </p>
      )}
    </form>
  );
}

export function Footer() {
  let e = config.social.instagramUrl;
  return (
    <footer className="footer">
      <div className="footer__top">
        <div className="footer__brand">
          <Lockup />
          <p>{config.brand.statement}</p>
          <p className="footer__since">
            {"Est. "}
            {config.brand.founded}
          </p>
        </div>
        <div className="footer__news">
          <h2 className="footer__h">Hear about the next drop</h2>
          <Newsletter variant="footer" idPrefix="footer-nl" />
        </div>
      </div>
      <div className="footer__cols">
        <nav aria-label="Shop">
          <h3 className="footer__h">Shop</h3>
          <Link to="shop">Shop all</Link>
          <Link to="collection-drop-01">New drop</Link>
          <Link to="collection-graphic-tees">Graphic tees</Link>
          <Link to="wishlist">Wishlist</Link>
          <Link to="bag">Bag</Link>
        </nav>
        <nav aria-label="About">
          <h3 className="footer__h">About</h3>
          <Link to="story">Our story</Link>
          <Link to="founders">Founders</Link>
          <Link to="faq">FAQ</Link>
        </nav>
        <nav aria-label="Help">
          <h3 className="footer__h">Help</h3>
          <Link to="contact">{"Contact & WhatsApp"}</Link>
          <Link to="track">Track my order</Link>
          <Link to="shipping">{"Shipping & delivery"}</Link>
          <Link to="returns">{"Returns & exchanges"}</Link>
        </nav>
        <nav aria-label="Legal">
          <h3 className="footer__h">Legal</h3>
          <Link to="privacy">Privacy policy</Link>
          <Link to="terms">{"Terms & conditions"}</Link>
          {e ? (
            <a href={e} target="_blank" rel="noopener noreferrer">
              <IconInstagram size={16} />
              {" Instagram"}
            </a>
          ) : (
            <span className="footer__muted">
              <IconInstagram size={16} />
              {" Instagram (link pending)"}
            </span>
          )}
        </nav>
      </div>
      <div className="footer__base">
        <p suppressHydrationWarning>
          {"© "}
          {new Date().getFullYear()}
          {" AFTERHRS. All rights reserved."}
        </p>
        <p className="footer__muted">All graphics are original AFTERHRS artwork.</p>
      </div>
      <div className="footer__giant" aria-hidden="true">
        AFTERHRS
      </div>
    </footer>
  );
}
