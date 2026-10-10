"use client";

import { useEffect, useRef } from "react";
import { IconClose } from "@/components/icons";
import { cx } from "@/lib/utils";
export function Modal({ open, onClose, title, side = "center", children, className, labelledBy }) {
  let r = useRef(null);
  let s = useRef(null);
  useEffect(() => {
    if (!open) return;
    s.current = document.activeElement;
    document.documentElement.classList.add("is-locked");
    let d = setTimeout(() => {
      let v =
        r.current && r.current.querySelector("[data-autofocus], button, [href], input, select, textarea");
      if (v) {
        v.focus();
      }
    }, 30);
    let g = (v) => {
      if (v.key === "Escape") {
        onClose();
      }
      if (v.key === "Tab" && r.current) {
        let p = [
          ...r.current.querySelectorAll(
            'button:not([disabled]), [href], input:not([disabled]), select, textarea, [tabindex]:not([tabindex="-1"])',
          ),
        ];
        if (!p.length) return;
        let y = p[0];
        let N = p[p.length - 1];
        if (v.shiftKey && document.activeElement === y) {
          v.preventDefault();
          N.focus();
        } else {
          if (!v.shiftKey && document.activeElement === N) {
            v.preventDefault();
            y.focus();
          }
        }
      }
    };
    document.addEventListener("keydown", g);
    return () => {
      clearTimeout(d);
      document.removeEventListener("keydown", g);
      document.documentElement.classList.remove("is-locked");
      if (s.current && s.current.focus) {
        s.current.focus();
      }
    };
  }, [open, onClose]);
  return open ? (
    <div className={cx("modal", `modal--${side}`, className)}>
      <div className="modal__scrim" onClick={onClose} />
      <div
        className="modal__panel"
        role="dialog"
        aria-modal="true"
        aria-label={labelledBy ? undefined : title}
        aria-labelledby={labelledBy}
        ref={r}
      >
        {title !== null && (
          <div className="modal__head">
            <h2 className="modal__title">{title}</h2>
            <button type="button" className="icon-btn" onClick={onClose} aria-label="Close">
              <IconClose />
            </button>
          </div>
        )}
        {children}
      </div>
    </div>
  ) : null;
}
