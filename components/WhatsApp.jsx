"use client";

import { useState } from "react";
import { IconArrow, IconCheck, IconClose, IconCopy, IconWhatsApp } from "@/components/icons";
import { Modal } from "@/components/Modal";
import { useWhatsAppSheet } from "@/components/ui";
import { useCatalog } from "@/lib/catalog-context";
import { config } from "@/lib/config";
import { useStore } from "@/lib/store";
import { cx } from "@/lib/utils";
import { waMessages, whatsappReady, whatsappUrl } from "@/lib/whatsapp";
export function WhatsAppSheet() {
  let { wa, setWa } = useStore();
  let [a, l] = useState(false);
  let i = () => {
    setWa(null);
    l(false);
  };
  if (!wa) return null;
  let n = whatsappReady();
  let o = async () => {
    try {
      await navigator.clipboard.writeText(wa.text);
      l(true);
    } catch {
      let r = document.getElementById("wa-text");
      if (r) {
        r.focus();
        r.select();
      }
    }
  };
  return (
    <Modal open onClose={i} title={wa.title} side="center" className="wa-sheet">
      <p className="wa-sheet__lead">
        {n
          ? "Your message is ready. WhatsApp opens in a new tab so you can review it before sending."
          : "The AFTERHRS WhatsApp number hasn’t been added yet, so this preview can’t open a chat. Here is the exact message customers will send:"}
      </p>
      <textarea
        id="wa-text"
        className="wa-sheet__msg"
        readOnly
        value={wa.text}
        rows={Math.min(
          12,
          wa.text.split(`
`).length + 2,
        )}
      />
      <p className="fineprint">
        A WhatsApp message is an enquiry. An order is confirmed only after AFTERHRS replies with payment and
        dispatch details.
      </p>
      <div className="wa-sheet__actions">
        <button type="button" className="btn btn--line" onClick={o}>
          {a ? <IconCheck size={16} /> : <IconCopy size={16} />} {a ? "Copied" : "Copy message"}
        </button>
        {n ? (
          <a className="btn btn--wa" href={whatsappUrl(wa.text)} target="_blank" rel="noopener noreferrer">
            <IconWhatsApp size={18} />
            {" Open WhatsApp"}
          </a>
        ) : (
          <span className="wa-sheet__pending">
            <IconWhatsApp size={16} />
            {" Number pending · set in config"}
          </span>
        )}
      </div>
    </Modal>
  );
}

export function WhatsAppFab({ route }) {
  const { getProduct } = useCatalog();
  let [t, a] = useState(false);
  let l = useWhatsAppSheet();
  let { lines, totals } = useStore();
  let o = route.page === "product" ? getProduct(route.param) : null;
  let r = [
    {
      label: "Contact us",
      text: waMessages.general(),
    },
    o && {
      label: `Ask about the ${o.name}`,
      text: waMessages.product(o),
    },
    {
      label: "Help with sizing",
      text: waMessages.sizing(o),
    },
    {
      label: "Check delivery to my PIN",
      text: waMessages.delivery(),
    },
    lines.length
      ? {
          label: "Get help with my bag",
          text: waMessages.orderCart(lines, totals),
        }
      : {
          label: "Help with an order",
          text: waMessages.orderHelp(),
        },
  ].filter(Boolean);
  let s = (d) => {
    a(false);
    if (whatsappReady()) {
      window.open(whatsappUrl(d.text), "_blank", "noopener");
    } else {
      l(d.text, d.label);
    }
  };
  return (
    <div className={cx("wafab", t && "is-open")}>
      {t && (
        <div className="wafab__menu" role="menu" aria-label="WhatsApp support">
          <p className="wafab__head">
            <span>AFTERHRS on WhatsApp</span>
            <small>{config.contact.supportHours}</small>
          </p>
          {r.map((d) =>
            whatsappReady() ? (
              <a
                key={d.label}
                role="menuitem"
                href={whatsappUrl(d.text)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => a(false)}
              >
                {d.label} <IconArrow size={14} />
              </a>
            ) : (
              <button key={d.label} role="menuitem" type="button" onClick={() => s(d)}>
                {d.label} <IconArrow size={14} />
              </button>
            ),
          )}
        </div>
      )}
      <button
        type="button"
        className="wafab__btn"
        aria-expanded={t}
        aria-label={t ? "Close WhatsApp support" : "WhatsApp support"}
        onClick={() => a((d) => !d)}
      >
        {t ? <IconClose size={20} /> : <IconWhatsApp size={24} />}
      </button>
    </div>
  );
}
