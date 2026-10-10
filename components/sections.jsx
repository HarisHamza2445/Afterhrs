"use client";

import { Star } from "@/components/Brand";
import { IconPencil, IconRuler, IconTruck, IconWhatsApp } from "@/components/icons";
import { Link } from "@/components/Link";
import { Eyebrow, useReveal } from "@/components/ui";
import { config } from "@/lib/config";
import { cx } from "@/lib/utils";
const FOUNDERS = [
  {
    key: "priyanka",
    name: "Priyanka",
    role: "Founder",
    initial: "P",
    bio: "AFTERHRS started with a question Priyanka kept coming back to: why does so much of what we wear say so little? In July 2026 she brought the three of us together around one idea. Build a label with a point of view, and take the time to get it right.",
    placeholder:
      "Her role in shaping the brand’s vision and overall direction will be described here once finalised.",
  },
  {
    key: "veer",
    name: "Veer",
    role: "Co-founder & Lead Designer",
    initial: "V",
    bio: "Every graphic in the first drop began on Veer’s page. He leads the creative direction of AFTERHRS: the visual identity, the artwork on each piece and the design language that ties them together. His work borrows the patience of old engravings and woodcuts, then gives it a stranger subject. A black cat hiding in a flower bed. A tiger drawn one line at a time.",
    placeholder: null,
  },
  {
    key: "shouray",
    name: "Shouray",
    role: "Co-founder",
    initial: "S",
    bio: "Shouray is one of the three people building AFTERHRS from the ground up, from the first conversations in July 2026 to the drop you are looking at now.",
    placeholder:
      "His specific responsibilities are being finalised. This space will tell his part of the story.",
  },
];

function FounderPlate({ f, i, size = "md" }) {
  return (
    <figure
      className={cx("plate", `plate--${size}`, `plate--${f.key}`)}
      aria-label={`Portrait placeholder for ${f.name}`}
    >
      <span className="plate__initial" aria-hidden="true">
        {f.initial}
      </span>
      <Star className="plate__star" size={18} />
      <figcaption className="plate__cap">
        <span>Portrait to come</span>
        <span>
          {String(i + 1).padStart(2, "0")}
          {" / 03"}
        </span>
      </figcaption>
    </figure>
  );
}

export function Founders({ detailed }) {
  let t = useReveal();
  return (
    <div className={cx("founders", detailed && "founders--detailed")} ref={t}>
      {FOUNDERS.map((a, l) => (
        <article
          key={a.key}
          className="founder"
          data-reveal
          style={{
            "--d": `${l * 90}ms`,
          }}
        >
          <FounderPlate f={a} i={l} size={detailed ? "lg" : "md"} />
          <div className="founder__body">
            <p className="founder__role">{a.role}</p>
            <h3 className="founder__name">{a.name}</h3>
            <p>{a.bio}</p>
            {a.placeholder && (
              <p className="founder__placeholder">
                <span className="tag-placeholder">Placeholder</span> {a.placeholder}
              </p>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}

const TIMELINE = [
  {
    when: "July 2026",
    title: "The idea",
    status: "Began",
    state: "done",
    text: "Three founders, one shared frustration with clothes that all look the same. AFTERHRS gets its name and its first rough sketches.",
  },
  {
    when: "Now",
    title: "The creative direction",
    status: "In progress",
    state: "now",
    text: "Developing the visual identity and the first clothing concepts: the floral cat, the eyes, the tiger and the signature mark.",
  },
  {
    when: "Next",
    title: "The first drop",
    status: "Planned",
    state: "next",
    text: "Preparing the initial collection for customers. Release details will be announced first to the mailing list and on WhatsApp.",
  },
];

export function Timeline({ light }) {
  let t = useReveal();
  return (
    <ol className={cx("timeline", light && "timeline--light")} ref={t}>
      {TIMELINE.map((a, l) => (
        <li
          key={a.title}
          className={cx("tl", `tl--${a.state}`)}
          data-reveal
          style={{
            "--d": `${l * 120}ms`,
          }}
        >
          <div className="tl__mark" aria-hidden="true">
            {a.state === "done" ? <Star size={14} /> : <span className="tl__ring" />}
          </div>
          <p className="tl__when">{a.when}</p>
          <h3 className="tl__title">{a.title}</h3>
          <p className="tl__status">{a.status}</p>
          <p className="tl__text">{a.text}</p>
        </li>
      ))}
    </ol>
  );
}

export function DetailsStrip() {
  return (
    <section className="details" aria-label="What AFTERHRS commits to">
      {[
        {
          icon: <IconPencil />,
          title: "Original artwork",
          text: "Every graphic is drawn in-house by our lead designer. No stock art.",
        },
        {
          icon: <IconRuler />,
          title: "Sizing, explained",
          text: "A size guide on every product, and a person on WhatsApp if you’re between sizes.",
        },
        {
          icon: <IconTruck />,
          title: "Shipping, stated up front",
          text: "Charges and delivery estimates shown before you pay. Check your PIN on any product.",
        },
        {
          icon: <IconWhatsApp />,
          title: "Real support on WhatsApp",
          text: "Questions about a print, a size or an order go to the people who made it.",
        },
      ].map((t) => (
        <div key={t.title} className="details__item">
          <span className="details__icon">{t.icon}</span>
          <h3>{t.title}</h3>
          <p>{t.text}</p>
        </div>
      ))}
    </section>
  );
}

export function PageHero({ eyebrow, title, children, tone = "dark", aside }) {
  return (
    <header className={cx("phero", `phero--${tone}`)}>
      <div className="phero__inner">
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <h1 className="phero__title">{title}</h1>
        {children && <div className="phero__lead">{children}</div>}
      </div>
      {aside}
    </header>
  );
}

export function Breadcrumbs({ items }) {
  return (
    <nav className="crumbs" aria-label="Breadcrumb">
      {items.map((t, a) => (
        <span key={a}>
          {t.to ? <Link to={t.to}>{t.label}</Link> : <span aria-current="page">{t.label}</span>}
          {a < items.length - 1 && (
            <span className="crumbs__sep" aria-hidden="true">
              /
            </span>
          )}
        </span>
      ))}
    </nav>
  );
}

const FOUNDED = config.brand.founded;
