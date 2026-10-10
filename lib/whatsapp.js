import { config, whatsappPending } from "@/lib/config";
import { formatPrice } from "@/lib/utils";
const whatsappDigits = () => config.contact.whatsappNumber.replace(/[^\d]/g, "");

export const whatsappReady = () => !whatsappPending();

export const whatsappUrl = (e) => `https://wa.me/${whatsappDigits()}?text=${encodeURIComponent(e)}`;

export const waMessages = {
  general: () => "Hi AFTERHRS, I have a question.",
  product: (e) => `Hi AFTERHRS, I have a question about the ${e.name} (${e.colours[0].name}).`,
  sizing: (e) =>
    e
      ? `Hi AFTERHRS, could you help me choose a size for the ${e.name}? My usual size is: `
      : "Hi AFTERHRS, could you help me with sizing? My usual size is: ",
  delivery: (e) => `Hi AFTERHRS, could you check delivery details for PIN code ${e || "______"}?`,
  orderItem: ({ product, colour, size, qty }) =>
    `Hi AFTERHRS, I would like to order the ${product.name} in ${colour}, size ${size}, quantity ${qty} (${formatPrice(product.price * qty)}). Please help me complete my order.`,
  orderCart: (e, t) => `Hi AFTERHRS, I would like help completing this order:

${e.map(
  (l, i) =>
    `${i + 1}. ${l.product.name} \u2014 ${l.colour}, size ${l.size}, qty ${l.qty} \u2014 ${formatPrice(l.product.price * l.qty)}`,
).join(`
`)}

Subtotal: ${formatPrice(t.subtotal)}${
    t.discount
      ? `
Discount (${t.discountCode}): \u2212${formatPrice(t.discount)}`
      : ""
  }
Shipping: ${formatPrice(t.shipping)}
Total: ${formatPrice(t.total)}

This is an enquiry, not a confirmed order.`,
  orderPlaced: (o) =>
    [
      `Hi AFTERHRS, I would like to place this order (${o.id}):`,
      "",
      ...o.items.map(
        (i, n) =>
          `${n + 1}. ${i.name} — ${i.colour}, size ${i.size}, qty ${i.qty} — ${formatPrice(i.price * i.qty)}`,
      ),
      "",
      `Subtotal: ${formatPrice(o.totals.subtotal)}`,
      o.totals.discount ? `Discount (${o.totals.discountCode}): −${formatPrice(o.totals.discount)}` : null,
      `Shipping: ${formatPrice(o.totals.shipping)}`,
      `Total: ${formatPrice(o.totals.total)}`,
      "",
      "Deliver to:",
      o.customer.name,
      [o.address.line1, o.address.line2].filter(Boolean).join(", "),
      `${o.address.city}, ${o.address.state} ${o.address.pin}`,
      `Mobile: +91 ${o.customer.mobile}`,
      `Email: ${o.customer.email}`,
      "",
      "Please confirm my order and share payment details.",
    ]
      .filter((line) => line !== null)
      .join("\n"),
  orderHelp: (e) => `Hi AFTERHRS, I need help with my order ${e || "(order ID)"}.`,
};
