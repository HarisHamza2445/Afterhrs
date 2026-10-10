import { config } from "@/lib/config";
const inrFormat = new Intl.NumberFormat(config.pricing.locale, {
  style: "currency",
  currency: config.pricing.currency,
  maximumFractionDigits: 0,
});

export const formatPrice = (e) => inrFormat.format(Math.round(e));

export const storage = {
  get(e, t) {
    try {
      let a = window.localStorage.getItem("afterhrs:" + e);
      return a == null ? t : JSON.parse(a);
    } catch {
      return t;
    }
  },
  set(e, t) {
    try {
      window.localStorage.setItem("afterhrs:" + e, JSON.stringify(t));
    } catch {}
  },
};

const PIN_RE = /^[1-9][0-9]{5}$/;

export function checkPin(e) {
  let t = config.shipping;
  if (!PIN_RE.test(e))
    return {
      ok: false,
      error: "Enter a valid 6-digit PIN code.",
    };
  if (t.unserviceablePrefixes.includes(e[0]))
    return {
      ok: false,
      error: "We can’t deliver to this PIN code yet. Message us on WhatsApp and we’ll check.",
    };
  let a = t.regions.find((n) => n.prefixes.includes(e[0]));
  if (!a)
    return {
      ok: false,
      error: "We couldn’t match this PIN code to a delivery region.",
    };
  let l = t.dispatchDays[0] + a.days[0];
  let i = t.dispatchDays[1] + a.days[1];
  return {
    ok: true,
    region: a.name,
    min: l,
    max: i,
    window: formatWindow(l, i),
  };
}

function addWorkingDays(e, t) {
  let a = new Date(e);
  for (; t > 0;) {
    a.setDate(a.getDate() + 1);
    if (a.getDay() !== 0) {
      t--;
    }
  }
  return a;
}

function formatWindow(e, t, a = new Date()) {
  let l = (i) =>
    i.toLocaleDateString("en-IN", {
      weekday: "short",
      day: "numeric",
      month: "short",
    });
  return `${l(addWorkingDays(a, e))} \u2013 ${l(addWorkingDays(a, t))}`;
}

export function shippingFor(e) {
  let t = config.shipping;
  return e <= 0 || (t.freeShippingThreshold != null && e >= t.freeShippingThreshold) ? 0 : t.flatRate;
}

export function resolveDiscount(e, t) {
  if (!e) return null;
  let a = config.discountCodes[e.trim().toUpperCase()];
  if (!a) return null;
  let l = a.type === "percent" ? Math.round((t * a.value) / 100) : Math.min(a.value, t);
  return {
    code: e.trim().toUpperCase(),
    amount: l,
    ...a,
  };
}

export const cx = (...e) => e.filter(Boolean).join(" ");

export const STATES = [
  "Andaman and Nicobar Islands",
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chandigarh",
  "Chhattisgarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jammu and Kashmir",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Ladakh",
  "Lakshadweep",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Puducherry",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
];

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const MOBILE_RE = /^[6-9]\d{9}$/;

export const normaliseMobile = (e) => e.replace(/\D/g, "").replace(/^(91|0)(?=\d{10}$)/, "");
