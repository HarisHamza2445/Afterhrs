"use client";

import { Star } from "@/components/Brand";
import { useStore } from "@/lib/store";
import { cx } from "@/lib/utils";
export function Toasts() {
  let { toasts } = useStore();
  return (
    <div className="toasts" aria-live="polite" role="status">
      {toasts.map((t) => (
        <div key={t.id} className={cx("toast", `toast--${t.kind}`)}>
          <Star size={9} /> {t.msg}
        </div>
      ))}
    </div>
  );
}
