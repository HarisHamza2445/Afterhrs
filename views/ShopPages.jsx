"use client";

import { useMemo, useState } from "react";
import { Newsletter } from "@/components/Footer";
import { IconArrow } from "@/components/icons";
import { Link } from "@/components/Link";
import { ProductCard } from "@/components/ProductCard";
import { Breadcrumbs, PageHero } from "@/components/sections";
import { Img, PriceNote } from "@/components/ui";
import { COLLECTIONS } from "@/lib/catalog";
import { useCatalog } from "@/lib/catalog-context";
import { cx } from "@/lib/utils";
function ProductListing({ items, showFilters = true }) {
  const { PRODUCTS } = useCatalog();
  let [a, l] = useState("All");
  let [i, n] = useState("all");
  let [o, r] = useState("featured");
  let s = ["All", ...new Set(PRODUCTS.flatMap((g) => g.colours.map((v) => v.name)))];
  let d = useMemo(() => {
    let g = items.filter((v) => a === "All" || v.colours.some((p) => p.name === a));
    if (i === "available") {
      g = g.filter((v) => v.status === "available");
    }
    if (o === "low") {
      g = [...g].sort((v, p) => v.price - p.price);
    }
    if (o === "high") {
      g = [...g].sort((v, p) => p.price - v.price);
    }
    if (o === "name") {
      g = [...g].sort((v, p) => v.name.localeCompare(p.name));
    }
    return g;
  }, [items, a, i, o]);
  return (
    <div className="listing">
      {showFilters && (
        <div className="filters" role="region" aria-label="Filter and sort">
          <div className="filters__group" role="group" aria-label="Colour">
            {s.map((g) => (
              <button
                key={g}
                type="button"
                className={cx("chip", a === g && "is-on")}
                aria-pressed={a === g}
                onClick={() => l(g)}
              >
                {g}
              </button>
            ))}
          </div>
          <div className="filters__group">
            <label className="check">
              <input
                id="filter-available"
                type="checkbox"
                checked={i === "available"}
                onChange={(g) => n(g.target.checked ? "available" : "all")}
              />
              <span>Hide concepts</span>
            </label>
            <label className="mini-select mini-select--inline">
              <span>Sort</span>
              <select id="sort" value={o} onChange={(g) => r(g.target.value)}>
                <option value="featured">Featured</option>
                <option value="low">Price, low to high</option>
                <option value="high">Price, high to low</option>
                <option value="name">Name</option>
              </select>
            </label>
          </div>
        </div>
      )}
      <p className="listing__count" aria-live="polite">
        {d.length} {d.length === 1 ? "piece" : "pieces"}
      </p>
      {d.length ? (
        <div className="grid-products">
          {d.map((g) => (
            <ProductCard key={g.id} product={g} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <p className="empty__title">No pieces match these filters.</p>
          <button
            type="button"
            className="btn btn--line"
            onClick={() => {
              l("All");
              n("all");
            }}
          >
            Clear filters
          </button>
        </div>
      )}
      <PriceNote />
    </div>
  );
}

export function ShopPage() {
  const { PRODUCTS } = useCatalog();
  return (
    <div className="page page--dark">
      <PageHero
        eyebrow="Shop all"
        title={
          <>
            {"Every piece, "}
            <em>so far.</em>
          </>
        }
      >
        <p>Drop 01 is three original prints on oversized tees, plus one concept still in the studio.</p>
      </PageHero>
      <div className="container">
        <nav className="collection-tabs" aria-label="Collections">
          <Link to="shop" className="is-on" aria-current="page">
            All
          </Link>
          {COLLECTIONS.map((e) => (
            <Link key={e.id} to={`collection-${e.id}`}>
              {e.name}
              {!e.live && <small>{" · soon"}</small>}
            </Link>
          ))}
        </nav>
        <ProductListing items={PRODUCTS} />
      </div>
    </div>
  );
}

export function CollectionPage({ id }) {
  const { PRODUCTS } = useCatalog();
  let t = COLLECTIONS.find((l) => l.id === id);
  if (!t) return <CollectionNotFound />;
  let a = PRODUCTS.filter((l) => l.collections.includes(t.id));
  return (
    <div className="page page--dark">
      <header className="chero">
        <div className="chero__copy">
          <Breadcrumbs
            items={[
              {
                to: "shop",
                label: "Shop",
              },
              {
                label: t.name,
              },
            ]}
          />
          <h1 className="chero__title">{t.name}</h1>
          <p>{t.blurb}</p>
          {!t.live && <span className="soon soon--lg">Coming soon</span>}
        </div>
        <div className={cx("chero__img", `chero__img--${t.id}`)}>
          <Img src={t.image} alt="" eager />
        </div>
      </header>
      <div className="container">
        <nav className="collection-tabs" aria-label="Collections">
          <Link to="shop">All</Link>
          {COLLECTIONS.map((l) => (
            <Link
              key={l.id}
              to={`collection-${l.id}`}
              className={l.id === t.id ? "is-on" : ""}
              aria-current={l.id === t.id ? "page" : undefined}
            >
              {l.name}
              {!l.live && <small>{" · soon"}</small>}
            </Link>
          ))}
        </nav>
        {t.live ? (
          <ProductListing items={a} showFilters={a.length > 2} />
        ) : (
          <div className="soonblock">
            <h2 className="display display--serif">
              {"Not yet. "}
              <em>Soon.</em>
            </h2>
            <p>
              {t.name}
              {" is planned but nothing in it is on sale. "}
              {a.length > 0 && "You can preview the concept below."}
              {" Leave your email to hear when it opens."}
            </p>
            {a.length > 0 && (
              <div className="grid-products grid-products--narrow">
                {a.map((l) => (
                  <ProductCard key={l.id} product={l} />
                ))}
              </div>
            )}
            <Newsletter idPrefix={`soon-${t.id}`} />
            <Link to="shop" className="link-arrow">
              {"Shop what’s available now "}
              <IconArrow size={14} />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

function CollectionNotFound() {
  return (
    <div className="page page--dark">
      <PageHero eyebrow="Collection" title="We couldn’t find that collection.">
        <p>
          <Link to="shop" className="link-arrow">
            {"Shop all pieces "}
            <IconArrow size={14} />
          </Link>
        </p>
      </PageHero>
    </div>
  );
}
