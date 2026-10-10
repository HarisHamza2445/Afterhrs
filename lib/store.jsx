"use client";

import { useLayoutEffect, createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useCatalog } from "@/lib/catalog-context";
import { resolveDiscount, shippingFor, storage } from "@/lib/utils";
const StoreContext = createContext(null);

export const useStore = () => useContext(StoreContext);

let toastId = 0;

const useIsomorphicLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

export function StoreProvider({ children }) {
  const { getProduct } = useCatalog();
  let [t, a] = useState([]);
  let [l, i] = useState([]);
  let [n, o] = useState([]);
  let [r, s] = useState([]);
  let [d, g] = useState("");
  let [v, p] = useState(false);
  let [y, N] = useState(false);
  let [M, U] = useState([]);
  let [m, f] = useState(null);
  let [b, x] = useState(0);
  // The server renders with an empty store; saved state is read from
  // localStorage before the first paint, and only persisted once loaded.
  let [ready, setReady] = useState(false);
  useIsomorphicLayoutEffect(() => {
    a(storage.get("cart", []));
    i(storage.get("wishlist", []));
    o(storage.get("recent", []));
    s(storage.get("orders", []));
    g(storage.get("promo", ""));
    setReady(true);
  }, []);
  useEffect(() => {
    if (ready) storage.set("cart", t);
  }, [ready, t]);
  useEffect(() => {
    if (ready) storage.set("wishlist", l);
  }, [ready, l]);
  useEffect(() => {
    if (ready) storage.set("recent", n);
  }, [ready, n]);
  useEffect(() => {
    if (ready) storage.set("orders", r);
  }, [ready, r]);
  useEffect(() => {
    if (ready) storage.set("promo", d);
  }, [ready, d]);
  let T = useCallback((ee, H = "info") => {
    let se = ++toastId;
    U((Ie) => [
      ...Ie,
      {
        id: se,
        msg: ee,
        kind: H,
      },
    ]);
    setTimeout(() => U((Ie) => Ie.filter((He) => He.id !== se)), 3200);
  }, []);
  let Z = useCallback(({ id, colour, size, qty = 1 }, { open = true } = {}) => {
    let Ht = `${id}|${colour}|${size}`;
    a((kl) =>
      kl.find((Tl) => Tl.key === Ht)
        ? kl.map((Tl) =>
            Tl.key === Ht
              ? {
                  ...Tl,
                  qty: Math.min(10, Tl.qty + qty),
                }
              : Tl,
          )
        : [
            ...kl,
            {
              key: Ht,
              id: id,
              colour: colour,
              size: size,
              qty: qty,
            },
          ],
    );
    x((kl) => kl + 1);
    if (open) {
      p(true);
    }
  }, []);
  let S = useCallback((ee, H) => {
    a((se) => {
      let Ie = se.find((Pe) => Pe.key === ee);
      if (!Ie) return se;
      let He = {
        ...Ie,
        ...H,
      };
      He.qty = Math.max(1, Math.min(10, He.qty));
      He.key = `${He.id}|${He.colour}|${He.size}`;
      let Ht = se.filter((Pe) => Pe.key !== ee);
      return Ht.find((Pe) => Pe.key === He.key)
        ? Ht.map((Pe) =>
            Pe.key === He.key
              ? {
                  ...Pe,
                  qty: Math.min(10, Pe.qty + He.qty),
                }
              : Pe,
          )
        : se.map((Pe) => (Pe.key === ee ? He : Pe));
    });
  }, []);
  let D = useCallback((ee) => a((H) => H.filter((se) => se.key !== ee)), []);
  let B = useCallback(() => a([]), []);
  let L = useCallback(
    (ee) => {
      i((H) => {
        let se = H.includes(ee);
        T(se ? "Removed from wishlist" : "Saved to wishlist");
        return se ? H.filter((Ie) => Ie !== ee) : [...H, ee];
      });
    },
    [T],
  );
  let pe = useCallback((ee) => o((H) => [ee, ...H.filter((se) => se !== ee)].slice(0, 6)), []);
  let la = useMemo(
    () =>
      t
        .map((ee) => ({
          ...ee,
          product: getProduct(ee.id),
        }))
        .filter((ee) => ee.product),
    [t, getProduct],
  );
  let Tr = useMemo(() => {
    let ee = la.reduce((He, Ht) => He + Ht.product.price * Ht.qty, 0);
    let H = resolveDiscount(d, ee);
    let se = H ? H.amount : 0;
    let Ie = shippingFor(ee - se);
    return {
      count: la.reduce((He, Ht) => He + Ht.qty, 0),
      subtotal: ee,
      discount: se,
      discountCode: H ? H.code : "",
      discountLabel: H ? H.label : "",
      shipping: Ie,
      total: Math.max(0, ee - se + Ie),
    };
  }, [la, d]);
  let Ar = useCallback((ee) => s((H) => [ee, ...H].slice(0, 20)), []);
  let Er = {
    ready,
    cart: t,
    lines: la,
    totals: Tr,
    addToCart: Z,
    updateLine: S,
    removeLine: D,
    clearCart: B,
    wishlist: l,
    toggleWish: L,
    recent: n,
    viewed: pe,
    orders: r,
    saveOrder: Ar,
    promo: d,
    setPromo: g,
    drawer: v,
    setDrawer: p,
    search: y,
    setSearch: N,
    toasts: M,
    toast: T,
    wa: m,
    setWa: f,
    bump: b,
  };
  return <StoreContext.Provider value={Er}>{children}</StoreContext.Provider>;
}

// Renders children only once saved state has loaded, for pages whose whole
// content depends on it (bag, checkout, wishlist, order confirmation).
export function StoreReady({ children }) {
  return useStore().ready ? children : null;
}
