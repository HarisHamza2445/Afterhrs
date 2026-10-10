"use client";

import { useState } from "react";
import { Star } from "@/components/Brand";
import { Newsletter } from "@/components/Footer";
import { IconArrow, IconArrowDown, IconInstagram } from "@/components/icons";
import { Link } from "@/components/Link";
import { ProductCard } from "@/components/ProductCard";
import { DetailsStrip, Founders, Timeline } from "@/components/sections";
import { Eyebrow, Img, Price, PriceNote, useReveal } from "@/components/ui";
import { COLLECTIONS } from "@/lib/catalog";
import { useCatalog } from "@/lib/catalog-context";
import { config } from "@/lib/config";
import { cx } from "@/lib/utils";
export function HomePage() {
  return (
    <>
      <Hero />
      <Intro />
      <DropSection />
      <Campaign />
      <CollectionIndex />
      <FoundersBlock />
      <DetailsStrip />
      <SocialGrid />
      <NewsletterBlock />
    </>
  );
}

function Hero() {
  const { getProduct } = useCatalog();
  let e = getProduct("floral-cat-tee");
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero__light" aria-hidden="true" />
      <Img src="/img/tiger-ink-light.webp" alt="" className="hero__ghost" eager aria-hidden="true" />
      <div className="hero__grid">
        <div className="hero__copy">
          <p className="hero__kicker">
            <span>Drop 01</span>
            <Star size={9} />
            <span>
              {"Est. "}
              {config.brand.founded}
            </span>
          </p>
          <h1 id="hero-title" className="hero__title">
            <span className="hero__line">Made for</span>
            <span className="hero__line">the hours</span>
            <span className="hero__line hero__line--italic">that define</span>
            <span className="hero__line">you.</span>
          </h1>
          <p className="hero__sub">{config.brand.tagline}</p>
          <div className="hero__ctas">
            <Link to="shop" className="btn btn--ivory">
              {"Shop the collection "}
              <IconArrow size={16} />
            </Link>
            <Link to="story" className="btn btn--ghost-light">
              Discover AFTERHRS
            </Link>
          </div>
        </div>
        <div className="hero__stage" aria-label="Drop 01 campaign: Floral Eyes Tee and Floral Cat Tee">
          <div className="hero__plinth" aria-hidden="true" />
          <Link
            to="product-floral-eyes-tee"
            className="hero__tee hero__tee--back"
            aria-label="View Floral Eyes Tee"
          >
            <Img
              src="/img/eyes-tee-cut.webp"
              alt="Floral Eyes Tee in ivory, back view"
              eager
              width="750"
              height="786"
            />
          </Link>
          <Link
            to="product-floral-cat-tee"
            className="hero__tee hero__tee--front"
            aria-label="View Floral Cat Tee"
          >
            <Img
              src="/img/cat-tee-cut.webp"
              alt="Floral Cat Tee in black, back view"
              eager
              width="742"
              height="796"
            />
          </Link>
          <span className="hero__caption hero__caption--a" aria-hidden="true">
            Floral Eyes · Ivory
          </span>
          <span className="hero__caption hero__caption--b" aria-hidden="true">
            Floral Cat · Black
          </span>
        </div>
      </div>
      <div className="hero__foot">
        <a
          href="#intro"
          className="hero__scroll"
          onClick={(t) => {
            var a;
            t.preventDefault();
            if (!((a = document.getElementById("intro")) == null)) {
              a.scrollIntoView({
                behavior: "smooth",
              });
            }
          }}
        >
          <IconArrowDown size={14} />
          {" Scroll"}
        </a>
        <Link to={`product-${e.id}`} className="hero__product">
          <span>Featured</span>
          <strong>{e.name}</strong>
          <Price value={e.price} />
          <IconArrow size={14} />
        </Link>
      </div>
    </section>
  );
}

function Intro() {
  let e = useReveal();
  return (
    <section className="intro" id="intro" ref={e} aria-labelledby="intro-title">
      <div className="intro__head">
        <Eyebrow>The mindset</Eyebrow>
        <h2 id="intro-title" className="intro__title" data-reveal>
          {"The world doesn’t stop "}
          <em>when the lights go out.</em>
        </h2>
      </div>
      <div className="intro__body">
        <div className="intro__copy" data-reveal>
          <p className="lede">
            Some of the best ideas arrive late. After the work is done and the noise drops, you finally sound
            like yourself.
          </p>
          <p>
            AFTERHRS makes clothes for that version of you. Each piece carries one original graphic, drawn by
            our own designer and printed big enough to start a conversation. We release in small drops, so
            nothing feels like a uniform.
          </p>
          <Link to="story" className="link-arrow">
            {"Read our story "}
            <IconArrow size={14} />
          </Link>
        </div>
        <figure className="intro__fig intro__fig--a" data-reveal>
          <Img
            src="/img/art-cat-face.webp"
            alt="Detail of the Floral Cat print: a black cat with pale blue eyes among red and ivory flowers"
            width="728"
            height="660"
          />
          <figcaption>
            <span>Plate I</span>
            {" Floral Cat, print detail"}
          </figcaption>
        </figure>
        <figure className="intro__fig intro__fig--b" data-reveal>
          <Img
            src="/img/art-eyes.webp"
            alt="The Floral Eyes print: a narrow floral band revealing only the cat’s eyes"
            width="1026"
            height="291"
          />
          <figcaption>
            <span>Plate II</span>
            {" Floral Eyes, full artwork"}
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

function DropSection() {
  const { PRODUCTS } = useCatalog();
  let e = useReveal();
  let t = PRODUCTS.filter((a) => a.status === "available").length;
  return (
    <section className="drop" ref={e} aria-labelledby="drop-title">
      <div className="section-head">
        <div>
          <Eyebrow>
            {"Drop 01 · "}
            {t}
            {" pieces + 1 concept"}
          </Eyebrow>
          <h2 id="drop-title" className="display">
            The First Drop
          </h2>
        </div>
        <Link to="shop" className="link-arrow">
          {"Shop all "}
          <IconArrow size={14} />
        </Link>
      </div>
      <div className="drop__grid">
        {PRODUCTS.map((a, l) => (
          <ProductCard key={a.id} product={a} index={l + 1} variant={l < 2 ? "feature" : "standard"} />
        ))}
      </div>
      <PriceNote />
    </section>
  );
}

function Campaign() {
  let e = useReveal();
  return (
    <section className="campaign" ref={e} aria-labelledby="campaign-title">
      <figure className="campaign__media">
        <Img
          src="/img/art-cat.webp"
          alt="The Floral Cat artwork: a black cat surrounded by red and ivory flowers"
          width="849"
          height="1125"
        />
        <figcaption>AFTERHRS · Drop 01 · Floral Cat</figcaption>
      </figure>
      <div className="campaign__copy">
        <Eyebrow className="eyebrow--light">Campaign · Drop 01</Eyebrow>
        <h2 id="campaign-title" className="campaign__title" data-reveal>
          {"Not made "}
          <em>to blend in.</em>
        </h2>
        <p className="campaign__sub" data-reveal>
          Art you wear. Identity you create.
        </p>
        <div className="campaign__strip" data-reveal>
          <Img src="/img/art-eyes.webp" alt="" aria-hidden="true" />
        </div>
        <Link to="collection-drop-01" className="btn btn--ivory">
          {"Explore the drop "}
          <IconArrow size={16} />
        </Link>
      </div>
    </section>
  );
}

function CollectionIndex() {
  const { PRODUCTS } = useCatalog();
  let [e, t] = useState(null);
  let a = useReveal();
  let l = (i) => PRODUCTS.filter((n) => n.collections.includes(i) && n.status === "available").length;
  return (
    <section className="cindex" ref={a} aria-labelledby="cindex-title">
      <div className="section-head section-head--light">
        <div>
          <Eyebrow>Shop by collection</Eyebrow>
          <h2 id="cindex-title" className="display">
            Collections
          </h2>
        </div>
      </div>
      <div className="cindex__wrap">
        <ul className="cindex__list">
          {COLLECTIONS.map((i, n) => {
            let o = (
              <>
                <span className="cindex__num">{String(n + 1).padStart(2, "0")}</span>
                <span className="cindex__name">{i.name}</span>
                <span className="cindex__blurb">{i.blurb}</span>
                <span className="cindex__meta">
                  {i.live ? (
                    `${l(i.id)} ${l(i.id) === 1 ? "piece" : "pieces"}`
                  ) : (
                    <span className="soon">Coming soon</span>
                  )}
                </span>
                <span className="cindex__thumb" aria-hidden="true">
                  <Img src={i.image} alt="" />
                </span>
              </>
            );
            return (
              <li
                key={i.id}
                className={cx("cindex__row", !i.live && "is-soon")}
                data-reveal
                onMouseEnter={() => t(i.id)}
                onMouseLeave={() => t(null)}
              >
                {i.live ? (
                  <Link to={`collection-${i.id}`} onFocus={() => t(i.id)} onBlur={() => t(null)}>
                    {o}
                    <IconArrow className="cindex__arrow" />
                  </Link>
                ) : (
                  <Link to={`collection-${i.id}`} aria-label={`${i.name}, coming soon`}>
                    {o}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
        <div className="cindex__preview" aria-hidden="true">
          {COLLECTIONS.map((i) => (
            <Img
              key={i.id}
              src={i.image}
              alt=""
              className={cx((e || COLLECTIONS[0].id) === i.id && "is-on", `cprev--${i.id}`)}
            />
          ))}
          <span className="cindex__label">
            {(COLLECTIONS.find((i) => i.id === e) || COLLECTIONS[0]).name}
          </span>
        </div>
      </div>
    </section>
  );
}

function FoundersBlock() {
  return (
    <section className="fblock" aria-labelledby="founders-title">
      <div className="section-head section-head--split">
        <div>
          <Eyebrow className="eyebrow--light">Meet the founders</Eyebrow>
          <h2 id="founders-title" className="display display--serif">
            {"Three minds. "}
            <em>One AFTERHRS.</em>
          </h2>
        </div>
        <p className="fblock__intro">
          {"Founded in "}
          {config.brand.founded}
          {
            " by three friends who wanted to build a label with a real point of view, starting small and getting it right."
          }
        </p>
      </div>
      <Founders />
      <div className="fblock__timeline">
        <h3 className="fblock__tlhead">
          <Star size={10} />
          {" The story so far"}
        </h3>
        <Timeline />
      </div>
      <div className="fblock__cta">
        <Link to="founders" className="link-arrow link-arrow--light">
          {"More about the founders "}
          <IconArrow size={14} />
        </Link>
      </div>
    </section>
  );
}

function SocialGrid() {
  let e = useReveal();
  let t = config.social.instagramUrl;
  let a = [
    {
      src: "/img/art-cat-face.webp",
      alt: "Floral Cat print detail",
      cls: "tile--tall",
    },
    {
      src: "/img/eyes-tee.webp",
      alt: "Floral Eyes Tee, back view",
      cls: "",
    },
    {
      src: "/img/tiger-ink-light.webp",
      alt: "Tiger artwork, reversed out on black",
      cls: "tile--ink",
    },
    {
      src: "/img/cat-tee-cut.webp",
      alt: "Floral Cat Tee on a burgundy ground",
      cls: "tile--wine",
    },
    {
      src: "/img/signature-ink-light.webp",
      alt: "The brush-script AFTERHRS signature",
      cls: "tile--ink tile--wide",
    },
    {
      src: "/img/tiger-tee.webp",
      alt: "Tiger Graphic Tee, back view",
      cls: "",
    },
  ];
  return (
    <section className="social" ref={e} aria-labelledby="social-title">
      <div className="section-head">
        <div>
          <Eyebrow>{config.social.instagramHandle}</Eyebrow>
          <h2 id="social-title" className="display display--serif">
            {"AFTERHRS, "}
            <em>off the clock.</em>
          </h2>
        </div>
        {t ? (
          <a href={t} target="_blank" rel="noopener noreferrer" className="btn btn--line">
            <IconInstagram size={16} />
            {" Follow on Instagram"}
          </a>
        ) : (
          <span className="btn btn--line is-disabled" aria-disabled="true">
            <IconInstagram size={16} />
            {" Instagram link pending"}
          </span>
        )}
      </div>
      <div className="social__grid">
        {a.map((l) => (
          <figure key={l.src} className={cx("tile", l.cls)} data-reveal>
            <Img src={l.src} alt={l.alt} />
          </figure>
        ))}
      </div>
      <p className="fineprint social__note">
        Drop 01 artwork and product imagery. The live Instagram feed appears here once the account is
        connected.
      </p>
    </section>
  );
}

function NewsletterBlock() {
  return (
    <section className="nlblock" aria-labelledby="nl-title">
      <div className="nlblock__inner">
        <Star size={22} className="nlblock__star" />
        <h2 id="nl-title" className="nlblock__title">
          {"First to know. "}
          <em>Before the lights come back on.</em>
        </h2>
        <p>New drops and collection announcements. No daily emails.</p>
        <Newsletter idPrefix="home-nl" />
      </div>
    </section>
  );
}
