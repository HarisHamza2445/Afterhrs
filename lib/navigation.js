// Routes are addressed by short names ("shop", "product-floral-cat-tee", ...)
// throughout the UI; these helpers map them to and from real URLs.

const DYNAMIC = /^(product|collection|order)-(.+)$/;

export function toHref(to) {
  if (to === "home") return "/";
  const m = to.match(DYNAMIC);
  return m ? `/${m[1]}/${encodeURIComponent(m[2])}` : "/" + to;
}

export function parseRoute(pathname) {
  const [page = "home", param] = decodeURIComponent(pathname).split("/").filter(Boolean);
  if (param && ["product", "collection", "order"].includes(page)) {
    return { page, param, raw: `${page}-${param}` };
  }
  return { page, param: null, raw: page };
}

let router = null;

export function setRouter(r) {
  router = r;
}

// Imperative navigation for event handlers. <Shell> registers the app router.
export function navigate(to) {
  const href = toHref(to);
  if (window.location.pathname === href) window.scrollTo(0, 0);
  else if (router) router.push(href);
  else window.location.assign(href);
}
