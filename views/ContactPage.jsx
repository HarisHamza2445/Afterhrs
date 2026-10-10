"use client";

import { useState } from "react";
import { Star } from "@/components/Brand";
import { IconArrow, IconCheck, IconCopy, IconInstagram, IconWhatsApp } from "@/components/icons";
import { Link } from "@/components/Link";
import { PageHero } from "@/components/sections";
import { DemoBadge, Field, WhatsAppButton } from "@/components/ui";
import { config } from "@/lib/config";
import { EMAIL_RE } from "@/lib/utils";
import { waMessages } from "@/lib/whatsapp";
export function ContactPage() {
  let [e, t] = useState({
    name: "",
    email: "",
    topic: "Product question",
    msg: "",
  });
  let [a, l] = useState({});
  let [i, n] = useState(false);
  let [o, r] = useState("");
  let s = (v) => {
    v.preventDefault();
    let p = {};
    if (e.name.trim().length < 2) {
      p.name = "Enter your name.";
    }
    if (!EMAIL_RE.test(e.email.trim())) {
      p.email = "Enter a valid email address.";
    }
    if (e.msg.trim().length < 10) {
      p.msg = "Tell us a little more (at least 10 characters).";
    }
    l(p);
    if (!Object.keys(p).length) {
      n(true);
    }
  };
  let d = async (v, p) => {
    try {
      await navigator.clipboard.writeText(v);
      r(p);
      setTimeout(() => r(""), 1500);
    } catch {}
  };
  let g = `Hi AFTERHRS, my name is ${e.name || "…"}. ${e.topic}: ${e.msg || "…"}`;
  return (
    <div className="page page--dark">
      <PageHero
        eyebrow="Contact"
        title={
          <>
            {"Talk to "}
            <em>the people who made it.</em>
          </>
        }
      >
        <p>
          The fastest way to reach us is WhatsApp. We answer questions about prints, sizing, delivery and
          orders.
        </p>
      </PageHero>
      <div className="container contact">
        <div className="contact__cards">
          <div className="ccard ccard--wa">
            <IconWhatsApp size={28} />
            <h2>WhatsApp</h2>
            <p className="ccard__value">{config.contact.whatsappNumber}</p>
            <p className="muted">{config.contact.supportHours}</p>
            <WhatsAppButton className="btn btn--wa" text={waMessages.general()} title="Message AFTERHRS">
              Message us
            </WhatsAppButton>
          </div>
          <div className="ccard">
            <h2>Email</h2>
            <p className="ccard__value">{config.contact.email}</p>
            <button
              type="button"
              className="btn btn--ghost-light btn--sm"
              onClick={() => d(config.contact.email, "email")}
            >
              {o === "email" ? <IconCheck size={14} /> : <IconCopy size={14} />}{" "}
              {o === "email" ? "Copied" : "Copy address"}
            </button>
          </div>
          <div className="ccard">
            <h2>Instagram</h2>
            <p className="ccard__value">{config.social.instagramHandle}</p>
            {config.social.instagramUrl ? (
              <a
                className="btn btn--ghost-light btn--sm"
                href={config.social.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <IconInstagram size={14} />
                {" Open Instagram"}
              </a>
            ) : (
              <p className="muted">Profile link pending</p>
            )}
          </div>
          <div className="ccard">
            <h2>Order questions</h2>
            <p className="muted">Have an order ID? Check its status first.</p>
            <Link to="track" className="btn btn--ghost-light btn--sm">
              Track my order
            </Link>
          </div>
        </div>
        <div className="contact__form">
          {i ? (
            <div className="sent" role="status">
              <Star size={18} />
              <h2 className="display display--sm">
                {"Message ready, "}
                {e.name.split(" ")[0]}.
              </h2>
              <p>
                <DemoBadge />
                {
                  " This site can’t send messages yet because no email service is connected. Send it to us on WhatsApp instead and nothing gets lost."
                }
              </p>
              <WhatsAppButton className="btn btn--wa" text={g} title="Send your message">
                Send on WhatsApp
              </WhatsAppButton>
              <button type="button" className="textbtn" onClick={() => n(false)}>
                Edit message
              </button>
            </div>
          ) : (
            <form onSubmit={s} noValidate>
              <h2 className="display display--sm">Write to us</h2>
              <div className="grid-fields">
                <Field id="ct-name" label="Name" error={a.name}>
                  <input
                    id="ct-name"
                    autoComplete="name"
                    value={e.name}
                    onChange={(v) =>
                      t({
                        ...e,
                        name: v.target.value,
                      })
                    }
                    aria-invalid={!!a.name}
                  />
                </Field>
                <Field id="ct-email" label="Email" error={a.email}>
                  <input
                    id="ct-email"
                    type="email"
                    autoComplete="email"
                    value={e.email}
                    onChange={(v) =>
                      t({
                        ...e,
                        email: v.target.value,
                      })
                    }
                    aria-invalid={!!a.email}
                  />
                </Field>
                <Field id="ct-topic" label="Topic" className="span-2">
                  <select
                    id="ct-topic"
                    value={e.topic}
                    onChange={(v) =>
                      t({
                        ...e,
                        topic: v.target.value,
                      })
                    }
                  >
                    {[
                      "Product question",
                      "Sizing",
                      "Delivery",
                      "An existing order",
                      "Collaboration",
                      "Something else",
                    ].map((v) => (
                      <option key={v}>{v}</option>
                    ))}
                  </select>
                </Field>
                <Field id="ct-msg" label="Message" error={a.msg} className="span-2">
                  <textarea
                    id="ct-msg"
                    rows={5}
                    value={e.msg}
                    onChange={(v) =>
                      t({
                        ...e,
                        msg: v.target.value,
                      })
                    }
                    aria-invalid={!!a.msg}
                  />
                </Field>
              </div>
              <button type="submit" className="btn btn--ivory">
                {"Prepare message "}
                <IconArrow size={16} />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
