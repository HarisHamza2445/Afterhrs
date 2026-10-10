"use client";

import { useState } from "react";
import { IconClose, IconHeart, IconPlus } from "@/components/icons";
import { Link } from "@/components/Link";
import { Img, Price } from "@/components/ui";
import { useStore } from "@/lib/store";
import { cx } from "@/lib/utils";
export function availabilityLabel(e) {
  return e.status === "concept"
    ? "Concept · not yet available"
    : e.soldOut.length === e.sizes.length
      ? "Sold out"
      : "Drop 01 · stock to be confirmed";
}

export function ProductCard({ product, variant = "standard", index }) {
  let { addToCart, wishlist, toggleWish } = useStore();
  let [o, r] = useState(false);
  let s = wishlist.includes(product.id);
  let d = product.status === "concept";
  return (
    <article
      className={cx("pcard", `pcard--${variant}`, `pcard--${product.tone}`, d && "pcard--concept")}
      data-reveal
    >
      <div className="pcard__media">
        <Link
          to={`product-${product.id}`}
          className="pcard__imglink"
          aria-label={`${product.fullName}, view product`}
        >
          <Img
            src={product.images.main}
            alt={`${product.fullName} in ${product.colours[0].name}, back view`}
            className="pcard__img pcard__img--main"
            width="750"
            height="1072"
          />
          {product.images.alt && (
            <Img src={product.images.alt} alt="" className="pcard__img pcard__img--alt" aria-hidden="true" />
          )}
        </Link>
        {index != null && (
          <span className="pcard__index" aria-hidden="true">
            {String(index).padStart(2, "0")}
          </span>
        )}
        {d && <span className="pcard__tag">Concept</span>}
        <button
          type="button"
          className={cx("pcard__wish", s && "is-on")}
          aria-pressed={s}
          aria-label={s ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`}
          onClick={() => toggleWish(product.id)}
        >
          <IconHeart size={18} filled={s} />
        </button>
        {!d && (
          <div className={cx("pcard__quick", o && "is-open")}>
            {o ? (
              <div className="quick-sizes" role="group" aria-label={`Choose a size for ${product.name}`}>
                {product.sizes.map((g) => (
                  <button
                    key={g}
                    type="button"
                    disabled={product.soldOut.includes(g)}
                    onClick={() => {
                      addToCart({
                        id: product.id,
                        colour: product.colours[0].name,
                        size: g,
                        qty: 1,
                      });
                      r(false);
                    }}
                  >
                    {g}
                  </button>
                ))}
                <button
                  type="button"
                  className="quick-sizes__close"
                  aria-label="Close size picker"
                  onClick={() => r(false)}
                >
                  <IconClose size={16} />
                </button>
              </div>
            ) : (
              <button type="button" className="quick-add" onClick={() => r(true)}>
                <IconPlus size={16} />
                {" Quick add · choose size"}
              </button>
            )}
          </div>
        )}
      </div>
      <div className="pcard__info">
        <div className="pcard__row">
          <h3 className="pcard__name">
            <Link to={`product-${product.id}`}>{product.name}</Link>
          </h3>
          <Price value={product.price} />
        </div>
        <div className="pcard__row pcard__meta">
          <span className="swatches">
            {product.colours.map((g) => (
              <span
                key={g.name}
                className="swatch"
                style={{
                  "--sw": g.hex,
                }}
                title={g.name}
              />
            ))}
            <span>{product.colours.map((g) => g.name).join(" / ")}</span>
          </span>
          <span className="pcard__sizes">
            {product.sizes[0]}–{product.sizes[product.sizes.length - 1]}
          </span>
        </div>
        <p className={cx("pcard__avail", d && "is-concept")}>{availabilityLabel(product)}</p>
      </div>
    </article>
  );
}
