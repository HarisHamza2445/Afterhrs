"use client";

import { useMemo, useState } from "react";
import { IconArrow, IconSearch } from "@/components/icons";
import { Link } from "@/components/Link";
import { Modal } from "@/components/Modal";
import { Img, Price } from "@/components/ui";
import { useCatalog } from "@/lib/catalog-context";
import { navigate } from "@/lib/navigation";
import { useStore } from "@/lib/store";
export function SearchOverlay() {
  const { PRODUCTS } = useCatalog();
  let { search, setSearch } = useStore();
  let [a, l] = useState("");
  let i = useMemo(() => {
    let o = a.trim().toLowerCase();
    return o
      ? PRODUCTS.filter((r) =>
          [r.name, r.short, ...r.tags, ...r.colours.map((s) => s.name)].join(" ").toLowerCase().includes(o),
        )
      : PRODUCTS;
  }, [a]);
  let n = () => {
    setSearch(false);
    l("");
  };
  return (
    <Modal open={search} onClose={n} title="Search" side="top" className="search">
      <div className="search__box">
        <IconSearch />
        <input
          id="search-input"
          type="search"
          placeholder="Search tees, prints, colours"
          value={a}
          onChange={(o) => l(o.target.value)}
          data-autofocus
          autoComplete="off"
          aria-label="Search products"
        />
      </div>
      <p className="search__count" aria-live="polite">
        {a ? `${i.length} ${i.length === 1 ? "result" : "results"} for \u201C${a}\u201D` : "All pieces"}
      </p>
      {i.length ? (
        <ul className="search__list">
          {i.map((o) => (
            <li key={o.id}>
              <Link to={`product-${o.id}`} onClick={n} className="search__item">
                <Img src={o.images.main} alt="" />
                <span>
                  <strong>{o.name}</strong>
                  <small>
                    {o.colours[0].name}
                    {o.status === "concept" ? " · Concept" : ""}
                  </small>
                </span>
                <Price value={o.price} />
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <div className="empty empty--compact">
          <p>Nothing matches “{a}”. Try “cat”, “tiger” or “ivory”.</p>
          <button
            className="btn btn--line"
            type="button"
            onClick={() => {
              n();
              navigate("shop");
            }}
          >
            {"Browse all "}
            <IconArrow size={16} />
          </button>
        </div>
      )}
    </Modal>
  );
}
