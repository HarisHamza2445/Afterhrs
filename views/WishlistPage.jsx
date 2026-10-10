"use client";

import { IconArrow, IconHeart } from "@/components/icons";
import { Link } from "@/components/Link";
import { ProductCard } from "@/components/ProductCard";
import { PageHero } from "@/components/sections";
import { useCatalog } from "@/lib/catalog-context";
import { useStore } from "@/lib/store";
export function WishlistPage() {
  const { getProduct } = useCatalog();
  let { wishlist } = useStore();
  let t = wishlist.map(getProduct).filter(Boolean);
  return (
    <div className="page page--dark">
      <PageHero
        eyebrow="Wishlist"
        title={
          <>
            {"Saved "}
            <em>for later.</em>
          </>
        }
      >
        <p>
          {t.length
            ? `${t.length} saved ${t.length === 1 ? "piece" : "pieces"}, kept in this browser.`
            : "Tap the heart on any piece to save it here."}
        </p>
      </PageHero>
      <div className="container">
        {t.length ? (
          <div className="grid-products">
            {t.map((a) => (
              <ProductCard key={a.id} product={a} />
            ))}
          </div>
        ) : (
          <div className="empty empty--dark">
            <IconHeart size={32} />
            <p className="empty__title">Nothing saved yet.</p>
            <Link to="shop" className="btn btn--ivory">
              {"Browse the drop "}
              <IconArrow size={16} />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
