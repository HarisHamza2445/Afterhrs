"use client";

import { useEffect, useState } from "react";
import { Monogram, Star, Wordmark } from "@/components/Brand";
import { IconBag, IconClose, IconHeart, IconMenu, IconSearch } from "@/components/icons";
import { Link } from "@/components/Link";
import { Modal } from "@/components/Modal";
import { config } from "@/lib/config";
import { useStore } from "@/lib/store";
import { cx } from "@/lib/utils";
const NAV_LINKS = [
  {
    to: "home",
    label: "Home",
  },
  {
    to: "shop",
    label: "Shop",
  },
  {
    to: "collection-drop-01",
    label: "New Drop",
  },
  {
    to: "story",
    label: "Our Story",
  },
  {
    to: "contact",
    label: "Contact",
  },
];

export function AnnouncementBar() {
  let e = config.announcement;
  let [t, a] = useState(0);
  useEffect(() => {
    if (e.length < 2) return;
    let l = setInterval(() => a((i) => (i + 1) % e.length), 5e3);
    return () => clearInterval(l);
  }, [e.length]);
  return e.length ? (
    <div className="announce" role="region" aria-label="Announcement">
      <Star size={8} />
      <p key={t} className="announce__msg">
        {e[t]}
      </p>
      <Star size={8} />
    </div>
  ) : null;
}

export function Header({ route }) {
  let { totals, setDrawer, setSearch, wishlist, bump } = useStore();
  let [o, r] = useState(false);
  let [s, d] = useState(false);
  let g = route.page === "home";
  useEffect(() => {
    let p = () => r(window.scrollY > 40);
    p();
    window.addEventListener("scroll", p, {
      passive: true,
    });
    return () => window.removeEventListener("scroll", p);
  }, []);
  useEffect(() => d(false), [route.raw]);
  let v = (p) =>
    route.raw === p ||
    (p === "shop" &&
      (route.page === "product" || route.page === "collection") &&
      route.param !== "drop-01") ||
    (p === "story" && route.page === "founders");
  return (
    <>
      <header className={cx("header", g && !o ? "header--clear" : "header--solid")}>
        <div className="header__inner">
          <div className="header__left">
            <button
              type="button"
              className="icon-btn header__burger"
              aria-label="Open menu"
              aria-expanded={s}
              onClick={() => d(true)}
            >
              <IconMenu />
            </button>
            <nav className="header__nav" aria-label="Main">
              {NAV_LINKS.map((p) => (
                <Link
                  key={p.to}
                  to={p.to}
                  className={cx("navlink", v(p.to) && "is-active")}
                  aria-current={v(p.to) ? "page" : undefined}
                >
                  {p.label}
                </Link>
              ))}
            </nav>
          </div>
          <Link to="home" className="header__logo" aria-label="AFTERHRS home">
            <Monogram size={26} className="header__mono" />
            <Wordmark className="header__wm" />
          </Link>
          <div className="header__right">
            <button type="button" className="icon-btn" aria-label="Search" onClick={() => setSearch(true)}>
              <IconSearch />
            </button>
            <Link
              to="wishlist"
              className="icon-btn hide-xs"
              aria-label={`Wishlist, ${wishlist.length} saved`}
            >
              <IconHeart />
              {wishlist.length > 0 && <span className="dot-count">{wishlist.length}</span>}
            </Link>
            <button
              type="button"
              className="icon-btn bag-btn"
              aria-label={`Shopping bag, ${totals.count} items`}
              onClick={() => setDrawer(true)}
            >
              <IconBag />
              <span
                key={bump}
                className={cx("bag-count", totals.count > 0 && "has-items", bump > 0 && "bump")}
              >
                {totals.count}
              </span>
            </button>
          </div>
        </div>
      </header>
      <MobileMenu open={s} onClose={() => d(false)} route={route} />
    </>
  );
}

function MobileMenu({ open, onClose, route }) {
  return (
    <Modal open={open} onClose={onClose} title={null} side="full" className="mmenu" labelledBy="mmenu-label">
      <div className="mmenu__top">
        <span id="mmenu-label" className="visually-hidden">
          Menu
        </span>
        <Monogram size={28} />
        <button type="button" className="icon-btn" onClick={onClose} aria-label="Close menu" data-autofocus>
          <IconClose />
        </button>
      </div>
      <nav className="mmenu__nav" aria-label="Mobile">
        {NAV_LINKS.map((l, i) => (
          <Link
            key={l.to}
            to={l.to}
            onClick={onClose}
            className={cx("mmenu__link", route.raw === l.to && "is-active")}
            style={{
              "--i": i,
            }}
          >
            <span className="mmenu__num">{String(i + 1).padStart(2, "0")}</span>
            {l.label}
          </Link>
        ))}
      </nav>
      <div className="mmenu__foot">
        <Link to="founders" onClick={onClose}>
          Founders
        </Link>
        <Link to="track" onClick={onClose}>
          Track my order
        </Link>
        <Link to="wishlist" onClick={onClose}>
          Wishlist
        </Link>
        <Link to="faq" onClick={onClose}>
          FAQ
        </Link>
      </div>
    </Modal>
  );
}
