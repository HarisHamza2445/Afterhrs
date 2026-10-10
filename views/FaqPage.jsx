"use client";

import { useState } from "react";
import { Link } from "@/components/Link";
import { PageHero } from "@/components/sections";
import { config } from "@/lib/config";
import { cx, formatPrice } from "@/lib/utils";
const FAQS = [
  [
    "How do the tees fit?",
    "Drop 01 tees are cut oversized with dropped shoulders. Final garment measurements will be added to the size guide on every product page. Until then, message us your usual size on WhatsApp and we’ll advise.",
  ],
  [
    "What are the tees made of?",
    "Fabric composition and weight will be confirmed once production samples are final. We won’t list specifications until we can stand behind them.",
  ],
  [
    "How much is shipping?",
    `A flat ${formatPrice(config.shipping.flatRate)} per order (placeholder rate). Use the PIN checker on any product for an estimated delivery window.`,
  ],
  [
    "How long does delivery take?",
    `Orders are dispatched within ${config.shipping.dispatchDays[0]}\u2013${config.shipping.dispatchDays[1]} business days, then usually take a few more days in transit depending on your region. These are placeholder estimates until our courier partner is confirmed.`,
  ],
  [
    "Do you offer Cash on Delivery?",
    config.payments.codEnabled
      ? "Yes, on eligible PIN codes."
      : "Not yet. We’ll update this once COD availability is confirmed.",
  ],
  [
    "Can I exchange for a different size?",
    `Size exchanges are planned within ${config.returns.windowDays} days of delivery for unworn items with tags. The full policy is being finalised. See Returns & Exchanges.`,
  ],
  [
    "Can I order on WhatsApp?",
    "Yes — every order is placed on WhatsApp. Use “Order on WhatsApp” on any product, or check out your whole bag. Your order is confirmed once we reply with payment details.",
  ],
  [
    "How do I pay?",
    "There is no online payment on this site. Checkout sends your order to us on WhatsApp, and we share payment details in the chat once the order is confirmed.",
  ],
  [
    "Who designs the graphics?",
    "Every AFTERHRS graphic is original artwork by Veer, our co-founder and lead designer.",
  ],
  [
    "Will there be more designs?",
    "Yes. Essential Tees and Limited Drops are planned. Join the mailing list to hear first.",
  ],
];

export function FaqPage() {
  let [e, t] = useState(0);
  return (
    <div className="page page--dark">
      <PageHero
        eyebrow="FAQ"
        title={
          <>
            {"Questions, "}
            <em>answered plainly.</em>
          </>
        }
      >
        <p>
          {"Can’t find what you need? "}
          <Link to="contact">Contact us</Link>.
        </p>
      </PageHero>
      <div className="container narrow">
        <div className="accordion accordion--faq">
          {FAQS.map(([a, l], i) => (
            <div key={a} className={cx("acc", e === i && "is-open")}>
              <h2>
                <button
                  type="button"
                  aria-expanded={e === i}
                  aria-controls={`faq-${i}`}
                  id={`faq-h-${i}`}
                  onClick={() => t(e === i ? -1 : i)}
                >
                  {a}
                  <span className="acc__icon" aria-hidden="true" />
                </button>
              </h2>
              <div
                className="acc__body"
                id={`faq-${i}`}
                role="region"
                aria-labelledby={`faq-h-${i}`}
                hidden={e !== i}
              >
                <p>{l}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
