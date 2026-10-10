"use client";

import { Link } from "@/components/Link";
import { DraftBanner } from "@/components/ui";
import { config } from "@/lib/config";
import { formatPrice } from "@/lib/utils";
function PolicyLayout({ eyebrow, title, updated = "Draft · not yet in effect", sections }) {
  return (
    <div className="page page--light">
      <div className="container policy">
        <aside className="policy__nav" aria-label="Policies">
          <p className="eyebrow">Policies</p>
          <Link to="shipping">{"Shipping & delivery"}</Link>
          <Link to="returns">{"Returns & exchanges"}</Link>
          <Link to="privacy">Privacy policy</Link>
          <Link to="terms">{"Terms & conditions"}</Link>
        </aside>
        <article className="policy__body">
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="display display--sm">{title}</h1>
          <p className="muted">{updated}</p>
          <DraftBanner />
          {sections.map(([i, n]) => (
            <section key={i}>
              <h2>{i}</h2>
              {typeof n == "string" ? <p>{n}</p> : n}
            </section>
          ))}
        </article>
      </div>
    </div>
  );
}

export function ShippingPage() {
  let e = config.shipping;
  return (
    <PolicyLayout
      eyebrow="Shipping & delivery"
      title="Shipping and delivery"
      sections={[
        [
          "Where we deliver",
          "We plan to deliver across India. Some PIN codes, including Army Postal Service addresses, may not be serviceable at launch. Check your PIN on any product page.",
        ],
        [
          "Dispatch time",
          `Orders are dispatched within ${e.dispatchDays[0]}\u2013${e.dispatchDays[1]} business days of order confirmation (excluding Sundays and public holidays).`,
        ],
        [
          "Delivery estimates",
          <div className="table-wrap">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Region</th>
                  <th scope="col">PIN starts with</th>
                  <th scope="col">Transit after dispatch</th>
                </tr>
              </thead>
              <tbody>
                {e.regions.map((t) => (
                  <tr key={t.name}>
                    <td>{t.name}</td>
                    <td>{t.prefixes.join(", ")}</td>
                    <td>
                      {t.days[0]}–{t.days[1]}
                      {" business days"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>,
        ],
        [
          "Shipping charges",
          `A flat ${formatPrice(e.flatRate)} per order.${e.freeShippingThreshold ? ` Free on orders above ${formatPrice(e.freeShippingThreshold)}.` : ""}`,
        ],
        [
          "Tracking",
          "Once your order ships, the courier tracking link appears on your order page and is shared on WhatsApp or email.",
        ],
        [
          "Delays",
          "Courier delays, weather and public holidays can affect delivery. Estimates are not guarantees. Contact us on WhatsApp if your order is late.",
        ],
      ]}
    />
  );
}

export function ReturnsPage() {
  let e = config.returns;
  return (
    <PolicyLayout
      eyebrow="Returns & exchanges"
      title="Returns and exchanges"
      sections={[
        [
          "Size exchanges",
          e.exchangesOffered
            ? `Request a size exchange within ${e.windowDays} days of delivery. Items must be unworn, unwashed and have original tags attached.`
            : "Exchange terms to be confirmed.",
        ],
        [
          "Refunds",
          e.refundsOffered
            ? "Refunds are issued to the original payment method once the returned item passes inspection."
            : "Whether refunds are offered, and on what terms, is still to be confirmed.",
        ],
        [
          "How to request",
          "Message us on WhatsApp with your order ID and the size you need. We’ll confirm next steps and any pickup or shipping details.",
        ],
        [
          "Damaged or incorrect items",
          "If something arrives damaged or isn’t what you ordered, tell us within 48 hours of delivery with photos and we’ll make it right.",
        ],
        ["Non-returnable items", "Items marked final sale, worn or washed items, and items without tags."],
      ]}
    />
  );
}

export function PrivacyPage() {
  return (
    <PolicyLayout
      eyebrow="Privacy"
      title="Privacy policy"
      sections={[
        [
          "What we collect",
          "When you order: your name, mobile number, email and delivery address. When you join the mailing list: your email. When you browse: basic technical data such as browser type.",
        ],
        [
          "How we use it",
          "To process and deliver orders, contact you about them, answer support requests and, if you opt in, tell you about new drops.",
        ],
        [
          "Payments",
          "This site does not take payments. Payment is arranged directly with AFTERHRS on WhatsApp after your order is confirmed.",
        ],
        [
          "Sharing",
          "We share delivery details with courier partners only as needed to fulfil your order. We do not sell personal data.",
        ],
        [
          "This browser",
          "This preview stores your bag, wishlist, recently viewed items and demo orders in your browser’s local storage. Clearing site data removes them.",
        ],
        [
          "Your choices",
          "You can ask us to access, correct or delete your data, or unsubscribe at any time, by contacting us.",
        ],
        ["Contact", `Privacy questions: ${config.contact.email}.`],
      ]}
    />
  );
}

export function TermsPage() {
  return (
    <PolicyLayout
      eyebrow="Terms"
      title="Terms and conditions"
      sections={[
        [
          "About these terms",
          "These terms apply when you browse or buy from AFTERHRS. By placing an order you agree to them.",
        ],
        [
          "Products and pricing",
          "Prices are in Indian Rupees. We try to show colours and prints accurately, but screens vary. Concept items are previews and not available to buy.",
        ],
        [
          "Orders",
          "An order is confirmed only when you receive an order confirmation from AFTERHRS with an order ID. Messages sent on WhatsApp are enquiries until we confirm.",
        ],
        [
          "Payment",
          "Orders are placed on WhatsApp. Payment details are shared by AFTERHRS in the chat once your order is confirmed.",
        ],
        [
          "Artwork",
          "All graphics, the AFTERHRS name and marks are owned by AFTERHRS. Please don’t reproduce them without permission.",
        ],
        [
          "Liability",
          "To the extent permitted by law, our liability for any order is limited to the amount paid for it.",
        ],
        ["Governing law", "These terms are governed by the laws of India. Jurisdiction to be confirmed."],
      ]}
    />
  );
}
